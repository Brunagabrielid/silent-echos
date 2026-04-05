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
