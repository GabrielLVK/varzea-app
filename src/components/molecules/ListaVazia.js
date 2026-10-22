import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Label } from '../atoms/Label';

export function ListaVazia({ mensagem, emCartao = true, style }) {
  if (!emCartao) {
    return (
      <Label variante="legenda" style={[styles.solto, style]}>
        {mensagem}
      </Label>
    );
  }

  return (
    <View style={[styles.cartao, style]}>
      <Label variante="legenda" style={styles.texto}>
        {mensagem}
      </Label>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.md,
  },
  texto: { textAlign: 'center' },
  solto: { textAlign: 'center', marginTop: espacamentos.lg },
});
