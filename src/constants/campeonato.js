export const POSICOES = ['Goleiro', 'Zagueiro', 'Meia', 'Atacante'];

export const COLUNAS_TABELA = [
  { chave: 'pontos', rotulo: 'P' },
  { chave: 'jogos', rotulo: 'J' },
  { chave: 'vitorias', rotulo: 'V' },
  { chave: 'empates', rotulo: 'E' },
  { chave: 'derrotas', rotulo: 'D' },
];

export const LEGENDA_TABELA =
  'P: Pontos · J: Jogos · V: Vitórias · E: Empates · D: Derrotas';

/** quantas posições entram na próxima fase (pinta a faixa verde na tabela) */
export const VAGAS_CLASSIFICACAO = 2;

export const STATUS_PARTIDA = {
  finalizado: 'finalizado',
  agendado: 'agendado',
};

export const FILTROS_PARTIDA = [
  { chave: 'encerrados', rotulo: 'Encerrados', status: STATUS_PARTIDA.finalizado },
  { chave: 'proximos', rotulo: 'Próximos', status: STATUS_PARTIDA.agendado },
];

export const LIMITES_SUMULA = {
  golsMax: 20,
  amarelosMax: 2,
  vermelhosMax: 1,
};
