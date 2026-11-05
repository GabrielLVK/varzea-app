import { Pressable, StyleSheet, View } from 'react-native';

import { Icone } from '../components/atoms/Icone';
import { Label } from '../components/atoms/Label';
import { SectionCard } from '../components/molecules/SectionCard';
import { ScreenTemplate } from '../components/templates/ScreenTemplate';
import { ADMIN_OPCOES } from '../navigation/adminOpcoes';
import { cores, espacamentos, raios } from '../theme';

export function AdminDashboardScreen({ navigation }) {
  return (
    <ScreenTemplate>
      <SectionCard
        titulo="Dashboard"
        descricao="Acesse rapidamente as áreas do painel do organizador.">
        <View style={styles.lista}>
          {ADMIN_OPCOES.map(opcao => (
            <Pressable
              key={opcao.rota}
              accessibilityRole="button"
              accessibilityLabel={`Abrir ${opcao.titulo}`}
              onPress={() => navigation.navigate(opcao.rota)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressionado]}>
              <View style={styles.icone}>
                <Icone nome={opcao.icone} tamanho={22} cor={cores.primaria} />
              </View>
              <View style={styles.textos}>
                <Label variante="subtitulo">{opcao.titulo}</Label>
                <Label variante="legenda">{opcao.descricao}</Label>
              </View>
              <Icone nome="ChevronRight" tamanho={20} cor={cores.textoSecundario} />
            </Pressable>
          ))}
        </View>
      </SectionCard>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  lista: { gap: espacamentos.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    minHeight: 76,
    padding: espacamentos.sm + espacamentos.xs,
    borderRadius: raios.lg,
    backgroundColor: cores.secundaria,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  cardPressionado: { opacity: 0.75 },
  icone: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.md,
    backgroundColor: cores.fundo,
  },
  textos: { flex: 1, gap: espacamentos.xxs },
});
