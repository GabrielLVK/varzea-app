import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import {
  erroVisivel,
  primeiroErro,
  validarNome,
  validarNumeroCamisa,
  validarSelecao,
} from '../../utils/validacao';
import { Button } from '../atoms/Button';
import { ErrorMessage } from '../molecules/ErrorMessage';
import { FormField } from '../molecules/FormField';
import { SelectField } from '../molecules/SelectField';
import { SeletorImagem } from '../molecules/SeletorImagem';

export function FormJogador({ times, onSubmit, carregando = false, erro = null }) {
  const [timeId, setTimeId] = useState('');
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [foto, setFoto] = useState(null);
  const [tocados, setTocados] = useState({});
  const numeroRef = useRef(null);

  const erros = {
    timeId: validarSelecao(timeId, { rotulo: 'a equipe' }),
    nome: validarNome(nome, { rotulo: 'nome do jogador' }),
    numero: validarNumeroCamisa(numero),
  };

  function tocar(campo) {
    setTocados(atual => ({ ...atual, [campo]: true }));
  }

  function enviar() {
    setTocados({ timeId: true, nome: true, numero: true });
    if (primeiroErro(erros) || carregando) return;

    onSubmit({ timeId, nome: nome.trim(), numero, foto });
    setNome('');
    setFoto(null);
    setNumero('');
    setTocados({});
  }

  return (
    <View style={styles.form}>
      <ErrorMessage mensagem={erro} />

      <SeletorImagem
        rotulo="Foto do Jogador"
        valor={foto}
        nome={nome}
        aoEscolher={setFoto}
        formato="redondo"
        desabilitado={carregando}
      />

      <SelectField
        label="Equipe"
        valor={timeId}
        opcoes={times.map(time => ({ valor: time.id, rotulo: time.nome }))}
        aoSelecionar={setTimeId}
        onBlur={() => tocar('timeId')}
        placeholder="Selecione a equipe"
        mensagemErro={erroVisivel(tocados, erros, 'timeId')}
      />

      <FormField
        label="Nome do Jogador"
        placeholder="Ex.: Joãozinho"
        value={nome}
        onChangeText={setNome}
        onBlur={() => tocar('nome')}
        mensagemErro={erroVisivel(tocados, erros, 'nome')}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => numeroRef.current?.focus()}
      />

      <FormField
        ref={numeroRef}
        label="Número"
        placeholder="10"
        value={numero}
        onChangeText={setNumero}
        onBlur={() => tocar('numero')}
        mensagemErro={erroVisivel(tocados, erros, 'numero')}
        keyboardType="number-pad"
        maxLength={2}
      />

      <Button
        title="Cadastrar Jogador"
        icone="UserPlus"
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
});
