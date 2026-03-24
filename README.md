# Garden Brows Studio | Journal

Este é o repositório do blog (Journal) do **Garden Brows Studio**, desenvolvido para compartilhar tendências de Lash Lift, Design de Sobrancelhas, Micropigmentação e rituais de beleza natural por Carolina Costa.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as melhores e mais recentes tecnologias do ecossistema front-end:

- [Next.js](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) para componentes otimizados e acessíveis
- [Notion API](https://developers.notion.com/) utilizado como Headless CMS
- [React Markdown](https://github.com/remarkjs/react-markdown) e bibliotecas do ecossistema remark/rehype

## ⚙️ Configuração Inicial e Variáveis de Ambiente

Crie um arquivo `.env` ou `.env.local` na raiz do projeto com as credenciais do Notion e a URL do site (verifique o arquivo `.env` para as chaves exatas utilizadas no projeto, geralmente envolvendo tokens de acesso ao banco de dados do Notion):

```env
NOTION_TOKEN=seu_token_aqui
NOTION_DATABASE_ID=seu_database_id_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🛠️ Como Executar o Projeto

1. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação em execução.

A interface principal pode ser editada em `src/app/page.tsx`. O projeto utiliza a funcionalidade de revalidação de página (Next.js ISR) e está configurado com layouts responsivos usando Tailwind CSS.

## 🌐 Deploy

A maneira recomendada para implantar este projeto é na plataforma [Vercel](https://vercel.com/):

Para mais informações, consulte a [Documentação de Deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).
