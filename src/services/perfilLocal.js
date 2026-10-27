/**
 * Foto do organizador e ultimo campo marcado ficam so no aparelho —
 * sao dado pessoal ligado a conta, entao somem no logout.
 *
 * A foto e guardada como URI. O arquivo vive no cache do app: se o sistema
 * limpar o cache, a imagem some e o app volta ao placeholder. Para sobreviver
 * a isso seria preciso copiar o arquivo para o diretorio de documentos com
 * expo-file-system.
 */
import { obterLocal, removerLocal, salvarLocal } from './storage';

const CHAVE_FOTO = 'varzea_perfil_foto';
const CHAVE_CAMPO = 'varzea_ultimo_campo';

export async function obterPerfilLocal() {
  const [foto, campo] = await Promise.all([
    obterLocal(CHAVE_FOTO),
    obterLocal(CHAVE_CAMPO),
  ]);
  return { fotoUri: foto?.uri || null, ultimoCampo: campo };
}

/** uri nula apaga a foto — e o que o botao Remover espera */
export async function salvarFotoLocal(uri) {
  if (!uri) {
    await removerLocal(CHAVE_FOTO);
    return;
  }
  await salvarLocal(CHAVE_FOTO, { uri });
}

/** guarda onde o organizador estava ao agendar a ultima partida */
export async function salvarUltimoCampo(coords) {
  if (!coords) {
    await removerLocal(CHAVE_CAMPO);
    return;
  }
  await salvarLocal(CHAVE_CAMPO, {
    latitude: coords.latitude,
    longitude: coords.longitude,
    precisao: coords.precisao ?? null,
    em: Date.now(),
  });
}

export async function limparPerfilLocal() {
  await Promise.all([removerLocal(CHAVE_FOTO), removerLocal(CHAVE_CAMPO)]);
}
