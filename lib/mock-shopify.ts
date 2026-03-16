import { products } from './mock-data';

// 将我们的产品数据转换为 Shopify 格式
export function getCollectionProducts({ collection }: { collection: string }) {
  // 根据不同的 collection 返回不同的产���
  if (collection === 'hidden-homepage-featured-items') {
    // 返回前 3 个产品用于 ThreeItemGrid
    return products.slice(0, 3).map(adaptProduct);
  }
  
  if (collection === 'hidden-homepage-carousel') {
    // 返回所有产品用于 Carousel
    return products.map(adaptProduct);
  }
  
  return products.map(adaptProduct);
}

export function getProduct(handle: string) {
  const product = products.find(p => p.id === handle);
  return product ? adaptProduct(product) : null;
}

// 将我们的产品格式转换为 Shopify Product 格式
function adaptProduct(product: typeof products[0]) {
  return {
    id: product.id,
    handle: product.id,
    title: product.name,
    description: product.description,
    featuredImage: {
      url: product.image,
      altText: product.name,
      width: 800,
      height: 800,
    },
    priceRange: {
      maxVariantPrice: {
        amount: product.price.toString(),
        currencyCode: product.currency,
      },
      minVariantPrice: {
        amount: product.price.toString(),
        currencyCode: product.currency,
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: product.id,
            title: 'Default',
            availableForSale: true,
            selectedOptions: [],
            price: {
              amount: product.price.toString(),
              currencyCode: product.currency,
            },
          },
        },
      ],
    },
    availableForSale: true,
    options: [],
    images: {
      edges: [
        {
          node: {
            url: product.image,
            altText: product.name,
            width: 800,
            height: 800,
          },
        },
      ],
    },
    seo: {
      title: product.name,
      description: product.description,
    },
    tags: [product.category, product.type],
    updatedAt: new Date().toISOString(),
  };
}

export function getMenu(handle: string) {
  // 返回空菜单，避免 Shopify 错误
  return [];
}

export function getCart(cartId: string) {
  // 返回空购物车
  return null;
}

export function createCart() {
  // 创建空购物车
  return {
    id: 'mock-cart-id',
    checkoutUrl: '/checkout',
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'CHF' },
      totalAmount: { amount: '0', currencyCode: 'CHF' },
      totalTaxAmount: { amount: '0', currencyCode: 'CHF' },
    },
    lines: { edges: [] },
    totalQuantity: 0,
  };
}

export function addToCart(cartId: string, lines: any[]) {
  // Mock 添加到购物车
  return createCart();
}

export function removeFromCart(cartId: string, lineIds: string[]) {
  // Mock 从购物车移除
  return createCart();
}

export function updateCart(cartId: string, lines: any[]) {
  // Mock 更新购物车
  return createCart();
}
