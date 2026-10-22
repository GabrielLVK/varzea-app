import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Button } from '../components/atoms/Button';
import { Label } from '../components/atoms/Label';
import { AdminListItem } from '../components/molecules/AdminListItem';
import { EstadoCarga } from '../components/molecules/EstadoCarga';
import { ListaVazia } from '../components/molecules/ListaVazia';
import { SectionCard } from '../components/molecules/SectionCard';
import { SuccessMessage } from '../components/molecules/SuccessMessage';
import { FormEquipe } from '../components/organisms/FormEquipe';
import { Escudo } from '../components/atoms/Escudo';
import { ScreenTemplate } from '../components/templates/ScreenTemplate';
import { atualizarTime, criarTime, listarTimes, removerTime } from '../services/time';
import { espacamentos } from '../theme';
import { pluralizar } from '../utils/formato';

export function AdminEquipesScreen() {
  const [times, setTimes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroLista, setErroLista] = useState(null);
  const [erroForm, setErroForm] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const [formAberto, setFormAberto] = useState(false);
  const [editando, setEditando] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErroLista(null);
    try {
      setTimes(await listarTimes());
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

  function abrirCriacao() {
    setEditando(null);
    setErroForm(null);
    setSucesso(null);
    setFormAberto(true);
  }

  function abrirEdicao(time) {
    setEditando(time);
    setErroForm(null);
    setSucesso(null);
    setFormAberto(true);
  }

  function fechar() {
    setFormAberto(false);
    setEditando(null);
    setErroForm(null);
  }

  async function handleSubmit(dados) {
    setSalvando(true);
    setErroForm(null);
    try {
      if (editando) {
        await atualizarTime(editando.id, dados);
        setSucesso(`Equipe "${dados.nome}" atualizada com sucesso!`);
      } else {
        await criarTime(dados);
        setSucesso(`Equipe "${dados.nome}" cadastrada com sucesso!`);
      }
      fechar();
      await carregar();
    } catch (e) {
      setErroForm(e.message);
    } finally {
      setSalvando(false);
    }
  }

  function handleExcluir(time) {
    Alert.alert(
      'Excluir equipe',
      `Excluir "${time.nome}"? O elenco e as partidas dessa equipe também serão removidos.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await removerTime(time.id);
              setSucesso(`Equipe "${time.nome}" excluída.`);
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
        titulo="Cadastro de Equipes"
        descricao="Gerencie os times participantes da Copa Várzea 2026.">
        {sucesso ? (
          <View style={styles.sucesso}>
            <SuccessMessage mensagem={sucesso} />
          </View>
        ) : null}

        {formAberto ? (
          <FormEquipe
            equipe={editando}
            onSubmit={handleSubmit}
            onCancelar={fechar}
            carregando={salvando}
            erro={erroForm}
          />
        ) : (
          <Button
            title="Cadastrar Nova Equipe"
            icone="Plus"
            tamanho="sm"
            onPress={abrirCriacao}
          />
        )}

        <View style={styles.lista}>
          {times.length === 0 ? (
            <ListaVazia mensagem="Nenhuma equipe cadastrada ainda." />
          ) : (
            times.map(time => (
              <AdminListItem
                key={time.id}
                aoEditar={() => abrirEdicao(time)}
                aoExcluir={() => handleExcluir(time)}
                rotuloEditar={`Editar ${time.nome}`}
                rotuloExcluir={`Excluir ${time.nome}`}>
                <View style={styles.conteudoItem}>
                  <Escudo escudo={time.escudo} nome={time.nome} tamanho="md" />
                  <View style={styles.textos}>
                    <Label variante="corpo" numberOfLines={1}>
                      {time.nome}
                    </Label>
                    <Label variante="legenda" numberOfLines={1}>
                      Técnico: {time.tecnico} ·{' '}
                      {pluralizar(time.totalJogadores, 'jogador', 'jogadores')}
                    </Label>
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
  conteudoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
  },
  textos: { flex: 1 },
});
