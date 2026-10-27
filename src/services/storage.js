/**
 * Duas gavetas de proposito diferente:
 *
 *   1. Segredo (o token) -> expo-secure-store, que usa o Keychain no iOS e o
 *      EncryptedSharedPreferences no Android.
 *   2. Dado local nao secreto (usuario, preferencias, foto, colecoes) ->
 *      AsyncStorage, que e um arquivo de chave/valor comum.
 *
 * Senha nunca e gravada. So este arquivo sabe qual gaveta e qual: quem chama
 * pede salvarLocal/obterLocal e nao conhece SecureStore.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const CHAVE_TOKEN = 'varzea_token';
const CHAVE_USUARIO = 'varzea_usuario';

/** o cofre so abre com o aparelho desbloqueado, e o segredo nao vai para backup */
const opcoesSeguras = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

const noWeb = Platform.OS === 'web';

// --- gaveta 1: segredo -----------------------------------------------------

async function setSecreto(chave, valor) {
  if (noWeb) {
    localStorage.setItem(chave, valor);
    return;
  }
  await SecureStore.setItemAsync(chave, valor, opcoesSeguras);
}

async function getSecreto(chave) {
  if (noWeb) {
    return localStorage.getItem(chave);
  }
  return SecureStore.getItemAsync(chave);
}

async function removeSecreto(chave) {
  if (noWeb) {
    localStorage.removeItem(chave);
    return;
  }
  await SecureStore.deleteItemAsync(chave);
}

export async function salvarToken(token) {
  await setSecreto(CHAVE_TOKEN, token);
}

export async function obterToken() {
  return getSecreto(CHAVE_TOKEN);
}

export async function removerToken() {
  await removeSecreto(CHAVE_TOKEN);
  await AsyncStorage.removeItem(CHAVE_USUARIO);
  // versoes antigas gravavam o usuario no cofre; limpa o resto esquecido la
  await removeSecreto(CHAVE_USUARIO).catch(() => {});
}

// --- gaveta 2: dado local --------------------------------------------------

export async function salvarUsuario(usuario) {
  await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
}

export async function obterUsuario() {
  const bruto = await AsyncStorage.getItem(CHAVE_USUARIO);
  if (!bruto) return null;
  try {
    return JSON.parse(bruto);
  } catch {
    return null;
  }
}

export async function salvarLocal(chave, valor) {
  await AsyncStorage.setItem(chave, JSON.stringify(valor));
  return valor;
}

export async function obterLocal(chave) {
  const bruto = await AsyncStorage.getItem(chave);
  if (!bruto) return null;
  try {
    return JSON.parse(bruto);
  } catch {
    return null;
  }
}

export async function removerLocal(chave) {
  await AsyncStorage.removeItem(chave);
}

// --- colecoes do campeonato ------------------------------------------------

/**
 * Le a colecao. Na primeira vez grava o seed recebido, para que o app ja
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

export async function limparColecoes(chaves) {
  await AsyncStorage.multiRemove(chaves);
}
