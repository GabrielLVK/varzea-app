import { StyleSheet, Text } from 'react-native';

import { cores, fontes, tipografia } from '../../theme';

export function Label({ children, variante = 'corpo', cor, style, ...props }) {
  return (
    <Text style={[styles[variante], cor && { color: cor }, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  display: {
    fontFamily: fontes.display,
    fontSize: tipografia.display,
    color: cores.texto,
  },
  titulo: {
    fontFamily: fontes.display,
    fontSize: tipografia.titulo,
    color: cores.texto,
  },
  subtitulo: {
    fontSize: tipografia.subtitulo,
    fontWeight: '700',
    color: cores.texto,
  },
  corpo: {
    fontSize: tipografia.corpo,
    fontWeight: '600',
    color: cores.texto,
  },
  legenda: {
    fontSize: tipografia.legenda,
    color: cores.textoSecundario,
  },
  rotulo: {
    fontSize: tipografia.rotulo,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: cores.textoSecundario,
  },
  micro: {
    fontSize: tipografia.micro,
    fontWeight: '700',
    color: cores.textoSecundario,
  },
  numero: {
    fontFamily: fontes.display,
    fontSize: tipografia.subtitulo,
    color: cores.texto,
    fontVariant: ['tabular-nums'],
  },
});
