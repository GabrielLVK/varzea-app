import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { COLUNAS_TABELA, VAGAS_CLASSIFICACAO } from '../../constants/campeonato';
import { cores, espacamentos, raios } from '../../theme';
import { Escudo } from '../atoms/Escudo';
import { Label } from '../atoms/Label';

export const StandingRow = memo(function StandingRow({ linha, ultima = false }) {
  const classificado = linha.posicao <= VAGAS_CLASSIFICACAO;

  return (
    <View style={[styles.linha, ultima && styles.ultima]}>
      <View
        style={[styles.faixa, classificado && styles.faixaAtiva]}
        accessibilityElementsHidden
      />

      <Label
        variante="numero"
        cor={classificado ? cores.primaria : cores.textoSecundario}
        style={styles.posicao}>
        {linha.posicao}
      </Label>

      <View style={styles.time}>
        <Escudo escudo={linha.escudo} nome={linha.nome} tamanho="pp" redondo />
        <Label variante="corpo" numberOfLines={1} style={styles.nome}>
          {linha.nome}
        </Label>
      </View>

      {COLUNAS_TABELA.map(coluna => (
        <Label
          key={coluna.chave}
          variante="corpo"
          cor={coluna.chave === 'pontos' ? cores.texto : cores.textoSecundario}
          style={styles.celula}>
          {linha[coluna.chave]}
        </Label>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.sm + espacamentos.xs,
    backgroundColor: cores.superficie,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: cores.borda,
    overflow: 'hidden',
  },
  ultima: {
    borderBottomLeftRadius: raios.xl,
    borderBottomRightRadius: raios.xl,
  },
  faixa: {
    position: 'absolute',
    left: 0,
    width: 4,
    height: 32,
    borderTopRightRadius: raios.pill,
    borderBottomRightRadius: raios.pill,
    backgroundColor: 'transparent',
  },
  faixaAtiva: { backgroundColor: cores.primaria },
  posicao: { width: 20, textAlign: 'center' },
  time: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xxs,
  },
  nome: { flex: 1 },
  celula: { width: 24, textAlign: 'center' },
});
