import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { IconButton } from '../atoms/IconButton';

export const AdminListItem = memo(function AdminListItem({
  children,
  aoEditar,
  aoExcluir,
  rotuloEditar,
  rotuloExcluir,
  style,
}) {
  return (
    <View style={[styles.linha, style]}>
      <View style={styles.conteudo}>{children}</View>

      {aoEditar ? (
        <IconButton nome="Pencil" rotulo={rotuloEditar} aoPressionar={aoEditar} />
      ) : null}
      {aoExcluir ? (
        <IconButton
          nome="Trash2"
          rotulo={rotuloExcluir}
          variante="perigo"
          aoPressionar={aoExcluir}
        />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    backgroundColor: cores.secundaria,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.sm + espacamentos.xs,
  },
  conteudo: { flex: 1 },
});
