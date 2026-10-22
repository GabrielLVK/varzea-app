import { Pressable, StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { Icone } from '../atoms/Icone';
import { Label } from '../atoms/Label';

export function BannerCompartilhar({ onPress }) {
  return (
    <View style={styles.secao}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Compartilhar campeonato"
        style={({ pressed }) => [styles.banner, pressed && styles.pressionado]}>
        <View style={styles.icone}>
          <Icone nome="Link2" tamanho={20} cor={cores.sobrePrimaria} />
        </View>

        <View style={styles.textos}>
          <Label variante="corpo" cor={cores.sobreDestaque}>
            Compartilhar Campeonato
          </Label>
          <Label variante="legenda" cor={cores.sobreDestaque} numberOfLines={1}>
            Convide a galera para acompanhar a Copa
          </Label>
        </View>

        <Icone nome="Share2" tamanho={20} cor={cores.primaria} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { paddingHorizontal: espacamentos.tela, paddingTop: espacamentos.lg },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm + espacamentos.xs,
    backgroundColor: cores.destaque,
    borderRadius: raios.xl,
    borderWidth: 1,
    borderColor: 'rgba(31, 157, 107, 0.18)',
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.md,
  },
  pressionado: { opacity: 0.8 },
  icone: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.lg,
    backgroundColor: cores.primaria,
  },
  textos: { flex: 1, gap: espacamentos.xxs },
});
