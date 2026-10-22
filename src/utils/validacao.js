export const LIMITES = {
  nomeMin: 2,
  nomeMax: 60,
  senhaMin: 4,
  camisaMin: 1,
  camisaMax: 99,
  placarMax: 99,
};

/**
 * um @ e texto dos dois lados; TLD (.com) opcional para aceitar
 * logins curtos. Didático, não é RFC 5322.
 */
export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+(\.[^\s@]+)?$/;

export function validarNome(valor, { rotulo = 'nome' } = {}) {
  const nome = String(valor ?? '').trim();
  if (!nome) return `Informe o ${rotulo}.`;
  if (nome.length < LIMITES.nomeMin) {
    return `O ${rotulo} precisa ter pelo menos ${LIMITES.nomeMin} caracteres.`;
  }
  if (nome.length > LIMITES.nomeMax) {
    return `O ${rotulo} pode ter no máximo ${LIMITES.nomeMax} caracteres.`;
  }
  return null;
}

export function validarLogin(valor) {
  const login = String(valor ?? '').trim();
  if (!login) return 'Informe o e-mail ou usuário.';
  if (login.includes('@') && !REGEX_EMAIL.test(login)) {
    return 'E-mail inválido. Use o formato nome@dominio.com.';
  }
  return null;
}

export function validarSenha(valor, { minima = false } = {}) {
  if (!valor) return 'Informe a senha.';
  if (minima && valor.length < LIMITES.senhaMin) {
    return `A senha precisa ter pelo menos ${LIMITES.senhaMin} caracteres.`;
  }
  return null;
}

export function validarSelecao(valor, { rotulo = 'uma opção' } = {}) {
  if (!valor) return `Selecione ${rotulo}.`;
  return null;
}

export function validarNumeroCamisa(valor) {
  const texto = String(valor ?? '').trim();
  if (!texto) return 'Informe o número da camisa.';
  const numero = Number(texto);
  if (!Number.isInteger(numero)) return 'O número da camisa deve ser inteiro.';
  if (numero < LIMITES.camisaMin || numero > LIMITES.camisaMax) {
    return `O número da camisa deve ser entre ${LIMITES.camisaMin} e ${LIMITES.camisaMax}.`;
  }
  return null;
}

export function validarPlacar(valor) {
  const texto = String(valor ?? '').trim();
  if (texto === '') return 'Informe o placar.';
  const numero = Number(texto);
  if (!Number.isInteger(numero)) return 'O placar deve ser um número inteiro.';
  if (numero < 0) return 'O placar não pode ser negativo.';
  if (numero > LIMITES.placarMax) return `O placar não pode passar de ${LIMITES.placarMax}.`;
  return null;
}

/** espera AAAA-MM-DD (formato do seletor de data) */
export function validarData(valor) {
  const texto = String(valor ?? '').trim();
  if (!texto) return 'Informe a data.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return 'Use o formato AAAA-MM-DD.';
  const [ano, mes, dia] = texto.split('-').map(Number);
  if (mes < 1 || mes > 12) return 'Mês inválido.';
  const ultimoDia = new Date(ano, mes, 0).getDate();
  if (dia < 1 || dia > ultimoDia) return 'Dia inválido para esse mês.';
  return null;
}

/** espera HH:MM em 24 horas */
export function validarHora(valor) {
  const texto = String(valor ?? '').trim();
  if (!texto) return 'Informe o horário.';
  if (!/^\d{2}:\d{2}$/.test(texto)) return 'Use o formato HH:MM.';
  const [hora, minuto] = texto.split(':').map(Number);
  if (hora > 23) return 'Hora inválida.';
  if (minuto > 59) return 'Minuto inválido.';
  return null;
}

export function validarTimesDiferentes(mandanteId, visitanteId) {
  if (!mandanteId || !visitanteId) return null;
  if (mandanteId === visitanteId) {
    return 'O time mandante e o visitante devem ser diferentes.';
  }
  return null;
}

/** primeiro erro do mapa { campo: mensagem|null } — ou null se todos ok */
export function primeiroErro(mapa) {
  return Object.values(mapa).find(Boolean) ?? null;
}

/** só mostra o erro depois que o usuário saiu do campo ou tentou enviar */
export function erroVisivel(tocados, erros, campo) {
  return tocados[campo] ? erros[campo] : null;
}
