// Globale Produktliste für Suche (全局产品列表用于搜索)
// Kombiniert alle Produkte aus Homepage und Search

import { homepageProducts, carouselProducts } from './homepage-data';
import { searchProducts } from './search-data';

// Alle Produkte für globale Suche
export const allProducts = [
  ...homepageProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category,
    price: p.price,
    currency: p.currency,
    image: p.image,
    href: p.href,
  })),
  ...carouselProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category,
    price: p.price,
    currency: p.currency,
    image: p.image,
    href: p.href,
  })),
  ...searchProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category,
    price: p.price,
    currency: p.currency,
    image: p.image,
    href: `/product/${p.id}`,
  })),
];

// Deduplizieren nach Name (去重)
export const uniqueProducts = allProducts.filter((product, index, self) =>
  index === self.findIndex((p) => p.name === product.name)
);

export type GlobalProduct = typeof uniqueProducts[0];
