import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cores, espacamentos } from '../../theme';

export function CenteredTemplate({ cabecalho, children, rodape }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {cabecalho}
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled">
          {children}
          {rodape ? <View style={styles.rodape}>{rodape}</View> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.fundo },
  flex: { flex: 1 },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: espacamentos.tela,
  },
  rodape: { marginTop: espacamentos.lg },
});
