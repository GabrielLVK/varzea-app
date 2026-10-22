export const CHAVES = {
  times: 'varzea_times',
  jogadores: 'varzea_jogadores',
  partidas: 'varzea_partidas',
  classificacao: 'varzea_classificacao',
};

export const TIMES_SEED = [
  { id: 'a', nome: 'Time A', tecnico: 'Zé Carlos', escudo: null },
  { id: 'b', nome: 'Time B', tecnico: 'Beto Silva', escudo: null },
  { id: 'c', nome: 'Time C', tecnico: 'Nando Souza', escudo: null },
  { id: 'd', nome: 'Time D', tecnico: 'Rui Andrade', escudo: null },
];

/**
 * Os números de gols, assistências e cartões ficam no próprio jogador —
 * é deles que saem os rankings de `estatistica.js`.
 */
export const JOGADORES_SEED = [
  {
    id: 'p1',
    timeId: 'a',
    nome: 'Joãozinho',
    numero: 10,
    posicao: 'Atacante',
    foto: null,
    gols: 8,
    assistencias: 5,
    amarelos: 0,
    vermelhos: 0,
    golsSofridos: 0,
  },
  {
    id: 'p2',
    timeId: 'a',
    nome: 'Marcos',
    numero: 1,
    posicao: 'Goleiro',
    foto: null,
    gols: 0,
    assistencias: 0,
    amarelos: 0,
    vermelhos: 0,
    golsSofridos: 2,
  },
  {
    id: 'p3',
    timeId: 'a',
    nome: 'Lucas',
    numero: 7,
    posicao: 'Meia',
    foto: null,
    gols: 6,
    assistencias: 6,
    amarelos: 0,
    vermelhos: 0,
    golsSofridos: 0,
  },
  {
    id: 'p4',
    timeId: 'a',
    nome: 'Pedrinho',
    numero: 5,
    posicao: 'Zagueiro',
    foto: null,
    gols: 0,
    assistencias: 0,
    amarelos: 1,
    vermelhos: 0,
    golsSofridos: 0,
  },
  {
    id: 'p5',
    timeId: 'b',
    nome: 'Pedro',
    numero: 9,
    posicao: 'Atacante',
    foto: null,
    gols: 4,
    assistencias: 4,
    amarelos: 2,
    vermelhos: 0,
    golsSofridos: 0,
  },
  {
    id: 'p6',
    timeId: 'b',
    nome: 'Rafael',
    numero: 11,
    posicao: 'Atacante',
    foto: null,
    gols: 2,
    assistencias: 1,
    amarelos: 1,
    vermelhos: 1,
    golsSofridos: 0,
  },
  {
    id: 'p7',
    timeId: 'b',
    nome: 'Diego',
    numero: 4,
    posicao: 'Zagueiro',
    foto: null,
    gols: 0,
    assistencias: 0,
    amarelos: 1,
    vermelhos: 0,
    golsSofridos: 0,
  },
];

export const PARTIDAS_SEED = [
  {
    id: 'f1',
    rodada: 'Rodada 3',
    data: '2026-09-10',
    hora: '15:00',
    local: 'Campo do Zé',
    mandanteId: 'a',
    visitanteId: 'b',
    placarMandante: 3,
    placarVisitante: 1,
    status: 'finalizado',
  },
  {
    id: 'f2',
    rodada: 'Rodada 4',
    data: '2026-09-17',
    hora: '15:30',
    local: 'Campo do Zé',
    mandanteId: 'c',
    visitanteId: 'd',
    placarMandante: null,
    placarVisitante: null,
    status: 'agendado',
  },
];

/**
 * A classificação é mantida como dado próprio (e não recalculada a partir
 * das partidas) porque o campeonato começou antes do app: as quatro rodadas
 * já disputadas não estão cadastradas como partidas.
 */
export const CLASSIFICACAO_SEED = [
  { timeId: 'a', pontos: 12, jogos: 4, vitorias: 4, empates: 0, derrotas: 0, golsPro: 15, golsContra: 3 },
  { timeId: 'b', pontos: 9, jogos: 4, vitorias: 3, empates: 0, derrotas: 1, golsPro: 9, golsContra: 6 },
  { timeId: 'c', pontos: 3, jogos: 4, vitorias: 1, empates: 0, derrotas: 3, golsPro: 5, golsContra: 10 },
  { timeId: 'd', pontos: 0, jogos: 4, vitorias: 0, empates: 0, derrotas: 4, golsPro: 2, golsContra: 12 },
];

/** credencial de demonstração do painel do organizador */
export const ORGANIZADOR_SEED = {
  id: 1,
  nome: 'Organizador',
  login: 'organizador@varzea.com',
  senha: 'varzea2026',
};
