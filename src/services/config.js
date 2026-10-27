/**
 * Configuração da camada de dados.
 *
 * Hoje o app roda com dados locais (`USAR_DADOS_LOCAIS = true`): os serviços
 * leem do armazenamento do aparelho, com os seeds de `mock/dados.js` na
 * primeira abertura.
 *
 * Quando existir backend, basta virar a flag para false e implementar as
 * funções em cima de `apiRequest` — nenhuma tela precisa mudar.
 *
 * HTTP so vale em desenvolvimento (localhost / emulador).
 * Em producao use HTTPS: sem TLS o token viaja em texto puro na rede.
 *
 * Android emulator -> 10.0.2.2 | iOS simulator -> localhost
 * Em dispositivo físico, use o IP da máquina na LAN.
 */
import { Platform } from 'react-native';

export const USAR_DADOS_LOCAIS = true;

export const API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:8080',
  ios: 'http://localhost:8080',
  default: 'http://localhost:8080',
});

export const API_PREFIX = `${API_BASE_URL}/varzea/api/v1`;

/** atraso simulado para os estados de carregando aparecerem como numa API real */
export const ATRASO_SIMULADO_MS = 220;

export function aguardar(ms = ATRASO_SIMULADO_MS) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
