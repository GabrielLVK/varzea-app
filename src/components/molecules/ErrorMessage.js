import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';

export function ErrorMessage({ mensagem }) {
  if (!mensagem) {
    return null;
  }

  return (
    <View style={styles.container} accessibilityRole="alert">
      <Icone nome="TriangleAlert" tamanho={16} cor={cores.perigo} />
      <Label variante="corpo" cor={cores.perigo} style={styles.texto}>
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
    backgroundColor: cores.perigoFundo,
    borderLeftWidth: 4,
    borderLeftColor: cores.perigo,
    borderRadius: raios.md,
    padding: espacamentos.md,
  },
  texto: { flex: 1 },
});
