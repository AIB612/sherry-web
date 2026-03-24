'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import React, { useState, useRef } from 'react';

interface CaseItem {
  id: string;
  no: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  location: string;
  tags: string[];
  thumbnailBg: string;
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
    id: 'malim-energy', no: '01', title: 'Malim Energy', subtitle: 'Swiss EV Subsidy Explorer',
    role: 'Founder & Developer', year: '2025', location: 'Switzerland',
    tags: ['Next.js', 'Framer Motion', 'Data Viz'],
    thumbnailBg: 'from-emerald-900 to-emerald-950', previewUrl: '', videoUrl: '',
    teamSize: '1', duration: '3 Months',
    context: 'Swiss EV charging subsidy information scattered across cantonal websites. No unified resource for consumers to understand available incentives.',
    execution: {
      architecture: 'Built interactive Swiss map with real-time subsidy data visualization, ROI calculator, and multi-language support (DE/FR/EN).',
      compliance: 'Ensured data accuracy by cross-referencing official cantonal sources and federal regulations.',
      leadership: 'Solo project from concept to deployment, including UX research and market validation.',
    },
    highlight: 'Launched MVP covering <strong>9 cantons</strong> with <strong>3-language</strong> support and dynamic ROI calculations.',
  },
  {
    id: 'shopimage', no: '02', title: 'Shopimage', subtitle: 'E-Commerce Image Optimizer',
    role: 'Founder & Developer', year: '2025', location: 'Switzerland',
    tags: ['Chrome Extension', 'Shopify', 'SaaS'],
    thumbnailBg: 'from-rose-900 to-rose-950', previewUrl: '', videoUrl: '',
    teamSize: '1', duration: '4 Months',
    context: 'E-commerce merchants struggling with image optimization across multiple platforms. Manual processes consuming hours of work weekly.',
    execution: {
      architecture: 'Developed Chrome extension with one-click optimization, batch processing, and Shopify App integration.',
      compliance: 'Built with privacy-first approach, processing images client-side where possible.',
      leadership: 'End-to-end product development including Chrome Web Store and Shopify App Store submissions.',
    },
    highlight: 'Deployed to production with <strong>Chrome Extension</strong> and <strong>Shopify App</strong> awaiting store approval.',
  },
  {
    id: 'azure-rag', no: '03', title: 'SwissAzureAI', subtitle: 'FINMA-Compliant RAG System',
    role: 'AI Engineer', year: '2024', location: 'Switzerland',
    tags: ['Azure OpenAI', 'pgvector', 'Terraform'],
    thumbnailBg: 'from-violet-900 to-violet-950', previewUrl: '', videoUrl: '',
    teamSize: '3', duration: '6 Months',
    context: 'Swiss enterprises unable to adopt AI due to data residency concerns. No compliant RAG solutions available for FADP/FINMA regulated industries.',
    execution: {
      architecture: 'Architected Azure Switzerland North deployment with pgvector for on-premise vector storage, ensuring zero data egress.',
      compliance: 'Achieved FADP compliance with data residency guarantees, FINMA-ready audit trails, and SOC2 aligned security controls.',
      leadership: 'Led technical decision-making across infrastructure, security, and ML teams.',
    },
    highlight: 'Enabled AI adoption for regulated Swiss industries with <strong>60%</strong> faster document processing and <strong>full compliance</strong> certification.',
  },
  {
    id: 'ai-thesis', no: '04', title: 'Generative AI in E-Commerce', subtitle: 'FHNW Master Thesis',
    role: 'Researcher', year: '2024', location: 'Switzerland',
    tags: ['LLM', 'Research', 'E-Commerce'],
    thumbnailBg: 'from-neutral-700 to-neutral-900', previewUrl: '', videoUrl: '',
    teamSize: '1', duration: '6 Months',
    context: 'Limited academic research on practical applications of Generative AI assistants in e-commerce business contexts.',
    execution: {
      architecture: 'Conducted comprehensive literature review and developed prototype AI assistant for e-commerce workflows.',
      compliance: 'Followed FHNW research ethics guidelines and data protection requirements.',
      leadership: 'Independent research project with regular advisor consultations and industry expert interviews.',
    },
    highlight: 'Completed Master thesis at <strong>FHNW</strong> with practical recommendations for <strong>AI integration</strong> in e-commerce.',
  },
  {
    id: 'tcl-app-design', no: '05', title: 'TCL Smart Home App', subtitle: 'IoT Product Line Digital Transformation',
    role: 'Senior Product Manager', year: '2020-2022', location: 'China',
    tags: ['Mobile App', 'IoT', 'Smart Home'],
    thumbnailBg: 'from-blue-900 to-blue-950', previewUrl: '', videoUrl: '',
    teamSize: '8', duration: '2 Years',
    context: 'Fragmented smart home ecosystem with 5 separate applications. User retention dropping 15% quarterly due to poor cross-platform integration.',
    execution: {
      architecture: 'Unified 5 legacy applications into a single AIxIoT platform with modular microservices supporting 50+ device types.',
      compliance: 'Established IoT security protocols meeting China GB/T standards and EU CE marking requirements.',
      leadership: 'Bridged R&D, Marketing, and Operations teams through bi-weekly syncs, aligning product roadmap with business KPIs.',
    },
    highlight: 'Achieved <strong>20%</strong> new user acquisition and <strong>35%</strong> retention improvement within <strong>12 months</strong>.',
  },
  {
    id: 'lazada-ued', no: '06', title: 'Lazada Seller Center', subtitle: 'Southeast Asian E-Commerce Standardization',
    role: 'Lead Tech PM', year: '2016-2020', location: 'China / SEA',
    tags: ['Design System', 'UX Research', 'CRM'],
    thumbnailBg: 'from-orange-900 to-orange-950', previewUrl: '', videoUrl: '',
    teamSize: '15+', duration: '4 Years',
    context: 'Legacy seller center running on fragmented frontend architectures across 6 Southeast Asian markets. 30% longer deployment cycles.',
    execution: {
      architecture: 'Rebuilt frontend ecosystem with centralized component library and standardized API handoffs.',
      compliance: 'Implemented GDPR-aligned data handling for EU sellers, ensuring cross-border data flows met regional requirements.',
      leadership: 'Coordinated 12 engineers and product managers across 5 departments with weekly alignment sessions.',
    },
    highlight: 'Accelerated deployment cycles by <strong>40%</strong> while reducing technical debt by <strong>60%</strong> across <strong>6 markets</strong>.',
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
      className="relative w-full lg:w-[52%] aspect-video overflow-hidden cursor-pointer shrink-0 rounded-2xl"
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

function DetailModal({ item, onClose }: { item: CaseItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-stretch justify-end p-4 md:p-6"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-white rounded-3xl w-full max-w-2xl h-full shadow-2xl ml-auto overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Hero Section */}
        <div className={`relative h-[200px] md:h-[280px] bg-gradient-to-br ${item.thumbnailBg} overflow-hidden`}>
          <span className="absolute bottom-4 right-6 text-[100px] font-bold leading-none" style={{ color: 'rgba(255,255,255,0.08)' }}>
            {item.no}
          </span>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            &#x2715;
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white/70 text-sm mb-1">{item.year} · {item.location}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{item.title}</h1>
            <p className="text-white/80">{item.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          <div className="p-6 md:p-8">
            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-neutral-200">
              <div>
                <p className="text-[10px] tracking-widest text-neutral-400 mb-1">YEAR</p>
                <p className="font-medium">{item.year}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest text-neutral-400 mb-1">ROLE</p>
                <p className="font-medium">{item.role}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest text-neutral-400 mb-1">TEAM</p>
                <p className="font-medium">{item.teamSize}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest text-neutral-400 mb-1">DURATION</p>
                <p className="font-medium">{item.duration}</p>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3">Overview</h2>
              <p className="text-neutral-600 leading-relaxed">{item.context}</p>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3">Technologies & Skills</h2>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="text-sm border border-neutral-200 rounded-full px-4 py-1.5 hover:border-black transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* STAR Details */}
            <div className="space-y-6">
              <div className="bg-neutral-50 rounded-2xl p-5">
                <p className="text-[10px] tracking-widest text-neutral-400 mb-2">ARCHITECTURE</p>
                <p className="text-neutral-700 leading-relaxed">{item.execution.architecture}</p>
              </div>
              <div className="bg-neutral-50 rounded-2xl p-5">
                <p className="text-[10px] tracking-widest text-neutral-400 mb-2">COMPLIANCE</p>
                <p className="text-neutral-700 leading-relaxed">{item.execution.compliance}</p>
              </div>
              <div className="bg-neutral-50 rounded-2xl p-5">
                <p className="text-[10px] tracking-widest text-neutral-400 mb-2">LEADERSHIP</p>
                <p className="text-neutral-700 leading-relaxed">{item.execution.leadership}</p>
              </div>
            </div>

            {/* Result */}
            <div className="mt-8 bg-black text-white rounded-2xl p-6">
              <p className="text-[10px] tracking-widest text-white/60 mb-2">RESULT</p>
              <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: item.highlight }} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TrackRecordView() {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-5 md:px-8 lg:px-20 pt-12 pb-8">
        <p className="text-[10px] tracking-[0.3em] text-neutral-400 mb-3">SELECTED WORK</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Track Record</h1>
        <p className="text-neutral-500 max-w-2xl">
          A decade of product design, AI engineering, and digital transformation across Asia and Europe.
        </p>
      </div>

      {/* Project List - 左视频+右信息 全宽布局 */}
      <div className="border-t border-neutral-200">
        {cases.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="group px-5 md:px-8 lg:px-20 border-b border-neutral-200"
          >
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 py-10 md:py-14">
              <VideoThumbnail item={item} onClick={() => setSelectedCase(item)} />

              <div className="flex flex-col justify-center py-4 lg:py-0 flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[10px] tracking-widest font-mono text-neutral-400">{item.no}</span>
                  <span className="h-px w-8 bg-neutral-300" />
                  <span className="text-[10px] tracking-widest font-mono text-neutral-400">{item.year}</span>
                  <span className="text-[10px] tracking-widest text-neutral-400">{item.location}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight mb-2 tracking-tight">
                  {item.title}
                </h2>
                <p className="text-neutral-500 text-sm mb-6">{item.subtitle}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[9px] tracking-widest text-neutral-500 border border-neutral-200 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-neutral-200 mb-6" />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-widest text-neutral-400 uppercase">{item.role}</span>
                  <button
                    onClick={() => setSelectedCase(item)}
                    className="flex items-center gap-2 text-[10px] tracking-widest text-neutral-500 hover:text-black transition-colors"
                  >
                    <span>VIEW DETAILS</span>
                    <span>&#8594;</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-5 md:px-8 lg:px-20 py-10 flex items-center justify-between">
        <span className="text-[10px] tracking-widest text-neutral-400">{cases.length} PROJECTS</span>
        <Link href="/about#contact" className="text-[10px] tracking-widest text-neutral-500 hover:text-black transition-colors">
          GET IN TOUCH
        </Link>
      </div>

      <AnimatePresence>
        {selectedCase && <DetailModal item={selectedCase} onClose={() => setSelectedCase(null)} />}
      </AnimatePresence>
    </div>
  );
}
