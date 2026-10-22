import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Label } from '../atoms/Label';

function Selo({ cor, fundo, valor, descricao }) {
  return (
    <View
      style={[styles.selo, { backgroundColor: fundo }]}
      accessibilityLabel={`${valor} ${descricao}`}>
      <View style={[styles.cartao, { backgroundColor: cor }]} accessibilityElementsHidden />
      <Label variante="legenda" cor={cores.texto} style={styles.valor}>
        {valor}
      </Label>
    </View>
  );
}

export function CartoesResumo({ amarelos = 0, vermelhos = 0 }) {
  return (
    <View style={styles.container}>
      <Selo
        cor={cores.cartaoAmarelo}
        fundo={cores.cartaoAmareloFundo}
        valor={amarelos}
        descricao="cartões amarelos"
      />
      <Selo
        cor={cores.cartaoVermelho}
        fundo={cores.perigoFundo}
        valor={vermelhos}
        descricao="cartões vermelhos"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
  },
  selo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
    borderRadius: raios.pill,
    paddingHorizontal: espacamentos.sm,
    paddingVertical: espacamentos.xs,
  },
  cartao: { width: 10, height: 14, borderRadius: 2 },
  valor: { fontWeight: '700' },
});
