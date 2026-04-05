# Visão Geral - Silent Echoes (Visual Novel Engine)

## O que é o projeto?
O projeto consiste em uma engine customizada de *Visual Novel* para a web, com foco em uma estética de mistério e suspense (preto e branco) e na entrega de **acessibilidade robusta** logo de fábrica. 

A aplicação foi estruturada para ser facilmente escalável. Em vez de acoplar o roteiro ao código da interface, os dados de história são separados da árvore de renderização. 

## Tecnologias e Especificações Base
A engine se apoia em uma stack de desenvolvimento ágil e moderna:

* **Ferramenta de Build:** Vite + Node.js 24
* **Linguagem:** TypeScript (Strict mode via `tsc`)
* **Biblioteca UI:** React DOM
* **Estilização:** TailwindCSS v4 integrado via PostCSS, mais variáveis CSS globais
* **Gerenciamento de Estado:** Zustand
* **Roteamento:** React Router DOM
* **Animações e Efeitos Plásticos:** Framer Motion
* **Iconografia:** Lucide React

## Funcionalidades Principais
1. **Atmosfera Suspense:**
   Controles refinados para transição e aparições com comportamento "Glitch".
2. **Cenas Dinâmicas (`SceneViewer`):**
   Suporte a fundos que não são estáticos; ao passar um vetor (`array`) com mais de uma imagem para o sistema, ele a converte em uma animação fluída com atrasos configuráveis.
3. **Máquina de Escrever Variável (`DialogBox`):**
   Texto narrativo e falas aparecem dígito por dígito.
4. **Painel de Acessibilidade Dedicado:**
   Um overlay customizável com edição de *tamanho de fonte*, alternância de tema global para *alto contraste / alta legibilidade* e adaptação da *velocidade primária do texto*.
5. **Progresso Desbloqueável:**
   Um sistema de "Arquivos Confidenciais" trava e destrava ramificações e capítulos inteiros baseados no que o jogador escolhe.

## Arquitetura de Internacionalização (i18n)
O jogo agora suporta múltiplos idiomas de forma nativa e flexível, utilizando o ecossistema `i18next` e `react-i18next`. A arquitetura foi projetada para manter os roteiros desacoplados:

* **Arquivos de Tradução (`src/locales/`):** Os dicionários de tradução estão estruturados em arquivos JSON localizados de forma limpa (`en.json` e `pt-BR.json`), comportando tanto chaves globais da interface UI quanto os blocos inteiros das histórias literárias.
* **Uso Baseado em Chaves de Tradução:** Nos arquivos de dados dos capítulos (`chapter1.ts`, etc.), ao invés de usar strings "hardcoded" (imunes a alteração), fazemos referências a caminhos de propriedades do i18n, como `chapters.chapter1.scene_1.character`.
* **UI Dinamizada (`useTranslation`):** Durante o motor girar o `Gameplay`, os componentes repassam essas chaves para o framework resolver e plotar a frase requisitada em tempo real.
* **Estado Global de Idioma:** Integrado junto às configurações acessíveis no Hook `useSettingsStore`, permitindo que jogadores comutem seu idioma no Menu a qualquer momento sem recarregar a janela.

## Atualizações Recentes do Motor
1. **Refatoração Radical em Acessibilidade:** O menu flutuante anterior tornou-se robusto com as primitivas modais do `@radix-ui/react-dialog`. O fechamento e as hierarquias de foco nativas se alinham bem aos cliques mortos e teclas utilitárias como `<ESC>`.
2. **Motor Sonoro Nativo (Máquina de Escrever):** Sem requisições assíncronas custosas pendentes, os efeitos sonoros de pressionar tecla foram contornados simulando ruído pela **Web Audio API** (`src/utils/audio.ts`). Um slider de *Volume Principal* coordena a força do ganho de onda sonora.
3. **Ergonomia e Lapidação (UX/UI):** A percepção do usuário foi polida (deslizar a barra de velocidade à direita converte logicamente a intenção humana para rápido `ms`), animações de crack, dissolvência cinemática customizada em loops e fading foram garanthidas com o Framer Motion.
