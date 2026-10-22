import { aguardar } from './config';
import { CHAVES, CLASSIFICACAO_SEED, JOGADORES_SEED, TIMES_SEED } from './mock/dados';
import { obterColecao } from './storage';

async function carregarBase() {
  const [times, jogadores, classificacao] = await Promise.all([
    obterColecao(CHAVES.times, TIMES_SEED),
    obterColecao(CHAVES.jogadores, JOGADORES_SEED),
    obterColecao(CHAVES.classificacao, CLASSIFICACAO_SEED),
  ]);
  return { times, jogadores, classificacao };
}

function nomeDoTime(times, timeId) {
  return times.find(time => time.id === timeId)?.nome ?? '—';
}

/** desempate: pontos, saldo de gols, gols pró */
function compararClassificacao(a, b) {
  if (b.pontos !== a.pontos) return b.pontos - a.pontos;
  const saldoA = a.golsPro - a.golsContra;
  const saldoB = b.golsPro - b.golsContra;
  if (saldoB !== saldoA) return saldoB - saldoA;
  return b.golsPro - a.golsPro;
}

export async function listarClassificacao() {
  await aguardar();
  const { times, classificacao } = await carregarBase();

  return [...classificacao].sort(compararClassificacao).map((linha, indice) => {
    const time = times.find(item => item.id === linha.timeId);
    return {
      ...linha,
      id: linha.timeId,
      posicao: indice + 1,
      nome: time?.nome ?? '—',
      escudo: time?.escudo ?? null,
    };
  });
}

function ranking(jogadores, times, campo, quantidade = 3) {
  return jogadores
    .filter(jogador => (jogador[campo] ?? 0) > 0)
    .sort((a, b) => b[campo] - a[campo])
    .slice(0, quantidade)
    .map((jogador, indice) => ({
      id: jogador.id,
      posicao: indice + 1,
      nome: jogador.nome,
      foto: jogador.foto,
      time: nomeDoTime(times, jogador.timeId),
      valor: jogador[campo],
    }));
}

export async function listarArtilheiros() {
  const { times, jogadores } = await carregarBase();
  return ranking(jogadores, times, 'gols');
}

export async function listarAssistencias() {
  const { times, jogadores } = await carregarBase();
  return ranking(jogadores, times, 'assistencias');
}

export async function melhorDefesa() {
  const { times, jogadores } = await carregarBase();
  const goleiros = jogadores.filter(jogador => jogador.posicao === 'Goleiro');
  if (goleiros.length === 0) return null;

  const melhor = goleiros.reduce((atual, jogador) =>
    jogador.golsSofridos < atual.golsSofridos ? jogador : atual,
  );

  return {
    nome: melhor.nome,
    foto: melhor.foto,
    time: nomeDoTime(times, melhor.timeId),
    valor: melhor.golsSofridos,
  };
}

async function extremoDeAtaque(maior) {
  const { times, classificacao } = await carregarBase();
  if (classificacao.length === 0) return null;

  const alvo = classificacao.reduce((atual, linha) =>
    maior
      ? linha.golsPro > atual.golsPro
        ? linha
        : atual
      : linha.golsPro < atual.golsPro
        ? linha
        : atual,
  );

  const time = times.find(item => item.id === alvo.timeId);
  return {
    nome: time?.nome ?? '—',
    escudo: time?.escudo ?? null,
    valor: alvo.golsPro,
  };
}

export function melhorAtaque() {
  return extremoDeAtaque(true);
}

export function piorAtaque() {
  return extremoDeAtaque(false);
}

/** time com mais cartões, somando o elenco */
export async function piorDisciplina() {
  const { times, jogadores } = await carregarBase();
  if (times.length === 0) return null;

  const porTime = times.map(time => {
    const elenco = jogadores.filter(jogador => jogador.timeId === time.id);
    return {
      nome: time.nome,
      escudo: time.escudo,
      amarelos: elenco.reduce((total, jogador) => total + (jogador.amarelos ?? 0), 0),
      vermelhos: elenco.reduce((total, jogador) => total + (jogador.vermelhos ?? 0), 0),
    };
  });

  return porTime.reduce((atual, time) => {
    const pesoTime = time.amarelos + time.vermelhos * 3;
    const pesoAtual = atual.amarelos + atual.vermelhos * 3;
    return pesoTime > pesoAtual ? time : atual;
  });
}

export async function listarDestaques() {
  await aguardar();
  const [artilheiros, ataque] = await Promise.all([listarArtilheiros(), melhorAtaque()]);
  return { artilheiro: artilheiros[0] ?? null, melhorAtaque: ataque };
}

export async function listarLideres() {
  await aguardar();
  const [assistencias, artilheiros, defesa, ataqueFraco, disciplina] = await Promise.all([
    listarAssistencias(),
    listarArtilheiros(),
    melhorDefesa(),
    piorAtaque(),
    piorDisciplina(),
  ]);

  return { assistencias, artilheiros, defesa, ataqueFraco, disciplina };
}
