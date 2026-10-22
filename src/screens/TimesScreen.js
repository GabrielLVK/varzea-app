import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { CabecalhoCampeonato } from '../components/organisms/CabecalhoCampeonato';
import { DiretorioTimes } from '../components/organisms/DiretorioTimes';
import { TorcedorTemplate } from '../components/templates/TorcedorTemplate';
import { listarElenco } from '../services/jogador';
import { listarTimes } from '../services/time';

export function TimesScreen({ navigation }) {
  const [times, setTimes] = useState([]);
  const [elencos, setElencos] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async (silencioso = false) => {
    if (!silencioso) setCarregando(true);
    setErro(null);
    try {
      const lista = await listarTimes();
      const elencosPorTime = await Promise.all(
        lista.map(time => listarElenco(time.id)),
      );

      setTimes(lista);
      setElencos(
        Object.fromEntries(
          lista.map((time, indice) => [time.id, elencosPorTime[indice]]),
        ),
      );
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

  const cabecalho = (
    <CabecalhoCampeonato
      status="Fase de Grupos · Grupo A"
      onAbrirAdmin={() => navigation.navigate('AdminLogin')}
      onNotificacoes={() =>
        Alert.alert('Notificações', 'Nenhum aviso novo no momento.')
      }
    />
  );

  return (
    <TorcedorTemplate cabecalho={cabecalho}>
      <DiretorioTimes
        times={times}
        elencos={elencos}
        carregando={carregando}
        erro={erro}
        onTentarDeNovo={() => carregar()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </TorcedorTemplate>
  );
}
