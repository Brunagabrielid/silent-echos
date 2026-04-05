# Silent Echoes (Visual Novel Engine)

Uma engine customizada de Visual Novel focada em mistério e suspense, entregando alta acessibilidade e suporte global a multi-idiomas. Desenvolvida baseada nas tecnologias de ponta do React e Vite.

## Solucionando Erros no GitHub Pages (Erro 404)

Se ao acessar o seu jogo em `https://brunagabrielid.github.io/silent-echos/` a tela ficar branca e o console do navegador mostrar erros como `GET /src/main.tsx 404 (Not Found)` ou `404 para favicon`, **não se preocupe, o código não está com problemas!**

Esse erro ocorre porque o **GitHub está servindo os arquivos brutos do código-fonte (para desenvolvimento)** em vez de servir os arquivos transformados e agrupados ("build") gerados automaticamente pela pipeline do GitHub Actions que nós configuramos no projeto.

### Siga este passo a passo para consertar:
1. Acesse o seu repositório no Github pelo próprio navegador.
2. Clique na aba com ícone de engrenagem **"Settings"** (Configurações).
3. No menu lateral esquerdo, desça um pouco e clique em **"Pages"**.
4. Na seção **Build and deployment** (Build e implantação), olhe o item **"Source"** (Fonte).
5. **Mude o campo "Source" que deve estar apontando para *Deploy from a branch*** alterando-o para **"GitHub Actions"**.
6. Pronto! Se o repositório acabou de receber as alterações do código local via `git push`, clique na aba "Actions" do GitHub para checar o progresso da "rodinha girando". O jogo entrará no ar assim que o "Deploy to GitHub Pages" ficar verde.

---

## Saiba mais

Consulte os arquivos na pasta [docs/](docs/overview.md) para visões detalhadas sobre a Arquitetura Orientada à Tradução e sobre a Stack de Tecnologias empregada (Zustand, React Router, Framer Motion e Radix UI).
