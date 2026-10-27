# VárzeaApp — Copa Várzea 2026 (Expo)

App mobile do campeonato de várzea, com **visão do torcedor** (próxima partida,
tabela, jogos, estatísticas e elencos) e **painel do organizador** (equipes,
jogadores, agenda e súmula).

Construído em **React Native + Expo**, com **Atomic Design**, **React Navigation**
(pilha + abas + menu lateral) e camada de **services** isolada — seguindo a
organização dos projetos de referência da disciplina de Desenvolvimento para
Dispositivos Móveis.

Usa **câmera, galeria, GPS, notificações locais** e **armazenamento seguro de
credenciais** — veja [Recursos nativos e permissões](#recursos-nativos-e-permissões).

## Requisitos

- Node.js **22** (há um `.nvmrc` — rode `nvm use` antes dos comandos npm)
- Expo Go no celular **ou** emulador Android / simulador iOS

> Com Node 20 o Metro Bundler não inicia, e o sintoma no emulador é uma tela
> vermelha **"Unable to load script"** — que parece erro de código, mas não é.

## Instalação

```bash
nvm use          # se usar nvm
npm install
```

## Rodar

```bash
npx expo start
```

Depois escaneie o QR code com o **Expo Go**, ou abra direto no emulador:

```bash
npx expo start --android
# ou
npx expo start --ios
```

## Acesso ao painel do organizador

A área do torcedor é aberta, sem login. Para entrar no painel, toque em
**Área do ADM** no topo de qualquer tela do campeonato.

| Login | Senha |
|-------|-------|
| `organizador@varzea.com` | `varzea2026` |

A sessão fica gravada no aparelho: ao reabrir o app e tocar em *Área do ADM*,
o login é pulado. O item **Sair** do menu lateral encerra a sessão.

### Onde cada coisa é gravada

`src/services/storage.js` separa duas gavetas, e só ele sabe qual é qual —
quem chama pede `salvarLocal` / `obterLocal` e não conhece o SecureStore:

| Gaveta | Onde | O que guarda | Sai no logout |
|--------|------|--------------|---------------|
| Segredo | `expo-secure-store` (Keychain no iOS, EncryptedSharedPreferences no Android) | o token da sessão | sim |
| Local | `AsyncStorage` | usuário, foto de perfil, preferências e as coleções do campeonato | só o que é da sessão |

A **senha nunca é gravada** — ela só existe no estado do formulário de login.
O cofre é aberto com `WHEN_UNLOCKED_THIS_DEVICE_ONLY`: o token exige o aparelho
desbloqueado e não vai para backup nem para outro aparelho.

## Telas

| Tela | Função |
|------|--------|
| Início | próxima partida, destaques (artilheiro e melhor ataque) e compartilhar |
| Tabela | classificação do grupo com P/J/V/E/D |
| Jogos | calendário filtrado por Encerrados / Próximos |
| Estatísticas | assistências, artilharia, melhor defesa, pior ataque e disciplina |
| Times | busca de equipes e elenco expansível |
| Sobre | o que é o app e como os dados funcionam |
| Partida | detalhe do confronto e os dois elencos |
| Painel · Equipes | cadastrar, editar e excluir equipes |
| Painel · Jogadores | montar o elenco de cada equipe |
| Painel · Jogos | agendar confrontos |
| Painel · Súmula | lançar placar e eventos (gols e cartões) |
| Painel · Câmera e GPS | estado das permissões e teste de cada recurso nativo |
| Painel · Configurações | ligar/desligar avisos e marcar o campeonato como finalizado |

Publicar uma súmula atualiza o placar, o cartel dos jogadores e a
classificação — e o resultado aparece nas telas do torcedor.

## Recursos nativos e permissões

Todo acesso a recurso do aparelho passa por **`src/services/nativos.js`** —
nenhuma tela importa `expo-camera`, `expo-location` ou `expo-notifications`
direto. Trocar de biblioteca mexe num arquivo só.

| Recurso | Onde aparece | Pacote |
|---------|--------------|--------|
| Câmera e galeria | escudo da equipe e foto do jogador | `expo-image-picker` |
| Localização | marcar onde fica o campo, ao agendar um jogo | `expo-location` |
| Notificação local | súmula publicada e jogo novo na agenda | `expo-notifications` |
| Cofre de credenciais | token da sessão do organizador | `expo-secure-store` |

### Quando o app pede permissão

A permissão é pedida **na hora do uso**, nunca na abertura do app: assim o
usuário entende para que serve, e negar um recurso não trava os outros.
Tocar em *Tirar foto* é o que dispara o pedido da câmera; agendar um jogo e
tocar em *Usar minha localização* é o que dispara o pedido do GPS.

Se a permissão for negada, a tela mostra o motivo e segue funcionando sem
aquele recurso — a foto fica opcional e o campo continua sendo texto livre.
Para rever o que já foi concedido, use **Painel · Câmera e GPS**; permissão
negada em definitivo só volta pelos Ajustes do sistema.

### Notificações

São **avisos locais**, agendados pelo próprio aparelho — não existe servidor
de push neste projeto. Eles respeitam os switches de **Painel · Configurações**,
e uma falha ao notificar nunca derruba a ação principal: a súmula é publicada
mesmo que o aviso não saia.

No Expo Go o Android pode mostrar um aviso sobre notificações push; ele não
afeta este app, que não usa push remoto. Para testar os recursos nativos sem
nenhuma ressalva, o caminho garantido é um *development build*
(`npx expo run:android`), que precisa de Android Studio instalado.

### Declarações de permissão

Os textos que o sistema exibe ao pedir cada permissão estão no `app.json`:
`infoPlist` (iOS) e `permissions` + plugins (Android). Mudar de ideia sobre
quais recursos o app usa é mudar esse arquivo — e, como ele vira código
nativo, exige refazer o build.

## Origem dos dados

Esta versão roda com **dados locais**: os serviços leem do armazenamento do
aparelho, partindo dos seeds de `src/services/mock/dados.js` na primeira
abertura.

A troca para um backend real está isolada em `src/services/`:

1. `src/services/config.js` — vire `USAR_DADOS_LOCAIS` para `false` e ajuste a URL
2. `src/services/api.js` — já traz `apiRequest`, `ApiError`, timeout e tratamento de 401
3. reimplemente `time.js`, `jogador.js`, `partida.js`, `estatistica.js` e `auth.js`
   em cima de `apiRequest`

Nenhuma tela precisa mudar.

| Ambiente | Host padrão |
|----------|-------------|
| iOS Simulator | `http://localhost:8080` |
| Android Emulator | `http://10.0.2.2:8080` |
| Dispositivo físico | IP da sua máquina na LAN |

## Estrutura (Atomic Design)

```
App.js                      pilha raiz + NavigationContainer + SafeAreaProvider
index.js
assets/                     escudos, fotos e ícone do app
src/
├── components/
│   ├── atoms/              Label, Button, IconButton, Input, Select, Badge,
│   │                       Avatar, Escudo, Icone
│   ├── molecules/          FormField, SelectField, ErrorMessage, SuccessMessage,
│   │                       EstadoCarga, SectionCard, LeaderCard, InfoChip,
│   │                       SearchBar, TeamBadge, TeamLine, MatchCard,
│   │                       StandingRow, PlayerRankRow, StatCard, TeamRow,
│   │                       SquadRow, HighlightRow, CartoesResumo, Stepper,
│   │                       CardToggle, AdminListItem, ListaVazia,
│   │                       SeletorImagem, MarcadorLocal
│   ├── organisms/          CabecalhoCampeonato, NavChips, ProximaPartida,
│   │                       Destaques, BannerCompartilhar, TabelaClassificacao,
│   │                       ListaPartidas, LideresEstatisticas, DiretorioTimes,
│   │                       LoginAdminForm, FormEquipe, FormJogador,
│   │                       FormPartida, FormSumula
│   └── templates/          TorcedorTemplate, CenteredTemplate, ScreenTemplate
├── screens/                as telas reais (torcedor e painel)
├── navigation/             TorcedorTabs, CampeonatoStack, AdminDrawer, acoes, opcoes
├── services/               sem UI (api, auth, storage, nativos, avisos, preferencias,
│                           perfilLocal, time, jogador, partida, estatistica)
├── theme/                  tokens: cores, espaçamentos, raios, tipografia, fontes
├── constants/              janela da FlatList, domínio do campeonato, mapa de imagens
└── utils/                  validação e formatação (funções puras)
```

A dependência sempre aponta para baixo: a **screen** combina **organisms**, que
combinam **molecules**, que combinam **atoms**. Um atom nunca importa uma screen.
O `App.js` contém **apenas a navegação**.

## Navegação

```
Stack raiz
├── Torcedor (abas inferiores)
│   ├── Campeonato (pilha) → Início | Tabela | Jogos | Estatísticas
│   ├── Times
│   └── Sobre
├── PartidaDetalhe
├── AdminLogin
└── AdminArea (menu lateral) → Equipes | Jogadores | Jogos | Súmula + Sair
```

As quatro seções do campeonato são trocadas pelas chips do topo
(`organisms/NavChips`), que navegam dentro da pilha `CampeonatoStack`.

## Material de referência

A organização deste projeto segue os materiais da disciplina, disponíveis no
repositório de referência
[`desenvmobile`](https://gitlab.com/marcos.moretto/desenvmobile):
Atomic Design e layout, navegação, formulários e validação, listas e
desempenho, e consumo de REST com carregamento e erro.

## Problemas comuns

- **Metro não sobe**: Node antigo — rode `nvm use` / Node 22.
- **Tela vermelha "Unable to load script"**: mesma causa acima.
- **Fontes não carregam**: confira a conexão na primeira execução;
  `@expo-google-fonts/archivo` baixa os arquivos no build.
- **Dados "presos"**: as coleções ficam no armazenamento do aparelho.
  Desinstalar o app (ou limpar os dados) volta para os seeds.
- **Permissão negada não pergunta de novo**: é o sistema, não o app — depois
  de negar duas vezes, só pelos Ajustes do aparelho.
- **Foto sumiu**: a câmera devolve um arquivo no cache do app, e o sistema
  pode limpar esse cache. O escudo volta a mostrar as iniciais; basta tirar
  outra.
- **GPS não responde no emulador**: o Android Emulator só tem a posição que
  você define em *Extended controls · Location*.
