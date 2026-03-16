'use client';

import { carouselProducts } from "lib/homepage-data";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";
import { motion } from "framer-motion";

export function Carousel() {
  if (!carouselProducts?.length) return null;

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex gap-4 px-4">
        {carouselProducts.map((product, i) => (
          <motion.li
            key={product.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative h-full w-full"
            >
              <Link
                href={product.href}
                className="relative h-full w-full block"
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
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
