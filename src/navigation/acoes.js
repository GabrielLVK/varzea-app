import { CommonActions } from '@react-navigation/native';

/** id do Stack.Navigator raiz — getParent(id) acha essa pilha a partir de qualquer tela aninhada */
export const ID_PILHA_RAIZ = 'raiz';

function resetar(navigation, rota) {
  const raiz = navigation.getParent(ID_PILHA_RAIZ) ?? navigation;
  raiz.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: rota }],
    }),
  );
}

/**
 * Volta à área do torcedor limpando o histórico.
 * replace() falha se a tela atual mora numa aba ou no drawer — a rota de
 * destino não existe nesses navigators. reset na pilha raiz resolve.
 */
export function voltarAoTorcedor(navigation) {
  resetar(navigation, 'Torcedor');
}

/** usado quando a sessão do organizador expira ou ao sair do painel */
export function voltarAoLoginAdmin(navigation) {
  resetar(navigation, 'AdminLogin');
}
