import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { FILTROS_PARTIDA } from '../../constants/campeonato';
import { extrairChave, listaVirtualizada } from '../../constants/lista';
import { cores, espacamentos, raios } from '../../theme';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';
import { EstadoCarga } from '../molecules/EstadoCarga';
import { ListaVazia } from '../molecules/ListaVazia';
import { MatchCard } from '../molecules/MatchCard';

export function ListaPartidas({
  partidas,
  carregando,
  erro,
  onTentarDeNovo,
  onRefresh,
  refreshing,
  onAbrir,
}) {
  const [filtro, setFiltro] = useState(FILTROS_PARTIDA[0].chave);

  const statusAtual = FILTROS_PARTIDA.find(item => item.chave === filtro)?.status;
  const visiveis = (partidas ?? []).filter(partida => partida.status === statusAtual);

  const renderItem = useCallback(
    ({ item }) => (
      <MatchCard
        partida={item}
        mandante={item.mandante}
        visitante={item.visitante}
        onAbrir={onAbrir}
      />
    ),
    [onAbrir],
  );

  const semDados = !partidas || partidas.length === 0;
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
      data={visiveis}
      extraData={filtro}
      keyExtractor={extrairChave}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.lista}
      ItemSeparatorComponent={() => <View style={styles.separador} />}
      ListHeaderComponent={
        <View style={styles.cabecalho}>
          <View style={styles.filtros}>
            {FILTROS_PARTIDA.map(item => {
              const ativo = item.chave === filtro;
              return (
                <Pressable
                  key={item.chave}
                  onPress={() => setFiltro(item.chave)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: ativo }}
                  style={({ pressed }) => [
                    styles.filtro,
                    ativo && styles.filtroAtivo,
                    pressed && styles.pressionado,
                  ]}>
                  <Label
                    variante="corpo"
                    cor={ativo ? cores.sobrePrimaria : cores.textoSecundario}>
                    {item.rotulo}
                  </Label>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.tituloSecao}>
            <Icone nome="CalendarClock" tamanho={16} cor={cores.textoSecundario} />
            <Label variante="rotulo">
              {filtro === 'encerrados' ? 'Jogos Encerrados' : 'Próximos Jogos'}
            </Label>
          </View>
        </View>
      }
      ListEmptyComponent={
        <ListaVazia
          mensagem={
            filtro === 'encerrados'
              ? 'Nenhuma partida encerrada ainda.'
              : 'Nenhuma partida agendada no momento.'
          }
        />
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
  cabecalho: { marginBottom: espacamentos.sm + espacamentos.xs },
  filtros: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
    backgroundColor: cores.secundaria,
    borderRadius: raios.pill,
    padding: espacamentos.xs,
  },
  filtro: {
    flex: 1,
    alignItems: 'center',
    borderRadius: raios.pill,
    paddingVertical: espacamentos.sm,
  },
  filtroAtivo: { backgroundColor: cores.primaria },
  pressionado: { opacity: 0.75 },
  tituloSecao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
    marginTop: espacamentos.md,
  },
  separador: { height: espacamentos.md },
});
