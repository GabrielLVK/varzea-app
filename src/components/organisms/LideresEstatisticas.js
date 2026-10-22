import { ScrollView, StyleSheet, View } from 'react-native';

import { cores, espacamentos } from '../../theme';
import { pluralizar } from '../../utils/formato';
import { Label } from '../atoms/Label';
import { CartoesResumo } from '../molecules/CartoesResumo';
import { EstadoCarga } from '../molecules/EstadoCarga';
import { HighlightRow } from '../molecules/HighlightRow';
import { LeaderCard } from '../molecules/LeaderCard';
import { ListaVazia } from '../molecules/ListaVazia';
import { PlayerRankRow } from '../molecules/PlayerRankRow';

function Ranking({ jogadores, vazio }) {
  if (!jogadores || jogadores.length === 0) {
    return <ListaVazia mensagem={vazio} emCartao={false} />;
  }

  return (
    <View>
      {jogadores.map(jogador => (
        <PlayerRankRow
          key={jogador.id}
          posicao={jogador.posicao}
          jogador={jogador}
          valor={jogador.valor}
        />
      ))}
    </View>
  );
}

export function LideresEstatisticas({ lideres, carregando, erro, onTentarDeNovo }) {
  if (carregando || erro) {
    return (
      <EstadoCarga
        carregando={carregando && !erro}
        erro={erro}
        onTentarDeNovo={onTentarDeNovo}
      />
    );
  }

  const { assistencias, artilheiros, defesa, ataqueFraco, disciplina } = lideres ?? {};

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <LeaderCard icone="Handshake" rotulo="Top Assistências">
        <Ranking jogadores={assistencias} vazio="Nenhuma assistência registrada." />
      </LeaderCard>

      <LeaderCard icone="Flame" rotulo="Maiores Artilheiros">
        <Ranking jogadores={artilheiros} vazio="Nenhum gol registrado." />
      </LeaderCard>

      <LeaderCard icone="ShieldCheck" rotulo="Melhor Defesa · Goleiro Menos Vazado">
        {defesa ? (
          <HighlightRow nome={defesa.nome} detalhe={defesa.time} foto={defesa.foto}>
            <Label variante="numero">
              {defesa.valor}{' '}
              <Label variante="legenda" cor={cores.textoSecundario}>
                Sofridos
              </Label>
            </Label>
          </HighlightRow>
        ) : (
          <ListaVazia mensagem="Nenhum goleiro cadastrado." emCartao={false} />
        )}
      </LeaderCard>

      <LeaderCard icone="TrendingDown" rotulo="Pior Ataque">
        {ataqueFraco ? (
          <HighlightRow
            nome={ataqueFraco.nome}
            detalhe="Menos gols marcados"
            escudo={ataqueFraco.escudo}>
            <Label variante="numero">
              {ataqueFraco.valor}{' '}
              <Label variante="legenda" cor={cores.textoSecundario}>
                Gols Pró
              </Label>
            </Label>
          </HighlightRow>
        ) : (
          <ListaVazia mensagem="Nenhuma equipe na classificação." emCartao={false} />
        )}
      </LeaderCard>

      <LeaderCard icone="RectangleVertical" rotulo="Pior Equipe Disciplinar">
        {disciplina ? (
          <HighlightRow
            nome={disciplina.nome}
            detalhe={pluralizar(
              disciplina.amarelos + disciplina.vermelhos,
              'cartão no total',
              'cartões no total',
            )}
            escudo={disciplina.escudo}>
            <CartoesResumo
              amarelos={disciplina.amarelos}
              vermelhos={disciplina.vermelhos}
            />
          </HighlightRow>
        ) : (
          <ListaVazia mensagem="Nenhuma equipe cadastrada." emCartao={false} />
        )}
      </LeaderCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    padding: espacamentos.tela,
    paddingBottom: espacamentos.xl,
    gap: espacamentos.tela,
  },
});
