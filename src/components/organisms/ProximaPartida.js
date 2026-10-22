import { StyleSheet, View } from 'react-native';

import { cores, espacamentos, raios } from '../../theme';
import { formatarDiaHora } from '../../utils/formato';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Label } from '../atoms/Label';
import { InfoChip } from '../molecules/InfoChip';
import { ListaVazia } from '../molecules/ListaVazia';
import { TeamBadge } from '../molecules/TeamBadge';

export function ProximaPartida({ partida, onAbrir }) {
  if (!partida) {
    return (
      <View style={styles.secao}>
        <ListaVazia mensagem="Nenhuma partida agendada no momento." />
      </View>
    );
  }

  return (
    <View style={styles.secao}>
      <View style={styles.card}>
        <View style={styles.topo}>
          <Label variante="rotulo" cor={cores.primaria}>
            Próxima Partida
          </Label>
          <Badge texto={partida.rodada} variante="destaque" />
        </View>

        <View style={styles.confronto}>
          <TeamBadge time={partida.mandante} />
          <Label variante="subtitulo" cor={cores.textoSecundario}>
            VS
          </Label>
          <TeamBadge time={partida.visitante} />
        </View>

        <View style={styles.infos}>
          <InfoChip
            icone="CalendarClock"
            texto={formatarDiaHora(partida.data, partida.hora)}
          />
          <InfoChip icone="MapPin" texto={partida.local} />
        </View>

        <Button
          title="Ver Detalhes"
          iconeDireita="ChevronRight"
          onPress={() => onAbrir?.(partida)}
          style={styles.botao}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { paddingHorizontal: espacamentos.tela, paddingTop: espacamentos.tela },
  card: {
    backgroundColor: cores.superficie,
    borderRadius: raios.xl,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.tela,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espacamentos.sm,
  },
  confronto: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espacamentos.sm + espacamentos.xs,
    marginTop: espacamentos.tela,
  },
  infos: {
    flexDirection: 'row',
    gap: espacamentos.sm + espacamentos.xs,
    marginTop: espacamentos.tela,
  },
  botao: { marginTop: espacamentos.md },
});
