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
  detailImage1?: string;
  detailImage2?: string;
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
    thumbnailBg: 'from-emerald-900 to-emerald-950', image: '/images/work/Malim.png', detailImage1: '/images/work/malim1.png', detailImage2: '/images/work/malim2.png', isFullWidth: true, previewUrl: '', videoUrl: '',
    teamSize: '1', duration: 'Ongoing',
    context: 'A cloud-based mobility consulting platform and official website dedicated to EV (Electric Vehicle) solutions.',
    execution: {
      architecture: 'Architected and deployed the scalable platform based on comprehensive competitor analysis and cutting-edge charging tech research; built a robust PgvectorSQL database on the cloud. Engineered an innovative, integrated EV subsidy tracker and ROI calculator.',
      compliance: 'Architected and deployed the scalable platform based on comprehensive competitor analysis and cutting-edge charging tech research; built a robust PgvectorSQL database on the cloud. Engineered an innovative, integrated EV subsidy tracker and ROI calculator.',
      leadership: 'Successfully launched the platform online, significantly driving targeted lead generation and accelerating overall user acquisition.',
    },
    highlight: 'Successfully launched the platform online, significantly driving targeted <strong>lead generation</strong> and accelerating overall user acquisition.',
  },
  {
    id: 'hampelmann', no: '02', title: 'Hampelmann Shopify', subtitle: 'Sustainable Kids Toy E-Commerce Platform',
    category: 'SWISS PROJECTS', role: 'E-Commerce Consultant', year: 'Mar 2024 – Mar 2025', location: 'Netherlands / Switzerland',
    tags: ['Shopify', 'E-Commerce', 'Dutch Market'],
    thumbnailBg: 'from-amber-900 to-amber-950', image: '/images/work/Hampelmann.png', detailImage1: '/images/work/Hamplemann1.png', detailImage2: '/images/work/Hamplemann2.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '3', duration: '1 Year',
    context: 'It was positioned for the Dutch market with a focus on category strategy, customer engagement, and conversion growth.',
    execution: {
      architecture: 'Conceptualized a visionary e-commerce strategy by segmenting toy categories based on achieving children’s future dream jobs. Drove strategic expansion by optimizing product listings and pioneering new customer engagement models.',
      compliance: 'Conceptualized a visionary e-commerce strategy by segmenting toy categories based on achieving children’s future dream jobs. Drove strategic expansion by optimizing product listings and pioneering new customer engagement models.',
      leadership: 'Reactivated legacy users through targeted holiday events and data-driven email marketing, leveraging complex Dutch market data to boost user experience and increase payment conversion rates by 20%.',
    },
    highlight: 'Reactivated legacy users through targeted holiday events and data-driven email marketing, boosting user experience and increasing <strong>payment conversion rates by 20%</strong>.',
  },
  {
    id: 'anjun-express', no: '03', title: 'Anjun Express', subtitle: 'Brazil Cross-Border Logistics System',
    category: 'E-COMMERCE & LOGISTICS', role: 'Product Manager', year: 'Mar 2022 – Jan 2023', location: 'Brazil / China',
    tags: ['API Integration', 'Mercado', 'Data Modeling'],
    thumbnailBg: 'from-green-900 to-green-950', image: '/images/work/Anjun.png', detailImage1: '/images/work/Anjun1.png', detailImage2: '/images/work/Anjun2.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '10', duration: '10 Months',
    context: 'A comprehensive logistics system integrating the Mercado E-commerce platform with the Correios last-mile service.',
    execution: {
      architecture: 'Architected advanced data models for seamless, real-time API integrations. Designed innovative prototypes and intuitive interactions for backend systems and mobile operational software, efficiently managing cross-border agile development teams.',
      compliance: 'Architected advanced data models for seamless, real-time API integrations. Designed innovative prototypes and intuitive interactions for backend systems and mobile operational software, efficiently managing cross-border agile development teams.',
      leadership: 'Leveraged deep logistics status data analysis to monitor and optimize lead times from order to last-mile delivery, driving a remarkable 60% surge in overall operational efficiency.',
    },
    highlight: 'Leveraged deep logistics status data analysis to monitor and optimize lead times from order to last-mile delivery, driving a remarkable <strong>60% surge</strong> in overall operational efficiency.',
  },
  {
    id: 'oppo-mobile', no: '04', title: 'OPPO Mobile', subtitle: 'IT Product Consulting & Analysis',
    category: 'IT PRODUCT CONSULTING', role: 'Product Consultant', year: 'Sep 2021 – Mar 2022', location: 'China',
    tags: ['NPS Analysis', 'Product Strategy', 'UX Research'],
    thumbnailBg: 'from-sky-900 to-sky-950', image: '/images/work/OPPO.png', detailImage1: '/images/work/Oppo1.png', detailImage2: '/images/work/Oppo2.png', isFullWidth: true, previewUrl: '', videoUrl: '',
    teamSize: '8', duration: '6 Months',
    context: 'Strategic IT product consulting for OPPO\'s digital product teams focusing on future product experience improvement.',
    execution: {
      architecture: 'Orchestrated interactive workshops and synthesized quantitative and qualitative research. Formulated innovative user cases to seamlessly integrate cross-functional teams with emerging technical products like Cloud and NFC services.',
      compliance: 'Orchestrated interactive workshops and synthesized quantitative and qualitative research. Formulated innovative user cases to seamlessly integrate cross-functional teams with emerging technical products like Cloud and NFC services.',
      leadership: 'Delivered forward-thinking strategic guidance that elevated user engagement through optimized features, advanced NPS analysis, and dynamic KPI-tracking data dashboards.',
    },
    highlight: 'Delivered forward-thinking strategic guidance that elevated user engagement through optimized features, advanced <strong>NPS analysis</strong>, and dynamic KPI-tracking data dashboards.',
  },
  {
    id: 'lazada-ued', no: '05', title: 'Lazada Seller Center', subtitle: 'Operating Center & Seller CRM System',
    category: 'E-COMMERCE & LOGISTICS', role: 'Lead UX Designer', year: 'Sep 2016 – Mar 2020', location: 'China / SEA',
    tags: ['Design System', 'Gamification', 'CRM'],
    thumbnailBg: 'from-orange-900 to-orange-950', image: '/images/work/Lazada.png', detailImage1: '/images/work/Lazada1.png', detailImage2: '/images/work/Lazada2.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '15+', duration: '4 Years',
    context: 'The primary admin and seller-facing CRM systems for the Lazada e-commerce platform.',
    execution: {
      architecture: 'Modernized the UED design system across the platform. Conceptualized, designed, and launched a highly innovative User Growth Coins gamification system.',
      compliance: 'Modernized the UED design system across the platform. Conceptualized, designed, and launched a highly innovative User Growth Coins gamification system.',
      leadership: 'Successfully surged platform engagement and activity among a massive user base of 1 million sellers by an impressive 60%.',
    },
    highlight: 'Successfully surged platform engagement and activity among a massive user base of <strong>1 million sellers</strong> by an impressive <strong>60%</strong>.',
  },
  {
    id: 'jelly-erp', no: '06', title: 'Jelly ERP', subtitle: 'Private Domain Operations & Customer Growth Management System',
    category: 'E-COMMERCE & LOGISTICS', role: 'Product Designer', year: 'Jul 2019 – Mar 2020', location: 'Korea / China',
    tags: ['Private Domain Operations', 'Enterprise WeChat', 'Customer Segmentation'],
    thumbnailBg: 'from-pink-900 to-pink-950', image: '/images/work/Jelly Grow.png', detailImage1: '/images/work/Jelly ERP1.png', detailImage2: '/images/work/Jelly ERP2.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '6', duration: '8 Months',
    context: 'A private-domain customer operations system based on Enterprise WeChat and mobile app workflows.',
    execution: {
      architecture: 'Co-pioneered a targeted growth and customer recommendation strategy with the team. Led end-to-end UI and UX design for customer management, data analysis, lifecycle operations, and collaborative workflows across app and Enterprise WeChat touchpoints.',
      compliance: 'Co-pioneered a targeted growth and customer recommendation strategy with the team. Led end-to-end UI and UX design for customer management, data analysis, lifecycle operations, and collaborative workflows across app and Enterprise WeChat touchpoints.',
      leadership: 'Successfully built and delivered a high-quality private-domain operations system that improved customer management efficiency, operational coordination, and experience-driven growth.',
    },
    highlight: 'Successfully built and delivered a high-quality <strong>private-domain operations system</strong> that improved customer management efficiency, operational coordination, and experience-driven growth.',
  },
  {
    id: 'tcl-smart-home', no: '07', title: 'TCL Smart Home App', subtitle: 'White Goods Management & IoT Connectivity Platform',
    category: 'END-TO-END PROJECTS', role: 'Senior Product Manager', year: 'Mar 2020 – Sep 2022', location: 'China',
    tags: ['IoT', 'Smart Home', 'Hardware-Software'],
    thumbnailBg: 'from-blue-900 to-blue-950', image: '/images/work/TCL.png', detailImage1: '/images/work/TCL1.png', detailImage2: '/images/work/TCL2.png', isFullWidth: true, previewUrl: '', videoUrl: '',
    teamSize: '20+', duration: '2.5 Years',
    context: 'A smart home application focusing on White Goods management and IoT connectivity.',
    execution: {
      architecture: 'Strategized visionary feature roadmaps to elevate holistic UX. Designed innovative, seamless provisioning and pairing workflows across LAN and PAN, LPWAN, and Cellular networks tailored to highly specific user scenarios.',
      compliance: 'Strategized visionary feature roadmaps to elevate holistic UX. Designed innovative, seamless provisioning and pairing workflows across LAN and PAN, LPWAN, and Cellular networks tailored to highly specific user scenarios.',
      leadership: 'Leveraged dynamic product usage data to iteratively innovate interaction patterns and security protocols between digital interfaces and physical hardware, significantly improving the end-to-end user journey.',
    },
    highlight: 'Leveraged dynamic product usage data to iteratively innovate interaction patterns and security protocols between digital interfaces and physical hardware, significantly improving the <strong>end-to-end user journey</strong>.',
  },
  {
    id: 'weiyun', no: '08', title: 'WeiYun Agricultural Software', subtitle: 'Smart Farming IoT Platform',
    category: 'END-TO-END PROJECTS', role: 'Product Designer', year: 'Jan 2018 – Jun 2019', location: 'China',
    tags: ['IoT Sensors', 'Agriculture Tech', 'Real-time Data'],
    thumbnailBg: 'from-lime-900 to-lime-950', image: '/images/work/Weiyun.png', detailImage1: '/images/work/weiyun1.png', detailImage2: '/images/work/weiyun2.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '8', duration: '1.5 Years',
    context: 'A smart planting control system for agricultural monitoring and remote operations.',
    execution: {
      architecture: 'Designed and implemented a real-time data acquisition system based on multi-dimensional sensors including temperature, humidity, soil EC, and light intensity, with anomaly trigger mechanisms for second-level crop disaster alerting.',
      compliance: 'Designed and implemented a real-time data acquisition system based on multi-dimensional sensors including temperature, humidity, soil EC, and light intensity, with anomaly trigger mechanisms for second-level crop disaster alerting.',
      leadership: 'Led deep optimization of the mobile control interface, simplifying remote irrigation and ventilation control into one-click interactions for non-technical growers.',
    },
    highlight: 'Enabled <strong>second-level crop disaster alerting</strong> and simplified remote irrigation and ventilation control into one-click interactions for non-technical growers.',
  },
  {
    id: 'bafan', no: '09', title: 'BaFan O2O', subtitle: 'Restaurant Management System',
    category: 'END-TO-END PROJECTS', role: 'Product Manager', year: '2021', location: 'China',
    tags: ['O2O', 'SaaS', 'Catering'],
    thumbnailBg: 'from-rose-900 to-rose-950', image: '/images/work/BaFan.png', detailImage1: '/images/work/Bafan1.png', detailImage2: '/images/work/Bafan2.png', isFullWidth: false, previewUrl: '', videoUrl: '',
    teamSize: '5', duration: '1 Year',
    context: 'A restaurant management and digital operations system for local catering businesses.',
    execution: {
      architecture: 'Designed a comprehensive O2O solution covering restaurant operations, ordering workflows, and service management for catering businesses.',
      compliance: 'Designed a comprehensive O2O solution covering restaurant operations, ordering workflows, and service management for catering businesses.',
      leadership: 'Successfully digitized operations for more than 50 local restaurants through a streamlined restaurant management system.',
    },
    highlight: 'Successfully digitized operations for <strong>50+ local restaurants</strong> through a streamlined restaurant management system.',
  },
  {
    id: 'master-wan', no: '10', title: 'Master Wan × IKEA O2O', subtitle: 'Home Repair & Installation Platform',
    category: 'END-TO-END PROJECTS', role: 'Lead UX Designer', year: 'Jan 2018 – Jun 2019', location: 'China',
    tags: ['O2O', 'Service Design', 'IKEA'],
    thumbnailBg: 'from-violet-900 to-violet-950', image: '/images/work/Master wan.png', detailImage1: '/images/work/Master wan1.png', detailImage2: '/images/work/Master wan2.png', isFullWidth: true, previewUrl: '', videoUrl: '',
    teamSize: '10', duration: '1.5 Years',
    context: 'Master Wan and IKEA O2O service platforms for home repair and installation.',
    execution: {
      architecture: 'Reimagined the UI and UX architecture. Implemented innovative service rating systems, Gold Coin reward loops, and pioneering voice-ordering strategies to modernize platform visualization.',
      compliance: 'Reimagined the UI and UX architecture. Implemented innovative service rating systems, Gold Coin reward loops, and pioneering voice-ordering strategies to modernize platform visualization.',
      leadership: 'Iteratively elevated platform performance and usability through in-depth user interviews and sophisticated Customer Journey Mapping, creating a seamless end-to-end experience.',
    },
    highlight: 'Iteratively elevated platform performance and usability through in-depth user interviews and sophisticated <strong>Customer Journey Mapping</strong>, creating a seamless end-to-end experience.',
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
      className="fixed inset-0 z-50 flex items-end md:items-stretch justify-end"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: '100%' } : { x: '100%' }}
        animate={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: 0 } : { x: 0 }}
        exit={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: '100%' } : { x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative bg-white w-full md:w-1/2 h-[88vh] md:h-full shadow-2xl ml-auto overflow-hidden flex flex-col rounded-t-3xl md:rounded-none"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button - absolute top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-11 h-11 bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.10)] hover:bg-neutral-200 hover:text-black transition-all hover:scale-110"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 13L13 1M1 1l12 12" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="flex-1 overflow-y-auto pb-10 md:pb-12">
          {/* Header: Title and Year */}
          <div className="mb-8 md:mb-10 px-5 md:px-10 pt-5 md:pt-5">
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
          <div className="px-5 md:px-10 mb-8 md:mb-10">
            <div className={`w-full aspect-[2/1] rounded-2xl ${item.detailImage1 ? 'bg-neutral-100' : 'bg-gradient-to-br ' + item.thumbnailBg} overflow-hidden relative`}>
              {item.detailImage1 ? (
                <Image src={item.detailImage1} alt={`${item.title} detail 1`} fill sizes="(min-width: 768px) 700px, 100vw" quality={100} className="absolute inset-0 w-full h-full object-cover object-center" />
              ) : item.image && !item.previewUrl ? (
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 700px, 100vw" quality={100} className="absolute inset-0 w-full h-full object-cover object-center" />
              ) : null}
              {item.previewUrl && (
                <video src={item.previewUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" />
              )}
              <span className="absolute bottom-4 right-6 text-[80px] font-bold leading-none" style={{ color: 'rgba(255,255,255,0.06)' }}>
                {item.no}
              </span>
            </div>
          </div>
          
          <div className="flex justify-center mb-8 md:mb-10 px-5 md:px-14 lg:px-20">
            <p className="text-center text-neutral-600 text-sm leading-relaxed max-w-xl">
              {item.title} is a {item.subtitle.toLowerCase()}. {item.context}
            </p>
          </div>
          
          <div className="h-px w-[40px] bg-neutral-400 mx-auto mb-8 md:mb-10" />

          {/* Block 2: Secondary image / visual */}
          <div className="px-5 md:px-10 mb-8 md:mb-10">
            <div className={`w-full aspect-[2/1] rounded-2xl ${item.detailImage2 ? 'bg-neutral-100' : 'bg-gradient-to-tl ' + item.thumbnailBg} overflow-hidden opacity-90 relative`}>
              {item.detailImage2 ? (
                <Image src={item.detailImage2} alt={`${item.title} detail 2`} fill sizes="(min-width: 768px) 700px, 100vw" quality={100} className="absolute inset-0 w-full h-full object-cover object-center" />
              ) : item.image ? (
                <Image src={item.image} alt={`${item.title} alternate detail`} fill sizes="(min-width: 768px) 700px, 100vw" quality={100} className="absolute inset-0 w-full h-full object-cover object-center opacity-90" />
              ) : null}
            </div>
          </div>
          
          <div className="flex justify-center mb-8 md:mb-10 px-5 md:px-14 lg:px-20">
            <p className="text-center text-neutral-600 text-sm leading-relaxed max-w-xl">
              {item.execution.architecture}
            </p>
          </div>
          
          <div className="h-px w-[40px] bg-neutral-400 mx-auto mb-10 md:mb-12" />

          {/* Conclusion/Summary Section */}
          <div className="mb-8 px-5 md:px-14 lg:px-20 text-center">
            <h3 className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 mb-5 md:mb-6">SUMMARY</h3>
            <p className="text-center text-neutral-600 text-sm leading-relaxed max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: item.highlight }} />
            
            <div className="flex flex-wrap justify-center gap-2 mt-6 md:mt-8">
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
              className="p-5 md:p-8 flex flex-col items-start border-r border-neutral-200 hover:bg-neutral-50 transition-colors group"
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
              className="p-5 md:p-8 flex flex-col items-end hover:bg-neutral-50 transition-colors group text-right"
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

export function TrackRecordView({ initialCategory = 'ALL' }: { initialCategory?: string }) {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  const activeCategory = VIEW_CATEGORIES.some(cat => cat.key === initialCategory)
    ? initialCategory
    : 'ALL';

  const filteredCases = activeCategory === 'ALL'
    ? cases
    : cases.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-5 md:px-8 lg:px-20 pt-5 md:pt-[5px] pb-5 md:pb-6">
        <h1 className="text-[30px] font-bold tracking-tight mb-5 md:mb-6">All Work</h1>
        {/* Category Filters */}
        <div className="md:hidden -mx-5 px-5 mb-4 overflow-x-auto scrollbar-hide">
          <div className="flex w-max gap-2 pb-1">
            {VIEW_CATEGORIES.map(cat => {
              const href = cat.key === 'ALL'
                ? '/search?view=track-record'
                : `/search?view=track-record&category=${encodeURIComponent(cat.key)}`;

              return (
                <Link
                  key={cat.key}
                  href={href}
                  className={`whitespace-nowrap text-[11px] font-medium px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer select-none ${
                    activeCategory === cat.key
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800'
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex flex-wrap gap-2 mb-[10px]">
          {VIEW_CATEGORIES.map(cat => {
            const href = cat.key === 'ALL'
              ? '/search?view=track-record'
              : `/search?view=track-record&category=${encodeURIComponent(cat.key)}`;

            return (
              <Link
                key={cat.key}
                href={href}
                className={`text-[11px] font-medium px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer select-none ${
                  activeCategory === cat.key
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
        
      </div>

            {/* Project Grid - All square items, hover reveals black overlay */}
      <div className="px-5 md:px-8 lg:px-20 mb-16 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-0 gap-x-0 auto-rows-[300px] md:auto-rows-[400px]">
          {filteredCases.map((item, index) => {
            // All items are square now, but we still track full-width for layout purposes
            const isFullWidth = item.isFullWidth ?? false;
            const totalItems = filteredCases.length;
            const isFirst = index === 0;
            const isLast = index === totalItems - 1;
            const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
            const isLeftColumnOnDesktop = index % 2 === 0;
            const getsBottomLeftRadius = isMobile
              ? isLast
              : (isLast && (isFullWidth || isLeftColumnOnDesktop));

            // Corner radius classes
            let cornerClasses = '';
            if (totalItems === 1) {
              // Single item: all 4 corners rounded
              cornerClasses = 'rounded-[20px]';
            } else {
              // Multiple items: outer corners of the whole grid
              
              // Top-left corner (first item)
              if (isFirst) {
                cornerClasses += 'rounded-tl-[20px] ';
              }
              
              // Top-right corner (first item)
              if (isFirst) {
                cornerClasses += 'rounded-tr-[20px] ';
              }
              
              // Bottom-left corner: only the real bottom-left card should get it
              if (getsBottomLeftRadius) {
                cornerClasses += 'rounded-bl-[20px] ';
              }
              
              // Bottom-right corner (last item)
              if (isLast) {
                cornerClasses += 'rounded-br-[20px] ';
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
                className={`group relative h-[300px] md:h-[400px] cursor-pointer overflow-hidden ${cornerClasses} ${isFullWidth ? 'md:col-span-2' : 'md:col-span-1'}`}
                onClick={() => setSelectedCase(item)}
              >
                {/* Background Image/Gradient */}
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={isFullWidth ? '(min-width: 768px) 821px, 100vw' : '(min-width: 768px) 411px, 100vw'}
                    quality={100}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-[0.25,1,0.5,1] group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.thumbnailBg} transition-transform duration-[800ms] ease-[0.25,1,0.5,1] group-hover:scale-105`} />
                )}
                
                {/* Black Overlay - appears on hover */}
                <div className="absolute inset-0 flex flex-col p-4 md:p-6 lg:p-8 z-10">
                  <div className="mt-auto translate-y-0 opacity-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-[500ms] ease-[0.33,1,0.68,1]">
                    <div className="rounded-2xl bg-black/30 px-4 py-4 md:bg-transparent md:p-0">
                      <div className="flex items-end justify-between gap-6">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-[9px] tracking-[0.2em] text-white/70 font-mono">{item.year}</p>
                            <span className="h-px w-4 bg-white/30" />
                            <p className="text-[9px] tracking-[0.2em] text-white/50">{item.location}</p>
                          </div>

                          <h3 className={`font-bold text-white mb-2 tracking-tight leading-tight ${isFullWidth ? 'text-xl md:text-3xl' : 'text-lg md:text-2xl'}`}>
                            {item.title}
                          </h3>
                          
                          <p className={`text-white/70 leading-relaxed ${isFullWidth ? 'text-sm md:text-base max-w-2xl' : 'text-xs max-w-[90%]'}`}>
                            {item.subtitle}
                          </p>
                        </div>

                        <div className="shrink-0 self-end text-white md:text-white/80 transition-colors md:group-hover:text-white">
                          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/10 md:bg-transparent transition-transform duration-[500ms] ease-[0.33,1,0.68,1] md:group-hover:translate-x-1.5 md:group-hover:bg-white md:group-hover:text-black">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
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

      <div className="px-5 md:px-8 lg:px-20 py-10 md:py-12 flex items-center justify-between border-t border-neutral-100 bg-neutral-50/50">
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
