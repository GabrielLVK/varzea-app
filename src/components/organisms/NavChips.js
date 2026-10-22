import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Label } from '../atoms/Label';

const SECOES = [
  { rota: 'Inicio', rotulo: 'Início' },
  { rota: 'Tabela', rotulo: 'Tabela' },
  { rota: 'Jogos', rotulo: 'Jogos' },
  { rota: 'Estatisticas', rotulo: 'Estatísticas' },
];

export function NavChips() {
  const navigation = useNavigation();
  const rotaAtual = useNavigationState(estado => estado.routes[estado.index]?.name);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.faixa}
      accessibilityRole="tablist">
      {SECOES.map(secao => {
        const ativa = secao.rota === rotaAtual;
        return (
          <Pressable
            key={secao.rota}
            onPress={() => navigation.navigate(secao.rota)}
            accessibilityRole="tab"
            accessibilityState={{ selected: ativa }}
            style={({ pressed }) => [
              styles.chip,
              ativa ? styles.chipAtivo : styles.chipInativo,
              pressed && styles.pressionado,
            ]}>
            <Label
              variante="corpo"
              cor={ativa ? cores.sobrePrimaria : cores.textoSecundario}>
              {secao.rotulo}
            </Label>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  faixa: {
    gap: espacamentos.sm,
    paddingHorizontal: espacamentos.tela,
  },
  chip: {
    borderRadius: raios.pill,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.sm,
  },
  chipAtivo: { backgroundColor: cores.primaria },
  chipInativo: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  pressionado: { opacity: 0.75 },
});
