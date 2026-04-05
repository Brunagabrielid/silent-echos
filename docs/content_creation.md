# Guia de Especificações (Criação de Conteúdo)

A engine conta com uma forma segura (através da tipagem de Typescript) para elaboradores comporem enredos. O desenvolvedor roteirista apenas precisa criar um objeto no diretório `/data` e importá-lo no Gameplay.

## Contrato de Dados da História

No arquivo de rotas `chapter1.ts`, ou derivados, deve ser exportado um tipo `Chapter`.  Cada cena da história é referenciada por um **ID** em formato de Dicionário / Record. 

### Modelo do objeto `Chapter` e `Scene`
A estrutura central de cada cena se parece com o formato abaixo:
```typescript
interface Scene {
  id: string;                      // Identificador único da passagem
  backgrounds: string[];           // Array das imagens. 1 imagem para imagem fixa; Mais de 1 para Cena Dinâmica intermitente
  character?: string;              // Nome do personagem falando (Opcional, se deixado em branco ele mostra apenas a Box)
  text: string;                    // Texto em tela
  choices?: Choice[];              // Array de possíveis botões visíveis de decisão
  nextSceneId?: string;            // Caso Choices não exista, qual a ID da próxima tela
  delayBetweenFrames?: number;     // Em cenas dinâmicas, ms entre uma imagem e outra (Padrão 500ms)
  triggerUnlock?: string;          // Usado para "Premiar" o usuário, caso essa cena se abra ele irá liberar uma conquista/capítulo do menu principal
}
```

### Como criar navegação (Exemplo Prático)

Para avançar no jogo, basta ligar as trilhas do `nextSceneId`.
```typescript
{
  scene_1: {
    id: "scene_1",
    backgrounds: [img1],
    text: "Olá desenvolvedor.",
    character: "Guia",
    nextSceneId: "scene_2"
  },
  scene_2: {
    id: "scene_2",
    backgrounds: [img2, img3],
    delayBetweenFrames: 350,
    text: "Você prefere a claridade ou as sombras?",
    choices: [
       { text: "Luz", nextSceneId: "end_good" },
       { text: "Trevas", nextSceneId: "end_bad" }
    ]
  }
}
```

### Finalizando ou Saindo para o Menu Principal
Para engatilhar a transição de volta ao menu de forma autônoma durante a narrativa: 
- Deixe uma cena sem definir opções `choices` e nem `nextSceneId`.
- OU utilize um ID que inicie sua _string_ com `end_` (Ex: `nextSceneId: 'end_chap2_bad'`). A macro por trás da tela `Gameplay.tsx` encerra o carregador e ejeta o jogador ao menu.
