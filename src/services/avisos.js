/**
 * Avisos do campeonato.
 *
 * Fica entre as telas e `nativos.js` para carregar duas regras que a tela
 * nao deveria conhecer: respeitar a preferencia do usuario e nunca deixar
 * uma falha de notificacao derrubar a acao principal — publicar a sumula
 * importa mais do que o aviso sobre ela.
 */
import { enviarAvisoLocal } from './nativos';
import { obterPreferencias } from './preferencias';
import { formatarDiaHora } from '../utils/formato';

async function tentarAvisar(preferencia, conteudo) {
  try {
    const prefs = await obterPreferencias();
    if (!prefs.notificacoes || !prefs[preferencia]) {
      return false;
    }
    await enviarAvisoLocal(conteudo);
    return true;
  } catch {
    // permissao negada ou plataforma sem suporte: segue sem avisar
    return false;
  }
}

export function avisarSumulaPublicada(resumo) {
  return tentarAvisar('notificacoes', {
    titulo: 'Resultado publicado',
    corpo: `${resumo}. Veja a tabela atualizada.`,
  });
}

export function avisarPartidaAgendada(confronto, data, hora) {
  return tentarAvisar('lembreteProximaPartida', {
    titulo: 'Nova partida na agenda',
    corpo: `${confronto} — ${formatarDiaHora(data, hora)}.`,
  });
}
