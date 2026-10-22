import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cores, espacamentos } from '../../theme';

export function TorcedorTemplate({ cabecalho, chips, children }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {cabecalho}
      {chips ? <View style={styles.chips}>{chips}</View> : null}
      <View style={styles.corpo}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.fundo },
  chips: { paddingTop: espacamentos.tela },
  corpo: { flex: 1 },
});
