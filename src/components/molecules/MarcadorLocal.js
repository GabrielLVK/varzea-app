/**
 * Botao que le o GPS e mostra as coordenadas marcadas.
 * Usado ao agendar a partida, para registrar onde fica o campo.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { obterPosicao } from '../../services/nativos';
import { cores, espacamentos, raios } from '../../theme';
import { formatarCoordenadas } from '../../utils/formato';
import { Button } from '../atoms/Button';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';
import { ErrorMessage } from './ErrorMessage';

export function MarcadorLocal({ rotulo, coordenadas, aoMarcar, desabilitado = false }) {
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState(null);

  async function marcar() {
    setErro(null);
    setOcupado(true);
    try {
      aoMarcar(await obterPosicao());
    } catch (e) {
      setErro(e.message);
    } finally {
      setOcupado(false);
    }
  }

  return (
    <View style={styles.container}>
      {rotulo ? <Label variante="rotulo">{rotulo}</Label> : null}

      <ErrorMessage mensagem={erro} />

      <View style={styles.caixa}>
        <Icone
          nome="MapPin"
          tamanho={16}
          cor={coordenadas ? cores.primaria : cores.textoSecundario}
        />
        <Label variante="legenda" style={styles.texto}>
          {coordenadas
            ? formatarCoordenadas(coordenadas)
            : 'Coordenadas ainda não marcadas'}
        </Label>
      </View>

      <View style={styles.botoes}>
        <Button
          title={coordenadas ? 'Marcar de novo' : 'Marcar onde é o campo'}
          icone="LocateFixed"
          variante="secundario"
          tamanho="sm"
          onPress={marcar}
          carregando={ocupado}
          desabilitado={desabilitado || ocupado}
          style={styles.botao}
        />
        {coordenadas ? (
          <Button
            title="Limpar"
            variante="fantasma"
            tamanho="sm"
            onPress={() => aoMarcar(null)}
            desabilitado={desabilitado || ocupado}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: espacamentos.sm },
  caixa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
    backgroundColor: cores.superficie,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.sm + espacamentos.xs,
  },
  texto: { flex: 1 },
  botoes: { flexDirection: 'row', gap: espacamentos.sm },
  botao: { flex: 1 },
});
