/**
 * Substituto do `<select>`, que não existe em React Native.
 * opcoes: [{ valor, rotulo }]
 */
import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios, tipografia } from '../../theme';
import { Icone } from './Icone';
import { Label } from './Label';

export function Select({
  valor,
  opcoes = [],
  aoSelecionar,
  placeholder = 'Selecione',
  titulo = 'Selecione uma opção',
  erro = false,
  desabilitado = false,
  onBlur,
}) {
  const [aberto, setAberto] = useState(false);
  const selecionada = opcoes.find(opcao => opcao.valor === valor);

  function fechar() {
    setAberto(false);
    onBlur?.();
  }

  function escolher(opcao) {
    aoSelecionar(opcao.valor);
    fechar();
  }

  return (
    <>
      <Pressable
        onPress={() => !desabilitado && setAberto(true)}
        accessibilityRole="button"
        accessibilityLabel={titulo}
        accessibilityValue={{ text: selecionada?.rotulo ?? placeholder }}
        style={({ pressed }) => [
          styles.campo,
          erro && styles.comErro,
          desabilitado && styles.desabilitado,
          pressed && styles.pressionado,
        ]}>
        <Label
          variante="corpo"
          numberOfLines={1}
          style={[styles.texto, !selecionada && styles.placeholder]}>
          {selecionada?.rotulo ?? placeholder}
        </Label>
        <Icone nome="ChevronDown" tamanho={16} cor={cores.textoSecundario} />
      </Pressable>

      <Modal
        visible={aberto}
        transparent
        animationType="fade"
        onRequestClose={fechar}>
        <Pressable style={styles.fundoModal} onPress={fechar}>
          <Pressable style={styles.folha} onPress={evento => evento.stopPropagation()}>
            <View style={styles.cabecalhoModal}>
              <Label variante="subtitulo">{titulo}</Label>
            </View>

            <FlatList
              data={opcoes}
              keyExtractor={opcao => String(opcao.valor)}
              ListEmptyComponent={
                <Label variante="legenda" style={styles.vazio}>
                  Nenhuma opção disponível.
                </Label>
              }
              renderItem={({ item }) => {
                const ativa = item.valor === valor;
                return (
                  <Pressable
                    onPress={() => escolher(item)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: ativa }}
                    style={({ pressed }) => [
                      styles.opcao,
                      ativa && styles.opcaoAtiva,
                      pressed && styles.pressionado,
                    ]}>
                    <Label variante="corpo" style={ativa && styles.textoAtivo}>
                      {item.rotulo}
                    </Label>
                    {ativa ? (
                      <Icone nome="Check" tamanho={16} cor={cores.primaria} />
                    ) : null}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espacamentos.sm,
    minHeight: 48,
    backgroundColor: cores.superficie,
    borderWidth: 1.5,
    borderColor: cores.borda,
    borderRadius: raios.lg,
    paddingHorizontal: espacamentos.md,
  },
  comErro: { borderColor: cores.perigo },
  desabilitado: { opacity: 0.5 },
  pressionado: { opacity: 0.75 },
  texto: { flex: 1 },
  placeholder: { color: cores.textoSecundario, fontWeight: '500' },

  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(19, 37, 29, 0.45)',
    justifyContent: 'flex-end',
  },
  folha: {
    maxHeight: '70%',
    backgroundColor: cores.superficie,
    borderTopLeftRadius: raios.xl,
    borderTopRightRadius: raios.xl,
    paddingBottom: espacamentos.lg,
  },
  cabecalhoModal: {
    padding: espacamentos.md,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.md,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  opcaoAtiva: { backgroundColor: cores.destaque },
  textoAtivo: { color: cores.sobreDestaque },
  vazio: { textAlign: 'center', padding: espacamentos.lg },
});
