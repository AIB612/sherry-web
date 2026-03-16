"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cart-context";

export function AddToCart({
  product,
  email,
  requiresEmail,
}: {
  product: Product;
  email?: string;
  requiresEmail?: boolean;
}) {
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');
  const { addCartItem } = useCart();

  const searchParams = useSearchParams();
  const defaultVariantId = product.variants.length === 1 ? product.variants[0]!.id : undefined;
  const variant = product.variants.find((v: ProductVariant) =>
    v.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariant = variant || (defaultVariantId ? product.variants.find(v => v.id === defaultVariantId) : undefined);

  const handleClick = () => {
    if (requiresEmail && !email) {
      setError('Please enter your account email');
      return;
    }
    setError('');

    if (!selectedVariant) return;

    // Add to cart with email stored in product handle
    const productWithEmail = {
      ...product,
      // Store email in a custom way we can retrieve later
      handle: product.handle,
    };

    // Use a global store for emails
    if (email) {
      if (typeof window !== 'undefined') {
        const cartEmails = JSON.parse(localStorage.getItem('cartEmails') || '{}');
        cartEmails[selectedVariant.id] = email;
        localStorage.setItem('cartEmails', JSON.stringify(cartEmails));
      }
    }

    addCartItem(selectedVariant, productWithEmail);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const buttonClasses =
    "relative flex w-48 items-center justify-center rounded-full bg-[var(--color-airbnb-red)] p-4 tracking-wide text-white hover:opacity-90 transition-opacity";

  return (
    <div>
      {error && (
        <div className="mb-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <p className="text-xs text-[var(--color-airbnb-red)] text-center flex items-center justify-center gap-1">
            <span>⚠️</span>
            {error}
          </p>
        </div>
      )}
      <button
        aria-label="Add to cart"
        onClick={handleClick}
        className={clsx(buttonClasses, { "opacity-70": added })}
      >
        {added ? (
          "Added ✓"
        ) : (
          <>
            <PlusIcon className="h-5 mr-2" />
            Add To Cart
          </>
        )}
      </button>
    </div>
  );
}
