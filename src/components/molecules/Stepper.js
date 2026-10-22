import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { IconButton } from '../atoms/IconButton';
import { Label } from '../atoms/Label';

export function Stepper({ rotulo, valor, aoDiminuir, aoAumentar, maximo }) {
  return (
    <View style={styles.container}>
      <IconButton
        nome="Minus"
        rotulo={`Diminuir ${rotulo}`}
        variante="transparente"
        tamanho={28}
        redondo
        aoPressionar={aoDiminuir}
        desabilitado={valor <= 0}
      />
      <Label variante="legenda" cor={cores.texto} style={styles.valor}>
        {rotulo} {valor}
      </Label>
      <IconButton
        nome="Plus"
        rotulo={`Adicionar ${rotulo}`}
        variante="primario"
        tamanho={28}
        redondo
        aoPressionar={aoAumentar}
        desabilitado={valor >= maximo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
    backgroundColor: cores.superficie,
    borderRadius: raios.pill,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.xs,
  },
  valor: { minWidth: 56, textAlign: 'center', fontWeight: '700' },
});
