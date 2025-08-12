# Padrões de Desenvolvimento - Projeto Web

## Tecnologias e Ferramentas Utilizadas

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui**
- **React Hook Form** para formulários
- **Zod** para validações
- **BetterAuth** para autenticação
- **PostgreSQL** como banco de dados
- **Drizzle** como ORM

---

## Regras Principais

- Escreva **código limpo, conciso e fácil de manter**, seguindo princípios **SOLID** e **Clean Code**.
- Use **nomes de variáveis descritivos**  
  _Exemplo:_ `isLoading`, `hasError`.
- Use **kebab-case** para nomes de pastas e arquivos.
- Sempre use **TypeScript** para escrever código.
- Siga o princípio **DRY (Don't Repeat Yourself)** — evite duplicidade de código.  
  Quando necessário, crie **funções e componentes reutilizáveis**.
- **Não escreva comentários desnecessários** no código.

---

## Regras de React e Next.js

- Utilize **componentes da biblioteca [shadcn/ui](https://ui.shadcn.com/)** o máximo possível.
- Sempre use **Zod** para validação de formulários.
- Sempre use **React Hook Form** para criação e validação de formulários.
  - Sempre use o componente [`form.tsx`](mdc: src/components/ui/form.tsx).
  - Use como referência:
    - [`sign-in-form.tsx`](mdc: src/app/authentication/components/sign-in-form.tsx)
    - [`sign-up-form.tsx`](mdc: src/app/authentication/components/sign-up-form.tsx)
- Quando necessário, crie **componentes e funções reutilizáveis** para reduzir duplicidade de código.
- Se um componente for utilizado **apenas em uma página específica**, crie-o na pasta `/components` dentro da pasta da respectiva página.  
  _Exemplo:_ [`addresses.tsx`](mdc: src/app/cart/identification/components/addresses.tsx)
- **Server Actions** devem ser armazenadas em `src/actions`:
  - Cada server action deve ficar em uma **pasta** com dois arquivos: `index.ts` e `schema.ts`.
  - Sempre veja [`add-cart-product`](mdc: src/actions/add-cart-product) como referência.
- Sempre que for necessário **interagir com o banco de dados**, use [`index.ts`](mdc: src/db/index.ts). E o meu[`schema.ts`](mdc: src/db/schema.ts).
- Use **React Query** para interagir com Server Actions em Client Components.
  - Sempre use como referência:
    - [`cart-item.tsx`](mdc: src/components/common/cart-item.tsx)
    - [`cart.tsx`](mdc: src/components/common/cart.tsx)
- Sempre crie **hooks customizados** para queries e mutations do React Query:
  - Use como referência:
    - [`use-cart.ts`](mdc: src/hooks/queries/use-cart.ts)
    - [`use-increase-cart-product.ts`](mdc: src/hooks/mutations/use-increase-cart-product.ts)
    - [`use-decrease-cart-product.ts`](mdc: src/hooks/mutations/use-decrease-cart-product.ts)
- Sempre use a biblioteca "react-number-format" para criar
  inputs com máscaras.
- Sempre crie e exporte uma função que retorne a query key de uma query e mutation key de uma mutation.
