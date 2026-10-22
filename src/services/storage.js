/**
 * SERVICE — storage
 *
 * Duas camadas, por motivos diferentes:
 *
 * - sessão (token e usuário) em `expo-secure-store`, criptografado — é o que
 *   a referência MeuAppExpo faz;
 * - coleções do campeonato em `AsyncStorage`, porque o SecureStore tem limite
 *   de ~2 KB por chave e a lista de jogadores passa disso.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const CHAVE_TOKEN = 'varzea_token';
const CHAVE_USUARIO = 'varzea_usuario';

const noWeb = Platform.OS === 'web';

// --- sessão (SecureStore) --------------------------------------------------

async function setItemSeguro(chave, valor) {
  if (noWeb) {
    localStorage.setItem(chave, valor);
    return;
  }
  await SecureStore.setItemAsync(chave, valor);
}

async function getItemSeguro(chave) {
  if (noWeb) {
    return localStorage.getItem(chave);
  }
  return SecureStore.getItemAsync(chave);
}

async function removeItemSeguro(chave) {
  if (noWeb) {
    localStorage.removeItem(chave);
    return;
  }
  await SecureStore.deleteItemAsync(chave);
}

export async function salvarToken(token) {
  await setItemSeguro(CHAVE_TOKEN, token);
}

export async function obterToken() {
  return getItemSeguro(CHAVE_TOKEN);
}

export async function removerToken() {
  await removeItemSeguro(CHAVE_TOKEN);
  await removeItemSeguro(CHAVE_USUARIO);
}

export async function salvarUsuario(usuario) {
  await setItemSeguro(CHAVE_USUARIO, JSON.stringify(usuario));
}

export async function obterUsuario() {
  const bruto = await getItemSeguro(CHAVE_USUARIO);
  if (!bruto) return null;
  try {
    return JSON.parse(bruto);
  } catch {
    return null;
  }
}

// --- coleções do campeonato (AsyncStorage) ---------------------------------

/**
 * Lê a coleção. Na primeira vez grava o seed recebido, para que o app já
 * abra com o campeonato montado.
 */
export async function obterColecao(chave, seed = []) {
  const bruto = await AsyncStorage.getItem(chave);
  if (bruto === null) {
    await AsyncStorage.setItem(chave, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(bruto);
  } catch {
    return seed;
  }
}

export async function salvarColecao(chave, valor) {
  await AsyncStorage.setItem(chave, JSON.stringify(valor));
  return valor;
}

/** usado pela tela de configurações do painel para voltar aos dados de exemplo */
export async function limparColecoes(chaves) {
  await AsyncStorage.multiRemove(chaves);
}
