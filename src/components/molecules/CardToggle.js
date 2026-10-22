import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { IconButton } from '../atoms/IconButton';
import { Label } from '../atoms/Label';

export function CardToggle({ rotulo, cor, valor, maximo, aoDiminuir, aoAumentar }) {
  return (
    <View style={[styles.container, valor > 0 && styles.ativo]}>
      <IconButton
        nome="Minus"
        rotulo={`Remover cartão ${rotulo}`}
        variante="transparente"
        tamanho={28}
        redondo
        aoPressionar={aoDiminuir}
        desabilitado={valor <= 0}
      />

      <View style={styles.valor}>
        <View
          style={[styles.cartao, { backgroundColor: cor }]}
          accessibilityElementsHidden
        />
        <Label variante="legenda" cor={cores.texto} style={styles.numero}>
          {valor}
        </Label>
      </View>

      <IconButton
        nome="Plus"
        rotulo={`Adicionar cartão ${rotulo}`}
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
  ativo: { backgroundColor: cores.destaque },
  valor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
    minWidth: 36,
    justifyContent: 'center',
  },
  cartao: { width: 10, height: 14, borderRadius: 2 },
  numero: { fontWeight: '700' },
});
