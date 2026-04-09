'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface TrackItem {
  id: string;
  no: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  videoUrl?: string;
  thumbnailBg: string;
  image?: string;
  isFullWidth?: boolean;
  tags: string[];
  description?: string[];
}

const trackItems: TrackItem[] = [
  {
    id: 'malim-mobility',
    no: '01',
    title: 'Malim Mobility Website',
    subtitle: 'EV Subsidy Tracker & Consulting Platform',
    year: 'Jun 2025 – Present',
    category: 'SWISS PROJECTS',
    thumbnailBg: 'from-emerald-900/40 to-emerald-950', image: '/images/work/Malim.png', isFullWidth: true,
    tags: ['Next.js', 'EV Subsidy', 'Lead Gen'],
    description: [
      'Engineered an integrated EV subsidy tracker and ROI calculator for the official site to drive lead generation.',
      'Architected and deployed a cloud-based mobility consulting platform based on comprehensive competitor analysis and charging tech research.',
    ],
  },
  {
    id: 'hampelmann',
    no: '02',
    title: 'Hampelmann',
    subtitle: "Sustainable Children's Toys Platform",
    year: 'Mar 2024 – Mar 2025',
    category: 'SWISS PROJECTS',
    thumbnailBg: 'from-amber-900/40 to-amber-950', image: '/images/work/Hampelmann.png',
    tags: ['Shopify', 'E-Commerce', 'Dutch Market'],
    description: [
      "Contributed to the expansion of the Hampelmann sustainable children's toys platform by optimizing product listings and enhancing customer engagement.",
      'Analyzed Dutch market and order data to optimize operational workflows; reactivated legacy users through holiday events and email marketing, improving payment conversion by 20%.',
    ],
  },
  {
    id: 'anjun-express',
    no: '03',
    title: 'Anjun Express',
    subtitle: 'Brazil Logistics System',
    year: 'Mar 2022 – Jan 2023',
    category: 'E-COMMERCE & LOGISTICS',
    thumbnailBg: 'from-blue-900/40 to-blue-950', image: '/images/work/Anjun.png',
    tags: ['API Integration', 'Mercado', 'Data Modeling'],
    description: [
      'Architected data modeling and API integrations with Mercado Ecommerce platform and last-mile service Correios; designed prototypes for backend systems and mobile operational software.',
      'Analyzed logistics status data to monitor lead times from order to last-mile delivery, achieving a 60% increase in overall operational efficiency.',
    ],
  },  {
    id: 'oppo-mobile',
    no: '04',
    title: 'OPPO Mobile',
    subtitle: 'IT Product Consulting & Analysis',
    year: 'Sep 2021 – Mar 2022',
    category: 'IT CONSULTING',
    thumbnailBg: 'from-red-900/40 to-red-950', image: '/images/work/OPPO.png', isFullWidth: true,
    tags: ['NPS Analysis', 'Product Strategy', 'UX Research'],
    description: [
      'Provided strategic guidance to OPPO mobile phone digital product teams, enhancing user engagement through NPS analysis and data dashboard tracking.',
      'Organized workshops and synthesized results from quantitative/qualitative research; developed user cases for Cloud and NFC service integration.',
    ],
  },
  {
    id: 'lazada',
    no: '05',
    title: 'Lazada Seller Center',
    subtitle: 'UED Design System & Operating Center',
    year: 'Sep 2016 – Mar 2020',
    category: 'E-COMMERCE & LOGISTICS',
    thumbnailBg: 'from-orange-900/40 to-orange-950',
    tags: ['Design System', 'Gamification', 'CRM'],
    description: [
      'Refined the UED design system for both admin and seller-facing CRMs; designed a "User Growth Coins" gamification system that increased engagement among 1 million sellers by 60%.',
    ],
  },
  {
    id: 'rucy',
    no: '06',
    title: 'Rucy',
    subtitle: 'Korean Fashion E-Commerce App',
    year: 'Jul 2019 – Mar 2020',
    category: 'E-COMMERCE & LOGISTICS',
    thumbnailBg: 'from-pink-900/40 to-pink-950', image: '/images/work/Jelly Grow.png',
    tags: ['iOS/Android', 'Fashion Tech', 'A/B Testing'],
    description: [
      'Co-defined a fashion recommendation strategy with the Korean team; led UI/UX design and prototyping for iOS/Android platforms.',
      'Managed agile development and A/B testing to launch the app within 4 months.',
    ],
  },

  {
    id: 'tcl-smart-home',
    no: '07',
    title: 'TCL Smart Home App',
    subtitle: 'IoT UX & Hardware-Software Integration',
    year: 'Mar 2020 – Sep 2022',
    category: 'END-TO-END PROJECTS',
    thumbnailBg: 'from-sky-900/40 to-sky-950', image: '/images/work/TCL.png', isFullWidth: true,
    tags: ['IoT', 'Smart Home', 'Hardware-Software'],
    description: [
      'Defined feature roadmaps for "White Goods" to improve UX; designed provisioning and pairing workflows across LAN/PAN, LPWAN, and Cellular networks based on specific user scenarios.',
      'Leveraged product usage data to iteratively optimize the interaction and security protocols between digital interfaces and physical hardware.',
    ],
  },
  {
    id: 'weiyun-agri',
    no: '08',
    title: 'WeiYun Agricultural Software',
    subtitle: 'Smart Planting Control System',
    year: 'Jan 2018 – Jun 2019',
    category: 'END-TO-END PROJECTS',
    thumbnailBg: 'from-green-900/40 to-green-950', image: '/images/work/Weiyun.png',
    tags: ['IoT Sensors', 'Agriculture Tech', 'Real-time Data'],
    description: [
      'Designed and implemented a real-time data acquisition system based on multi-dimensional sensors (temp/humidity, soil EC, light intensity) with anomaly trigger mechanism for second-level crop disaster alerting.',
      'Led deep optimization of the mobile control interface, simplifying remote irrigation and ventilation control into one-click interactions for non-technical growers.',
    ],
  },
    {
    id: 'bafan', no: '09',
    title: 'BaFan O2O',
    subtitle: 'Restaurant Management System',
    year: '2021',
    category: 'END-TO-END PROJECTS',
    thumbnailBg: 'from-rose-900/40 to-rose-950',
    image: '/images/work/BaFan.png',
    tags: ['O2O', 'SaaS', 'Catering'],
    description: [
      'Designed comprehensive O2O solution for catering.',
      'Digitized 50+ local restaurants.'
    ],
  },
{
    id: 'master-wan', no: '10',
    title: 'Master Wan × IKEA O2O',
    subtitle: 'Home Repair & Installation Platform',
    year: 'Jan 2018 – Jun 2019',
    category: 'END-TO-END PROJECTS',
    thumbnailBg: 'from-yellow-900/40 to-yellow-950', image: '/images/work/Master wan.png', isFullWidth: true,
    tags: ['O2O', 'Service Design', 'IKEA'],
    description: [
      'Spearheaded UI/UX for Master Wan and IKEA O2O platforms; implemented service rating systems, "Gold Coin" rewards, and voice-ordering strategies to enhance platform experience.',
      'Iteratively improved platform performance through in-depth user interviews and Customer Journey Mapping.',
    ],
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
        className="relative w-full max-w-4xl aspect-[2/1] bg-black rounded-sm overflow-hidden"
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
          <div className={`w-full h-full bg-gradient-to-br ${item.thumbnailBg} flex flex-col items-start justify-end p-8`}>
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-4">{item.category}</p>
            <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-white/60 text-sm mb-4">{item.year}</p>
            {item.description && (
              <ul className="space-y-2 max-w-xl">
                {item.description.map((point, i) => (
                  <li key={i} className="text-white/70 text-[13px] leading-relaxed flex gap-2">
                    <span className="text-white/30 mt-1">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
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
        className={`relative group bg-white cursor-pointer rounded-[40px] overflow-hidden ${item.isFullWidth ? 'md:col-span-2 aspect-[1400/400]' : 'md:col-span-1 aspect-[700/400]'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        {/* 统一为单一体块卡片，像 All Work 页面一样 */}
        <div className={`relative overflow-hidden w-full h-full`}>
          {item.image ? (
            <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-[0.25,1,0.5,1] group-hover:scale-105" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${item.thumbnailBg} transition-transform duration-[800ms] ease-[0.25,1,0.5,1] group-hover:scale-105`} />
          )}
          
          {/* Black Overlay - appears on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/75 transition-all duration-[600ms] ease-out" />

          {/* Corner Number */}
          <span className="absolute top-3 left-4 text-[9px] tracking-[0.25em] font-mono text-white/50 z-10 transition-opacity duration-300 group-hover:text-white/90">
            {item.no}
          </span>
          
          {/* Category Tag */}
          <span className="absolute top-3 right-4 text-[8px] tracking-[0.2em] text-white/50 z-10 transition-opacity duration-300 group-hover:text-white/90">
            {item.category}
          </span>

          {/* Play Icon - appears on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
              <PlayIcon />
            </div>
          </motion.div>

          {/* Content - appears on hover (像 All Work 页面) */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-8 z-10">
            <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[500ms] ease-[0.33,1,0.68,1]">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-[9px] tracking-[0.2em] text-white/70 font-mono">{item.year}</p>
                <span className="h-px w-4 bg-white/30" />
                <p className="text-[9px] tracking-[0.2em] text-white/50">Switzerland</p>
              </div>

              <h3 className="font-bold text-white mb-2 tracking-tight leading-tight text-lg md:text-2xl">
                {item.title}
              </h3>
              
              <p className="text-white/70 leading-relaxed mb-4 line-clamp-2 text-xs max-w-[90%]">
                {item.subtitle}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[8px] tracking-[0.15em] text-white/60 border border-white/20 px-2 py-1 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Bottom line indicator */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/40 origin-left"
        />
      </motion.div>

      <AnimatePresence>
        {modalOpen && <VideoModal item={item} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

const CATEGORIES = [
  { key: 'ALL', label: 'All Projects' },
  { key: 'SWISS PROJECTS', label: 'Swiss Projects' },
  { key: 'IT CONSULTING', label: 'IT Product Consulting & Analysis' },
  { key: 'E-COMMERCE & LOGISTICS', label: 'E-commerce & Logistics' },
  { key: 'END-TO-END PROJECTS', label: 'End-to-End Projects' },
];

export default function TrackRecord() {
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredItems = activeCategory === 'ALL'
    ? trackItems
    : trackItems.filter(item => item.category === activeCategory);

  const visibleItems = activeCategory === 'ALL' && !expanded
    ? filteredItems.slice(0, 3)
    : filteredItems;

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setExpanded(false);
  };

  return (
    <section className="bg-white px-5 md:px-8 lg:px-20 py-16 md:py-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
        <div>
          <p className="text-[10px] tracking-[0.35em] text-neutral-500 mb-4 font-medium">SELECTED WORK</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-black leading-[1.05] mb-6">
            All Work
          </h2>
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`text-[9px] tracking-[0.25em] px-4 py-2 transition-all duration-200 ${
                  activeCategory === cat.key
                    ? 'text-black border border-black/30 bg-black/[0.06]'
                    : 'text-neutral-500 border border-neutral-300 hover:text-neutral-800 hover:border-neutral-600'
                }`}
              >
                {cat.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <p className="text-neutral-600 text-sm max-w-xs leading-relaxed self-start">
          A decade of product design, AI engineering, and digital transformation across Asia and Europe.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => (
            <TrackCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Less — only shown when ALL and not all visible */}
      {activeCategory === 'ALL' && (
        <div className="mt-16 flex items-center justify-center">
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="group relative overflow-hidden flex items-center gap-4 text-[11px] tracking-[0.25em] text-black border border-neutral-300 hover:border-black px-10 py-4 transition-all duration-500"
          >
            <span className="relative z-10 flex items-center gap-3">
              {expanded ? 'SHOW LESS' : `VIEW ALL ${trackItems.length} PROJECTS`}
              <svg 
                className={`w-3.5 h-3.5 transition-transform duration-500 ${expanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.33,1,0.68,1] opacity-10" />
          </button>
        </div>
      )}
    </section>
  );
}
