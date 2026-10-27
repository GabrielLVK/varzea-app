/**
 * Previa da imagem + botoes de camera e galeria.
 * A permissao e pedida dentro de `nativos.js`, no toque do botao.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { capturarFoto, escolherImagem } from '../../services/nativos';
import { espacamentos } from '../../theme';
import { Avatar } from '../atoms/Avatar';
import { Button } from '../atoms/Button';
import { Escudo } from '../atoms/Escudo';
import { Label } from '../atoms/Label';
import { ErrorMessage } from './ErrorMessage';

export function SeletorImagem({
  rotulo,
  valor,
  nome,
  aoEscolher,
  formato = 'quadrado',
  desabilitado = false,
}) {
  const [ocupado, setOcupado] = useState(null);
  const [erro, setErro] = useState(null);

  async function escolher(origem) {
    setErro(null);
    setOcupado(origem);
    try {
      const resultado =
        origem === 'camera' ? await capturarFoto() : await escolherImagem();
      if (resultado) {
        aoEscolher(resultado.uri);
      }
    } catch (e) {
      setErro(e.message);
    } finally {
      setOcupado(null);
    }
  }

  const inativo = desabilitado || ocupado != null;

  return (
    <View style={styles.container}>
      {rotulo ? <Label variante="rotulo">{rotulo}</Label> : null}

      <ErrorMessage mensagem={erro} />

      <View style={styles.linha}>
        {formato === 'redondo' ? (
          <Avatar foto={valor} nome={nome} tamanho="gg" />
        ) : (
          <Escudo escudo={valor} nome={nome} tamanho="gigante" />
        )}

        <View style={styles.botoes}>
          <Button
            title="Tirar foto"
            icone="Camera"
            tamanho="sm"
            onPress={() => escolher('camera')}
            carregando={ocupado === 'camera'}
            desabilitado={inativo}
          />
          <Button
            title="Galeria"
            icone="Images"
            variante="secundario"
            tamanho="sm"
            onPress={() => escolher('galeria')}
            carregando={ocupado === 'galeria'}
            desabilitado={inativo}
          />
          {valor ? (
            <Button
              title="Remover"
              variante="fantasma"
              tamanho="sm"
              onPress={() => aoEscolher(null)}
              desabilitado={inativo}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: espacamentos.sm },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.md,
  },
  botoes: { flex: 1, gap: espacamentos.sm },
});
