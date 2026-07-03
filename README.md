# 🍔 Sabor Delivery — Cardápio Online

Aplicação web completa de cardápio digital com pedido online, desenvolvida com **Next.js 15 (App Router)**, **TypeScript** e **Tailwind CSS**.

---

## Visão geral

O Sabor Delivery permite que clientes de um restaurante visualizem o cardápio, filtrem por categoria, busquem produtos em tempo real, montem seu pedido e finalizem a compra — tudo sem sair do site. O design é moderno e responsivo, inspirado em plataformas como iFood e Aiqfome.

---

## Estrutura de pastas

```
src/
├── app/
│   ├── layout.tsx          # Root layout (CartProvider + Toaster)
│   ├── page.tsx            # Página inicial
│   ├── not-found.tsx       # Página 404 personalizada
│   └── checkout/
│       └── page.tsx        # Página de finalização do pedido
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Cabeçalho com CartButton
│   │   ├── Hero.tsx        # Banner principal do restaurante
│   │   └── Footer.tsx      # Rodapé
│   ├── ui/
│   │   ├── SearchBar.tsx       # Campo de busca
│   │   ├── QuantitySelector.tsx # Controle de quantidade ±
│   │   ├── LoadingSkeleton.tsx  # Skeleton de carregamento
│   │   └── EmptyState.tsx       # Estado de lista vazia
│   ├── category/
│   │   └── CategoryList.tsx    # Pills de filtro por categoria
│   ├── product/
│   │   ├── ProductCard.tsx     # Card do produto na listagem
│   │   ├── ProductModal.tsx    # Modal de detalhes + adicionar
│   │   └── MenuSection.tsx     # Seção completa do cardápio
│   ├── cart/
│   │   ├── CartButton.tsx      # Botão flutuante do carrinho
│   │   └── CartDrawer.tsx      # Gaveta lateral do carrinho
│   └── checkout/
│       ├── CheckoutForm.tsx    # Formulário de finalização
│       └── OrderSummary.tsx    # Tela de confirmação do pedido
│
├── context/
│   └── CartContext.tsx     # Estado global do carrinho (Context API + useReducer)
│
├── hooks/
│   ├── useSearch.ts        # Hook de busca e filtro
│   └── useDisclosure.ts    # Hook para abrir/fechar modais
│
├── data/
│   └── menu.ts             # Dados fictícios: categorias e produtos
│
├── types/
│   └── index.ts            # Tipos TypeScript da aplicação
│
└── utils/
    └── index.ts            # Funções utilitárias (formatação, normalização etc.)
```

---

## Arquitetura

### Gerenciamento de estado
O carrinho usa **Context API + useReducer**, sem biblioteca externa. O estado é tipado com TypeScript e persistido automaticamente no `localStorage`.

### Renderização
- **Server Components** para páginas e componentes sem interatividade (Hero, Footer, etc.)
- **Client Components** (`"use client"`) apenas onde há estado ou eventos: carrinho, modal, busca, formulários

### Dados
Todos os dados (categorias, produtos) vivem em `src/data/menu.ts` — um array TypeScript tipado. Não há banco de dados; os dados são estáticos e substituíveis por uma API real no futuro.

---

## Como instalar

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/cardapio-online.git
cd cardapio-online

# Instale as dependências
npm install
```

---

## Como executar

```bash
# Modo desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

Acesse `http://localhost:3000`.

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 15 | Framework React com App Router |
| TypeScript | 5 | Tipagem estática |
| Tailwind CSS | 4 | Estilização utilitária |
| Framer Motion | 11 | Animações e transições |
| Lucide React | 0.383 | Ícones SVG |
| react-hot-toast | 2 | Notificações (toasts) |

---

## Fluxo da aplicação

```
[Página inicial]
  → Banner (Hero) com informações do restaurante
  → Busca em tempo real + filtro por categoria
  → Listagem de produtos agrupados por categoria
      → Clique no card → Modal de detalhes
          → Seleciona quantidade + observações → Adiciona ao carrinho
  → CartButton aparece quando há itens
      → Abre CartDrawer lateral
          → Edita quantidades, remove itens, adiciona observações gerais
          → "Finalizar pedido" → /checkout

[/checkout]
  → Resumo do pedido
  → CheckoutForm: nome, telefone, endereço, tipo de entrega, pagamento
  → Submissão → OrderSummary com número do pedido
  → "Fazer novo pedido" → volta à página inicial
```

---

## Diferenciais implementados

- [x] Busca em tempo real com normalização de acentos
- [x] Filtro por categoria com pills animados
- [x] Carrinho persistido no `localStorage`
- [x] Toasts de confirmação de ações
- [x] Skeleton loading (componente `MenuSkeleton`)
- [x] Página 404 personalizada
- [x] Estados de lista vazia com call to action
- [x] Animações suaves com Framer Motion
- [x] Progresso visual para frete grátis
- [x] Responsividade mobile-first

---

## Possíveis melhorias futuras

- **Integração com API**: substituir `src/data/menu.ts` por chamadas REST ou GraphQL
- **Autenticação**: login do cliente para histórico de pedidos
- **Gateway de pagamento**: integração com Mercado Pago ou Stripe
- **Rastreamento**: tela de status do pedido em tempo real (WebSocket)
- **Painel admin**: gerenciar cardápio, preços e pedidos recebidos
- **PWA**: suporte offline com service workers
- **Temas**: modo escuro
- **Avaliações**: rating de produtos pelos clientes
