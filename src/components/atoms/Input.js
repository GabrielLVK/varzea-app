import { forwardRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { cores, espacamentos, raios, tipografia } from '../../theme';
import { Icone } from './Icone';

export const Input = forwardRef(function Input(
  { erro = false, icone, style, containerStyle, onFocus, onBlur, ...props },
  ref,
) {
  const [focado, setFocado] = useState(false);

  return (
    <View
      style={[
        styles.container,
        focado && styles.focado,
        erro && styles.comErro,
        containerStyle,
      ]}>
      {icone ? (
        <Icone
          nome={icone}
          tamanho={16}
          cor={erro ? cores.perigo : cores.textoSecundario}
        />
      ) : null}
      <TextInput
        ref={ref}
        placeholderTextColor={cores.textoSecundario}
        {...props}
        style={[styles.input, style]}
        onFocus={evento => {
          setFocado(true);
          onFocus?.(evento);
        }}
        onBlur={evento => {
          setFocado(false);
          onBlur?.(evento);
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
    minHeight: 48,
    backgroundColor: cores.superficie,
    borderWidth: 1.5,
    borderColor: cores.borda,
    borderRadius: raios.lg,
    paddingHorizontal: espacamentos.md,
  },
  focado: { borderColor: cores.bordaFoco },
  comErro: { borderColor: cores.perigo },
  input: {
    flex: 1,
    paddingVertical: espacamentos.sm,
    fontSize: tipografia.corpo,
    fontWeight: '600',
    color: cores.texto,
  },
});
