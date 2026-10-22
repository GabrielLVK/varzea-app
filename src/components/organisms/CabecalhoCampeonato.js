import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, View } from 'react-native';

import { imagens } from '../../constants/imagens';
import { cores, espacamentos, raios } from '../../theme';
import { IconButton } from '../atoms/IconButton';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';

/** o `animate-ping` do Tailwind, feito com a Animated API */
function PontoPulsante() {
  const escala = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animacao = Animated.loop(
      Animated.timing(escala, {
        toValue: 1,
        duration: 1400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    );
    animacao.start();
    return () => animacao.stop();
  }, [escala]);

  return (
    <View style={styles.ponto}>
      <Animated.View
        style={[
          styles.pontoEco,
          {
            opacity: escala.interpolate({ inputRange: [0, 1], outputRange: [0.75, 0] }),
            transform: [
              { scale: escala.interpolate({ inputRange: [0, 1], outputRange: [1, 2.4] }) },
            ],
          },
        ]}
      />
      <View style={styles.pontoCheio} />
    </View>
  );
}

export function CabecalhoCampeonato({
  titulo = 'Copa Várzea 2026',
  subtitulo = 'Visão do Torcedor',
  status,
  onAbrirAdmin,
  onNotificacoes,
  acaoDireita,
}) {
  return (
    <View style={styles.cabecalho}>
      <View style={styles.linhaTopo}>
        <View style={styles.identidade}>
          <View style={styles.moldura}>
            <Image
              source={imagens.copa}
              accessibilityLabel="Escudo da Copa Várzea 2026"
              resizeMode="contain"
              style={styles.escudo}
            />
          </View>

          <View style={styles.textos}>
            <Label variante="titulo" cor={cores.sobrePrimaria} numberOfLines={1}>
              {titulo}
            </Label>
            <Label variante="legenda" cor="rgba(255, 255, 255, 0.72)">
              {subtitulo}
            </Label>
          </View>
        </View>

        <View style={styles.acoes}>
          {acaoDireita}

          {onAbrirAdmin ? (
            <Pressable
              onPress={onAbrirAdmin}
              accessibilityRole="button"
              accessibilityLabel="Área do organizador"
              style={({ pressed }) => [styles.botaoAdmin, pressed && styles.pressionado]}>
              <Icone nome="KeyRound" tamanho={16} cor={cores.sobrePrimaria} />
              <Label variante="legenda" cor={cores.sobrePrimaria} style={styles.textoAdmin}>
                Área do ADM
              </Label>
            </Pressable>
          ) : null}

          {onNotificacoes ? (
            <IconButton
              nome="Bell"
              rotulo="Notificações"
              variante="sobrePrimaria"
              tamanho={40}
              aoPressionar={onNotificacoes}
            />
          ) : null}
        </View>
      </View>

      {status ? (
        <View style={styles.status}>
          <PontoPulsante />
          <Label variante="legenda" cor={cores.sobrePrimaria} style={styles.textoStatus}>
            {status}
          </Label>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    backgroundColor: cores.primaria,
    paddingHorizontal: espacamentos.tela,
    paddingTop: espacamentos.md,
    paddingBottom: espacamentos.lg,
    borderBottomLeftRadius: raios.xl,
    borderBottomRightRadius: raios.xl,
  },
  linhaTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espacamentos.sm,
  },
  identidade: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
  },
  moldura: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
  },
  escudo: { width: 40, height: 40 },
  textos: { flex: 1 },
  acoes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
  },
  botaoAdmin: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.xs,
    borderRadius: raios.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    paddingHorizontal: espacamentos.sm + espacamentos.xs,
    paddingVertical: espacamentos.sm,
  },
  textoAdmin: { fontWeight: '700' },
  pressionado: { opacity: 0.75 },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: espacamentos.sm,
    marginTop: espacamentos.md,
    borderRadius: raios.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    paddingHorizontal: espacamentos.sm + espacamentos.xs,
    paddingVertical: espacamentos.xs + espacamentos.xxs,
  },
  textoStatus: { fontWeight: '700' },
  ponto: { width: 8, height: 8, alignItems: 'center', justifyContent: 'center' },
  pontoEco: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: raios.pill,
    backgroundColor: cores.sobrePrimaria,
  },
  pontoCheio: {
    width: 8,
    height: 8,
    borderRadius: raios.pill,
    backgroundColor: cores.sobrePrimaria,
  },
});
