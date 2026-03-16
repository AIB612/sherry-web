import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { products } from "lib/mock-data";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue, category } = searchParams as { [key: string]: string };

  // Filter products based on search query and category
  let filteredProducts = products;
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }
  
  // Filter by search query
  if (searchValue) {
    const query = searchValue.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  // Convert to Shopify format
  const shopifyProducts = filteredProducts.map((product) => ({
    id: product.id,
    handle: product.id,
    title: product.name,
    description: product.description,
    descriptionHtml: product.longDescription || `<p>${product.description}</p>`,
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

  const resultsText = shopifyProducts.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {shopifyProducts.length === 0
            ? "There are no products that match "
            : `Showing ${shopifyProducts.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {shopifyProducts.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={shopifyProducts} />
        </Grid>
      ) : null}
    </>
  );
}
