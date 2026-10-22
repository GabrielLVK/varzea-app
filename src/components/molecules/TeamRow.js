import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { pluralizar } from '../../utils/formato';
import { Badge } from '../atoms/Badge';
import { Escudo } from '../atoms/Escudo';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';

export const TeamRow = memo(function TeamRow({ time }) {
  return (
    <View style={styles.linha}>
      <Escudo escudo={time.escudo} nome={time.nome} tamanho="g" />

      <View style={styles.textos}>
        <View style={styles.nomeLinha}>
          <Label variante="corpo" numberOfLines={1} style={styles.nome}>
            {time.nome}
          </Label>
          {time.colocacao ? <Badge texto={time.colocacao} variante="primario" /> : null}
        </View>

        <View style={styles.elenco}>
          <Icone nome="Users" tamanho={12} cor={cores.textoSecundario} />
          <Label variante="legenda">
            {pluralizar(time.totalJogadores, 'Jogador Cadastrado', 'Jogadores Cadastrados')}
          </Label>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    backgroundColor: cores.superficie,
    borderRadius: raios.xl,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.sm + espacamentos.xs,
  },
  textos: { flex: 1, gap: espacamentos.xxs },
  nomeLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
  },
  nome: { flexShrink: 1 },
  elenco: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
  },
});
