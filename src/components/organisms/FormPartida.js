import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import {
  erroVisivel,
  primeiroErro,
  validarData,
  validarHora,
  validarNome,
  validarSelecao,
  validarTimesDiferentes,
} from '../../utils/validacao';
import { Button } from '../atoms/Button';
import { ErrorMessage } from '../molecules/ErrorMessage';
import { FormField } from '../molecules/FormField';
import { SelectField } from '../molecules/SelectField';

export function FormPartida({ times, onSubmit, carregando = false, erro = null }) {
  const [mandanteId, setMandanteId] = useState('');
  const [visitanteId, setVisitanteId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [local, setLocal] = useState('');
  const [rodada, setRodada] = useState('');
  const [tocados, setTocados] = useState({});

  const horaRef = useRef(null);
  const localRef = useRef(null);
  const rodadaRef = useRef(null);

  const erros = {
    mandanteId: validarSelecao(mandanteId, { rotulo: 'o time mandante' }),
    visitanteId:
      validarSelecao(visitanteId, { rotulo: 'o time visitante' }) ??
      validarTimesDiferentes(mandanteId, visitanteId),
    data: validarData(data),
    hora: validarHora(hora),
    local: validarNome(local, { rotulo: 'local' }),
    rodada: validarNome(rodada, { rotulo: 'rodada' }),
  };

  function tocar(campo) {
    setTocados(atual => ({ ...atual, [campo]: true }));
  }

  function enviar() {
    setTocados({
      mandanteId: true,
      visitanteId: true,
      data: true,
      hora: true,
      local: true,
      rodada: true,
    });
    if (primeiroErro(erros) || carregando) return;

    onSubmit({ mandanteId, visitanteId, data, hora, local: local.trim(), rodada: rodada.trim() });
    setMandanteId('');
    setVisitanteId('');
    setData('');
    setHora('');
    setLocal('');
    setRodada('');
    setTocados({});
  }

  const opcoes = times.map(time => ({ valor: time.id, rotulo: time.nome }));

  return (
    <View style={styles.form}>
      <ErrorMessage mensagem={erro} />

      <View style={styles.dupla}>
        <SelectField
          label="Time Mandante"
          valor={mandanteId}
          opcoes={opcoes}
          aoSelecionar={setMandanteId}
          onBlur={() => tocar('mandanteId')}
          placeholder="Selecione"
          mensagemErro={erroVisivel(tocados, erros, 'mandanteId')}
          style={styles.campo}
        />

        <SelectField
          label="Time Visitante"
          valor={visitanteId}
          opcoes={opcoes}
          aoSelecionar={setVisitanteId}
          onBlur={() => tocar('visitanteId')}
          placeholder="Selecione"
          mensagemErro={erroVisivel(tocados, erros, 'visitanteId')}
          style={styles.campo}
        />
      </View>

      <View style={styles.dupla}>
        <FormField
          label="Data"
          placeholder="AAAA-MM-DD"
          value={data}
          onChangeText={setData}
          onBlur={() => tocar('data')}
          mensagemErro={erroVisivel(tocados, erros, 'data')}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => horaRef.current?.focus()}
          style={styles.campo}
        />

        <FormField
          ref={horaRef}
          label="Horário"
          placeholder="HH:MM"
          value={hora}
          onChangeText={setHora}
          onBlur={() => tocar('hora')}
          mensagemErro={erroVisivel(tocados, erros, 'hora')}
          keyboardType="numbers-and-punctuation"
          maxLength={5}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => localRef.current?.focus()}
          style={styles.campo}
        />
      </View>

      <FormField
        ref={localRef}
        label="Local / Campo"
        placeholder="Ex.: Campo do Zé"
        value={local}
        onChangeText={setLocal}
        onBlur={() => tocar('local')}
        mensagemErro={erroVisivel(tocados, erros, 'local')}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => rodadaRef.current?.focus()}
      />

      <FormField
        ref={rodadaRef}
        label="Rodada"
        placeholder="Ex.: Rodada 5"
        value={rodada}
        onChangeText={setRodada}
        onBlur={() => tocar('rodada')}
        mensagemErro={erroVisivel(tocados, erros, 'rodada')}
        returnKeyType="go"
        onSubmitEditing={enviar}
      />

      <Button
        title="Salvar Partida"
        icone="CalendarPlus"
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
  dupla: {
    flexDirection: 'row',
    gap: espacamentos.sm + espacamentos.xs,
  },
  campo: { flex: 1 },
});
