import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { LIMITES_SUMULA } from '../../constants/campeonato';
import { cores, espacamentos, raios } from '../../theme';
import { erroVisivel, primeiroErro, validarPlacar, validarSelecao } from '../../utils/validacao';
import { Button } from '../atoms/Button';
import { Label } from '../atoms/Label';
import { CardToggle } from '../molecules/CardToggle';
import { ErrorMessage } from '../molecules/ErrorMessage';
import { FormField } from '../molecules/FormField';
import { ListaVazia } from '../molecules/ListaVazia';
import { SelectField } from '../molecules/SelectField';
import { Stepper } from '../molecules/Stepper';

function eventoVazio() {
  return { gols: 0, amarelos: 0, vermelhos: 0 };
}

export function FormSumula({
  partidas,
  elencos,
  onSelecionarPartida,
  onSubmit,
  carregando = false,
  erro = null,
}) {
  const [partidaId, setPartidaId] = useState('');
  const [placarMandante, setPlacarMandante] = useState('');
  const [placarVisitante, setPlacarVisitante] = useState('');
  const [eventos, setEventos] = useState({});
  const [tocados, setTocados] = useState({});

  const partida = partidas.find(item => item.id === partidaId);

  const erros = {
    partidaId: validarSelecao(partidaId, { rotulo: 'a partida' }),
    placarMandante: partida ? validarPlacar(placarMandante) : null,
    placarVisitante: partida ? validarPlacar(placarVisitante) : null,
  };

  function tocar(campo) {
    setTocados(atual => ({ ...atual, [campo]: true }));
  }

  function selecionar(id) {
    setPartidaId(id);
    setPlacarMandante('');
    setPlacarVisitante('');
    setEventos({});
    setTocados({});
    onSelecionarPartida?.(id);
  }

  function ajustar(jogadorId, chave, delta, maximo) {
    setEventos(atual => {
      const evento = atual[jogadorId] ?? eventoVazio();
      const proximo = Math.min(maximo, Math.max(0, evento[chave] + delta));
      return { ...atual, [jogadorId]: { ...evento, [chave]: proximo } };
    });
  }

  function enviar() {
    setTocados({ partidaId: true, placarMandante: true, placarVisitante: true });
    if (primeiroErro(erros) || carregando) return;
    onSubmit({ partidaId, placarMandante, placarVisitante, eventos });
  }

  const grupos = partida
    ? [
        { time: partida.mandante, elenco: elencos?.[partida.mandanteId] ?? [] },
        { time: partida.visitante, elenco: elencos?.[partida.visitanteId] ?? [] },
      ]
    : [];

  return (
    <View style={styles.form}>
      <ErrorMessage mensagem={erro} />

      <SelectField
        label="Partida"
        valor={partidaId}
        opcoes={partidas.map(item => ({
          valor: item.id,
          rotulo: `${item.rodada}: ${item.mandante?.nome} x ${item.visitante?.nome}`,
        }))}
        aoSelecionar={selecionar}
        onBlur={() => tocar('partidaId')}
        placeholder="Selecione a partida"
        mensagemErro={erroVisivel(tocados, erros, 'partidaId')}
      />

      {partida ? (
        <>
          <View style={styles.placar}>
            <FormField
              label={partida.mandante?.nome}
              value={placarMandante}
              onChangeText={setPlacarMandante}
              onBlur={() => tocar('placarMandante')}
              mensagemErro={erroVisivel(tocados, erros, 'placarMandante')}
              placeholder="0"
              keyboardType="number-pad"
              maxLength={2}
              style={styles.campoPlacar}
              textAlign="center"
            />

            <Label variante="subtitulo" cor={cores.textoSecundario} style={styles.versus}>
              x
            </Label>

            <FormField
              label={partida.visitante?.nome}
              value={placarVisitante}
              onChangeText={setPlacarVisitante}
              onBlur={() => tocar('placarVisitante')}
              mensagemErro={erroVisivel(tocados, erros, 'placarVisitante')}
              placeholder="0"
              keyboardType="number-pad"
              maxLength={2}
              style={styles.campoPlacar}
              textAlign="center"
            />
          </View>

          {grupos.map(grupo => (
            <View key={grupo.time?.id} style={styles.grupo}>
              <Label variante="rotulo">Eventos · {grupo.time?.nome}</Label>

              {grupo.elenco.length === 0 ? (
                <ListaVazia
                  mensagem="Sem jogadores cadastrados para este time."
                  emCartao={false}
                />
              ) : (
                grupo.elenco.map(jogador => {
                  const evento = eventos[jogador.id] ?? eventoVazio();
                  return (
                    <View key={jogador.id} style={styles.jogador}>
                      <View style={styles.identificacao}>
                        <View style={styles.numero}>
                          <Label variante="micro" cor={cores.texto}>
                            {jogador.numero}
                          </Label>
                        </View>
                        <Label variante="corpo" numberOfLines={1} style={styles.nome}>
                          {jogador.nome}
                        </Label>
                      </View>

                      <View style={styles.controles}>
                        <Stepper
                          rotulo="Gols"
                          valor={evento.gols}
                          maximo={LIMITES_SUMULA.golsMax}
                          aoDiminuir={() =>
                            ajustar(jogador.id, 'gols', -1, LIMITES_SUMULA.golsMax)
                          }
                          aoAumentar={() =>
                            ajustar(jogador.id, 'gols', 1, LIMITES_SUMULA.golsMax)
                          }
                        />
                        <CardToggle
                          rotulo="Amarelo"
                          cor={cores.cartaoAmarelo}
                          valor={evento.amarelos}
                          maximo={LIMITES_SUMULA.amarelosMax}
                          aoDiminuir={() =>
                            ajustar(jogador.id, 'amarelos', -1, LIMITES_SUMULA.amarelosMax)
                          }
                          aoAumentar={() =>
                            ajustar(jogador.id, 'amarelos', 1, LIMITES_SUMULA.amarelosMax)
                          }
                        />
                        <CardToggle
                          rotulo="Vermelho"
                          cor={cores.cartaoVermelho}
                          valor={evento.vermelhos}
                          maximo={LIMITES_SUMULA.vermelhosMax}
                          aoDiminuir={() =>
                            ajustar(jogador.id, 'vermelhos', -1, LIMITES_SUMULA.vermelhosMax)
                          }
                          aoAumentar={() =>
                            ajustar(jogador.id, 'vermelhos', 1, LIMITES_SUMULA.vermelhosMax)
                          }
                        />
                      </View>
                    </View>
                  );
                })
              )}
            </View>
          ))}
        </>
      ) : null}

      <Button
        title="Salvar e Publicar Súmula"
        icone="Send"
        onPress={enviar}
        carregando={carregando}
        desabilitado={!partida || carregando}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: espacamentos.md },
  placar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: espacamentos.sm + espacamentos.xs,
    backgroundColor: cores.secundaria,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.md,
  },
  campoPlacar: { flex: 1 },
  versus: { marginTop: espacamentos.lg + espacamentos.xs },
  grupo: { gap: espacamentos.sm },
  jogador: {
    gap: espacamentos.sm,
    backgroundColor: cores.secundaria,
    borderRadius: raios.lg,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: espacamentos.sm + espacamentos.xs,
  },
  identificacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacamentos.sm,
  },
  numero: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: raios.pill,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  nome: { flex: 1 },
  controles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espacamentos.sm,
  },
});
