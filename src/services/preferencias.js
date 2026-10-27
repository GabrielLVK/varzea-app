/**
 * Preferencias do aparelho — nao sao segredo e nao pertencem a conta.
 * Sobrevivem ao logout; o token nao.
 */
import { obterLocal, salvarLocal } from './storage';

const CHAVE = 'varzea_prefs';

export const PREFS_PADRAO = {
  notificacoes: true,
  lembreteProximaPartida: true,
  campeonatoFinalizado: false,
};

export async function obterPreferencias() {
  const gravadas = await obterLocal(CHAVE);
  return { ...PREFS_PADRAO, ...(gravadas || {}) };
}

/**
 * Grava em fila: ler-alterar-gravar nao e atomico, e dois toques rapidos
 * em switches diferentes poderiam perder uma das mudancas.
 */
let fila = Promise.resolve();

export function salvarPreferencias(prefs) {
  fila = fila.then(async () => {
    const atual = await obterPreferencias();
    const proxima = { ...atual, ...prefs };
    await salvarLocal(CHAVE, proxima);
    return proxima;
  });
  return fila;
}
