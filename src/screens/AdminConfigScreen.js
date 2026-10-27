import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, View } from 'react-native';

import { Button } from '../components/atoms/Button';
import { Label } from '../components/atoms/Label';
import { ErrorMessage } from '../components/molecules/ErrorMessage';
import { SectionCard } from '../components/molecules/SectionCard';
import { ScreenTemplate } from '../components/templates/ScreenTemplate';
import {
  cancelarAvisos,
  configurarNotificacoes,
  enviarAvisoLocal,
  pedirPermissaoNotificacao,
} from '../services/nativos';
import { obterPreferencias, salvarPreferencias } from '../services/preferencias';
import { cores, espacamentos, raios } from '../theme';

export function AdminConfigScreen() {
  const [prefs, setPrefs] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    configurarNotificacoes();
    obterPreferencias().then(setPrefs);
  }, []);

  async function mudar(id, valor) {
    setErro(null);
    try {
      // ligar notificacao exige permissao; se o usuario negar, o switch volta
      if ((id === 'notificacoes' || id === 'lembreteProximaPartida') && valor) {
        const ok = await pedirPermissaoNotificacao();
        if (!ok) {
          setErro('Permissão de notificação negada. Libere em Ajustes do sistema.');
          setPrefs(await salvarPreferencias({ [id]: false }));
          return;
        }
      }

      // desligar o aviso geral cancela o que ja estava agendado
      if (id === 'notificacoes' && !valor) {
        await cancelarAvisos();
      }

      setPrefs(await salvarPreferencias({ [id]: valor }));
    } catch (e) {
      setErro(e.message);
      setPrefs(await obterPreferencias());
    }
  }

  async function handleTeste() {
    setErro(null);
    setOcupado(true);
    try {
      await enviarAvisoLocal({
        titulo: 'Copa Várzea 2026',
        corpo: 'Avisos do campeonato estão ligados neste aparelho.',
      });
      Alert.alert('Aviso agendado', 'Em instantes ele aparece na bandeja do sistema.');
    } catch (e) {
      setErro(e.message);
    } finally {
      setOcupado(false);
    }
  }

  const opcoes = [
    {
      id: 'notificacoes',
      titulo: 'Avisos do campeonato',
      descricao: 'Aviso local quando uma súmula é publicada. Não é push remoto.',
    },
    {
      id: 'lembreteProximaPartida',
      titulo: 'Lembrete da próxima partida',
      descricao: 'Agenda um aviso quando um jogo novo entra na agenda.',
      dependeDe: 'notificacoes',
    },
    {
      id: 'campeonatoFinalizado',
      titulo: 'Campeonato finalizado',
      descricao: 'Troca o status no topo da tela Início para "Campeonato finalizado".',
    },
  ];

  return (
    <ScreenTemplate>
      <SectionCard
        titulo="Configurações"
        descricao="Preferências gravadas neste aparelho — ficam depois do logout.">
        <ErrorMessage mensagem={erro} />

        <View style={styles.cartao}>
          {opcoes.map(opcao => {
            // sub-opcao fica travada quando o aviso geral esta desligado
            const travada = opcao.dependeDe ? !prefs?.[opcao.dependeDe] : false;
            return (
              <View key={opcao.id} style={styles.linha}>
                <View style={[styles.textos, travada && styles.travada]}>
                  <Label variante="corpo">{opcao.titulo}</Label>
                  <Label variante="legenda">{opcao.descricao}</Label>
                </View>
                <Switch
                  value={(prefs?.[opcao.id] ?? false) && !travada}
                  onValueChange={valor => mudar(opcao.id, valor)}
                  disabled={!prefs || travada}
                  trackColor={{ true: cores.primaria }}
                />
              </View>
            );
          })}
        </View>

        {prefs?.notificacoes ? (
          <Button
            title="Testar aviso local"
            icone="Bell"
            onPress={handleTeste}
            carregando={ocupado}
            style={styles.botao}
          />
        ) : null}

        <Label variante="legenda" style={styles.nota}>
          O token da sessão fica no cofre do aparelho e sai no logout. Estas
          preferências ficam no armazenamento comum e sobrevivem a ele.
        </Label>
      </SectionCard>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
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
    gap: espacamentos.md,
    paddingVertical: espacamentos.md,
  },
  textos: { flex: 1, gap: espacamentos.xxs },
  travada: { opacity: 0.45 },
  botao: { marginTop: espacamentos.md },
  nota: { marginTop: espacamentos.md, lineHeight: 18 },
});
