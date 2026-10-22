import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Avatar } from '../atoms/Avatar';
import { Badge } from '../atoms/Badge';
import { Label } from '../atoms/Label';

export const SquadRow = memo(function SquadRow({ jogador, destaque }) {
  return (
    <View style={styles.linha}>
      <View style={styles.numero}>
        <Label variante="micro" cor={cores.sobreSecundaria}>
          {jogador.numero}
        </Label>
      </View>

      <Avatar foto={jogador.foto} nome={jogador.nome} />

      <View style={styles.textos}>
        <Label variante="corpo" numberOfLines={1}>
          {jogador.nome}
        </Label>
        <Label variante="legenda" numberOfLines={1}>
          {jogador.posicao}
        </Label>
      </View>

      {destaque ? (
        <Badge texto={destaque.texto} variante="destaque">
          {destaque.cartao ? (
            <View
              style={[styles.cartao, { backgroundColor: cores.cartaoAmarelo }]}
              accessibilityElementsHidden
            />
          ) : null}
        </Badge>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.sm + espacamentos.xs,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  numero: {
    width: 28,
    height: 28,
    borderRadius: raios.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.secundaria,
  },
  textos: { flex: 1 },
  cartao: { width: 10, height: 14, borderRadius: 2 },
});
