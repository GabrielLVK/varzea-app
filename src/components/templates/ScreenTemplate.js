import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cores, espacamentos } from '../../theme';

export function ScreenTemplate({ children, rodape }) {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled">
        {children}
        {rodape ? <View style={styles.rodape}>{rodape}</View> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.fundo },
  conteudo: {
    flexGrow: 1,
    padding: espacamentos.tela,
  },
  rodape: { marginTop: espacamentos.lg },
});
