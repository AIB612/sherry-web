"use client";

import { portfolioCategories } from "lib/portfolio-data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  return (
    <nav>
      <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
        Categories
      </h3>
      <ul className="hidden md:block">
        {portfolioCategories.map((collection) => {
          const isActive = currentCategory === collection.id || 
            (!currentCategory && collection.id === '');
          const href = collection.id 
            ? `/search?category=${collection.id}` 
            : '/search';
          
          return (
            <li key={collection.id} className="mt-2 flex text-black dark:text-white">
              {isActive ? (
                <p className="w-full text-sm underline underline-offset-4">
                  {collection.name} <span className="text-neutral-400">({collection.count})</span>
                </p>
              ) : (
                <Link
                  href={href}
                  className="w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100"
                >
                  {collection.name} <span className="text-neutral-400">({collection.count})</span>
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
          {portfolioCategories.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name} ({collection.count})
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
