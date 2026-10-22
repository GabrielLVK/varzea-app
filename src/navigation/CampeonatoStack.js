import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EstatisticasScreen } from '../screens/EstatisticasScreen';
import { InicioScreen } from '../screens/InicioScreen';
import { JogosScreen } from '../screens/JogosScreen';
import { TabelaScreen } from '../screens/TabelaScreen';

const Stack = createNativeStackNavigator();

export function CampeonatoStack() {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="Tabela" component={TabelaScreen} />
      <Stack.Screen name="Jogos" component={JogosScreen} />
      <Stack.Screen name="Estatisticas" component={EstatisticasScreen} />
    </Stack.Navigator>
  );
}
