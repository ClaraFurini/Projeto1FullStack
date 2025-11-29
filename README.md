# Publicação no GitHub Pages sem tela em branco

O projeto já inclui build estático em `docs/` e um workflow para publicar no GitHub Pages. Se a página ficar em branco, use uma das opções abaixo:

1. **Publicar a partir da pasta `docs/`** (mais simples):
   - Rode `npm install` e depois `npm run build:pages` para atualizar o bundle em `docs/`.
   - Em *Settings → Pages* selecione **Deploy from a branch**, branch `main` e pasta `/docs` como fonte.
   - Faça push com a pasta `docs` gerada. O Pages servirá o bundle compilado e a página não ficará em branco.

2. **Workflow automático (sem commitar a pasta `docs/`):**
   - Mantenha habilitado o workflow `.github/workflows/deploy.yml`.
   - Em *Settings → Pages* escolha **GitHub Actions** como fonte.
   - A cada push na `main`, o workflow roda `npm ci`, gera o build e publica a pasta `dist` automaticamente.

Se a página ainda aparecer vazia, abra o console do navegador (F12) para verificar se os assets foram encontrados ou se há bloqueios de rede. O `index.html` agora exibe uma mensagem de fallback com essas instruções caso o bundle não carregue.
