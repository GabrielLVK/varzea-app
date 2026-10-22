const DIAS_SEMANA = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

/** 2026-09-10 -> 10/09/2026 */
export function formatarData(iso) {
  if (!iso) return '';
  const [ano, mes, dia] = String(iso).split('-');
  if (!ano || !mes || !dia) return String(iso);
  return `${dia}/${mes}/${ano}`;
}

/** 2026-09-10 -> 10/09 */
export function formatarDataCurta(iso) {
  if (!iso) return '';
  const [, mes, dia] = String(iso).split('-');
  if (!mes || !dia) return String(iso);
  return `${dia}/${mes}`;
}

/** 2026-09-12 + 15:00 -> "Sábado, 15:00" */
export function formatarDiaHora(iso, hora) {
  if (!iso) return hora ?? '';
  const [ano, mes, dia] = String(iso).split('-').map(Number);
  const data = new Date(ano, mes - 1, dia);
  const nomeDia = DIAS_SEMANA[data.getDay()] ?? '';
  return hora ? `${nomeDia}, ${hora}` : nomeDia;
}

/** pluralizar(1, 'jogador', 'jogadores') -> "1 jogador" */
export function pluralizar(quantidade, singular, plural) {
  const n = Number(quantidade) || 0;
  return `${n} ${n === 1 ? singular : plural}`;
}

/** "Unidos da Várzea" -> "UN" (usado quando o time não tem escudo) */
export function iniciaisDoTime(nome) {
  return String(nome ?? '')
    .trim()
    .slice(0, 2)
    .toUpperCase();
}

export function ordinal(posicao) {
  return `${posicao}º`;
}

export function novoId() {
  return Math.random().toString(36).slice(2, 9);
}
