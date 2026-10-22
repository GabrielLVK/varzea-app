# VárzeaApp — Copa Várzea 2026 (Expo)

App mobile do campeonato de várzea, com **visão do torcedor** (próxima partida,
tabela, jogos, estatísticas e elencos) e **painel do organizador** (equipes,
jogadores, agenda e súmula).

Construído em **React Native + Expo**, com **Atomic Design**, **React Navigation**
(pilha + abas + menu lateral) e camada de **services** isolada — seguindo a
organização dos projetos de referência da disciplina de Desenvolvimento para
Dispositivos Móveis.

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

A sessão fica gravada no aparelho (`expo-secure-store`): ao reabrir o app e
tocar em *Área do ADM*, o login é pulado. O item **Sair** do menu lateral
encerra a sessão.

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

Publicar uma súmula atualiza o placar, o cartel dos jogadores e a
classificação — e o resultado aparece nas telas do torcedor.

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
│   │                       CardToggle, AdminListItem, ListaVazia
│   ├── organisms/          CabecalhoCampeonato, NavChips, ProximaPartida,
│   │                       Destaques, BannerCompartilhar, TabelaClassificacao,
│   │                       ListaPartidas, LideresEstatisticas, DiretorioTimes,
│   │                       LoginAdminForm, FormEquipe, FormJogador,
│   │                       FormPartida, FormSumula
│   └── templates/          TorcedorTemplate, CenteredTemplate, ScreenTemplate
├── screens/                as telas reais (torcedor e painel)
├── navigation/             TorcedorTabs, CampeonatoStack, AdminDrawer, acoes, opcoes
├── services/               sem UI (api, auth, storage, time, jogador, partida, estatistica)
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
