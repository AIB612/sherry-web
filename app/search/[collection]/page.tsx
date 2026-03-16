import { searchProducts, categories } from "lib/search-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const category = categories.find(c => c.id === params.collection);

  if (!category) return notFound();

  return {
    title: category.name,
    description: `${category.name} products`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
}) {
  const params = await props.params;
  const category = categories.find(c => c.id === params.collection);

  if (!category) return notFound();

  const filteredProducts = searchProducts.filter(
    (p) => p.category.toLowerCase() === params.collection.toLowerCase()
  );

  const shopifyProducts = filteredProducts.map((product) => ({
    id: product.id,
    handle: product.id,
    title: product.name,
    description: product.description,
    descriptionHtml: `<p>${product.description}</p>`,
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
    availableForSale: true,
    options: [],
    variants: [
      {
        id: product.id,
        title: 'Default',
        availableForSale: true,
        selectedOptions: [],
        price: {
          amount: product.price.toString(),
          currencyCode: product.currency,
        },
      },
    ],
    images: [
      {
        url: product.image,
        altText: product.name,
        width: 800,
        height: 800,
      },
    ],
    seo: {
      title: product.name,
      description: product.description,
    },
    tags: [product.category, product.type],
    updatedAt: new Date().toISOString(),
  }));

  return (
    <section>
      <h1 className="mb-4 text-3xl font-bold">{category.name}</h1>
      {shopifyProducts.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={shopifyProducts} />
        </Grid>
      )}
    </section>
  );
}
