'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProductModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 10);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => router.back(), 300);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300"
        onClick={handleClose}
        style={{ opacity: isOpen ? 0.5 : 0 }}
      />
      <div
        className="absolute right-0 top-0 h-full w-full md:w-1/2 bg-white shadow-2xl transition-transform duration-300 ease-out overflow-y-auto dark:bg-neutral-900"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <button
          onClick={handleClose}
          className="sticky top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-black/90 dark:hover:bg-black"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="px-6 pb-8 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
