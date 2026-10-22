import { Pressable, StyleSheet } from 'react-native';

import { cores, raios } from '../../theme';
import { Icone } from './Icone';

const VARIANTES = {
  neutro: { fundo: cores.superficie, cor: cores.textoSecundario, borda: cores.borda },
  primario: { fundo: cores.primaria, cor: cores.sobrePrimaria, borda: cores.primaria },
  secundario: { fundo: cores.secundaria, cor: cores.sobreSecundaria, borda: cores.borda },
  perigo: { fundo: cores.perigoFundo, cor: cores.perigo, borda: cores.borda },
  sobrePrimaria: {
    fundo: 'rgba(255, 255, 255, 0.18)',
    cor: cores.sobrePrimaria,
    borda: 'rgba(255, 255, 255, 0.24)',
  },
  transparente: { fundo: 'transparent', cor: cores.textoSecundario, borda: 'transparent' },
};

export function IconButton({
  nome,
  aoPressionar,
  rotulo,
  variante = 'neutro',
  tamanho = 36,
  redondo = false,
  desabilitado = false,
  style,
}) {
  const paleta = VARIANTES[variante] ?? VARIANTES.neutro;
  const inativo = desabilitado || !aoPressionar;

  return (
    <Pressable
      onPress={aoPressionar}
      disabled={inativo}
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      accessibilityState={{ disabled: inativo }}
      style={({ pressed }) => [
        styles.base,
        {
          width: tamanho,
          height: tamanho,
          backgroundColor: paleta.fundo,
          borderColor: paleta.borda,
        },
        (redondo || variante === 'sobrePrimaria') && styles.redondo,
        inativo && styles.inativo,
        pressed && !inativo && styles.pressionado,
        style,
      ]}>
      <Icone nome={nome} tamanho={tamanho * 0.45} cor={paleta.cor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.md,
    borderWidth: 1,
  },
  redondo: { borderRadius: raios.pill },
  pressionado: { opacity: 0.7 },
  inativo: { opacity: 0.4 },
});
