import { StyleSheet, View } from 'react-native';

import { espacamentos } from '../../theme';
import { Avatar } from '../atoms/Avatar';
import { Escudo } from '../atoms/Escudo';
import { Label } from '../atoms/Label';

export function HighlightRow({ nome, detalhe, escudo, foto, children }) {
  return (
    <View style={styles.linha}>
      {foto ? (
        <Avatar foto={foto} nome={nome} tamanho="g" />
      ) : (
        <Escudo escudo={escudo} nome={nome} tamanho="md" redondo />
      )}

      <View style={styles.textos}>
        <Label variante="corpo" numberOfLines={1}>
          {nome}
        </Label>
        <Label variante="legenda" numberOfLines={1}>
          {detalhe}
        </Label>
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.md,
  },
  textos: { flex: 1 },
});
