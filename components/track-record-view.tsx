'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

interface CaseItem {
  id: string;
  no: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  year: string;
  location: string;
  tags: string[];
  thumbnailBg: string;
  image?: string;
  isFullWidth?: boolean;
  previewUrl: string;
  videoUrl: string;
  teamSize: string;
  duration: string;
  context: string;
  execution: { architecture: string; compliance: string; leadership: string };
  highlight: string;
}

const cases: CaseItem[] = [
  {
    id: 'malim-mobility', no: '01', title: 'Malim Mobility Website', subtitle: 'EV Subsidy Tracker & Consulting Platform',
    category: 'SWISS PROJECTS', role: 'Founder & Developer', year: 'Jun 2025 – Present', location: 'Switzerland',
    tags: ['Next.js', 'EV Subsidy', 'Lead Gen'],
    thumbnailBg: 'from-emerald-900 to-emerald-950', image: '/images/work/Malim.png', isFullWidth: true, previewUrl: '', videoUrl: '',
    teamSize: '1', duration: 'Ongoing',
    context: 'Swiss EV charging subsidy information scattered across cantonal websites. No unified resource for consumers or businesses to understand available incentives and ROI.',
    execution: {
      architecture: 'Engineered an integrated EV subsidy tracker and ROI calculator for the official site to drive lead generation.',
      compliance: 'Architected and deployed a cloud-based mobility consulting platform based on comprehensive competitor analysis and charging tech research.',
      leadership: 'Solo project from concept to deployment, combining UX research, development, and market validation.',
    },
    highlight: 'Live platform driving <strong>lead generation</strong> for Swiss EV mobility consulting.',
  },
  {
    id: 'hampelmann', no: '02', title: 'Hampelmann', subtitle: 'Sustainable Children&#39;s Toys Platform',
    category: 'SWISS PROJECTS', role: 'E-Commerce Consultant', year: 'Mar 2024 – Mar 2025', location: 'Netherlands / Switzerland',
    tags: ['Shopify', 'E-Commerce', 'Dutch Market'],
    thumbnailBg: 'from-amber-900 to-amber-950', image: '/images/work/Hampelmann.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '3', duration: '1 Year',
    context: 'Hampelmann needed to expand its sustainable children toys platform in the Dutch market while improving customer engagement and conversion rates.',
    execution: {
      architecture: "Optimized product listings and defined category strategy from children's future dream jobs to toy segmentation.",
      compliance: 'Analyzed Dutch market and order data to optimize operational workflows and ensure compliance with local e-commerce regulations.',
      leadership: 'Reactivated legacy users through holiday events and email marketing campaigns, improving payment conversion by 20%.',
    },
    highlight: 'Improved <strong>payment conversion by 20%</strong> through data-driven user reactivation campaigns.',
  },
  {
    id: 'anjun-express', no: '03', title: 'Anjun Express', subtitle: 'Brazil Cross-Border Logistics System',
    category: 'E-COMMERCE & LOGISTICS', role: 'Product Manager', year: 'Mar 2022 – Jan 2023', location: 'Brazil / China',
    tags: ['API Integration', 'Mercado', 'Data Modeling'],
    thumbnailBg: 'from-green-900 to-green-950', image: '/images/work/Anjun.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '10', duration: '10 Months',
    context: 'Anjun Express needed to integrate with Mercado e-commerce platform and Brazilian last-mile carrier Correios while managing cross-border logistics complexity.',
    execution: {
      architecture: 'Architected data modeling and structures to facilitate seamless API integrations with Mercado and last-mile service Correios.',
      compliance: 'Designed prototypes and interactions for backend systems and mobile operational software meeting Brazilian logistics regulations.',
      leadership: 'Managed cross-border development teams to meet diverse business requirements across China and Brazil.',
    },
    highlight: 'Achieved <strong>60% increase</strong> in overall operational efficiency through logistics data monitoring and optimization.',
  },
  {
    id: 'oppo-mobile', no: '04', title: 'OPPO Mobile', subtitle: 'IT Product Consulting & Digital Strategy',
    category: 'IT PRODUCT CONSULTING', role: 'Product Consultant', year: 'Sep 2021 – Mar 2022', location: 'China',
    tags: ['NPS Analysis', 'Product Strategy', 'UX Research'],
    thumbnailBg: 'from-sky-900 to-sky-950', image: '/images/work/OPPO.png', isFullWidth: true, previewUrl: '', videoUrl: '',
    teamSize: '8', duration: '6 Months',
    context: 'OPPO digital product teams needed strategic guidance to improve user engagement and integrate emerging technologies like Cloud and NFC into their product experience.',
    execution: {
      architecture: 'Provided strategic guidance enhancing user engagement through NPS analysis and data dashboard tracking KPIs for future product experience improvement.',
      compliance: 'Organized workshops and synthesized results from quantitative/qualitative research to develop actionable user cases.',
      leadership: 'Helped teams better integrate with technical products such as Cloud and NFC services through structured consulting sessions.',
    },
    highlight: 'Delivered <strong>NPS dashboard</strong> and strategic roadmap adopted across OPPO digital product teams.',
  },
  {
    id: 'lazada-ued', no: '05', title: 'Lazada Seller Center', subtitle: 'Southeast Asian E-Commerce Design System',
    category: 'E-COMMERCE & LOGISTICS', role: 'Lead UX Designer', year: 'Sep 2016 – Mar 2020', location: 'China / SEA',
    tags: ['Design System', 'Gamification', 'CRM'],
    thumbnailBg: 'from-orange-900 to-orange-950', image: '/images/work/Lazada.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '15+', duration: '4 Years',
    context: 'Lazada seller center running on fragmented frontend across 6 Southeast Asian markets with low seller engagement and retention.',
    execution: {
      architecture: 'Refined the UED design system for both admin and seller-facing CRMs across all markets.',
      compliance: 'Ensured consistent UX standards across 6 markets with localization for each regional context.',
      leadership: 'Designed a User Growth Coins gamification system that increased engagement among 1 million sellers by 60%.',
    },
    highlight: '<strong>60% engagement increase</strong> among <strong>1 million sellers</strong> through gamification system.',
  },
  {
    id: 'rucy', no: '06', title: 'Rucy', subtitle: 'Korean Fashion E-Commerce App',
    category: 'E-COMMERCE & LOGISTICS', role: 'Product Designer', year: 'Jul 2019 – Mar 2020', location: 'Korea / China',
    tags: ['iOS/Android', 'Fashion Tech', 'A/B Testing'],
    thumbnailBg: 'from-pink-900 to-pink-950', image: '/images/work/Jelly Grow.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '6', duration: '8 Months',
    context: 'Korean fashion brand needed a mobile app to enter the Chinese market with AI-powered fashion recommendations tailored to local preferences.',
    execution: {
      architecture: 'Co-defined fashion recommendation strategy with Korean team; led UI/UX design and prototyping for iOS/Android platforms.',
      compliance: 'Managed agile development process ensuring app met both Korean and Chinese market requirements.',
      leadership: 'Led A/B testing and iterative design to launch the app within 4 months of project kickoff.',
    },
    highlight: 'Launched iOS/Android app within <strong>4 months</strong> through agile methodology and A/B testing.',
  },
  {
    id: 'tcl-smart-home', no: '07', title: 'TCL Smart Home App', subtitle: 'IoT Product Line Digital Transformation',
    category: 'END-TO-END PROJECTS', role: 'Senior Product Manager', year: 'Mar 2020 – Sep 2022', location: 'China',
    tags: ['IoT', 'Smart Home', 'Hardware-Software'],
    thumbnailBg: 'from-blue-900 to-blue-950', image: '/images/work/TCL.png', isFullWidth: true, previewUrl: '', videoUrl: '',
    teamSize: '20+', duration: '2.5 Years',
    context: 'TCL needed to transform fragmented White Goods product lines into a cohesive smart home ecosystem with seamless device connectivity.',
    execution: {
      architecture: 'Defined feature roadmaps for White Goods; designed provisioning and pairing workflows across LAN/PAN, LPWAN, and Cellular networks.',
      compliance: 'Established IoT security protocols meeting China GB/T standards and EU CE marking requirements.',
      leadership: 'Leveraged product usage data to iteratively optimize interaction and security protocols between digital interfaces and physical hardware.',
    },
    highlight: 'Transformed <strong>50+ device types</strong> into unified smart home platform with multi-network connectivity.',
  },
  {
    id: 'weiyun', no: '08', title: 'WeiYun Agricultural Software', subtitle: 'Smart Farming IoT Platform',
    category: 'END-TO-END PROJECTS', role: 'Product Designer', year: 'Jan 2018 – Jun 2019', location: 'China',
    tags: ['IoT Sensors', 'Agriculture Tech', 'Real-time Data'],
    thumbnailBg: 'from-lime-900 to-lime-950', image: '/images/work/Weiyun.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '8', duration: '1.5 Years',
    context: 'Agricultural operations needed real-time monitoring of crop conditions with automated alerting to prevent disaster risks for non-technical growers.',
    execution: {
      architecture: 'Designed and implemented real-time data acquisition based on multi-dimensional sensors (temp/humidity, soil EC, light intensity) with anomaly trigger mechanism.',
      compliance: 'Established second-level alerting system for crop disaster risks meeting agricultural safety standards.',
      leadership: 'Led deep optimization of mobile control interface, simplifying remote irrigation and ventilation into one-click interactions.',
    },
    highlight: 'Enabled <strong>second-level crop disaster alerts</strong> with one-click control for non-technical growers.',
  },
  {
    id: 'bafan', no: '09', title: 'BaFan O2O', subtitle: 'Restaurant Management System',
    category: 'END-TO-END PROJECTS', role: 'Product Manager', year: '2021', location: 'China',
    tags: ['O2O', 'SaaS', 'Catering'],
    thumbnailBg: 'from-rose-900 to-rose-950', image: '/images/work/BaFan.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '5', duration: '1 Year',
    context: 'BaFan needed a robust restaurant management and ordering system.',
    execution: {
      architecture: 'Designed comprehensive O2O solution for catering.',
      compliance: 'Ensured transaction security.',
      leadership: 'Led the cross-functional team to deliver the MVP in 3 months.'
    },
    highlight: 'Digitized 50+ local restaurants.'
  },

  {
    id: 'master-wan', no: '10', title: 'Master Wan × IKEA O2O', subtitle: 'Home Repair & Installation Platform',
    category: 'END-TO-END PROJECTS', role: 'Lead UX Designer', year: 'Jan 2018 – Jun 2019', location: 'China',
    tags: ['O2O', 'Service Design', 'IKEA'],
    thumbnailBg: 'from-violet-900 to-violet-950', image: '/images/work/Master wan.png', isFullWidth: true, previewUrl: '', videoUrl: '',
    teamSize: '10', duration: '1.5 Years',
    context: 'Master Wan and IKEA needed an O2O platform connecting home repair professionals with customers, with strong retention and engagement mechanics.',
    execution: {
      architecture: 'Spearheaded UI/UX for Master Wan and IKEA O2O platforms; implemented service rating systems and Gold Coin rewards.',
      compliance: 'Conducted in-depth user interviews and Customer Journey Mapping to iteratively improve platform performance.',
      leadership: 'Led voice-ordering strategy implementation to enhance platform visualization and user experience.',
    },
    highlight: 'Delivered <strong>Gold Coin rewards system</strong> and voice-ordering for IKEA O2O, improving platform engagement.',
  },
];

