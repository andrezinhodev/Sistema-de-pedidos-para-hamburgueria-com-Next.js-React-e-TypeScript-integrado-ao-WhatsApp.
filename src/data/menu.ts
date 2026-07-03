import { Category, Product } from "@/types";

export const categories: Category[] = [
  {
    id: "hamburgueres",
    name: "Hambúrgueres",
    icon: "",
    description: "Artesanais com blend especial",
  },
  {
    id: "pizzas",
    name: "Pizzas",
    icon: "",
    description: "Massa fina e ingredientes frescos",
  },
  {
    id: "bebidas",
    name: "Bebidas",
    icon: "",
    description: "Geladas e saborosas",
  },
  {
    id: "sobremesas",
    name: "Sobremesas",
    icon: "",
    description: "O final perfeito",
  },
];

export const products: Product[] = [
  // ─── Hambúrgueres ───────────────────────────────────────────────
  {
    id: "h1",
    categoryId: "hamburgueres",
    name: "Smash Clássico",
    description: "Blend 180g, queijo cheddar, alface, tomate e molho especial",
    fullDescription:
      "Nosso smash clássico é feito com blend artesanal de 180g prensado na chapa, criando uma crosta irresistível. Acompanha queijo cheddar derretido, alface crespa, tomate fresco e nosso molho especial da casa. Servido no pão brioche tostado.",
    price: 34.9,
    image:
      "/images/hamburguer/hamburguer-1.jpg",
    tags: ["popular", "carne"],
    featured: true,
  },
  {
    id: "h2",
    categoryId: "hamburgueres",
    name: "Double Bacon",
    description:
      "Dois blends 120g, bacon crocante, queijo coalho e cebola caramelizada",
    fullDescription:
      "Para quem quer mais: dois blends de 120g cada, bacon defumado crocante, queijo coalho grelhado e cebola caramelizada no azeite. Uma combinação explosiva de sabores que vai além do esperado. Servido no pão australiano com sementes.",
    price: 44.9,
    image:
      "/images/hamburguer/hamburguer-2.jpg",
    tags: ["popular", "bacon"],
    featured: true,
  },
  {
    id: "h3",
    categoryId: "hamburgueres",
    name: "Veggie Burguer",
    description: "Blend de grão-de-bico, rúcula, tomate seco e maionese verde",
    fullDescription:
      "Opção vegetariana sem abrir mão do sabor: blend artesanal de grão-de-bico e legumes, rúcula fresca, tomate seco, cream cheese de ervas e nossa maionese verde com manjericão e azeite extravirgem. No pão de fermentação natural.",
    price: 32.9,
    image:
      "/images/hamburguer/hamburguer-3.jpg",
    tags: ["vegetariano"],
  },
  {
    id: "h4",
    categoryId: "hamburgueres",
    name: "BBQ Smoked",
    description: "Blend 180g, onion rings, queijo gouda e molho barbecue defumado",
    fullDescription:
      "Inspirado nas churrascarias americanas: blend de 180g com defumação lenta, onion rings crocantes, queijo gouda derretido e nosso barbecue artesanal defumado com melaço e especiarias. Um hambúrguer para quem leva sério.",
    price: 46.9,
    image:
      "/images/hamburguer/hamburguer-4.jpg",
    tags: ["defumado", "barbecue"],
  },


  // ─── Pizzas ─────────────────────────────────────────────────────
  {
    id: "p1",
    categoryId: "pizzas",
    name: "Margherita",
    description: "Molho de tomate San Marzano, mussarela de búfala e manjericão",
    fullDescription:
      "A clássica italiana reimaginada: molho de tomate San Marzano importado, mussarela de búfala fresca em temperatura ambiente, manjericão colhido na hora e fio de azeite extravirgem. Massa fina crocante, fermentada por 48h.",
    price: 49.9,
    image:
      "/images/pizza/pizza-1.jpg",
    tags: ["clássica", "vegetariana"],
    featured: true,
  },
  {
    id: "p2",
    categoryId: "pizzas",
    name: "Pepperoni Especial",
    description: "Molho de tomate, mussarela, pepperoni importado e orégano",
    fullDescription:
      "Generosa quantidade de pepperoni importado italiano sobre cama de mussarela derretida e molho de tomate temperado com ervas da Provence. Finalizada com orégano fresco e pimenta calabresa a gosto.",
    price: 55.9,
    image:
      "/images/pizza/pizza-2.jpg",
    tags: ["popular", "picante"],
    featured: true,
  },
  {
    id: "p3",
    categoryId: "pizzas",
    name: "Quatro Queijos",
    description: "Mussarela, gorgonzola, parmesão e cream cheese",
    fullDescription:
      "Uma ode aos queijos: mussarela derretida como base, gorgonzola para intensidade, parmesão reggiano ralado na hora para salinidade e cream cheese para cremosidade. Finalizada com redução de mel e nozes.",
    price: 57.9,
    image:
      "/images/pizza/pizza-3.jpg",
    tags: ["queijos"],
  },
  {
    id: "p4",
    categoryId: "pizzas",
    name: "Frango com Catupiry",
    description: "Frango desfiado temperado, catupiry original e milho",
    fullDescription:
      "O favorito brasileiro: frango desfiado marinado em temperos da casa, catupiry original derretido generosamente, milho verde e cheiro-verde. A combinação que todo mundo ama, feita do jeito certo.",
    price: 52.9,
    image:
      "/images/pizza/pizza-4.jpg",
    tags: ["popular", "frango"],
  },

  // ─── Bebidas ────────────────────────────────────────────────────
  {
    id: "b1",
    categoryId: "bebidas",
    name: "Refrigerante Lata",
    description: "Coca-Cola, Guaraná Antarctica ou Sprite — 350ml gelada",
    fullDescription:
      "Lata 350ml bem gelada. Escolha entre Coca-Cola original, Guaraná Antarctica ou Sprite. A parceria perfeita para qualquer pedido.",
    price: 7.9,
    image:
      "/images/bebidas/coca-cola.jpg",
    tags: ["gelado"],
  },
  {
    id: "b2",
    categoryId: "bebidas",
    name: "Milkshake Artesanal",
    description: "Chocolate, morango ou baunilha — 400ml cremoso",
    fullDescription:
      "Milkshake preparado na hora com sorvete premium e leite integral. Disponível nos sabores chocolate belga, morango fresco ou baunilha de Madagascar. 400ml de pura cremosidade, servido com canudo e chantilly.",
    price: 22.9,
    image:
      "/images/bebidas/milk-shake.jpg",
    tags: ["popular", "cremoso"],
    featured: true,
  },
  {
    id: "b3",
    categoryId: "bebidas",
    name: "Suco Natural",
    description: "Laranja, limão ou maracujá — espremido na hora, 500ml",
    fullDescription:
      "Sucos espremidos na hora, sem conservantes ou açúcar adicionado. Laranja pera, limão taiti ou maracujá da estação. 500ml de sabor puro e natural, servido com gelo.",
    price: 14.9,
    image:
      "/images/bebidas/suco-natural.jpg",
    tags: ["natural", "saudável"],
  },
  {
    id: "b4",
    categoryId: "bebidas",
    name: "Água Mineral",
    description: "Sem gás ou com gás — 500ml",
    fullDescription:
      "Água mineral natural de fonte, disponível sem gás ou com gás. 500ml para acompanhar sua refeição ou matar a sede.",
    price: 5.9,
    image:
      "/images/bebidas/garafa-de-agua.jpg",
    tags: [],
  },


  // ─── Sobremesas ─────────────────────────────────────────────────
  {
    id: "s1",
    categoryId: "sobremesas",
    name: "Brownie com Sorvete",
    description: "Brownie de chocolate belga quentinho com bola de sorvete",
    fullDescription:
      "Brownie artesanal de chocolate belga 70% cacau, assado na hora, servido quentinho com bola de sorvete de creme ou baunilha, calda de chocolate e farofa de amendoim. A sobremesa mais pedida da casa.",
    price: 26.9,
    image:
      "/images/sobremesa/sorvete.jpg",
    tags: ["popular", "quente"],
    featured: true,
  },
  {
    id: "s2",
    categoryId: "sobremesas",
    name: "Bolo de chocolate",
    description: "Base de biscoito, cream cheese e calda de frutas vermelhas",
    fullDescription:
      "Cheesecake preparado diariamente: base crocante de biscoito amanteigado, recheio de cream cheese Philadelphia com baunilha e calda generosa de frutas vermelhas frescas (morango, mirtilo e framboesa). Servido gelado.",
    price: 24.9,
    image:
      "/images/sobremesa/bolo-chocolate.jpg",
    tags: ["frio", "frutas"],
  },
  {
    id: "s3",
    categoryId: "sobremesas",
    name: "Petit Gâteau",
    description: "Bolinho de chocolate com centro derretido e sorvete",
    fullDescription:
      "O clássico francês da forma certa: bolinho de chocolate com exterior assado e centro líquido de ganache, servido imediatamente com bola de sorvete de creme e açúcar de confeiteiro. Tempo de preparo: 12 minutos.",
    price: 28.9,
    image:
      "/images/sobremesa/bolinho.jpg",
    tags: ["quente", "chocolate"],
  },
  {
    id: "s4",
    categoryId: "sobremesas",
    name: "Açaí 500ml",
    description: "Açaí puro da Amazônia com granola e banana",
    fullDescription:
      "Açaí 100% puro do Pará, sem aditivos ou conservantes, servido bem gelado com granola artesanal crocante, banana fatiada e mel orgânico. Adicione complementos à vontade: leite condensado, morango ou tapioca.",
    price: 29.9,
    image:
      "/images/sobremesa/acai.jpg",
    tags: ["saudável", "frutas"],
  },
];

export const DELIVERY_FEE = 6.99;
export const FREE_DELIVERY_THRESHOLD = 80;
