import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Label } from '../components/atoms/Label';
import { AdminListItem } from '../components/molecules/AdminListItem';
import { EstadoCarga } from '../components/molecules/EstadoCarga';
import { ListaVazia } from '../components/molecules/ListaVazia';
import { SectionCard } from '../components/molecules/SectionCard';
import { SuccessMessage } from '../components/molecules/SuccessMessage';
import { FormJogador } from '../components/organisms/FormJogador';
import { ScreenTemplate } from '../components/templates/ScreenTemplate';
import { criarJogador, listarJogadores, removerJogador } from '../services/jogador';
import { listarTimes } from '../services/time';
import { cores, espacamentos, raios } from '../theme';

export function AdminJogadoresScreen() {
  const [times, setTimes] = useState([]);
  const [jogadores, setJogadores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroLista, setErroLista] = useState(null);
  const [erroForm, setErroForm] = useState(null);
  const [sucesso, setSucesso] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErroLista(null);
    try {
      const [listaTimes, listaJogadores] = await Promise.all([
        listarTimes(),
        listarJogadores(),
      ]);
      setTimes(listaTimes);
      setJogadores(listaJogadores);
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
      await criarJogador(dados);
      const time = times.find(item => item.id === dados.timeId);
      setSucesso(`Jogador "${dados.nome}" adicionado ao ${time?.nome ?? 'time'}!`);
      await carregar();
    } catch (e) {
      setErroForm(e.message);
    } finally {
      setSalvando(false);
    }
  }

  function handleExcluir(jogador) {
    Alert.alert('Excluir jogador', `Remover "${jogador.nome}" do elenco?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await removerJogador(jogador.id);
            setSucesso(`Jogador "${jogador.nome}" removido.`);
            await carregar();
          } catch (e) {
            Alert.alert('Erro', e.message);
          }
        },
      },
    ]);
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

  const agrupados = times
    .map(time => ({
      time,
      elenco: jogadores
        .filter(jogador => jogador.timeId === time.id)
        .sort((a, b) => a.numero - b.numero),
    }))
    .filter(grupo => grupo.elenco.length > 0);

  return (
    <ScreenTemplate>
      <SectionCard
        titulo="Cadastro de Jogadores"
        descricao="Monte o elenco de cada equipe do campeonato.">
        {sucesso ? (
          <View style={styles.sucesso}>
            <SuccessMessage mensagem={sucesso} />
          </View>
        ) : null}

        {times.length === 0 ? (
          <ListaVazia mensagem="Cadastre uma equipe antes de adicionar jogadores." />
        ) : (
          <FormJogador
            times={times}
            onSubmit={handleSubmit}
            carregando={salvando}
            erro={erroForm}
          />
        )}

        <View style={styles.grupos}>
          {agrupados.length === 0 ? (
            <ListaVazia mensagem="Nenhum jogador cadastrado ainda." />
          ) : (
            agrupados.map(({ time, elenco }) => (
              <View key={time.id} style={styles.grupo}>
                <Label variante="rotulo">{time.nome}</Label>

                {elenco.map(jogador => (
                  <AdminListItem
                    key={jogador.id}
                    aoExcluir={() => handleExcluir(jogador)}
                    rotuloExcluir={`Excluir ${jogador.nome}`}>
                    <View style={styles.conteudoItem}>
                      <View style={styles.numero}>
                        <Label variante="micro" cor={cores.texto}>
                          {jogador.numero}
                        </Label>
                      </View>
                      <View style={styles.textos}>
                        <Label variante="corpo" numberOfLines={1}>
                          {jogador.nome}
                        </Label>
                        <Label variante="legenda">{jogador.posicao}</Label>
                      </View>
                    </View>
                  </AdminListItem>
                ))}
              </View>
            ))
          )}
        </View>
      </SectionCard>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  sucesso: { marginBottom: espacamentos.md },
  grupos: { marginTop: espacamentos.tela, gap: espacamentos.md },
  grupo: { gap: espacamentos.sm },
  conteudoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
  },
  numero: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.pill,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  textos: { flex: 1 },
});
