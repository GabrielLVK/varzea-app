import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { COLUNAS_TABELA, LEGENDA_TABELA } from '../../constants/campeonato';
import { extrairChave, listaVirtualizada } from '../../constants/lista';
import { cores, espacamentos, raios } from '../../theme';
import { Label } from '../atoms/Label';
import { EstadoCarga } from '../molecules/EstadoCarga';
import { ListaVazia } from '../molecules/ListaVazia';
import { StandingRow } from '../molecules/StandingRow';

function CabecalhoColunas() {
  return (
    <View style={styles.colunas}>
      <Label variante="rotulo" style={styles.posicao}>
        Pos
      </Label>
      <Label variante="rotulo" style={styles.timeColuna}>
        Time
      </Label>
      {COLUNAS_TABELA.map(coluna => (
        <Label key={coluna.chave} variante="rotulo" style={styles.celula}>
          {coluna.rotulo}
        </Label>
      ))}
    </View>
  );
}

export function TabelaClassificacao({
  linhas,
  carregando,
  erro,
  onTentarDeNovo,
  onRefresh,
  refreshing,
}) {
  const total = linhas?.length ?? 0;
  const renderItem = useCallback(
    ({ item, index }) => <StandingRow linha={item} ultima={index === total - 1} />,
    [total],
  );

  const semDados = total === 0;
  if ((carregando && semDados) || (erro && semDados)) {
    return (
      <EstadoCarga
        carregando={carregando && !erro}
        erro={erro}
        onTentarDeNovo={onTentarDeNovo}
      />
    );
  }

  return (
    <FlatList
      data={linhas}
      keyExtractor={extrairChave}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.lista}
      ListHeaderComponent={
        <View>
          <View style={styles.titulo}>
            <Label variante="subtitulo">Classificação</Label>
            <View style={styles.legendaVaga}>
              <View style={styles.bolinha} />
              <Label variante="micro">Classificado</Label>
            </View>
          </View>
          <View style={styles.cartaoTopo}>
            <CabecalhoColunas />
          </View>
        </View>
      }
      ListEmptyComponent={
        <ListaVazia mensagem="Nenhuma equipe na classificação ainda." />
      }
      ListFooterComponent={
        semDados ? null : (
          <Label variante="micro" style={styles.legenda}>
            {LEGENDA_TABELA}
          </Label>
        )
      }
      {...listaVirtualizada}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingHorizontal: espacamentos.tela,
    paddingTop: espacamentos.tela,
    paddingBottom: espacamentos.xl,
  },
  titulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: espacamentos.sm + espacamentos.xs,
  },
  legendaVaga: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
  },
  bolinha: {
    width: 10,
    height: 10,
    borderRadius: raios.pill,
    backgroundColor: cores.primaria,
  },
  cartaoTopo: {
    backgroundColor: cores.superficie,
    borderTopLeftRadius: raios.xl,
    borderTopRightRadius: raios.xl,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: cores.borda,
    overflow: 'hidden',
  },
  colunas: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.sm + espacamentos.xs,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  posicao: { width: 20, textAlign: 'center' },
  timeColuna: { flex: 1 },
  celula: { width: 24, textAlign: 'center' },
  legenda: {
    marginTop: espacamentos.sm + espacamentos.xs,
    paddingHorizontal: espacamentos.xs,
    lineHeight: 16,
  },
});
