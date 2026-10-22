import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { cores, espacamentos, raios, tipografia } from '../../theme';
import { Icone } from './Icone';

const CORES_TEXTO = {
  primario: cores.sobrePrimaria,
  secundario: cores.sobreSecundaria,
  perigo: cores.sobrePrimaria,
  fantasma: cores.primaria,
};

export function Button({
  title,
  onPress,
  variante = 'primario',
  tamanho = 'md',
  icone,
  iconeDireita,
  carregando = false,
  desabilitado = false,
  style,
}) {
  const inativo = desabilitado || carregando;
  const corTexto = CORES_TEXTO[variante] ?? CORES_TEXTO.primario;

  return (
    <Pressable
      onPress={onPress}
      disabled={inativo}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: inativo, busy: carregando }}
      style={({ pressed }) => [
        styles.base,
        styles[tamanho],
        styles[variante],
        pressed && !inativo && styles.pressionado,
        inativo && styles.inativo,
        style,
      ]}>
      {carregando ? (
        <ActivityIndicator color={corTexto} />
      ) : (
        <View style={styles.conteudo}>
          {icone ? <Icone nome={icone} tamanho={16} cor={corTexto} /> : null}
          <Text style={[styles.texto, styles[`texto_${tamanho}`], { color: corTexto }]}>
            {title}
          </Text>
          {iconeDireita ? <Icone nome={iconeDireita} tamanho={16} cor={corTexto} /> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: raios.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
  },

  md: { minHeight: 48, paddingHorizontal: espacamentos.md },
  sm: { minHeight: 40, paddingHorizontal: espacamentos.md },
  pill: {
    minHeight: 36,
    paddingHorizontal: espacamentos.md,
    borderRadius: raios.pill,
  },

  primario: { backgroundColor: cores.primaria },
  secundario: { backgroundColor: cores.secundaria },
  perigo: { backgroundColor: cores.perigo },
  fantasma: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: cores.primaria,
  },

  pressionado: { opacity: 0.8 },
  inativo: { opacity: 0.5 },

  texto: { fontWeight: '700' },
  texto_md: { fontSize: tipografia.corpo },
  texto_sm: { fontSize: tipografia.corpo },
  texto_pill: { fontSize: tipografia.corpo },
});
