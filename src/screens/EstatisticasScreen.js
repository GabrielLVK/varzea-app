import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { CabecalhoCampeonato } from '../components/organisms/CabecalhoCampeonato';
import { LideresEstatisticas } from '../components/organisms/LideresEstatisticas';
import { NavChips } from '../components/organisms/NavChips';
import { TorcedorTemplate } from '../components/templates/TorcedorTemplate';
import { listarLideres } from '../services/estatistica';

export function EstatisticasScreen({ navigation }) {
  const [lideres, setLideres] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      setLideres(await listarLideres());
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  const cabecalho = (
    <CabecalhoCampeonato
      status="Estatísticas Gerais"
      onAbrirAdmin={() => navigation.navigate('AdminLogin')}
      onNotificacoes={() =>
        Alert.alert('Notificações', 'Nenhum aviso novo no momento.')
      }
    />
  );

  return (
    <TorcedorTemplate cabecalho={cabecalho} chips={<NavChips />}>
      <LideresEstatisticas
        lideres={lideres}
        carregando={carregando}
        erro={erro}
        onTentarDeNovo={carregar}
      />
    </TorcedorTemplate>
  );
}
