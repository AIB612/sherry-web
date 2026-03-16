'use client';

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";
import { useState } from "react";
import { products } from "lib/mock-data";
import Link from "next/link";

export function ProductDescription({ product }: { product: Product & { productType?: string; category?: string } }) {
  const price = parseFloat(product.priceRange.maxVariantPrice.amount);
  const currencyCode = product.priceRange.maxVariantPrice.currencyCode;
  const requiresAccount = product.productType === 'account' || product.tags?.includes('account');
  const [email, setEmail] = useState('');
  
  // Get other products (exclude current product)
  const currentCategory = product.category;
  
  // Debug: log current product and category
  console.log('=== Product Recommendation Debug ===');
  console.log('Current Product ID:', product.id);
  console.log('Current Product Title:', product.title);
  console.log('Current Category:', currentCategory);
  console.log('All products:', products.map(p => ({ id: p.id, name: p.name, category: p.category })));
  
  // Filter by same category first, then others
  let sameCategory = products.filter((p) => p.id !== product.id && p.category === currentCategory);
  let otherCategory = products.filter((p) => p.id !== product.id && p.category !== currentCategory);
  
  console.log('Same category products:', sameCategory.map(p => p.name));
  console.log('Other category products:', otherCategory.map(p => p.name));
  
  // Combine: same category first, then others, max 4
  let otherProducts = [...sameCategory, ...otherCategory].slice(0, 4);
  
  console.log('Final recommendations:', otherProducts.map(p => p.name));

  return (
    <div className="flex flex-col gap-5">
      {/* Row 1: Avatar + Name + Description | Price on right */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 dark:border-neutral-700">
            <img
              src={product.featuredImage?.url}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{product.title}</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{product.description}</p>
          </div>
        </div>
        <div className="flex flex-col items-end flex-shrink-0">
          <span className="text-sm text-neutral-400 line-through">
            {currencyCode} {(price * 1.3).toFixed(2)}
          </span>
          <span className="text-xl font-bold text-[var(--color-airbnb-red)]">
            <Price amount={product.priceRange.maxVariantPrice.amount} currencyCode={currencyCode} />
          </span>
          <span className="mt-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
            -23% OFF
          </span>
        </div>
      </div>

      {/* Row 2: Long Description - Fixed 400px height */}
      <div className="h-[400px] overflow-y-auto space-y-4">
        {product.descriptionHtml ? (
          <Prose
            className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
            html={product.descriptionHtml}
          />
        ) : null}

        <div className="rounded-xl border border-green-200 bg-green-50/80 p-4 dark:border-green-800 dark:bg-green-900/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-sm dark:bg-green-900/40">🔑</span>
            <span className="text-sm font-bold text-green-800 dark:text-green-300">Swisspro.it Exclusive</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs text-green-700 dark:text-green-400">
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              <span>Instant delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              <span>Official license</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              <span>30-day guarantee</span>
            </div>
          </div>
        </div>

        {/* Other Products Recommendation */}
        {otherProducts.length > 0 && (
          <div className="border-t pt-4">
            <h2 className="text-lg font-bold mb-3">You May Also Like</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {otherProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="group border rounded-lg p-3 hover:border-[var(--color-airbnb-red)] transition-colors flex-shrink-0 w-[160px]"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded">
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ maxWidth: '32px', maxHeight: '32px', width: 'auto', height: 'auto' }}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-xs line-clamp-2 flex-1">{p.name}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {p.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {p.currency} {p.originalPrice.toFixed(0)}
                          </span>
                        )}
                        <span className="text-sm font-bold text-[var(--color-airbnb-red)]">
                          {p.currency} {p.price.toFixed(2)}
                        </span>
                      </div>
                      {p.discount && (
                        <span className="text-xs bg-red-100 text-[var(--color-airbnb-red)] px-1.5 py-0.5 rounded">
                          -{p.discount}%
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Variant Selector */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* Email + Add To Cart Row */}
      <div className="flex items-end gap-4">
        {requiresAccount && (
          <div className="flex-1">
            <label className="block text-sm text-gray-500 mb-1">
              Authorization Account {requiresAccount && <span className="text-[var(--color-airbnb-red)]">*</span>}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border-b border-gray-300 bg-transparent py-2 px-1 text-sm focus:outline-none focus:border-black hover:border-gray-500 transition-colors"
            />
          </div>
        )}
        <div className="flex-shrink-0">
          <AddToCart product={product} email={requiresAccount ? email : undefined} requiresEmail={requiresAccount} />
        </div>
      </div>
    </div>
  );
}
