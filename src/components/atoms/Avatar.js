import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';

import { fonteImagem } from '../../constants/imagens';
import { cores, raios } from '../../theme';

const TAMANHOS = { p: 28, md: 40, g: 48, gg: 96 };

export function Avatar({ foto, nome, tamanho = 'md', style }) {
  /* foto tirada no aparelho pode sumir com a limpeza de cache */
  const [falhou, setFalhou] = useState(false);

  const lado = TAMANHOS[tamanho] ?? TAMANHOS.md;

  return (
    <Image
      source={fonteImagem(falhou ? null : foto, 'jogador')}
      accessibilityLabel={nome ? `Foto de ${nome}` : 'Foto do jogador'}
      onError={() => setFalhou(true)}
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
