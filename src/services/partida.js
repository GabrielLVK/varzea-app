import { STATUS_PARTIDA } from '../constants/campeonato';
import { ApiError } from './api';
import { aguardar } from './config';
import {
  CHAVES,
  CLASSIFICACAO_SEED,
  JOGADORES_SEED,
  PARTIDAS_SEED,
  TIMES_SEED,
} from './mock/dados';
import { obterColecao, salvarColecao } from './storage';

function ordenarPorData(a, b) {
  return `${a.data}${a.hora}`.localeCompare(`${b.data}${b.hora}`);
}

async function hidratar(partidas) {
  const times = await obterColecao(CHAVES.times, TIMES_SEED);
  const acharTime = id => times.find(time => time.id === id) ?? { id, nome: '—' };

  return partidas.map(partida => ({
    ...partida,
    mandante: acharTime(partida.mandanteId),
    visitante: acharTime(partida.visitanteId),
  }));
}

export async function listarPartidas() {
  await aguardar();
  const partidas = await obterColecao(CHAVES.partidas, PARTIDAS_SEED);
  return hidratar([...partidas].sort(ordenarPorData));
}

export async function listarPorStatus(status) {
  const partidas = await listarPartidas();
  return partidas.filter(partida => partida.status === status);
}

/** a partida agendada mais próxima — alimenta o card da Home */
export async function proximaPartida() {
  await aguardar();
  const partidas = await obterColecao(CHAVES.partidas, PARTIDAS_SEED);
  const agendadas = partidas
    .filter(partida => partida.status === STATUS_PARTIDA.agendado)
    .sort(ordenarPorData);

  if (agendadas.length === 0) return null;
  const [primeira] = await hidratar([agendadas[0]]);
  return primeira;
}

export async function buscarPartida(id) {
  await aguardar();
  const partidas = await obterColecao(CHAVES.partidas, PARTIDAS_SEED);
  const partida = partidas.find(item => item.id === id);
  if (!partida) {
    throw new ApiError('Partida não encontrada.', 404, 'local');
  }
  const [hidratada] = await hidratar([partida]);
  return hidratada;
}

export async function criarPartida({
  mandanteId,
  visitanteId,
  data,
  hora,
  local,
  rodada,
}) {
  await aguardar();
  const partidas = await obterColecao(CHAVES.partidas, PARTIDAS_SEED);

  const nova = {
    id: `p${Date.now().toString(36)}`,
    rodada: rodada.trim(),
    data,
    hora,
    local: local.trim(),
    mandanteId,
    visitanteId,
    placarMandante: null,
    placarVisitante: null,
    status: STATUS_PARTIDA.agendado,
  };

  await salvarColecao(CHAVES.partidas, [...partidas, nova]);
  return nova;
}

export async function removerPartida(id) {
  await aguardar();
  const partidas = await obterColecao(CHAVES.partidas, PARTIDAS_SEED);
  await salvarColecao(
    CHAVES.partidas,
    partidas.filter(partida => partida.id !== id),
  );
}

/**
 * Publica o resultado: grava o placar, soma os eventos no cartel de cada
 * jogador e atualiza a classificação dos dois times.
 *
 * eventos: { [jogadorId]: { gols, amarelos, vermelhos } }
 */
export async function publicarSumula(id, { placarMandante, placarVisitante, eventos = {} }) {
  await aguardar();

  const [partidas, jogadores, classificacao] = await Promise.all([
    obterColecao(CHAVES.partidas, PARTIDAS_SEED),
    obterColecao(CHAVES.jogadores, JOGADORES_SEED),
    obterColecao(CHAVES.classificacao, CLASSIFICACAO_SEED),
  ]);

  const partida = partidas.find(item => item.id === id);
  if (!partida) {
    throw new ApiError('Partida não encontrada.', 404, 'local');
  }
  if (partida.status === STATUS_PARTIDA.finalizado) {
    throw new ApiError('Essa partida já teve a súmula publicada.', 409, 'local');
  }

  const golsMandante = Number(placarMandante);
  const golsVisitante = Number(placarVisitante);

  // 1. placar e status da partida
  const partidasAtualizadas = partidas.map(item =>
    item.id === id
      ? {
          ...item,
          placarMandante: golsMandante,
          placarVisitante: golsVisitante,
          status: STATUS_PARTIDA.finalizado,
        }
      : item,
  );

  // 2. cartel dos jogadores
  const jogadoresAtualizados = jogadores.map(jogador => {
    const evento = eventos[jogador.id];
    if (!evento) return jogador;
    return {
      ...jogador,
      gols: jogador.gols + (evento.gols ?? 0),
      amarelos: jogador.amarelos + (evento.amarelos ?? 0),
      vermelhos: jogador.vermelhos + (evento.vermelhos ?? 0),
      golsSofridos:
        jogador.posicao === 'Goleiro'
          ? jogador.golsSofridos +
            (jogador.timeId === partida.mandanteId ? golsVisitante : golsMandante)
          : jogador.golsSofridos,
    };
  });

  // 3. classificação dos dois times
  const classificacaoAtualizada = classificacao.map(linha => {
    const eMandante = linha.timeId === partida.mandanteId;
    const eVisitante = linha.timeId === partida.visitanteId;
    if (!eMandante && !eVisitante) return linha;

    const golsPro = eMandante ? golsMandante : golsVisitante;
    const golsContra = eMandante ? golsVisitante : golsMandante;
    const venceu = golsPro > golsContra;
    const empatou = golsPro === golsContra;

    return {
      ...linha,
      jogos: linha.jogos + 1,
      vitorias: linha.vitorias + (venceu ? 1 : 0),
      empates: linha.empates + (empatou ? 1 : 0),
      derrotas: linha.derrotas + (!venceu && !empatou ? 1 : 0),
      pontos: linha.pontos + (venceu ? 3 : empatou ? 1 : 0),
      golsPro: linha.golsPro + golsPro,
      golsContra: linha.golsContra + golsContra,
    };
  });

  await Promise.all([
    salvarColecao(CHAVES.partidas, partidasAtualizadas),
    salvarColecao(CHAVES.jogadores, jogadoresAtualizados),
    salvarColecao(CHAVES.classificacao, classificacaoAtualizada),
  ]);

  return partidasAtualizadas.find(item => item.id === id);
}
