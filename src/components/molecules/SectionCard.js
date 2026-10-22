import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Label } from '../atoms/Label';

export function SectionCard({ titulo, descricao, children, style }) {
  return (
    <View style={[styles.cartao, style]}>
      <View style={styles.cabecalho}>
        <Label variante="titulo">{titulo}</Label>
        {descricao ? (
          <Label variante="legenda" style={styles.descricao}>
            {descricao}
          </Label>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raios.xl,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.tela,
  },
  cabecalho: { marginBottom: espacamentos.md },
  descricao: { marginTop: espacamentos.xxs },
});
