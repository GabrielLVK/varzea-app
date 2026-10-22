import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { espacamentos } from '../../theme';
import { Escudo } from '../atoms/Escudo';
import { Label } from '../atoms/Label';

export const TeamBadge = memo(function TeamBadge({ time }) {
  return (
    <View style={styles.container}>
      <Escudo escudo={time?.escudo} nome={time?.nome} tamanho="gg" />
      <Label variante="corpo" numberOfLines={1}>
        {time?.nome}
      </Label>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: espacamentos.sm,
  },
});
