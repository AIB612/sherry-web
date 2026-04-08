'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioItems } from 'lib/portfolio-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WorkDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  // For static export we read the id from the resolved params promise synchronously via wrapper
  // But since this is 'use client' we use React.use() to unwrap
  const { id } = React.use(params);
  
  const item = portfolioItems.find(p => p.id === id);
  
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found</p>
      </div>
    );
  }

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => router.back(), 300);
  };

  const currentIndex = portfolioItems.findIndex(p => p.id === id);
  const prevItem = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null;
  const nextItem = currentIndex < portfolioItems.length - 1 ? portfolioItems[currentIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      <div className="relative h-[60vh] bg-neutral-100 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center"
        >
          <span className="text-8xl opacity-20">
            {item.category === 'design' && '🎨'}
            {item.category === 'product' && '📦'}
            {item.category === 'development' && '💻'}
          </span>
        </motion.div>

        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {item.featured && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-6 left-6 bg-black text-white text-xs px-3 py-1.5 rounded-full"
          >
            FEATURED
          </motion.div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/60 to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-white/70 text-sm mb-2">{item.year} · {item.company}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{item.title}</h1>
            <p className="text-white/80 text-lg">{item.subtitle}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-neutral-200"
        >
          <div>
            <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-2">YEAR</p>
            <p className="font-medium">{item.year}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-2">COMPANY</p>
            <p className="font-medium">{item.company}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-2">LOCATION</p>
            <p className="font-medium">{item.location}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-2">CATEGORY</p>
            <p className="font-medium capitalize">{item.category}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <p className="text-neutral-600 leading-relaxed text-lg">{item.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Technologies & Skills</h2>
          <div className="flex flex-wrap gap-3">
            {item.tags.map((tag) => (
              <span key={tag} className="text-sm border border-neutral-200 rounded-full px-4 py-2 hover:border-black transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {item.link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-16"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors"
            >
              View Project
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-between items-center pt-16 border-t border-neutral-200"
        >
          {prevItem ? (
            <Link href={`/work/${prevItem.id}`} className="group">
              <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-1">← PREVIOUS</p>
              <p className="font-medium group-hover:underline">{prevItem.title}</p>
            </Link>
          ) : <div />}
          
          <Link href="/search" className="text-sm text-neutral-500 hover:text-black transition-colors">
            All Projects
          </Link>

          {nextItem ? (
            <Link href={`/work/${nextItem.id}`} className="text-right group">
              <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-1">NEXT →</p>
              <p className="font-medium group-hover:underline">{nextItem.title}</p>
            </Link>
          ) : <div />}
        </motion.div>
      </div>
    </motion.div>
  );
}
