import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { STATUS_PARTIDA } from '../constants/campeonato';
import { Badge } from '../components/atoms/Badge';
import { Label } from '../components/atoms/Label';
import { EstadoCarga } from '../components/molecules/EstadoCarga';
import { InfoChip } from '../components/molecules/InfoChip';
import { ListaVazia } from '../components/molecules/ListaVazia';
import { SquadRow } from '../components/molecules/SquadRow';
import { TeamBadge } from '../components/molecules/TeamBadge';
import { ScreenTemplate } from '../components/templates/ScreenTemplate';
import { listarElenco } from '../services/jogador';
import { buscarPartida } from '../services/partida';
import { cores, espacamentos, raios } from '../theme';
import { formatarData, formatarDiaHora } from '../utils/formato';

function Elenco({ titulo, jogadores }) {
  return (
    <View style={styles.bloco}>
      <Label variante="rotulo">Elenco · {titulo}</Label>
      <View style={styles.cartaoElenco}>
        {jogadores.length === 0 ? (
          <ListaVazia mensagem="Sem jogadores cadastrados." emCartao={false} />
        ) : (
          jogadores.map(jogador => <SquadRow key={jogador.id} jogador={jogador} />)
        )}
      </View>
    </View>
  );
}

export function PartidaDetalheScreen({ route }) {
  const { id } = route.params ?? {};

  const [partida, setPartida] = useState(null);
  const [elencoMandante, setElencoMandante] = useState([]);
  const [elencoVisitante, setElencoVisitante] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const encontrada = await buscarPartida(id);
      const [casa, fora] = await Promise.all([
        listarElenco(encontrada.mandanteId),
        listarElenco(encontrada.visitanteId),
      ]);

      setPartida(encontrada);
      setElencoMandante(casa);
      setElencoVisitante(fora);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  if (carregando || erro || !partida) {
    return (
      <EstadoCarga
        carregando={carregando && !erro}
        erro={erro}
        onTentarDeNovo={carregar}
      />
    );
  }

  const finalizada = partida.status === STATUS_PARTIDA.finalizado;

  return (
    <ScreenTemplate>
      <View style={styles.placar}>
        <View style={styles.topo}>
          <Label variante="rotulo">{partida.rodada}</Label>
          <Badge
            texto={finalizada ? 'Finalizado' : 'Agendado'}
            variante={finalizada ? 'neutro' : 'destaque'}
          />
        </View>

        <View style={styles.confronto}>
          <TeamBadge time={partida.mandante} />
          <View style={styles.numeros}>
            {finalizada ? (
              <Label variante="display">
                {partida.placarMandante} <Label variante="subtitulo">x</Label>{' '}
                {partida.placarVisitante}
              </Label>
            ) : (
              <Label variante="subtitulo" cor={cores.textoSecundario}>
                VS
              </Label>
            )}
          </View>
          <TeamBadge time={partida.visitante} />
        </View>

        <View style={styles.infos}>
          <InfoChip
            icone="CalendarClock"
            texto={
              finalizada
                ? formatarData(partida.data)
                : formatarDiaHora(partida.data, partida.hora)
            }
          />
          <InfoChip icone="MapPin" texto={partida.local} />
        </View>
      </View>

      <View style={styles.elencos}>
        <Elenco titulo={partida.mandante?.nome} jogadores={elencoMandante} />
        <Elenco titulo={partida.visitante?.nome} jogadores={elencoVisitante} />
      </View>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  placar: {
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
  },
  confronto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
    marginTop: espacamentos.tela,
  },
  numeros: { alignItems: 'center', justifyContent: 'center' },
  infos: {
    flexDirection: 'row',
    gap: espacamentos.sm + espacamentos.xs,
    marginTop: espacamentos.tela,
  },
  elencos: { marginTop: espacamentos.md, gap: espacamentos.md },
  bloco: { gap: espacamentos.sm },
  cartaoElenco: {
    backgroundColor: cores.superficie,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    overflow: 'hidden',
  },
});
