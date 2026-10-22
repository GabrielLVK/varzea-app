import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { CabecalhoCampeonato } from '../components/organisms/CabecalhoCampeonato';
import { NavChips } from '../components/organisms/NavChips';
import { TabelaClassificacao } from '../components/organisms/TabelaClassificacao';
import { TorcedorTemplate } from '../components/templates/TorcedorTemplate';
import { listarClassificacao } from '../services/estatistica';

export function TabelaScreen({ navigation }) {
  const [linhas, setLinhas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async (silencioso = false) => {
    if (!silencioso) setCarregando(true);
    setErro(null);
    try {
      setLinhas(await listarClassificacao());
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
    <TorcedorTemplate cabecalho={cabecalho} chips={<NavChips />}>
      <TabelaClassificacao
        linhas={linhas}
        carregando={carregando}
        erro={erro}
        onTentarDeNovo={() => carregar()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </TorcedorTemplate>
  );
}
