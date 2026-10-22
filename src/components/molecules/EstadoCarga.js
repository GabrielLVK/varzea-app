import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { cores, espacamentos } from '../../theme';
import { Button } from '../atoms/Button';
import { Label } from '../atoms/Label';
import { ErrorMessage } from './ErrorMessage';

export function EstadoCarga({ carregando, erro, onTentarDeNovo }) {
  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={cores.primaria} />
        <Label variante="legenda" style={styles.texto}>
          Carregando...
        </Label>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.caixa}>
        <ErrorMessage mensagem={erro} />
        {onTentarDeNovo ? (
          <Button
            title="Tentar de novo"
            onPress={onTentarDeNovo}
            style={styles.botao}
          />
        ) : null}
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: espacamentos.lg,
  },
  caixa: {
    flex: 1,
    justifyContent: 'center',
    padding: espacamentos.lg,
  },
  texto: { marginTop: espacamentos.md },
  botao: { marginTop: espacamentos.md },
});
