'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface TrackItem {
  id: string;
  no: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  videoUrl?: string;
  thumbnailBg: string;
  tags: string[];
}

const trackItems: TrackItem[] = [
  {
    id: 'lazada-growth',
    no: '01',
    title: 'Lazada Seller Center',
    subtitle: 'Design System & UED',
    year: '2016–2020',
    category: 'UX DESIGN',
    thumbnailBg: 'from-orange-900/40 to-orange-950',
    tags: ['Design System', 'UX Research', 'CRM'],
  },
  {
    id: 'tcl-smart-home',
    no: '02',
    title: 'TCL Smart Home App',
    subtitle: 'iOS & Android Design',
    year: '2020–2022',
    category: 'PRODUCT DESIGN',
    thumbnailBg: 'from-blue-900/40 to-blue-950',
    tags: ['Mobile App', 'IoT', 'Smart Home'],
  },
  {
    id: 'malim-energy',
    no: '03',
    title: 'Malim Energy',
    subtitle: 'Swiss EV Subsidy Explorer',
    year: '2025',
    category: 'WEB DEVELOPMENT',
    thumbnailBg: 'from-emerald-900/40 to-emerald-950',
    tags: ['Next.js', 'Framer Motion', 'Data Viz'],
  },
  {
    id: 'azure-rag',
    no: '04',
    title: 'SwissAzureAI',
    subtitle: 'FINMA-Compliant RAG System',
    year: '2024',
    category: 'AI ENGINEERING',
    thumbnailBg: 'from-violet-900/40 to-violet-950',
    tags: ['Azure OpenAI', 'pgvector', 'Terraform'],
  },
  {
    id: 'shopimage',
    no: '05',
    title: 'Shopimage',
    subtitle: 'E-Commerce Image Optimizer',
    year: '2025',
    category: 'PRODUCT',
    thumbnailBg: 'from-rose-900/40 to-rose-950',
    tags: ['Chrome Extension', 'Shopify', 'SaaS'],
  },
  {
    id: 'ai-thesis',
    no: '06',
    title: 'Generative AI in E-Commerce',
    subtitle: 'FHNW Master Thesis',
    year: '2024',
    category: 'RESEARCH',
    thumbnailBg: 'from-neutral-700/40 to-neutral-900',
    tags: ['LLM', 'Research', 'E-Commerce'],
  },
];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

function VideoModal({ item, onClose }: { item: TrackItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
        className="relative w-full max-w-4xl aspect-video bg-black rounded-sm overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {item.videoUrl ? (
          <iframe
            src={item.videoUrl}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${item.thumbnailBg} flex items-center justify-center`}>
            <p className="text-white/30 text-[11px] tracking-[0.3em] uppercase">No video available</p>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

function TrackCard({ item, index }: { item: TrackItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.4, delay: index * 0.06, ease: [0.33, 1, 0.68, 1] }}
        className="relative group bg-[#0a0a0a] cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${item.thumbnailBg} transition-transform duration-700 group-hover:scale-105`} />

          <span className="absolute top-4 left-4 text-[10px] tracking-[0.25em] text-white/30 font-mono">
            {item.no}
          </span>
          <span className="absolute top-4 right-4 text-[9px] tracking-[0.2em] text-white/40 font-medium">
            {item.category}
          </span>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
              <PlayIcon />
            </div>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Info */}
        <div className="p-5 border-t border-neutral-800/60">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="text-white text-[15px] font-semibold tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="text-neutral-500 text-[12px] mt-0.5">{item.subtitle}</p>
            </div>
            <span className="text-neutral-600 text-[11px] font-mono shrink-0 mt-0.5">{item.year}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.tags.map(tag => (
              <span key={tag} className="text-[9px] tracking-[0.15em] text-neutral-500 border border-neutral-800 px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/30 origin-left"
        />
      </motion.div>

      <AnimatePresence>
        {modalOpen && <VideoModal item={item} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function TrackRecord() {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? trackItems : trackItems.slice(0, 1);

  return (
    <section className="bg-[#0a0a0a] px-5 md:px-8 lg:px-20 py-16 md:py-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
        <div>
          <p className="text-[10px] tracking-[0.35em] text-neutral-500 mb-4 font-medium">SELECTED WORK</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.05]">
            Track Record
          </h2>
        </div>
        <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
          A decade of product design, AI engineering, and digital transformation across Asia and Europe.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800/40">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => (
            <TrackCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Less */}
      <div className="mt-10 flex items-center justify-center">
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="group flex items-center gap-3 text-[10px] tracking-[0.3em] text-neutral-500 hover:text-white transition-colors duration-300"
        >
          <span className="h-px w-8 bg-neutral-700 group-hover:bg-white transition-colors duration-300" />
          {expanded ? 'SHOW LESS' : `VIEW ALL ${trackItems.length} PROJECTS`}
          <span className="h-px w-8 bg-neutral-700 group-hover:bg-white transition-colors duration-300" />
        </button>
      </div>
    </section>
  );
}