function VideoThumbnail({ item, onClick }: { item: CaseItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && item.previewUrl) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && item.previewUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative w-full lg:w-[52%] h-[400px] overflow-hidden cursor-pointer shrink-0 rounded-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.thumbnailBg} transition-transform duration-700 ${isHovered ? 'scale-[1.03]' : 'scale-100'}`} />

      {item.previewUrl && (
        <video
          ref={videoRef}
          src={item.previewUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      <span className="absolute bottom-4 right-5 text-[80px] font-bold leading-none select-none pointer-events-none" style={{ color: 'rgba(255,255,255,0.06)' }}>
        {item.no}
      </span>

      <span className="absolute top-5 left-5 text-[9px] tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
        {item.role.toUpperCase()}
      </span>

      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs tracking-widest" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
          VIEW
        </div>
      </div>
    </div>
  );
}

function DetailModal({ item, onClose, onNavigate }: { item: CaseItem; onClose: () => void; onNavigate: (item: CaseItem) => void }) {
  const currentIndex = cases.findIndex(c => c.id === item.id);
  const prevCase = currentIndex > 0 ? cases[currentIndex - 1] : null;
  const nextCase = currentIndex < cases.length - 1 ? cases[currentIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-stretch justify-end"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative bg-white w-full md:w-1/2 h-full shadow-2xl ml-auto overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button - absolute top right */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-9 h-9 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 13L13 1M1 1l12 12" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="flex-1 overflow-y-auto pb-12">
          {/* Header: Title and Year */}
          <div className="mb-10 px-10 pt-5">
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-[-0.02em] leading-tight mb-4 text-left">
              {item.title}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-[11px] tracking-[0.25em] font-mono text-neutral-400">{item.no}</span>
              <span className="h-px w-8 bg-neutral-200" />
              <span className="text-[10px] tracking-[0.2em] font-mono text-neutral-400">{item.year}</span>
            </div>
          </div>

          {/* Block 1: Image full-width */}
          <div className="px-10 mb-10">
            <div className={`w-full ${item.isFullWidth ? 'aspect-[1400/400]' : 'aspect-[700/400]'} rounded-2xl ${item.image ? 'bg-neutral-100' : 'bg-gradient-to-br ' + item.thumbnailBg} overflow-hidden relative`}>
              {item.image && !item.previewUrl && (
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              )}
              {item.previewUrl && (
                <video src={item.previewUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" />
              )}
              <span className="absolute bottom-4 right-6 text-[80px] font-bold leading-none" style={{ color: 'rgba(255,255,255,0.06)' }}>
                {item.no}
              </span>
            </div>
          </div>
          
          <div className="flex justify-center mb-10 px-8 md:px-14 lg:px-20">
            <p className="text-center text-neutral-600 text-sm leading-relaxed max-w-sm">
              {item.context.length > 120 ? item.context.slice(0, 117) + '...' : item.context}
            </p>
          </div>
          
          <div className="h-px w-[40px] bg-neutral-400 mx-auto mb-10" />

          {/* Block 2: Image full-width */}
          <div className="px-10 mb-10">
            <div className={`w-full aspect-[2/1] rounded-2xl bg-gradient-to-tl ${item.thumbnailBg} overflow-hidden opacity-80`} />
          </div>
          
          <div className="flex justify-center mb-10 px-8 md:px-14 lg:px-20">
            <p className="text-center text-neutral-600 text-sm leading-relaxed max-w-sm">
              {item.execution.architecture.length > 120 ? item.execution.architecture.slice(0, 117) + '...' : item.execution.architecture}
            </p>
          </div>
          
          <div className="h-px w-[40px] bg-neutral-400 mx-auto mb-12" />

          {/* Conclusion/Summary Section */}
          <div className="mb-8 px-8 md:px-14 lg:px-20">
            <h3 className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 mb-6">SUMMARY</h3>
            <p className="text-lg leading-relaxed text-black font-medium" dangerouslySetInnerHTML={{ __html: item.highlight }} />
            
            <div className="flex flex-wrap gap-2 mt-8">
              {item.tags.map(tag => (
                <span key={tag} className="text-[10px] tracking-widest border border-neutral-200 px-4 py-1.5 text-neutral-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Previous / Next Navigation */}
        <div className="mt-auto border-t border-neutral-200 grid grid-cols-2 bg-white">
          {prevCase ? (
            <button 
              className="p-6 md:p-8 flex flex-col items-start border-r border-neutral-200 hover:bg-neutral-50 transition-colors group"
              onClick={() => onNavigate(prevCase)}
            >
              <span className="text-[9px] tracking-[0.2em] text-neutral-400 mb-2 flex items-center gap-2 group-hover:text-black transition-colors">
                <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                PREV PROJECT
              </span>
              <span className="font-semibold text-sm truncate w-full text-left">{prevCase.title}</span>
            </button>
          ) : <div className="p-6 md:p-8 border-r border-neutral-200" />}

          {nextCase ? (
            <button 
              className="p-6 md:p-8 flex flex-col items-end hover:bg-neutral-50 transition-colors group text-right"
              onClick={() => onNavigate(nextCase)}
            >
              <span className="text-[9px] tracking-[0.2em] text-neutral-400 mb-2 flex items-center gap-2 group-hover:text-black transition-colors">
                NEXT PROJECT
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
              <span className="font-semibold text-sm truncate w-full">{nextCase.title}</span>
            </button>
          ) : <div className="p-6 md:p-8" />}
        </div>
      </motion.div>
    </motion.div>
  );
}

const VIEW_CATEGORIES = [
  { key: 'ALL', label: 'All Projects' },
  { key: 'SWISS PROJECTS', label: 'Swiss Projects' },
  { key: 'IT PRODUCT CONSULTING', label: 'IT Product Consulting & Analysis' },
  { key: 'E-COMMERCE & LOGISTICS', label: 'E-commerce & Logistics' },
  { key: 'END-TO-END PROJECTS', label: 'End-to-End Projects' },
];

export function TrackRecordView() {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredCases = activeCategory === 'ALL'
    ? cases
    : cases.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-5 md:px-8 lg:px-20 pt-[5px] pb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">All Work</h1>
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {VIEW_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`text-[11px] font-medium px-5 py-2.5 rounded-full transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
      </div>

            {/* Project Grid - All square items, hover reveals black overlay */}
      <div className="px-5 md:px-8 lg:px-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {filteredCases.map((item, index) => {
            // All items are square now, but we still track full-width for layout purposes
            const isFullWidth = item.isFullWidth ?? false;
            const totalItems = filteredCases.length;
            const isFirst = index === 0;
            const isSecondToLast = index === totalItems - 2;
            const isLast = index === totalItems - 1;

            // Corner radius classes
            let cornerClasses = '';
            if (totalItems === 1) {
              // Single item: all 4 corners rounded
              cornerClasses = 'rounded-[40px]';
            } else {
              // Multiple items: outer corners of the whole grid
              // Left side: first item (top-left) and second-to-last or last (bottom-left)
              // Right side: first item (top-right) and last item (bottom-right)
              
              // Top-left corner (first item)
              if (isFirst) {
                cornerClasses += 'rounded-tl-[40px] ';
              }
              
              // Top-right corner (first item)
              if (isFirst) {
                cornerClasses += 'rounded-tr-[40px] ';
              }
              
              // Bottom-left corner (second-to-last if not full-width, or last if full-width)
              if ((isSecondToLast && !isFullWidth) || (isLast && isFullWidth)) {
                cornerClasses += 'rounded-bl-[40px] ';
              }
              
              // Bottom-right corner (last item)
              if (isLast) {
                cornerClasses += 'rounded-br-[40px] ';
              }
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)', willChange: 'transform' }}
                className={`group relative cursor-pointer overflow-hidden ${cornerClasses} ${isFullWidth ? 'md:col-span-2 aspect-[1400/400]' : 'md:col-span-1 aspect-[700/400]'}`}
                onClick={() => setSelectedCase(item)}
              >
                {/* Background Image/Gradient */}
                {item.image ? (
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-[0.25,1,0.5,1] group-hover:scale-105" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.thumbnailBg} transition-transform duration-[800ms] ease-[0.25,1,0.5,1] group-hover:scale-105`} />
                )}
                
                {/* Black Overlay - appears on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/75 transition-all duration-[600ms] ease-out" />
                
                {/* Corner Number - always visible */}
                <span className="absolute top-3 left-4 text-[9px] tracking-[0.25em] font-mono text-white/50 z-10 transition-opacity duration-300 group-hover:text-white/90">
                  {item.no}
                </span>
                
                {/* Category Tag - always visible */}
                <span className="absolute top-3 right-4 text-[8px] tracking-[0.2em] text-white/50 z-10 transition-opacity duration-300 group-hover:text-white/90">
                  {item.category}
                </span>

                {/* Content - appears on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-8 z-10">
                  {/* Title & Subtitle - slide up on hover */}
                  <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[500ms] ease-[0.33,1,0.68,1]">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[9px] tracking-[0.2em] text-white/70 font-mono">{item.year}</p>
                      <span className="h-px w-4 bg-white/30" />
                      <p className="text-[9px] tracking-[0.2em] text-white/50">{item.location}</p>
                    </div>

                    <h3 className={`font-bold text-white mb-2 tracking-tight leading-tight ${isFullWidth ? 'text-xl md:text-3xl' : 'text-lg md:text-2xl'}`}>
                      {item.title}
                    </h3>
                    
                    <p className={`text-white/70 leading-relaxed mb-4 line-clamp-2 ${isFullWidth ? 'text-sm md:text-base max-w-2xl' : 'text-xs max-w-[90%]'}`}>
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

                    {/* View Details Link */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-auto">
                      <span className="text-[9px] tracking-[0.15em] text-white/50 uppercase">{item.role}</span>
                      <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] font-medium text-white/80 group-hover:text-white transition-colors">
                        <span>VIEW PROJECT</span>
                        <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center transition-transform duration-[500ms] ease-[0.33,1,0.68,1] group-hover:translate-x-1.5 group-hover:bg-white group-hover:text-black">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="px-5 md:px-8 lg:px-20 py-12 flex items-center justify-between border-t border-neutral-100 bg-neutral-50/50">
        <span className="text-[11px] tracking-[0.25em] text-neutral-400 font-mono">{filteredCases.length} PROJECTS</span>
        <Link href="/about#contact" className="text-[11px] tracking-[0.25em] font-medium text-neutral-500 hover:text-black transition-colors flex items-center gap-2">
          LET'S COLLABORATE
          <span className="text-lg">↗</span>
        </Link>
      </div>

      <AnimatePresence>
        {selectedCase && (
          <DetailModal 
            item={selectedCase} 
            onClose={() => setSelectedCase(null)} 
            onNavigate={(item) => setSelectedCase(item)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
