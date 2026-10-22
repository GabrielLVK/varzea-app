import { StyleSheet, View } from 'react-native';

import { cores, espacamentos } from '../../theme';
import { Label } from '../atoms/Label';
import { Select } from '../atoms/Select';

export function SelectField({ label, mensagemErro, style, ...props }) {
  return (
    <View style={[styles.container, style]}>
      <Label variante="rotulo" style={styles.label}>
        {label}
      </Label>
      <Select erro={Boolean(mensagemErro)} titulo={label} {...props} />
      {mensagemErro ? (
        <Label variante="legenda" cor={cores.perigo} style={styles.erro}>
          {mensagemErro}
        </Label>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: espacamentos.xs },
  label: { marginBottom: espacamentos.xxs },
  erro: { marginTop: espacamentos.xxs },
});
