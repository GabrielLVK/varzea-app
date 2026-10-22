import { ScrollView, StyleSheet, View } from 'react-native';

import { Icone } from '../components/atoms/Icone';
import { Label } from '../components/atoms/Label';
import { CabecalhoCampeonato } from '../components/organisms/CabecalhoCampeonato';
import { TorcedorTemplate } from '../components/templates/TorcedorTemplate';
import { cores, espacamentos, raios } from '../theme';

const SECOES = [
  {
    id: 'campeonato',
    icone: 'Trophy',
    titulo: 'O campeonato',
    texto:
      'A Copa Várzea 2026 reúne as equipes do bairro em fase de grupos, com classificação, artilharia e súmulas publicadas pelo organizador.',
  },
  {
    id: 'torcedor',
    icone: 'Users',
    titulo: 'Visão do torcedor',
    texto:
      'Acompanhe a próxima partida, a tabela atualizada, o calendário de jogos e os líderes de estatísticas sem precisar de cadastro.',
  },
  {
    id: 'organizador',
    icone: 'KeyRound',
    titulo: 'Área do organizador',
    texto:
      'Quem organiza a copa entra pelo atalho no topo da tela para cadastrar equipes, montar elencos, agendar jogos e lançar súmulas.',
  },
  {
    id: 'dados',
    icone: 'Database',
    titulo: 'Sobre os dados',
    texto:
      'Esta versão guarda tudo no próprio aparelho. Ao trocar a camada de serviços por uma API, nenhuma tela precisa ser alterada.',
  },
];

export function SobreScreen({ navigation }) {
  return (
    <TorcedorTemplate
      cabecalho={
        <CabecalhoCampeonato
          subtitulo="Sobre o app"
          status="Copa Várzea 2026"
          onAbrirAdmin={() => navigation.navigate('AdminLogin')}
        />
      }>
      <ScrollView contentContainerStyle={styles.conteudo}>
        {SECOES.map(secao => (
          <View key={secao.id} style={styles.cartao}>
            <View style={styles.topo}>
              <View style={styles.icone}>
                <Icone nome={secao.icone} tamanho={18} cor={cores.primaria} />
              </View>
              <Label variante="subtitulo" style={styles.titulo}>
                {secao.titulo}
              </Label>
            </View>
            <Label variante="legenda" style={styles.texto}>
              {secao.texto}
            </Label>
          </View>
        ))}

        <Label variante="micro" style={styles.versao}>
          VárzeaApp · versão 1.0.0
        </Label>
      </ScrollView>
    </TorcedorTemplate>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    padding: espacamentos.tela,
    paddingBottom: espacamentos.xl,
    gap: espacamentos.md,
  },
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raios.xl,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.md,
    gap: espacamentos.sm,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
  },
  icone: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.md,
    backgroundColor: cores.destaque,
  },
  titulo: { flex: 1 },
  texto: { lineHeight: 18 },
  versao: { textAlign: 'center', marginTop: espacamentos.sm },
});
