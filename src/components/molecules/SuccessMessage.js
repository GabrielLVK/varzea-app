import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';

export function SuccessMessage({ mensagem }) {
  if (!mensagem) {
    return null;
  }

  return (
    <View style={styles.container} accessibilityLiveRegion="polite">
      <Icone nome="CircleCheck" tamanho={16} cor={cores.sobreDestaque} />
      <Label variante="corpo" cor={cores.sobreDestaque} style={styles.texto}>
        {mensagem}
      </Label>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
    backgroundColor: cores.destaque,
    borderRadius: raios.lg,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.sm + espacamentos.xs,
  },
  texto: { flex: 1 },
});
