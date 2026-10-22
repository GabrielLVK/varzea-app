import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { STATUS_PARTIDA } from '../../constants/campeonato';
import { cores, espacamentos, raios } from '../../theme';
import { formatarDataCurta } from '../../utils/formato';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Label } from '../atoms/Label';
import { InfoChip } from './InfoChip';
import { TeamLine } from './TeamLine';

export const MatchCard = memo(function MatchCard({ partida, mandante, visitante, onAbrir }) {
  const finalizada = partida.status === STATUS_PARTIDA.finalizado;
  const mandanteVenceu =
    finalizada && (partida.placarMandante ?? 0) > (partida.placarVisitante ?? 0);
  const visitanteVenceu =
    finalizada && (partida.placarVisitante ?? 0) > (partida.placarMandante ?? 0);

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <Label variante="rotulo">
          {partida.rodada} · {formatarDataCurta(partida.data)}
        </Label>
        <Badge
          texto={finalizada ? 'Finalizado' : 'Agendado'}
          variante={finalizada ? 'neutro' : 'destaque'}
        />
      </View>

      <View style={styles.times}>
        <TeamLine
          time={mandante}
          placar={partida.placarMandante}
          vencedor={mandanteVenceu}
        />
        <TeamLine
          time={visitante}
          placar={partida.placarVisitante}
          vencedor={visitanteVenceu}
        />
      </View>

      {finalizada ? (
        <Button
          title="Ver Súmula"
          variante="secundario"
          tamanho="sm"
          iconeDireita="ChevronRight"
          onPress={() => onAbrir?.(partida)}
          style={styles.botao}
        />
      ) : (
        <View style={styles.infos}>
          <InfoChip icone="Clock" texto={partida.hora} />
          <InfoChip icone="MapPin" texto={partida.local} />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.superficie,
    borderRadius: raios.xl,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.md,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espacamentos.sm,
  },
  times: {
    marginTop: espacamentos.sm + espacamentos.xs,
    gap: espacamentos.sm + espacamentos.xxs,
  },
  infos: {
    flexDirection: 'row',
    gap: espacamentos.sm + espacamentos.xs,
    marginTop: espacamentos.md,
  },
  botao: { marginTop: espacamentos.md },
});
