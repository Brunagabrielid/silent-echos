# Arquitetura e Estrutura de Diretórios

A estrutura da aplicação visa organizar o código por tipo de utilidade.

## Árvore do Frontend
```plaintext
src/
├── components/          # Componentes globais e de interface
│   ├── novel/           # Tudo relacionado e exclusivo do Gameplay
│   │   ├── DialogBox.tsx
│   │   └── SceneViewer.tsx
│   └── AccessibilityMenu.tsx
├── data/                # Bases de dados contendo os arcos da campanha
│   ├── chapter1.ts
│   └── chapter2.ts
├── screens/             # Rotas de contêineres e Views principais da engine
│   ├── IntroScreen.tsx 
│   ├── MainMenu.tsx
│   ├── ChapterSelect.tsx
│   └── Gameplay.tsx
├── store/               # Lógica de estados com Zustand
│   ├── useGameStore.ts
│   └── useSettingsStore.ts
├── App.tsx              # Componente Raiz de Rotas (AnimatePresence)
├── main.tsx             # Entrypoint da árvore do DOM
└── index.css            # Variáveis CSS e Tailwind entrypoint
```

## Sistema de Estados (Zustand)
A camada de gerência de informações fica desacoplada do React para não causar re-renders pesados e facilitar leitura de dados de qualquer tela. Temos duas "Stores" centrais:

### 1. GameStore `useGameStore.ts`
Cuida exclusivamentedo **Gameplay e Campanha**, possuindo atributos como:
- `currentChapterId`: rastreia em qual capítulo o jogador está atualmente.
- `currentSceneId`: rastreia exatamente qual div de cena o layout deve renderizar pelo IDs.
- `unlockedChapters`: um vetor informando quais etapas a UI da tela `ChapterSelect` deve liberar os "Cadeados". Pode engatilhar novos capítulos programaticamente chamando a função `unlockChapter()`.

### 2. SettingsStore `useSettingsStore.ts`
Cuida do estado dacessibilidade e UI fora do escopo do jogo em si:
- `fontSize` e `textSpeed`: modificam o ambiente via React re-render.
- `highContrast`: Modifica o valor não por props do React, mas engatilhatando as Classes do CSS padrão do Windows e DOM que modificam globalmente o `.high-contrast`.
