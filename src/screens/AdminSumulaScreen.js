import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { STATUS_PARTIDA } from '../constants/campeonato';
import { EstadoCarga } from '../components/molecules/EstadoCarga';
import { ListaVazia } from '../components/molecules/ListaVazia';
import { SectionCard } from '../components/molecules/SectionCard';
import { SuccessMessage } from '../components/molecules/SuccessMessage';
import { FormSumula } from '../components/organisms/FormSumula';
import { ScreenTemplate } from '../components/templates/ScreenTemplate';
import { listarElenco } from '../services/jogador';
import { listarPartidas, publicarSumula } from '../services/partida';
import { espacamentos } from '../theme';

export function AdminSumulaScreen() {
  const [partidas, setPartidas] = useState([]);
  const [elencos, setElencos] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroLista, setErroLista] = useState(null);
  const [erroForm, setErroForm] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErroLista(null);
    try {
      const lista = await listarPartidas();
      setPartidas(lista.filter(item => item.status !== STATUS_PARTIDA.finalizado));
    } catch (e) {
      setErroLista(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  /** carrega os dois elencos só quando a partida é escolhida */
  const handleSelecionarPartida = useCallback(
    async id => {
      const partida = partidas.find(item => item.id === id);
      if (!partida) return;

      const [casa, fora] = await Promise.all([
        listarElenco(partida.mandanteId),
        listarElenco(partida.visitanteId),
      ]);

      setElencos({
        [partida.mandanteId]: casa,
        [partida.visitanteId]: fora,
      });
    },
    [partidas],
  );

  async function handleSubmit({ partidaId, placarMandante, placarVisitante, eventos }) {
    setSalvando(true);
    setErroForm(null);
    try {
      const partida = partidas.find(item => item.id === partidaId);
      await publicarSumula(partidaId, { placarMandante, placarVisitante, eventos });

      setSucesso(
        `Súmula publicada: ${partida?.mandante?.nome} ${placarMandante} x ${placarVisitante} ${partida?.visitante?.nome}.`,
      );
      setElencos({});
      await carregar();
    } catch (e) {
      setErroForm(e.message);
    } finally {
      setSalvando(false);
    }
  }

  if (carregando || erroLista) {
    return (
      <EstadoCarga
        carregando={carregando && !erroLista}
        erro={erroLista}
        onTentarDeNovo={carregar}
      />
    );
  }

  return (
    <ScreenTemplate>
      <SectionCard
        titulo="Lançamento de Súmula e Resultados"
        descricao="Registre o placar e os eventos de cada partida.">
        {sucesso ? (
          <View style={styles.sucesso}>
            <SuccessMessage mensagem={sucesso} />
          </View>
        ) : null}

        {partidas.length === 0 ? (
          <ListaVazia mensagem="Nenhuma partida aguardando súmula. Agende um jogo na seção Jogos." />
        ) : (
          <FormSumula
            partidas={partidas}
            elencos={elencos}
            onSelecionarPartida={handleSelecionarPartida}
            onSubmit={handleSubmit}
            carregando={salvando}
            erro={erroForm}
          />
        )}
      </SectionCard>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  sucesso: { marginBottom: espacamentos.md },
});
