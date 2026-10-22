import { API_PREFIX } from './config';
import { obterToken, removerToken } from './storage';

export const TIMEOUT_MS = 15000;

export class ApiError extends Error {
  /**
   * status 0 = não houve resposta HTTP (rede ou timeout).
   * causa: 'rede' | 'timeout' | 'http' | 'sessao' | 'local'
   */
  constructor(message, status, causa = 'http') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.causa = causa;
  }
}

function mensagemHttp(status, data) {
  if (data && data.message) return data.message;
  if (status === 400) return 'Pedido inválido.';
  if (status === 401) return 'Sessão expirada. Faça login novamente.';
  if (status === 403) return 'Você não tem permissão para isso.';
  if (status === 404) return 'Recurso não encontrado.';
  if (status === 409) return 'Conflito: esse dado já existe.';
  if (status >= 500) return 'Erro no servidor. Tente mais tarde.';
  return `Erro HTTP ${status}`;
}

export async function apiRequest(
  path,
  { method = 'GET', body, auth = true, timeoutMs = TIMEOUT_MS } = {},
) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = await obterToken();
    if (!token) {
      throw new ApiError('Sessão expirada. Faça login novamente.', 401, 'sessao');
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let response;
  try {
    response = await fetch(`${API_PREFIX}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (e) {
    if (e.name === 'AbortError') {
      throw new ApiError('A API demorou demais. Tente de novo.', 0, 'timeout');
    }
    throw new ApiError(
      'Não foi possível conectar. Confira o backend e o IP em config.js.',
      0,
      'rede',
    );
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    if (response.status === 401 && auth) {
      await removerToken();
    }
    throw new ApiError(mensagemHttp(response.status, data), response.status, 'http');
  }

  return data;
}
