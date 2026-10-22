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

export async function listarTimes() {
  await aguardar();
  const [times, jogadores, classificacao] = await Promise.all([
    obterColecao(CHAVES.times, TIMES_SEED),
    obterColecao(CHAVES.jogadores, JOGADORES_SEED),
    obterColecao(CHAVES.classificacao, CLASSIFICACAO_SEED),
  ]);

  const ordenada = [...classificacao].sort((a, b) => b.pontos - a.pontos);

  return times.map(time => {
    const posicao = ordenada.findIndex(linha => linha.timeId === time.id);
    return {
      ...time,
      totalJogadores: jogadores.filter(jogador => jogador.timeId === time.id).length,
      colocacao: posicao >= 0 ? `${posicao + 1}º Colocado` : null,
    };
  });
}

export async function buscarTime(id) {
  const times = await obterColecao(CHAVES.times, TIMES_SEED);
  const time = times.find(item => item.id === id);
  if (!time) {
    throw new ApiError('Equipe não encontrada.', 404, 'local');
  }
  return time;
}

export async function criarTime({ nome, tecnico, escudo }) {
  await aguardar();
  const times = await obterColecao(CHAVES.times, TIMES_SEED);

  const nomeLimpo = nome.trim();
  const repetido = times.some(
    time => time.nome.toLowerCase() === nomeLimpo.toLowerCase(),
  );
  if (repetido) {
    throw new ApiError('Já existe uma equipe com esse nome.', 409, 'local');
  }

  const novo = {
    id: `t${Date.now().toString(36)}`,
    nome: nomeLimpo,
    tecnico: tecnico.trim(),
    escudo: escudo ?? null,
  };

  await salvarColecao(CHAVES.times, [...times, novo]);

  const classificacao = await obterColecao(CHAVES.classificacao, CLASSIFICACAO_SEED);
  await salvarColecao(CHAVES.classificacao, [
    ...classificacao,
    {
      timeId: novo.id,
      pontos: 0,
      jogos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      golsPro: 0,
      golsContra: 0,
    },
  ]);

  return novo;
}

export async function atualizarTime(id, { nome, tecnico, escudo }) {
  await aguardar();
  const times = await obterColecao(CHAVES.times, TIMES_SEED);

  const nomeLimpo = nome.trim();
  const repetido = times.some(
    time => time.id !== id && time.nome.toLowerCase() === nomeLimpo.toLowerCase(),
  );
  if (repetido) {
    throw new ApiError('Já existe uma equipe com esse nome.', 409, 'local');
  }

  const atualizados = times.map(time =>
    time.id === id
      ? { ...time, nome: nomeLimpo, tecnico: tecnico.trim(), escudo: escudo ?? null }
      : time,
  );

  await salvarColecao(CHAVES.times, atualizados);
  return atualizados.find(time => time.id === id);
}

export async function removerTime(id) {
  await aguardar();
  const [times, jogadores, partidas, classificacao] = await Promise.all([
    obterColecao(CHAVES.times, TIMES_SEED),
    obterColecao(CHAVES.jogadores, JOGADORES_SEED),
    obterColecao(CHAVES.partidas, PARTIDAS_SEED),
    obterColecao(CHAVES.classificacao, CLASSIFICACAO_SEED),
  ]);

  await Promise.all([
    salvarColecao(
      CHAVES.times,
      times.filter(time => time.id !== id),
    ),
    salvarColecao(
      CHAVES.jogadores,
      jogadores.filter(jogador => jogador.timeId !== id),
    ),
    salvarColecao(
      CHAVES.partidas,
      partidas.filter(
        partida => partida.mandanteId !== id && partida.visitanteId !== id,
      ),
    ),
    salvarColecao(
      CHAVES.classificacao,
      classificacao.filter(linha => linha.timeId !== id),
    ),
  ]);
}
