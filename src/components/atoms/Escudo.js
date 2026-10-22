import { Image, StyleSheet, View } from 'react-native';

import { imagens } from '../../constants/imagens';
import { cores, raios } from '../../theme';
import { iniciaisDoTime } from '../../utils/formato';
import { Label } from './Label';

const TAMANHOS = { pp: 28, p: 36, md: 44, g: 48, gg: 64 };

export function Escudo({ escudo, nome, tamanho = 'md', redondo = false, style }) {
  const lado = TAMANHOS[tamanho] ?? TAMANHOS.md;
  const fonte = escudo ? imagens[escudo] : null;

  return (
    <View
      style={[
        styles.moldura,
        { width: lado, height: lado },
        { borderRadius: redondo ? raios.pill : raios.lg },
        style,
      ]}>
      {fonte ? (
        <Image
          source={fonte}
          accessibilityLabel={nome ? `Escudo do ${nome}` : 'Escudo do time'}
          resizeMode="contain"
          style={{ width: lado * 0.78, height: lado * 0.78 }}
        />
      ) : (
        <Label variante="micro" cor={cores.textoSecundario}>
          {iniciaisDoTime(nome)}
        </Label>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  moldura: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: cores.secundaria,
    borderWidth: 1,
    borderColor: cores.borda,
  },
});
