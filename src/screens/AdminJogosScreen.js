import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { STATUS_PARTIDA } from '../constants/campeonato';
import { Badge } from '../components/atoms/Badge';
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
import { cores, espacamentos, raios } from '../theme';
import { formatarData } from '../utils/formato';

export function AdminJogosScreen() {
  const [times, setTimes] = useState([]);
  const [partidas, setPartidas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroLista, setErroLista] = useState(null);
  const [erroForm, setErroForm] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const [filtro, setFiltro] = useState('todos');

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

  const partidasVisiveis = partidas.filter(partida => {
    if (filtro === 'agendados') {
      return partida.status === STATUS_PARTIDA.agendado;
    }
    if (filtro === 'finalizados') {
      return partida.status === STATUS_PARTIDA.finalizado;
    }
    return true;
  });

  const filtros = [
    { chave: 'todos', rotulo: 'Todos', quantidade: partidas.length },
    {
      chave: 'agendados',
      rotulo: 'Agendados',
      quantidade: partidas.filter(item => item.status === STATUS_PARTIDA.agendado).length,
    },
    {
      chave: 'finalizados',
      rotulo: 'Finalizados',
      quantidade: partidas.filter(item => item.status === STATUS_PARTIDA.finalizado).length,
    },
  ];

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
          {partidas.length > 0 ? (
            <View style={styles.filtros}>
              {filtros.map(item => {
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
                      variante="legenda"
                      cor={ativo ? cores.sobrePrimaria : cores.textoSecundario}>
                      {item.rotulo} ({item.quantidade})
                    </Label>
                  </Pressable>
                );
              })}
            </View>
          ) : null}

          {partidas.length === 0 ? (
            <ListaVazia mensagem="Nenhuma partida agendada ainda." />
          ) : partidasVisiveis.length === 0 ? (
            <ListaVazia
              mensagem={
                filtro === 'agendados'
                  ? 'Nenhuma partida agendada no momento.'
                  : 'Nenhuma partida finalizada ainda.'
              }
            />
          ) : (
            partidasVisiveis.map(partida => (
              <AdminListItem
                key={partida.id}
                aoExcluir={
                  partida.status === STATUS_PARTIDA.finalizado
                    ? undefined
                    : () => handleExcluir(partida)
                }
                rotuloExcluir={
                  partida.status === STATUS_PARTIDA.finalizado
                    ? undefined
                    : 'Excluir partida'
                }>
                <View style={styles.conteudoItem}>
                  <View style={styles.cabecalhoItem}>
                    <Label variante="rotulo">{partida.rodada}</Label>
                    <Badge
                      texto={
                        partida.status === STATUS_PARTIDA.finalizado
                          ? 'Finalizado'
                          : 'Agendado'
                      }
                      variante={
                        partida.status === STATUS_PARTIDA.finalizado
                          ? 'neutro'
                          : 'destaque'
                      }
                    />
                  </View>

                  {partida.status === STATUS_PARTIDA.finalizado ? (
                    <View style={styles.placar}>
                      <Label variante="corpo">
                        {partida.mandante?.nome}
                      </Label>
                      <Label variante="subtitulo">
                        {partida.placarMandante} x {partida.placarVisitante}
                      </Label>
                      <Label variante="corpo">
                        {partida.visitante?.nome}
                      </Label>
                    </View>
                  ) : (
                    <Label variante="corpo">
                      {partida.mandante?.nome}{' '}
                      <Label variante="corpo" cor={cores.textoSecundario}>
                        x
                      </Label>{' '}
                      {partida.visitante?.nome}
                    </Label>
                  )}

                  <View style={styles.infos}>
                    <View style={styles.info}>
                      <Icone nome="Clock" tamanho={14} cor={cores.textoSecundario} />
                      <Label variante="legenda">
                        {formatarData(partida.data)}
                        {partida.status === STATUS_PARTIDA.finalizado
                          ? ''
                          : ` · ${partida.hora}`}
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
  filtros: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
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
  conteudoItem: { gap: espacamentos.xs },
  cabecalhoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espacamentos.sm,
  },
  placar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espacamentos.sm,
  },
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
