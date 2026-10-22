import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios, tipografia } from '../../theme';
import { Label } from './Label';

const VARIANTES = {
  destaque: { fundo: cores.destaque, texto: cores.sobreDestaque },
  neutro: { fundo: cores.secundaria, texto: cores.sobreSecundaria },
  primario: { fundo: cores.primaria, texto: cores.sobrePrimaria },
  sobrePrimaria: {
    fundo: 'rgba(255, 255, 255, 0.18)',
    texto: cores.sobrePrimaria,
  },
};

export function Badge({ texto, variante = 'neutro', children, style }) {
  const paleta = VARIANTES[variante] ?? VARIANTES.neutro;

  return (
    <View style={[styles.base, { backgroundColor: paleta.fundo }, style]}>
      {children}
      <Label variante="micro" cor={paleta.texto}>
        {texto}
      </Label>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: espacamentos.xs,
    borderRadius: raios.pill,
    paddingHorizontal: espacamentos.sm,
    paddingVertical: espacamentos.xs,
  },
});
