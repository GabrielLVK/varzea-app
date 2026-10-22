import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { imagens } from '../constants/imagens';
import { Button } from '../components/atoms/Button';
import { Label } from '../components/atoms/Label';
import { LoginAdminForm } from '../components/organisms/LoginAdminForm';
import { CenteredTemplate } from '../components/templates/CenteredTemplate';
import { login, sessaoAtiva } from '../services/auth';
import { cores, espacamentos, raios } from '../theme';

export function AdminLoginScreen({ navigation }) {
  const [verificandoSessao, setVerificandoSessao] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function verificarSessao() {
      const temSessao = await sessaoAtiva();
      if (!ativo) return;
      if (temSessao) {
        navigation.replace('AdminArea');
      } else {
        setVerificandoSessao(false);
      }
    }

    verificarSessao();
    return () => {
      ativo = false;
    };
  }, [navigation]);

  async function handleLogin(usuario, senha) {
    setCarregando(true);
    setErro(null);
    try {
      await login(usuario, senha);
      navigation.replace('AdminArea');
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  if (verificandoSessao) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={cores.primaria} />
        <Label variante="legenda" style={styles.splashTexto}>
          Verificando sessão...
        </Label>
      </View>
    );
  }

  return (
    <CenteredTemplate
      cabecalho={
        <SafeAreaView edges={['top']} style={styles.cabecalho}>
          <View style={styles.identidade}>
            <View style={styles.moldura}>
              <Image
                source={imagens.copa}
                accessibilityLabel="Escudo da Copa Várzea 2026"
                resizeMode="contain"
                style={styles.escudo}
              />
            </View>
            <View style={styles.textos}>
              <Label variante="titulo" cor={cores.sobrePrimaria}>
                Acesso do Organizador
              </Label>
              <Label variante="legenda" cor="rgba(255, 255, 255, 0.72)">
                VárzeaApp
              </Label>
            </View>
          </View>
        </SafeAreaView>
      }
      rodape={
        <Button
          title="Voltar para a Visão do Torcedor"
          variante="fantasma"
          icone="ArrowLeft"
          onPress={() => navigation.navigate('Torcedor')}
        />
      }>
      <LoginAdminForm onSubmit={handleLogin} carregando={carregando} erro={erro} />
    </CenteredTemplate>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },
  splashTexto: { marginTop: espacamentos.md },

  cabecalho: {
    backgroundColor: cores.primaria,
    paddingHorizontal: espacamentos.tela,
    paddingBottom: espacamentos.lg,
    borderBottomLeftRadius: raios.xl,
    borderBottomRightRadius: raios.xl,
  },
  identidade: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    paddingTop: espacamentos.md,
  },
  moldura: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
  },
  escudo: { width: 40, height: 40 },
  textos: { flex: 1 },
});
