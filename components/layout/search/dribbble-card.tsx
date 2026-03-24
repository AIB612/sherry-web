'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DribbbleCardContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';

  if (category !== 'design') return null;

  return (
    <div className="mt-8">
      <div className="mb-3">
        <p className="text-xs text-neutral-400 mb-2">Dribbble</p>
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src="/avatar.jpg" alt="Sherry" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex gap-4 mb-3">
        <div>
          <p className="text-sm font-bold">376</p>
          <p className="text-[9px] text-neutral-400">Followers</p>
        </div>
        <div>
          <p className="text-sm font-bold">23K</p>
          <p className="text-[9px] text-neutral-400">Likes</p>
        </div>
      </div>
      <a 
        href="https://dribbble.com/ChenxueBranny" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block text-center text-[10px] text-neutral-500 hover:text-black transition-colors border border-neutral-200 rounded-lg py-1.5"
      >
        View Profile →
      </a>
    </div>
  );
}

export default function DribbbleCard() {
  return (
    <Suspense fallback={null}>
      <DribbbleCardContent />
    </Suspense>
  );
}
