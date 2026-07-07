# Deploy na Vercel

Este projeto esta pronto para deploy como um app Vite independente.

## Deploy Pela Interface da Vercel

1. Crie ou escolha um repositorio Git para a pasta `web/`.
2. Importe o repositorio na Vercel.
3. Confirme as configuracoes:
   - Framework Preset: `Vite`
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Clique em Deploy.

## Deploy Pela CLI

Instale a CLI se necessario:

```bash
npm i -g vercel
```

Depois rode dentro da pasta `web/`:

```bash
vercel
```

Para producao:

```bash
vercel --prod
```

## Variaveis de Ambiente

O stream pode ser sobrescrito pela variavel:

```bash
VITE_RADIO_STREAM_URL=https://8136.brasilstream.com.br/stream
```

Na Vercel:

1. Abra o projeto.
2. Entre em `Settings > Environment Variables`.
3. Adicione `VITE_RADIO_STREAM_URL`.
4. Gere um novo deploy.

Se essa variavel nao existir, o app usa o stream padrao embutido no codigo.

## SPA Rewrite

O arquivo `vercel.json` inclui:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Isso garante que qualquer rota futura do React carregue o `index.html`.

## Imagem de Preview

A imagem publica fica em:

```text
public/fm-noronha-web.png
```

Ela e usada nos metadados Open Graph/Twitter do `index.html` e tambem no README.

## Checklist Antes do Deploy

- Rodar `npm install`.
- Rodar `npm run build`.
- Conferir se o player inicia apos clique do usuario.
- Testar responsividade em mobile.
- Conferir se o dominio publicado usa HTTPS.

