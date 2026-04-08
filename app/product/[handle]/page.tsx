import { GridTileImage } from "components/grid/tile";
import Footer from "components/layout/footer";
import { ProductDescription } from "components/product/product-description";
import { ProductModal } from "components/product/product-modal";
import { productDetails } from "lib/product-details";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export function generateStaticParams() {
  return productDetails.map((p) => ({
    handle: p.id,
  }));
}

function adaptProduct(product: typeof productDetails[0]) {
  return {
    id: product.id,
    handle: product.id,
    title: product.name,
    description: product.description,
    descriptionHtml: product.longDescription || `<p>${product.description}</p>`,
    category: product.category,
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
    productType: product.type,
    updatedAt: new Date().toISOString(),
  };
}

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const mockProduct = productDetails.find((p) => p.id === params.handle);
  if (!mockProduct) return notFound();

  const product = adaptProduct(mockProduct);
  const { url, width, height, altText: alt } = product.featuredImage || {};

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const mockProduct = productDetails.find((p) => p.id === params.handle);
  if (!mockProduct) return notFound();

  const product = adaptProduct(mockProduct);
  
  // Get other products (exclude current product)
  const otherProducts = productDetails.filter((p) => p.id !== params.handle).slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <ProductModal>
        <div className="mx-auto max-w-2xl">
          <Suspense fallback={null}>
            <ProductDescription product={product} />
          </Suspense>
        </div>
      </ProductModal>
    </>
  );
}
