export const cores = {
  fundo: '#F6FBF8',
  superficie: '#FFFFFF',

  primaria: '#1F9D6B',
  primariaEscura: '#18815A',
  sobrePrimaria: '#FBFEFC',

  secundaria: '#E9F4EF',
  sobreSecundaria: '#27513E',

  destaque: '#DCF1E4',
  sobreDestaque: '#1C5739',

  texto: '#13251D',
  textoSecundario: '#5F7A6E',

  borda: '#DDE8E3',
  bordaFoco: '#1F9D6B',

  perigo: '#D63B2A',
  perigoFundo: '#FBE9E7',
  sucesso: '#1E8E5A',

  cartaoAmarelo: '#FBBF24',
  cartaoAmareloFundo: '#FDF0CC',
  cartaoVermelho: '#D63B2A',
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
