import { ApiError } from './api';
import { aguardar, USAR_DADOS_LOCAIS } from './config';
import { ORGANIZADOR_SEED } from './mock/dados';
import {
  obterToken,
  obterUsuario,
  removerToken,
  salvarToken,
  salvarUsuario,
} from './storage';

async function persistirSessao(usuario, token) {
  await Promise.all([salvarToken(token), salvarUsuario(usuario)]);
  return { token, usuario };
}

export async function login(loginOuEmail, senha) {
  await aguardar(400);

  if (!USAR_DADOS_LOCAIS) {
    throw new ApiError('Backend ainda não configurado.', 0, 'rede');
  }

  const informado = String(loginOuEmail ?? '').trim().toLowerCase();
  const esperado = ORGANIZADOR_SEED.login.toLowerCase();

  if (informado !== esperado || senha !== ORGANIZADOR_SEED.senha) {
    throw new ApiError('Usuário ou senha inválidos.', 401, 'local');
  }

  const usuario = {
    id: ORGANIZADOR_SEED.id,
    nome: ORGANIZADOR_SEED.nome,
    login: ORGANIZADOR_SEED.login,
  };

  return persistirSessao(usuario, `local-${Date.now().toString(36)}`);
}

export async function sessaoAtiva() {
  const token = await obterToken();
  return Boolean(token);
}

export async function obterSessao() {
  return obterUsuario();
}

export async function logout() {
  await removerToken();
}
