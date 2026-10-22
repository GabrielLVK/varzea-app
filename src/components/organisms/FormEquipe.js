import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ESCUDOS_DISPONIVEIS } from '../../constants/imagens';
import { cores, espacamentos, raios } from '../../theme';
import { erroVisivel, primeiroErro, validarNome } from '../../utils/validacao';
import { Button } from '../atoms/Button';
import { Escudo } from '../atoms/Escudo';
import { IconButton } from '../atoms/IconButton';
import { Label } from '../atoms/Label';
import { ErrorMessage } from '../molecules/ErrorMessage';
import { FormField } from '../molecules/FormField';

export function FormEquipe({
  equipe,
  onSubmit,
  onCancelar,
  carregando = false,
  erro = null,
}) {
  const [nome, setNome] = useState('');
  const [tecnico, setTecnico] = useState('');
  const [escudo, setEscudo] = useState(null);
  const [tocados, setTocados] = useState({});
  const tecnicoRef = useRef(null);

  const editando = Boolean(equipe);

  useEffect(() => {
    setNome(equipe?.nome ?? '');
    setTecnico(equipe?.tecnico ?? '');
    setEscudo(equipe?.escudo ?? null);
    setTocados({});
  }, [equipe]);

  const erros = {
    nome: validarNome(nome, { rotulo: 'nome do time' }),
    tecnico: validarNome(tecnico, { rotulo: 'nome do técnico' }),
  };

  function tocar(campo) {
    setTocados(atual => ({ ...atual, [campo]: true }));
  }

  function enviar() {
    setTocados({ nome: true, tecnico: true });
    if (primeiroErro(erros) || carregando) return;
    onSubmit({ nome: nome.trim(), tecnico: tecnico.trim(), escudo });
  }

  return (
    <View style={styles.form}>
      <View style={styles.topo}>
        <Label variante="subtitulo">{editando ? 'Editar Equipe' : 'Nova Equipe'}</Label>
        <IconButton
          nome="X"
          rotulo="Fechar formulário"
          variante="transparente"
          tamanho={28}
          aoPressionar={onCancelar}
        />
      </View>

      <ErrorMessage mensagem={erro} />

      {ESCUDOS_DISPONIVEIS.length > 0 ? (
        <View style={styles.escudos}>
          <Label variante="rotulo">Escudo do Time</Label>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.escudosFaixa}>
            {ESCUDOS_DISPONIVEIS.map(chave => {
              const ativo = escudo === chave;
              return (
                <Pressable
                  key={chave}
                  onPress={() => setEscudo(chave)}
                  accessibilityRole="button"
                  accessibilityLabel={`Usar escudo ${chave}`}
                  accessibilityState={{ selected: ativo }}
                  style={[styles.opcaoEscudo, ativo && styles.opcaoAtiva]}>
                  <Escudo escudo={chave} tamanho="md" />
                </Pressable>
              );
            })}

            <Pressable
              onPress={() => setEscudo(null)}
              accessibilityRole="button"
              accessibilityLabel="Sem escudo"
              accessibilityState={{ selected: escudo === null }}
              style={[styles.opcaoEscudo, escudo === null && styles.opcaoAtiva]}>
              <Escudo escudo={null} nome={nome || '--'} tamanho="md" />
            </Pressable>
          </ScrollView>
        </View>
      ) : null}

      <FormField
        label="Nome do Time"
        placeholder="Ex.: Unidos da Várzea"
        value={nome}
        onChangeText={setNome}
        onBlur={() => tocar('nome')}
        mensagemErro={erroVisivel(tocados, erros, 'nome')}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => tecnicoRef.current?.focus()}
      />

      <FormField
        ref={tecnicoRef}
        label="Nome do Técnico"
        placeholder="Ex.: Zé Carlos"
        value={tecnico}
        onChangeText={setTecnico}
        onBlur={() => tocar('tecnico')}
        mensagemErro={erroVisivel(tocados, erros, 'tecnico')}
        returnKeyType="go"
        onSubmitEditing={enviar}
      />

      <Button
        title={editando ? 'Salvar Alterações' : 'Cadastrar Equipe'}
        onPress={enviar}
        carregando={carregando}
        desabilitado={carregando}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: espacamentos.md,
    backgroundColor: cores.secundaria,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.md,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  escudos: { gap: espacamentos.sm },
  escudosFaixa: { gap: espacamentos.sm, paddingVertical: espacamentos.xxs },
  opcaoEscudo: {
    padding: espacamentos.xs,
    borderRadius: raios.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  opcaoAtiva: { borderColor: cores.primaria },
});
