/**
 * Camera, galeria, GPS, permissoes e aviso local.
 * Nenhuma tela importa expo-* direto — so este modulo.
 *
 * A permissao e pedida na hora do uso, nunca na abertura do app: o sistema
 * e as lojas penalizam quem pede tudo de uma vez, e assim o usuario entende
 * para que serve.
 */
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { isRunningInExpoGo } from 'expo';
import { Platform } from 'react-native';

const CANAL_ANDROID = 'varzea';

let handlerPronto = false;

export function configurarNotificacoes() {
  if (handlerPronto) {
    return;
  }
  handlerPronto = true;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

function recusarSeWeb() {
  if (Platform.OS === 'web') {
    throw new Error('Recurso nativo indisponível no navegador.');
  }
}

/**
 * A URI devolvida aponta para o cache do app. Se o sistema limpar o cache a
 * imagem some; Escudo e Avatar tratam isso com onError e voltam ao padrao.
 * Para sobreviver a limpeza seria preciso copiar o arquivo para o diretorio
 * de documentos com expo-file-system.
 */
const OPCOES_IMAGEM = {
  mediaTypes: ['images'],
  quality: 0.6,
  allowsEditing: true,
  aspect: [1, 1],
};

export async function capturarFoto() {
  recusarSeWeb();
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permissão da câmera negada.');
  }
  const resultado = await ImagePicker.launchCameraAsync(OPCOES_IMAGEM);
  if (resultado.canceled) {
    return null;
  }
  return { uri: resultado.assets[0].uri };
}

export async function escolherImagem() {
  recusarSeWeb();
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permissão da galeria negada.');
  }
  const resultado = await ImagePicker.launchImageLibraryAsync(OPCOES_IMAGEM);
  if (resultado.canceled) {
    return null;
  }
  return { uri: resultado.assets[0].uri };
}

/** so pede localizacao enquanto o app esta em uso, nunca em segundo plano */
export async function obterPosicao() {
  recusarSeWeb();
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permissão de localização negada.');
  }
  const pos = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  return {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
    precisao: pos.coords.accuracy,
  };
}

export async function statusPermissoes() {
  if (Platform.OS === 'web') {
    return {
      camera: 'indisponivel',
      galeria: 'indisponivel',
      localizacao: 'indisponivel',
      notificacoes: 'indisponivel',
    };
  }
  const [cam, gal, loc, notif] = await Promise.all([
    ImagePicker.getCameraPermissionsAsync(),
    ImagePicker.getMediaLibraryPermissionsAsync(),
    Location.getForegroundPermissionsAsync(),
    Notifications.getPermissionsAsync(),
  ]);
  return {
    camera: cam.status,
    galeria: gal.status,
    localizacao: loc.status,
    notificacoes: notif.status,
  };
}

export async function pedirPermissaoNotificacao() {
  recusarSeWeb();
  configurarNotificacoes();

  if (Platform.OS === 'android' && !isRunningInExpoGo()) {
    await Notifications.setNotificationChannelAsync(CANAL_ANDROID, {
      name: 'Copa Várzea',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const atual = await Notifications.getPermissionsAsync();
  let status = atual.status;
  if (status !== 'granted') {
    const pedido = await Notifications.requestPermissionsAsync();
    status = pedido.status;
  }
  return status === 'granted';
}

/** aviso do proprio aparelho; nao e push remoto, nao existe servidor aqui */
export async function enviarAvisoLocal({ titulo, corpo, segundos = 2 }) {
  const ok = await pedirPermissaoNotificacao();
  if (!ok) {
    throw new Error('Permissão de notificação negada.');
  }
  await Notifications.scheduleNotificationAsync({
    content: { title: titulo, body: corpo },
    trigger: {
      type: 'timeInterval',
      seconds: segundos,
      ...(Platform.OS === 'android' && !isRunningInExpoGo()
        ? { channelId: CANAL_ANDROID }
        : {}),
    },
  });
}

export async function cancelarAvisos() {
  if (Platform.OS === 'web') return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}
