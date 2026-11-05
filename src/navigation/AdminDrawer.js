import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Alert, StyleSheet, View } from 'react-native';

import { Icone } from '../components/atoms/Icone';
import { Label } from '../components/atoms/Label';
import { AdminConfigScreen } from '../screens/AdminConfigScreen';
import { AdminDashboardScreen } from '../screens/AdminDashboardScreen';
import { AdminEquipesScreen } from '../screens/AdminEquipesScreen';
import { AdminJogadoresScreen } from '../screens/AdminJogadoresScreen';
import { AdminJogosScreen } from '../screens/AdminJogosScreen';
import { AdminRecursosScreen } from '../screens/AdminRecursosScreen';
import { AdminSumulaScreen } from '../screens/AdminSumulaScreen';
import { logout } from '../services/auth';
import { cores, espacamentos } from '../theme';
import { voltarAoTorcedor } from './acoes';
import { ADMIN_OPCOES } from './adminOpcoes';
import { opcoesCabecalho } from './opcoes';

const Drawer = createDrawerNavigator();
const COMPONENTES_ADMIN = {
  AdminEquipes: AdminEquipesScreen,
  AdminJogadores: AdminJogadoresScreen,
  AdminJogos: AdminJogosScreen,
  AdminSumula: AdminSumulaScreen,
  AdminRecursos: AdminRecursosScreen,
  AdminConfig: AdminConfigScreen,
};

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
    <DrawerContentScrollView
      {...props}
      style={styles.menu}
      contentContainerStyle={styles.menuConteudo}>
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
      initialRouteName="AdminDashboard"
      screenOptions={{
        ...opcoesCabecalho,
        drawerActiveTintColor: cores.primaria,
        drawerInactiveTintColor: cores.textoSecundario,
        drawerStyle: styles.drawer,
        overlayColor: 'rgba(0, 0, 0, 0.72)',
        sceneStyle: styles.cena,
      }}>
      <Drawer.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          title: 'Dashboard',
          drawerLabel: 'Início',
          drawerIcon: icone('House'),
        }}
      />
      {ADMIN_OPCOES.map(opcao => {
        return (
          <Drawer.Screen
            key={opcao.rota}
            name={opcao.rota}
            component={COMPONENTES_ADMIN[opcao.rota]}
            options={{
              title: opcao.titulo,
              drawerLabel: opcao.rotuloMenu,
              drawerIcon: icone(opcao.icone),
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: cores.fundo,
  },
  cena: {
    backgroundColor: cores.fundo,
  },
  menu: {
    backgroundColor: cores.fundo,
  },
  menuConteudo: {
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.md,
    gap: espacamentos.xxs,
  },
});
