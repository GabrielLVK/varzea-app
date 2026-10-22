import { ApiError } from './api';
import { aguardar } from './config';
import { CHAVES, JOGADORES_SEED, TIMES_SEED } from './mock/dados';
import { obterColecao, salvarColecao } from './storage';

/** acrescenta o nome do time a cada jogador, para as listas não precisarem cruzar */
async function comTime(jogadores) {
  const times = await obterColecao(CHAVES.times, TIMES_SEED);
  return jogadores.map(jogador => ({
    ...jogador,
    time: times.find(time => time.id === jogador.timeId)?.nome ?? '—',
  }));
}

export async function listarJogadores() {
  await aguardar();
  const jogadores = await obterColecao(CHAVES.jogadores, JOGADORES_SEED);
  return comTime(jogadores);
}

export async function listarElenco(timeId) {
  const jogadores = await obterColecao(CHAVES.jogadores, JOGADORES_SEED);
  return jogadores
    .filter(jogador => jogador.timeId === timeId)
    .sort((a, b) => a.numero - b.numero);
}

export async function criarJogador({ timeId, nome, numero, posicao }) {
  await aguardar();
  const jogadores = await obterColecao(CHAVES.jogadores, JOGADORES_SEED);

  const numeroInt = Number(numero);
  const repetido = jogadores.some(
    jogador => jogador.timeId === timeId && jogador.numero === numeroInt,
  );
  if (repetido) {
    throw new ApiError(
      `Já existe um jogador com a camisa ${numeroInt} nessa equipe.`,
      409,
      'local',
    );
  }

  const novo = {
    id: `j${Date.now().toString(36)}`,
    timeId,
    nome: nome.trim(),
    numero: numeroInt,
    posicao,
    foto: null,
    gols: 0,
    assistencias: 0,
    amarelos: 0,
    vermelhos: 0,
    golsSofridos: 0,
  };

  await salvarColecao(CHAVES.jogadores, [...jogadores, novo]);
  return novo;
}

export async function removerJogador(id) {
  await aguardar();
  const jogadores = await obterColecao(CHAVES.jogadores, JOGADORES_SEED);
  await salvarColecao(
    CHAVES.jogadores,
    jogadores.filter(jogador => jogador.id !== id),
  );
}
