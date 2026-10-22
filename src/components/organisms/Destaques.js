import { StyleSheet, View } from 'react-native';

import { espacamentos } from '../../theme';
import { Label } from '../atoms/Label';
import { ListaVazia } from '../molecules/ListaVazia';
import { StatCard } from '../molecules/StatCard';

export function Destaques({ artilheiro, melhorAtaque }) {
  const semDados = !artilheiro && !melhorAtaque;

  return (
    <View style={styles.secao}>
      <Label variante="subtitulo">Destaques</Label>

      {semDados ? (
        <ListaVazia
          mensagem="Os destaques aparecem assim que a primeira súmula for publicada."
          style={styles.vazio}
        />
      ) : (
        <View style={styles.grade}>
          {artilheiro ? (
            <StatCard
              icone="Flame"
              rotulo="Top Artilheiro"
              nome={artilheiro.nome}
              detalhe={artilheiro.time}
              foto={artilheiro.foto}
              valor={artilheiro.valor}
              unidade="Gols"
            />
          ) : null}

          {melhorAtaque ? (
            <StatCard
              icone="Target"
              rotulo="Melhor Ataque"
              nome={melhorAtaque.nome}
              detalhe="Ataque"
              escudo={melhorAtaque.escudo}
              valor={melhorAtaque.valor}
              unidade="Gols"
            />
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  secao: {
    paddingHorizontal: espacamentos.tela,
    paddingTop: espacamentos.lg,
    gap: espacamentos.sm + espacamentos.xs,
  },
  grade: {
    flexDirection: 'row',
    gap: espacamentos.sm + espacamentos.xs,
  },
  vazio: { marginTop: espacamentos.xs },
});
