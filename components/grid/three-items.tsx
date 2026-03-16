import { GridTileImage } from "components/grid/tile";
import { homepageProducts, HomepageProduct } from "lib/homepage-data";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
}: {
  item: HomepageProduct;
  size: "full" | "half";
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
        href={item.href}
        prefetch={true}
      >
        <GridTileImage
          src={item.image}
          alt={item.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.name,
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
  if (homepageProducts.length < 3) return null;

  const [first, second, third] = homepageProducts;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={first!} />
      <ThreeItemGridItem size="half" item={second!} />
      <ThreeItemGridItem size="half" item={third!} />
    </section>
  );
}
