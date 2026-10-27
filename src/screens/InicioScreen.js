import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, RefreshControl, ScrollView, Share, StyleSheet } from 'react-native';

import { BannerCompartilhar } from '../components/organisms/BannerCompartilhar';
import { CabecalhoCampeonato } from '../components/organisms/CabecalhoCampeonato';
import { Destaques } from '../components/organisms/Destaques';
import { NavChips } from '../components/organisms/NavChips';
import { ProximaPartida } from '../components/organisms/ProximaPartida';
import { EstadoCarga } from '../components/molecules/EstadoCarga';
import { TorcedorTemplate } from '../components/templates/TorcedorTemplate';
import { listarDestaques } from '../services/estatistica';
import { proximaPartida } from '../services/partida';
import { obterPreferencias } from '../services/preferencias';
import { espacamentos } from '../theme';

export function InicioScreen({ navigation }) {
  const [partida, setPartida] = useState(null);
  const [destaques, setDestaques] = useState(null);
  const [finalizado, setFinalizado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async (silencioso = false) => {
    if (!silencioso) setCarregando(true);
    setErro(null);
    try {
      const [proxima, resumo, prefs] = await Promise.all([
        proximaPartida(),
        listarDestaques(),
        obterPreferencias(),
      ]);
      setPartida(proxima);
      setDestaques(resumo);
      setFinalizado(prefs.campeonatoFinalizado);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  function handleRefresh() {
    setRefreshing(true);
    carregar(true);
  }

  function handleAbrirPartida(item) {
    navigation.navigate('PartidaDetalhe', {
      id: item.id,
      titulo: `${item.mandante?.nome} x ${item.visitante?.nome}`,
    });
  }

  async function handleCompartilhar() {
    try {
      await Share.share({
        title: 'Copa Várzea 2026',
        message:
          'Acompanhe a Copa Várzea 2026: tabela, jogos e artilheiros direto no app.',
      });
    } catch (e) {
      Alert.alert('Compartilhar', e.message);
    }
  }

  const cabecalho = (
    <CabecalhoCampeonato
      status={
        finalizado
          ? 'Campeonato finalizado'
          : partida
            ? `Fase de Grupos · ${partida.rodada}`
            : 'Fase de Grupos'
      }
      onAbrirAdmin={() => navigation.navigate('AdminLogin')}
      onNotificacoes={() =>
        Alert.alert(
          'Notificações',
          'Os avisos do campeonato chegam aqui quando o organizador publicar uma súmula.',
        )
      }
    />
  );

  return (
    <TorcedorTemplate cabecalho={cabecalho} chips={<NavChips />}>
      {carregando || erro ? (
        <EstadoCarga
          carregando={carregando && !erro}
          erro={erro}
          onTentarDeNovo={() => carregar()}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.conteudo}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <ProximaPartida partida={partida} onAbrir={handleAbrirPartida} />
          <Destaques
            artilheiro={destaques?.artilheiro}
            melhorAtaque={destaques?.melhorAtaque}
          />
          <BannerCompartilhar onPress={handleCompartilhar} />
        </ScrollView>
      )}
    </TorcedorTemplate>
  );
}

const styles = StyleSheet.create({
  conteudo: { paddingBottom: espacamentos.lg },
});
