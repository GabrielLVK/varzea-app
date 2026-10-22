import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';

export function LeaderCard({ icone, rotulo, children, style }) {
  return (
    <View style={[styles.cartao, style]}>
      <View style={styles.faixa}>
        <Icone nome={icone} tamanho={16} cor={cores.primaria} />
        <Label variante="rotulo" cor={cores.primaria}>
          {rotulo}
        </Label>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    overflow: 'hidden',
    backgroundColor: cores.superficie,
    borderRadius: raios.xl,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  faixa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.sm + espacamentos.xs,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
});
