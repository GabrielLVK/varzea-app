/**
 * No React Native o `require` precisa ser estatico — nao da para montar o
 * caminho em tempo de execucao. Por isso os dados guardam so uma chave e
 * quem desenha resolve a imagem por aqui.
 *
 * Desde que o app passou a usar camera e galeria, o mesmo campo pode conter
 * uma URI (`file://...`) em vez de uma chave. `fonteImagem` trata os dois.
 */

export const imagens = {
  copa: require('../../assets/crest-copa.png'),
  jogador: require('../../assets/placeholder-user.jpg'),
  generica: require('../../assets/placeholder.jpg'),
};

export function ehUri(valor) {
  return (
    typeof valor === 'string' &&
    /^(file:|content:|https?:|ph:|assets-library:|data:)/.test(valor)
  );
}

/**
 * Devolve algo que o `source` de <Image> entende:
 * um modulo do require, ou { uri } para foto tirada no aparelho.
 * Null quando nao ha imagem — quem chama decide o que desenhar no lugar.
 */
export function fonteImagem(valor, padrao = null) {
  if (ehUri(valor)) {
    return { uri: valor };
  }
  if (valor && imagens[valor]) {
    return imagens[valor];
  }
  return padrao ? imagens[padrao] : null;
}
