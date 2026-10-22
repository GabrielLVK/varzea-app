/**
 * App.js — só a pilha raiz + o container de navegação.
 * Abas, drawer e a pilha do campeonato moram em src/navigation/.
 *
 * As fontes Archivo (display) são carregadas aqui: até ficarem prontas o
 * app mostra uma tela de carregamento, para o texto não "pular" de fonte.
 */
// importados arquivo a arquivo de propósito: o import do pacote inteiro
// (`from '@expo-google-fonts/archivo'`) empacota os 18 pesos, ~2,2 MB.
import Archivo_600SemiBold from '@expo-google-fonts/archivo/600SemiBold/Archivo_600SemiBold.ttf';
import Archivo_700Bold from '@expo-google-fonts/archivo/700Bold/Archivo_700Bold.ttf';
import Archivo_800ExtraBold from '@expo-google-fonts/archivo/800ExtraBold/Archivo_800ExtraBold.ttf';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AdminDrawer } from './src/navigation/AdminDrawer';
import { ID_PILHA_RAIZ } from './src/navigation/acoes';
import { opcoesCabecalho } from './src/navigation/opcoes';
import { TorcedorTabs } from './src/navigation/TorcedorTabs';
import { AdminLoginScreen } from './src/screens/AdminLoginScreen';
import { PartidaDetalheScreen } from './src/screens/PartidaDetalheScreen';
import { cores } from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontesProntas] = useFonts({
    Archivo_600SemiBold,
    Archivo_700Bold,
    Archivo_800ExtraBold,
  });

  if (!fontesProntas) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={cores.primaria} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            id={ID_PILHA_RAIZ}
            initialRouteName="Torcedor"
            screenOptions={opcoesCabecalho}>
            <Stack.Screen
              name="Torcedor"
              component={TorcedorTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PartidaDetalhe"
              component={PartidaDetalheScreen}
              options={({ route }) => ({
                title: route.params?.titulo || 'Partida',
              })}
            />
            <Stack.Screen
              name="AdminLogin"
              component={AdminLoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdminArea"
              component={AdminDrawer}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },
});
