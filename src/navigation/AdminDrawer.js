import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Alert, StyleSheet, View } from 'react-native';

import { Icone } from '../components/atoms/Icone';
import { Label } from '../components/atoms/Label';
import { AdminEquipesScreen } from '../screens/AdminEquipesScreen';
import { AdminJogadoresScreen } from '../screens/AdminJogadoresScreen';
import { AdminJogosScreen } from '../screens/AdminJogosScreen';
import { AdminSumulaScreen } from '../screens/AdminSumulaScreen';
import { logout } from '../services/auth';
import { cores, espacamentos } from '../theme';
import { voltarAoTorcedor } from './acoes';
import { opcoesCabecalho } from './opcoes';

const Drawer = createDrawerNavigator();

function icone(nome) {
  return function DrawerIcon({ color }) {
    return <Icone nome={nome} tamanho={20} cor={color} />;
  };
}

function ConteudoMenu(props) {
  function handleSair() {
    Alert.alert('Sair', 'Encerrar a sessão do organizador?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await logout();
          voltarAoTorcedor(props.navigation);
        },
      },
    ]);
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.cabecalho}>
        <Label variante="titulo" cor={cores.primaria}>
          Painel do Organizador
        </Label>
        <Label variante="legenda">Copa Várzea 2026</Label>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Sair"
        onPress={handleSair}
        icon={icone('LogOut')}
        inactiveTintColor={cores.perigo}
      />
    </DrawerContentScrollView>
  );
}

export function AdminDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <ConteudoMenu {...props} />}
      screenOptions={{
        ...opcoesCabecalho,
        drawerActiveTintColor: cores.primaria,
        drawerInactiveTintColor: cores.textoSecundario,
      }}>
      <Drawer.Screen
        name="AdminEquipes"
        component={AdminEquipesScreen}
        options={{
          title: 'Equipes',
          drawerLabel: 'Equipes',
          drawerIcon: icone('Users'),
        }}
      />
      <Drawer.Screen
        name="AdminJogadores"
        component={AdminJogadoresScreen}
        options={{
          title: 'Jogadores',
          drawerLabel: 'Jogadores',
          drawerIcon: icone('UsersRound'),
        }}
      />
      <Drawer.Screen
        name="AdminJogos"
        component={AdminJogosScreen}
        options={{
          title: 'Jogos',
          drawerLabel: 'Jogos',
          drawerIcon: icone('CalendarDays'),
        }}
      />
      <Drawer.Screen
        name="AdminSumula"
        component={AdminSumulaScreen}
        options={{
          title: 'Súmula',
          drawerLabel: 'Súmula',
          drawerIcon: icone('ClipboardList'),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.md,
    gap: espacamentos.xxs,
  },
});
