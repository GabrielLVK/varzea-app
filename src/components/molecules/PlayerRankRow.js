import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, medalhas, raios } from '../../theme';
import { Avatar } from '../atoms/Avatar';
import { Label } from '../atoms/Label';

export const PlayerRankRow = memo(function PlayerRankRow({ posicao, jogador, valor }) {
  const medalha = medalhas[posicao];

  return (
    <View style={styles.linha}>
      <View
        style={[
          styles.medalha,
          { backgroundColor: medalha?.fundo ?? cores.secundaria },
        ]}>
        <Label variante="micro" cor={medalha?.texto ?? cores.textoSecundario}>
          {posicao}
        </Label>
      </View>

      <Avatar foto={jogador.foto} nome={jogador.nome} />

      <View style={styles.textos}>
        <Label variante="corpo" numberOfLines={1}>
          {jogador.nome}
        </Label>
        <Label variante="legenda" numberOfLines={1}>
          {jogador.time}
        </Label>
      </View>

      <Label variante="numero">{valor}</Label>
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
  medalha: {
    width: 24,
    height: 24,
    borderRadius: raios.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: { flex: 1 },
});
