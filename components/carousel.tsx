import { products } from "lib/mock-data";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";

export function Carousel() {
  if (!products?.length) return null;

  // Show only products 4 and 5 (not shown in ThreeItemGrid)
  const carouselProducts = products.slice(3);

  if (carouselProducts.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex gap-4 px-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.id}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price.toString(),
                  currencyCode: product.currency,
                  originalAmount: product.originalPrice?.toString(),
                  discount: product.discount,
                  badge: product.badge,
                  billingCycle: product.billingCycle,
                }}
                src={product.image}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
