import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { extrairChave, listaVirtualizada } from '../../constants/lista';
import { cores, espacamentos, raios } from '../../theme';
import { Escudo } from '../atoms/Escudo';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';
import { EstadoCarga } from '../molecules/EstadoCarga';
import { ListaVazia } from '../molecules/ListaVazia';
import { SearchBar } from '../molecules/SearchBar';
import { SquadRow } from '../molecules/SquadRow';
import { TeamRow } from '../molecules/TeamRow';

function destaqueDoJogador(jogador) {
  if (jogador.posicao === 'Goleiro' && jogador.golsSofridos > 0) {
    return { texto: `${jogador.golsSofridos} Gols sofridos` };
  }
  if (jogador.gols > 0) return { texto: `${jogador.gols} Gols` };
  if (jogador.assistencias > 0) return { texto: `${jogador.assistencias} Assistências` };
  if (jogador.amarelos > 0) return { texto: String(jogador.amarelos), cartao: true };
  return null;
}

export function DiretorioTimes({
  times,
  elencos,
  carregando,
  erro,
  onTentarDeNovo,
  onRefresh,
  refreshing,
}) {
  const [busca, setBusca] = useState('');
  const [expandido, setExpandido] = useState(null);

  const termo = busca.trim().toLowerCase();

  const filtrados = useMemo(() => {
    if (!termo) return times ?? [];
    return (times ?? []).filter(time => {
      if (time.nome.toLowerCase().includes(termo)) return true;
      const elenco = elencos?.[time.id] ?? [];
      return elenco.some(jogador => jogador.nome.toLowerCase().includes(termo));
    });
  }, [times, elencos, termo]);

  const alternar = useCallback(id => {
    setExpandido(atual => (atual === id ? null : id));
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      const elenco = elencos?.[item.id] ?? [];
      const aberto = expandido === item.id;

      return (
        <View style={styles.bloco}>
          <Pressable
            onPress={() => alternar(item.id)}
            accessibilityRole="button"
            accessibilityState={{ expanded: aberto }}
            accessibilityLabel={`Elenco do ${item.nome}`}>
            <TeamRow time={item} />
          </Pressable>

          <Pressable
            onPress={() => alternar(item.id)}
            accessibilityRole="button"
            accessibilityState={{ expanded: aberto }}
            style={({ pressed }) => [styles.barraElenco, pressed && styles.pressionado]}>
            <Escudo escudo={item.escudo} nome={item.nome} tamanho="p" />
            <View style={styles.textosElenco}>
              <Label variante="corpo">Elenco · {item.nome}</Label>
              <Label variante="legenda">Técnico: {item.tecnico}</Label>
            </View>
            <Icone
              nome={aberto ? 'ChevronUp' : 'ChevronDown'}
              tamanho={20}
              cor={cores.textoSecundario}
            />
          </Pressable>

          {aberto ? (
            <View style={styles.elenco}>
              {elenco.length === 0 ? (
                <ListaVazia
                  mensagem="Nenhum jogador cadastrado nesta equipe."
                  emCartao={false}
                />
              ) : (
                elenco.map(jogador => (
                  <SquadRow
                    key={jogador.id}
                    jogador={jogador}
                    destaque={destaqueDoJogador(jogador)}
                  />
                ))
              )}
            </View>
          ) : null}
        </View>
      );
    },
    [elencos, expandido, alternar],
  );

  const semDados = !times || times.length === 0;
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
      data={filtrados}
      extraData={expandido}
      keyExtractor={extrairChave}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.lista}
      ItemSeparatorComponent={() => <View style={styles.separador} />}
      ListHeaderComponent={
        <View style={styles.cabecalho}>
          <Label variante="titulo">Equipes Participantes</Label>
          <SearchBar
            valor={busca}
            aoMudar={setBusca}
            placeholder="Buscar time ou jogador..."
            rotulo="Buscar time ou jogador"
          />
        </View>
      }
      ListEmptyComponent={
        <ListaVazia
          mensagem={
            termo
              ? `Nenhum resultado para "${busca}".`
              : 'Nenhuma equipe cadastrada ainda.'
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
  cabecalho: {
    gap: espacamentos.sm + espacamentos.xs,
    marginBottom: espacamentos.md,
  },
  bloco: { gap: espacamentos.sm },
  barraElenco: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    backgroundColor: cores.superficie,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.sm + espacamentos.xs,
  },
  textosElenco: { flex: 1 },
  pressionado: { opacity: 0.8 },
  elenco: {
    backgroundColor: cores.superficie,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    overflow: 'hidden',
  },
  separador: { height: espacamentos.md },
});
