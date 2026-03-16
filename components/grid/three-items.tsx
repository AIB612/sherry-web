import { GridTileImage } from "components/grid/tile";
import { products } from "lib/mock-data";
import Link from "next/link";

type MockProduct = typeof products[0];

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: MockProduct;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.id}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.image}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.name as string,
            amount: item.price.toString(),
            currencyCode: item.currency,
            originalAmount: item.originalPrice?.toString(),
            discount: item.discount,
            badge: item.badge,
            billingCycle: item.billingCycle,
          }}
        />
      </Link>
    </div>
  );
}

export function ThreeItemGrid() {
  const homepageItems = products.slice(0, 3);

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
