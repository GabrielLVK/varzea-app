import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App);
// Garante que o app suba igual no Expo Go e num build nativo.
registerRootComponent(App);
