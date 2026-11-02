export const cores = {
  fundo: '#0F0F0F',
  superficie: '#1F1F1F',

  primaria: '#FF0000',
  primariaEscura: '#CC0000',
  sobrePrimaria: '#FFFFFF',

  secundaria: '#272727',
  sobreSecundaria: '#FFFFFF',

  destaque: '#272727',
  sobreDestaque: '#FFFFFF',

  texto: '#FFFFFF',
  textoSecundario: '#AAAAAA',

  borda: '#3A3A3A',
  bordaFoco: '#FF0000',

  perigo: '#CC0000',
  perigoFundo: '#3A1717',
  sucesso: '#2EBD59',

  cartaoAmarelo: '#FBBF24',
  cartaoAmareloFundo: '#332A12',
  cartaoVermelho: '#FF0000',
};

/** fundo e texto das medalhas de 1º, 2º e 3º lugar nos rankings */
export const medalhas = {
  1: { fundo: '#E8C45A', texto: '#5A4512' },
  2: { fundo: '#CFD4D8', texto: '#4F565C' },
  3: { fundo: '#D9A078', texto: '#5A3A26' },
};

export const espacamentos = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  /** padding horizontal das telas (o `px-5` do layout original) */
  tela: 20,
};

export const raios = {
  sm: 6,
  md: 12,
  lg: 18,
  xl: 22,
  pill: 999,
};

export const tipografia = {
  display: 24,
  titulo: 20,
  subtitulo: 16,
  corpo: 14,
  legenda: 12,
  rotulo: 11,
  micro: 10,
};

/** Archivo (display) é carregada no App.js; o corpo usa a fonte do sistema. */
export const fontes = {
  display: 'Archivo_800ExtraBold',
  displayBold: 'Archivo_700Bold',
  displaySemi: 'Archivo_600SemiBold',
};
