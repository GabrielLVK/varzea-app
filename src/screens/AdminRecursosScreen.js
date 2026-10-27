import { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Button } from '../components/atoms/Button';
import { Label } from '../components/atoms/Label';
import { ErrorMessage } from '../components/molecules/ErrorMessage';
import { MarcadorLocal } from '../components/molecules/MarcadorLocal';
import { SectionCard } from '../components/molecules/SectionCard';
import { SeletorImagem } from '../components/molecules/SeletorImagem';
import { ScreenTemplate } from '../components/templates/ScreenTemplate';
import {
  configurarNotificacoes,
  enviarAvisoLocal,
  statusPermissoes,
} from '../services/nativos';
import {
  obterPerfilLocal,
  salvarFotoLocal,
  salvarUltimoCampo,
} from '../services/perfilLocal';
import { cores, espacamentos, raios } from '../theme';

const ROTULOS = {
  granted: 'concedida',
  denied: 'negada',
  undetermined: 'ainda não pedida',
  indisponivel: 'indisponível',
};

const CORES_STATUS = {
  granted: cores.primaria,
  denied: cores.perigo,
};

function LinhaPermissao({ nome, status }) {
  return (
    <View style={styles.linha}>
      <Label variante="corpo">{nome}</Label>
      <Label variante="legenda" cor={CORES_STATUS[status] ?? cores.textoSecundario}>
        {ROTULOS[status] ?? status ?? '—'}
      </Label>
    </View>
  );
}

export function AdminRecursosScreen() {
  const [permissoes, setPermissoes] = useState(null);
  const [fotoUri, setFotoUri] = useState(null);
  const [campo, setCampo] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState(null);

  const atualizarPermissoes = useCallback(async () => {
    try {
      setPermissoes(await statusPermissoes());
    } catch {
      setPermissoes(null);
    }
  }, []);

  useEffect(() => {
    configurarNotificacoes();
    atualizarPermissoes();
    obterPerfilLocal().then(local => {
      setFotoUri(local.fotoUri);
      setCampo(local.ultimoCampo);
    });
  }, [atualizarPermissoes]);

  // SeletorImagem e MarcadorLocal chamam sem await; o catch evita rejeicao solta
  async function handleFoto(uri) {
    try {
      setFotoUri(uri);
      await salvarFotoLocal(uri);
      await atualizarPermissoes();
    } catch (e) {
      setErro(e.message);
    }
  }

  async function handleCampo(coords) {
    try {
      setCampo(coords);
      await salvarUltimoCampo(coords);
      await atualizarPermissoes();
    } catch (e) {
      setErro(e.message);
    }
  }

  async function handleAviso() {
    setErro(null);
    setOcupado(true);
    try {
      await enviarAvisoLocal({
        titulo: 'Copa Várzea 2026',
        corpo: 'Aviso local de teste. Não há servidor de push aqui.',
      });
      Alert.alert('Aviso agendado', 'O sistema deve mostrar a notificação em instantes.');
      await atualizarPermissoes();
    } catch (e) {
      setErro(e.message);
    } finally {
      setOcupado(false);
    }
  }

  return (
    <ScreenTemplate>
      <View style={styles.pilha}>
        <ErrorMessage mensagem={erro} />

        <SectionCard
          titulo="Permissões"
          descricao="O sistema pergunta na hora do uso, não na abertura do app.">
          <View style={styles.cartao}>
            <LinhaPermissao nome="Câmera" status={permissoes?.camera} />
            <LinhaPermissao nome="Galeria" status={permissoes?.galeria} />
            <LinhaPermissao nome="Localização" status={permissoes?.localizacao} />
            <LinhaPermissao nome="Notificações" status={permissoes?.notificacoes} />
          </View>
          <Button
            title="Atualizar status"
            variante="secundario"
            tamanho="sm"
            onPress={atualizarPermissoes}
            style={styles.botao}
          />
        </SectionCard>

        <SectionCard
          titulo="Câmera e galeria"
          descricao="A imagem fica só neste aparelho; nada é enviado para servidor.">
          <SeletorImagem
            valor={fotoUri}
            nome="Organizador"
            aoEscolher={handleFoto}
            formato="redondo"
          />
        </SectionCard>

        <SectionCard
          titulo="Geolocalização"
          descricao="Só enquanto o app está em uso — nunca em segundo plano.">
          <MarcadorLocal coordenadas={campo} aoMarcar={handleCampo} />
        </SectionCard>

        <SectionCard
          titulo="Notificação local"
          descricao="O próprio aparelho agenda o aviso. Não é push remoto.">
          <Button
            title="Enviar aviso de teste"
            icone="Bell"
            onPress={handleAviso}
            carregando={ocupado}
          />
        </SectionCard>
      </View>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  pilha: { gap: espacamentos.md },
  cartao: {
    backgroundColor: cores.secundaria,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: espacamentos.md,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: espacamentos.sm + espacamentos.xs,
  },
  botao: { marginTop: espacamentos.md },
});
