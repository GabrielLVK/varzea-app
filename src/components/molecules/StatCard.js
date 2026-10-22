import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Avatar } from '../atoms/Avatar';
import { Escudo } from '../atoms/Escudo';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';

export function StatCard({
  icone,
  rotulo,
  nome,
  detalhe,
  foto,
  escudo,
  valor,
  unidade,
}) {
  return (
    <View style={styles.cartao}>
      <View style={styles.topo}>
        <Icone nome={icone} tamanho={16} cor={cores.primaria} />
        <Label variante="rotulo" cor={cores.primaria} numberOfLines={1} style={styles.rotulo}>
          {rotulo}
        </Label>
      </View>

      <View style={styles.identificacao}>
        {foto ? (
          <Avatar foto={foto} nome={nome} tamanho="g" />
        ) : (
          <Escudo escudo={escudo} nome={nome} tamanho="g" redondo />
        )}
        <View style={styles.textos}>
          <Label variante="corpo" numberOfLines={1}>
            {nome}
          </Label>
          <Label variante="legenda" numberOfLines={1}>
            {detalhe}
          </Label>
        </View>
      </View>

      <Label variante="display" style={styles.valor}>
        {valor}{' '}
        <Label variante="corpo" cor={cores.textoSecundario}>
          {unidade}
        </Label>
      </Label>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    flex: 1,
    backgroundColor: cores.superficie,
    borderRadius: raios.xl,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.md,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
  },
  rotulo: { flex: 1 },
  identificacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    marginTop: espacamentos.sm + espacamentos.xs,
  },
  textos: { flex: 1 },
  valor: { marginTop: espacamentos.sm + espacamentos.xs },
});
