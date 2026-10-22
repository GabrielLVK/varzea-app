import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { cores, espacamentos } from '../../theme';
import { Escudo } from '../atoms/Escudo';
import { Label } from '../atoms/Label';

export const TeamLine = memo(function TeamLine({ time, placar, vencedor = false }) {
  return (
    <View style={styles.linha}>
      <Escudo escudo={time?.escudo} nome={time?.nome} tamanho="p" redondo />
      <Label variante="corpo" numberOfLines={1} style={styles.nome}>
        {time?.nome}
      </Label>
      {typeof placar === 'number' ? (
        <Label
          variante="numero"
          cor={vencedor ? cores.primaria : cores.textoSecundario}>
          {placar}
        </Label>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
  },
  nome: { flex: 1 },
});
