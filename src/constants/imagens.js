/**
 * No React Native o `require` precisa ser estático — não dá para montar o
 * caminho em tempo de execução. Por isso os dados guardam só uma chave e
 * quem desenha resolve a imagem por aqui.
 */

export const imagens = {
  copa: require('../../assets/crest-copa.png'),
  jogador: require('../../assets/placeholder-user.jpg'),
  generica: require('../../assets/placeholder.jpg'),
};

/**
 * Escudos que o organizador pode escolher ao cadastrar uma equipe.
 * Vazio: os escudos originais pesavam ~2 MB e foram removidos; os times
 * aparecem com as iniciais. Para voltar a ter escudos, coloque os arquivos
 * em `assets/`, adicione o `require` acima e liste as chaves aqui.
 */
export const ESCUDOS_DISPONIVEIS = [];

export function imagem(chave, padrao = 'generica') {
  return imagens[chave] ?? imagens[padrao];
}
