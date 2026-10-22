import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icone } from '../components/atoms/Icone';
import { SobreScreen } from '../screens/SobreScreen';
import { TimesScreen } from '../screens/TimesScreen';
import { cores, tipografia } from '../theme';
import { CampeonatoStack } from './CampeonatoStack';

const Tabs = createBottomTabNavigator();

function icone(nome) {
  return function TabBarIcon({ color }) {
    return <Icone nome={nome} tamanho={20} cor={color} />;
  };
}

export function TorcedorTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.textoSecundario,
        tabBarStyle: {
          backgroundColor: cores.superficie,
          borderTopColor: cores.borda,
        },
        tabBarLabelStyle: {
          fontSize: tipografia.legenda,
          fontWeight: '700',
        },
      }}>
      <Tabs.Screen
        name="Campeonato"
        component={CampeonatoStack}
        options={{ title: 'Campeonato', tabBarIcon: icone('Trophy') }}
      />
      <Tabs.Screen
        name="Times"
        component={TimesScreen}
        options={{ title: 'Times', tabBarIcon: icone('Users') }}
      />
      <Tabs.Screen
        name="Sobre"
        component={SobreScreen}
        options={{ title: 'Sobre', tabBarIcon: icone('Info') }}
      />
    </Tabs.Navigator>
  );
}
