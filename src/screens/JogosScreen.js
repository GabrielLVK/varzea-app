import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { CabecalhoCampeonato } from '../components/organisms/CabecalhoCampeonato';
import { ListaPartidas } from '../components/organisms/ListaPartidas';
import { NavChips } from '../components/organisms/NavChips';
import { TorcedorTemplate } from '../components/templates/TorcedorTemplate';
import { listarPartidas } from '../services/partida';

export function JogosScreen({ navigation }) {
  const [partidas, setPartidas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async (silencioso = false) => {
    if (!silencioso) setCarregando(true);
    setErro(null);
    try {
      setPartidas(await listarPartidas());
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

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    carregar(true);
  }, [carregar]);

  const handleAbrir = useCallback(
    partida =>
      navigation.navigate('PartidaDetalhe', {
        id: partida.id,
        titulo: `${partida.mandante?.nome} x ${partida.visitante?.nome}`,
      }),
    [navigation],
  );

  const cabecalho = (
    <CabecalhoCampeonato
      status="Fase de Grupos · Rodada 4"
      onAbrirAdmin={() => navigation.navigate('AdminLogin')}
      onNotificacoes={() =>
        Alert.alert('Notificações', 'Nenhum aviso novo no momento.')
      }
    />
  );

  return (
    <TorcedorTemplate cabecalho={cabecalho} chips={<NavChips />}>
      <ListaPartidas
        partidas={partidas}
        carregando={carregando}
        erro={erro}
        onTentarDeNovo={() => carregar()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onAbrir={handleAbrir}
      />
    </TorcedorTemplate>
  );
}
