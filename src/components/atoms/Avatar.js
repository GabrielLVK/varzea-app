import { Image, StyleSheet } from 'react-native';

import { imagem } from '../../constants/imagens';
import { cores, raios } from '../../theme';

const TAMANHOS = { p: 28, md: 40, g: 48 };

export function Avatar({ foto, nome, tamanho = 'md', style }) {
  const lado = TAMANHOS[tamanho] ?? TAMANHOS.md;

  return (
    <Image
      source={imagem(foto, 'jogador')}
      accessibilityLabel={nome ? `Foto de ${nome}` : 'Foto do jogador'}
      resizeMode="cover"
      style={[styles.foto, { width: lado, height: lado }, style]}
    />
  );
}

const styles = StyleSheet.create({
  foto: {
    borderRadius: raios.pill,
    borderWidth: 2,
    borderColor: cores.destaque,
  },
});
