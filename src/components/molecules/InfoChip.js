import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';

export function InfoChip({ icone, texto, style }) {
  return (
    <View style={[styles.chip, style]}>
      <Icone nome={icone} tamanho={16} cor={cores.primaria} />
      <Label variante="legenda" cor={cores.sobreSecundaria} numberOfLines={1} style={styles.texto}>
        {texto}
      </Label>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
    backgroundColor: cores.secundaria,
    borderRadius: raios.lg,
    paddingHorizontal: espacamentos.sm + espacamentos.xs,
    paddingVertical: espacamentos.sm + espacamentos.xxs,
  },
  texto: { flex: 1, fontWeight: '600' },
});
