# Especificações: CSS & Acessibilidade

O jogo traz como requisito principal não apenas a imersão em sua estética Preto e Branco ("Dark Mystery"), mas sim que qualquer um que precise ler e acessar seja acomodado sem prejudicar a infraestrutura nativa do React.

## Acessibilidade via Variáveis CSS e Tailwind

Acessibilidade costuma poluir excessivamente um arquivo `.js `. Para manter as coisas enxutas e em alta performance, todas as alterações de tamanho e cor na verdade são feitas manipulando **Variáveis Customizadas de CSS (`:root`)**.

As principais propriedades no topo do arquivo `index.css`:
```css
:root {
  --color-bg: #000000;
  --color-fg: #f5f5f5;
  --color-primary: #ffffff;
  --color-accent: #666666;
  
  --font-base-size: 16px;
  --font-family-game: "Courier New", monospace;
  --text-speed: 50ms;
}
```

O `tailwind.config.js` estende o CSS injetado e entende tudo isso magicamente, como `bg-background` que compila lendo `var(--color-bg)`.

### Componente `AccessibilityMenu.tsx`
Essa é a ponte unindo a aplicação React e nossos estilos Vanilla:
- **Range de Tamanho de Fonte:** Variando de 12px a 32px, a mudança executa diretamente o método DOM `document.documentElement.style.setProperty('--font-base-size')`. Toda UI do jogo engajada com `text-sm`, ou `text-xl` irá escalar harmoniosamente e fluidamente ao vivo sem estourar o renderizador do estado do Zustand nem engasgar `useEffects` pesados.
- **Botão Alto Contraste:** Alterna a classe `.high-contrast` no nó principal do documento `<html>`, tornando o texto "Inter" sem serifas e tudo mais legível, visível e distinguível.
