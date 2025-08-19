# BEWEAR

BEWEAR é uma plataforma de e-commerce de moda streetwear, desenvolvida com foco em performance, responsividade e experiência do usuário. **Esta é a primeira versão do projeto, desenvolvida exclusivamente para dispositivos móveis (mobile first)**.

---

## 🚀 Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui** (componentes UI)
- **React Hook Form** + **Zod** (formulários e validação)
- **React Query** (queries e mutations)
- **BetterAuth** (autenticação)
- **PostgreSQL** (banco de dados)
- **Drizzle ORM** (acesso a dados)
- **Stripe** (pagamentos)
- **Sonner** (notificações toast)

---

## 📦 Estrutura do Projeto

```
├── src/
│   ├── actions/                # Server Actions (mutations, queries)
│   ├── app/                    # Páginas e rotas (Next.js App Router)
│   ├── components/             # Componentes reutilizáveis (UI e comuns)
│   ├── db/                     # Configuração e schema do banco (Drizzle)
│   ├── helper/                 # Funções utilitárias
│   ├── hooks/                  # React Query hooks customizados
│   ├── lib/                    # Autenticação, utilidades
│   ├── providers/              # Providers globais (React Query, etc)
│   └── ...
├── public/                     # Imagens, logos, favicons
├── .github/                    # Documentação, screenshots
├── package.json
├── tailwind.config.js
├── drizzle.config.ts
└── ...
```

---

## 🛠️ Principais Funcionalidades

- **Catálogo de produtos** com variações (tamanhos, cores)
- **Carrinho de compras** dinâmico e persistente
- **Checkout seguro** com integração Stripe
- **Gestão de endereços** e identificação do usuário
- **Autenticação** (login, cadastro, sessão)
- **Pedidos e histórico**
- **Notificações toast** para feedback instantâneo
- **Layout 100% responsivo para mobile**
- **Acessibilidade** e foco em UX

---

## 📋 Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/bewear.git
   cd bewear
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   - Copie `.env.example` para `.env` e preencha com suas credenciais (Banco, Stripe, Auth, etc).
4. **Rode as migrations e seed:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
6. **Acesse:**
   - [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy

Acesse a versão online do projeto em produção:

👉 [bewear-style.vercel.app](https://bewear-style.vercel.app/)

---

## 📝 Padrões e Boas Práticas

- **TypeScript** em todo o projeto
- **Kebab-case** para arquivos e pastas
- **SOLID** e **Clean Code**
- **DRY**: componentes e hooks reutilizáveis
- **Validação** com Zod e React Hook Form
- **Server Actions** organizadas em `src/actions`
- **React Query** para dados e cache
- **Acesso ao banco** sempre via Drizzle
- **Inputs mascarados** com `react-number-format`
- **Query/mutation keys** centralizadas

---

## 👨‍💻 Autor

Desenvolvido por [Patrick Machado Cardoso](https://github.com/PatrickMCardoso) — sinta-se à vontade para contribuir, sugerir melhorias ou reportar issues!
