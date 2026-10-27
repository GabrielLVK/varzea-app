import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Icone } from '../components/atoms/Icone';
import { Label } from '../components/atoms/Label';
import { AdminListItem } from '../components/molecules/AdminListItem';
import { EstadoCarga } from '../components/molecules/EstadoCarga';
import { ListaVazia } from '../components/molecules/ListaVazia';
import { SectionCard } from '../components/molecules/SectionCard';
import { SuccessMessage } from '../components/molecules/SuccessMessage';
import { FormPartida } from '../components/organisms/FormPartida';
import { ScreenTemplate } from '../components/templates/ScreenTemplate';
import { avisarPartidaAgendada } from '../services/avisos';
import { criarPartida, listarPartidas, removerPartida } from '../services/partida';
import { listarTimes } from '../services/time';
import { cores, espacamentos } from '../theme';
import { formatarData } from '../utils/formato';

export function AdminJogosScreen() {
  const [times, setTimes] = useState([]);
  const [partidas, setPartidas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroLista, setErroLista] = useState(null);
  const [erroForm, setErroForm] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErroLista(null);
    try {
      const [listaTimes, listaPartidas] = await Promise.all([
        listarTimes(),
        listarPartidas(),
      ]);
      setTimes(listaTimes);
      setPartidas(listaPartidas);
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

  async function handleSubmit(dados) {
    setSalvando(true);
    setErroForm(null);
    try {
      await criarPartida(dados);
      const mandante = times.find(time => time.id === dados.mandanteId)?.nome;
      const visitante = times.find(time => time.id === dados.visitanteId)?.nome;
      setSucesso(`Partida ${mandante} x ${visitante} agendada!`);
      await avisarPartidaAgendada(`${mandante} x ${visitante}`, dados.data, dados.hora);
      await carregar();
    } catch (e) {
      setErroForm(e.message);
    } finally {
      setSalvando(false);
    }
  }

  function handleExcluir(partida) {
    Alert.alert(
      'Excluir partida',
      `Remover ${partida.mandante?.nome} x ${partida.visitante?.nome} da agenda?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await removerPartida(partida.id);
              setSucesso('Partida removida da agenda.');
              await carregar();
            } catch (e) {
              Alert.alert('Erro', e.message);
            }
          },
        },
      ],
    );
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
        titulo="Agendamento de Jogos"
        descricao="Defina os confrontos, datas e locais das partidas.">
        {sucesso ? (
          <View style={styles.sucesso}>
            <SuccessMessage mensagem={sucesso} />
          </View>
        ) : null}

        {times.length < 2 ? (
          <ListaVazia mensagem="Cadastre pelo menos duas equipes para agendar uma partida." />
        ) : (
          <FormPartida
            times={times}
            onSubmit={handleSubmit}
            carregando={salvando}
            erro={erroForm}
          />
        )}

        <View style={styles.lista}>
          {partidas.length === 0 ? (
            <ListaVazia mensagem="Nenhuma partida agendada ainda." />
          ) : (
            partidas.map(partida => (
              <AdminListItem
                key={partida.id}
                aoExcluir={() => handleExcluir(partida)}
                rotuloExcluir="Excluir partida">
                <View style={styles.conteudoItem}>
                  <Label variante="rotulo">{partida.rodada}</Label>

                  <Label variante="corpo">
                    {partida.mandante?.nome}{' '}
                    <Label variante="corpo" cor={cores.textoSecundario}>
                      x
                    </Label>{' '}
                    {partida.visitante?.nome}
                  </Label>

                  <View style={styles.infos}>
                    <View style={styles.info}>
                      <Icone nome="Clock" tamanho={14} cor={cores.textoSecundario} />
                      <Label variante="legenda">
                        {formatarData(partida.data)} · {partida.hora}
                      </Label>
                    </View>
                    <View style={styles.info}>
                      <Icone nome="MapPin" tamanho={14} cor={cores.textoSecundario} />
                      <Label variante="legenda">{partida.local}</Label>
                    </View>
                  </View>
                </View>
              </AdminListItem>
            ))
          )}
        </View>
      </SectionCard>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  sucesso: { marginBottom: espacamentos.md },
  lista: { marginTop: espacamentos.tela, gap: espacamentos.sm + espacamentos.xxs },
  conteudoItem: { gap: espacamentos.xs },
  infos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espacamentos.md,
    marginTop: espacamentos.xxs,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
  },
});
