import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { cores, espacamentos } from '../../theme';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';

export const FormField = forwardRef(function FormField(
  { label, erro = false, mensagemErro, style, ...props },
  ref,
) {
  const temErro = erro || Boolean(mensagemErro);

  return (
    <View style={[styles.container, style]}>
      <Label variante="rotulo" style={styles.label}>
        {label}
      </Label>
      <Input ref={ref} erro={temErro} accessibilityLabel={label} {...props} />
      {mensagemErro ? (
        <Label variante="legenda" cor={cores.perigo} style={styles.erro}>
          {mensagemErro}
        </Label>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { gap: espacamentos.xs },
  label: { marginBottom: espacamentos.xxs },
  erro: { marginTop: espacamentos.xxs },
});
