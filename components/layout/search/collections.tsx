"use client";

import clsx from "clsx";
import { products } from "lib/mock-data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  
  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  // Create collections
  const collections = [
    { handle: '', title: 'All' },
    ...categories.map(category => ({
      handle: category,
      title: category.charAt(0).toUpperCase() + category.slice(1),
    }))
  ];

  return (
    <nav>
      <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
        Collections
      </h3>
      <ul className="hidden md:block">
        {collections.map((collection) => {
          const isActive = currentCategory === collection.handle || 
            (!currentCategory && collection.handle === '');
          const href = collection.handle 
            ? `/search?category=${collection.handle}` 
            : '/search';
          
          return (
            <li key={collection.handle} className="mt-2 flex text-black dark:text-white">
              {isActive ? (
                <p className="w-full text-sm underline underline-offset-4">
                  {collection.title}
                </p>
              ) : (
                <Link
                  href={href}
                  className="w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100"
                >
                  {collection.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      
      {/* Mobile dropdown */}
      <div className="md:hidden">
        <select
          value={currentCategory || ''}
          onChange={(e) => {
            const value = e.target.value;
            window.location.href = value ? `/search?category=${value}` : '/search';
          }}
          className="w-full rounded border p-2 text-sm"
        >
          {collections.map((collection) => (
            <option key={collection.handle} value={collection.handle}>
              {collection.title}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}

export default function Collections() {
  return (
    <Suspense fallback={<div className="h-20" />}>
      <CollectionsContent />
    </Suspense>
  );
}
