import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import {
  erroVisivel,
  primeiroErro,
  validarLogin,
  validarSenha,
} from '../../utils/validacao';
import { Button } from '../atoms/Button';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';
import { ErrorMessage } from '../molecules/ErrorMessage';
import { FormField } from '../molecules/FormField';

export function LoginAdminForm({ onSubmit, carregando = false, erro = null }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [tocados, setTocados] = useState({});
  const senhaRef = useRef(null);

  const erros = {
    login: validarLogin(login),
    senha: validarSenha(senha),
  };

  function tocar(campo) {
    setTocados(atual => ({ ...atual, [campo]: true }));
  }

  function enviar() {
    setTocados({ login: true, senha: true });
    if (primeiroErro(erros) || carregando) return;
    onSubmit(login.trim(), senha);
  }

  return (
    <View style={styles.container}>
      <View style={styles.aviso}>
        <Icone nome="KeyRound" tamanho={20} cor={cores.sobreDestaque} />
        <Label variante="corpo" cor={cores.sobreDestaque} style={styles.avisoTexto}>
          Entre com suas credenciais para gerenciar o campeonato.
        </Label>
      </View>

      <ErrorMessage mensagem={erro} />

      <FormField
        label="E-mail ou Usuário"
        icone="User"
        placeholder="organizador@varzea.com"
        value={login}
        onChangeText={setLogin}
        onBlur={() => tocar('login')}
        mensagemErro={erroVisivel(tocados, erros, 'login')}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        autoComplete="username"
        textContentType="username"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => senhaRef.current?.focus()}
      />

      <FormField
        ref={senhaRef}
        label="Senha"
        icone="Lock"
        placeholder="••••••••"
        value={senha}
        onChangeText={setSenha}
        onBlur={() => tocar('senha')}
        mensagemErro={erroVisivel(tocados, erros, 'senha')}
        secureTextEntry
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={enviar}
      />

      <Button
        title="Entrar no Painel"
        onPress={enviar}
        carregando={carregando}
        desabilitado={carregando}
        style={styles.botao}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: espacamentos.md },
  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
    backgroundColor: cores.destaque,
    borderRadius: raios.lg,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.sm + espacamentos.xs,
  },
  avisoTexto: { flex: 1, fontWeight: '500' },
  botao: { marginTop: espacamentos.xs },
});
