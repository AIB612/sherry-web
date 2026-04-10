'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

// 真实工作经历数据 — 每年一个柱子 2016-2026
const experienceData = [
  {
    h: 25, year: '2016', period: 'Sep.2016 – Mar.2020',
    company: 'Lazada Tech', location: 'China', role: 'Lead UX Designer',
    details: { title: 'Lead UX Designer', subtitle: 'Lazada Tech · China / SEA', description: 'Worked on the primary admin and seller-facing CRM systems for the Lazada e-commerce platform.', highlights: ['Modernized the UED design system', 'Designed User Growth Coins gamification system', 'Supported 1 million seller operations'], tags: ['Design System', 'CRM', 'E-commerce'] }
  },
  {
    h: 35, year: '2017', period: 'Sep.2016 – Mar.2020',
    company: 'Lazada Tech', location: 'China', role: 'Lead UX Designer',
    details: { title: 'Lead UX Designer', subtitle: 'Lazada Tech · China / SEA', description: 'Continued optimizing seller-center workflows, CRM interactions, and multi-market design consistency.', highlights: ['Seller workflow optimization', 'Cross-market localization', 'Design system expansion'], tags: ['UX/UI', 'Localization', 'CRM'] }
  },
  {
    h: 45, year: '2018', period: 'Jan.2018 – Jun.2019',
    company: 'Master Wan / WeiYun', location: 'China', role: 'Product Designer',
    details: { title: 'Product Designer', subtitle: 'Master Wan / WeiYun · China', description: 'Worked on end-to-end digital platforms spanning home repair services and smart agricultural software.', highlights: ['O2O service platform design', 'Smart farming IoT workflows', 'Customer Journey Mapping'], tags: ['O2O', 'IoT', 'Service Design'] }
  },
  {
    h: 55, year: '2019', period: 'Jul.2019 – Sep.2020',
    company: 'Jelly ERP / Korea Project', location: 'Korea / China', role: 'Product Designer',
    details: { title: 'Product Designer', subtitle: 'Jelly ERP · Korea / China', description: 'Built a private-domain operations and customer growth management system based on Enterprise WeChat and app workflows.', highlights: ['Customer lifecycle management', 'Enterprise WeChat collaboration', 'Growth operations workflows'], tags: ['Private Domain', 'CRM', 'Growth'] }
  },
  {
    h: 60, year: '2020', period: 'Mar.2020 – Sep.2022',
    company: 'TCL New Tech', location: 'China', role: 'Senior Product Manager',
    details: { title: 'Senior Product Manager', subtitle: 'TCL New Tech · China', description: 'Led smart home application design for White Goods management and IoT connectivity.', highlights: ['IoT provisioning workflows', 'Feature roadmap strategy', 'Cross-device UX improvement'], tags: ['IoT', 'Smart Home', 'UX Strategy'] }
  },
  {
    h: 70, year: '2021', period: 'Sep.2021 – Mar.2022',
    company: 'OPPO Mobile', location: 'China', role: 'Product Consultant',
    details: { title: 'Product Consultant', subtitle: 'OPPO Mobile · China', description: 'Provided strategic IT product consulting for OPPO digital product teams.', highlights: ['NPS analysis', 'Workshop facilitation', 'Cloud & NFC use cases'], tags: ['Consulting', 'NPS', 'Strategy'] }
  },
  {
    h: 75, year: '2022', period: 'Mar.2022 – Jan.2023',
    company: 'Anjun Express', location: 'Brazil / China', role: 'Product Manager',
    details: { title: 'Product Manager', subtitle: 'Anjun Express · Brazil / China', description: 'Built a comprehensive logistics system integrating Mercado with Correios last-mile services.', highlights: ['Real-time API integration', 'Cross-border logistics platform', 'Operational efficiency +60%'], tags: ['Logistics', 'API', 'Data Modeling'] }
  },
  {
    h: 80, year: '2023', period: 'Mar.2023 – Sep.2024',
    company: 'FHNW + Product Work', location: 'Switzerland + China', role: 'MSc Student + Product Owner',
    details: { title: 'MSc Student + Product Owner', subtitle: 'FHNW · Switzerland & Product Work · China', description: 'Balanced graduate studies with ongoing product strategy and digital transformation work across e-commerce and operations systems.', highlights: ['Business Information Systems MSc', 'Product strategy practice', 'Cross-market project experience'], tags: ['Education', 'Product', 'Strategy'] }
  },
  {
    h: 65, year: '2024', period: 'Mar.2024 – Mar.2025',
    company: 'Goldoak GmbH / Hampelmann', location: 'Switzerland', role: 'E-Commerce Consultant',
    details: { title: 'E-Commerce Consultant', subtitle: 'Goldoak GmbH / Hampelmann · Switzerland', description: 'Worked on Hampelmann Shopify, a sustainable kids toy e-commerce platform for the Dutch market.', highlights: ['Dutch market strategy', 'Category planning', 'Conversion growth +20%'], tags: ['Shopify', 'E-commerce', 'Growth'] }
  },
  {
    h: 50, year: '2025', period: 'Jun.2025 – Present',
    company: 'Malim Mobility', location: 'Switzerland', role: 'Founder & Developer',
    details: { title: 'Founder & Developer', subtitle: 'Malim Mobility · Switzerland', description: 'Built a cloud-based mobility consulting platform and official website dedicated to EV solutions.', highlights: ['EV subsidy tracker', 'ROI calculator', 'Lead generation platform'], tags: ['EV', 'Consulting', 'Web Platform'] }
  },
  {
    h: 45, year: '2026', period: '2026 – Now',
    company: 'Independent Products', location: 'Switzerland', role: 'Freelance & Products',
    details: { title: 'Freelance & Products', subtitle: 'Switzerland', description: 'Continuing to build digital products, portfolio systems, and new end-to-end product concepts.', highlights: ['Sherry-Web portfolio', 'Independent product building', 'New ventures'], tags: ['Portfolio', 'Products', 'Freelance'] }
  },
];

// 教育和证书时间线数据 — 从近到远排列
const educationTimeline = [
  {
    year: '2025',
    title: 'PMP',
    subtitle: 'Project Management Professional',
    institution: 'PMI',
    location: 'Global',
    icon: '🏆',
    type: 'certificate',
  },
  {
    year: 'Mar.2023 – Sep.2024',
    title: 'Master of Science',
    subtitle: 'Business Information Systems',
    institution: 'FHNW – Hochschule für Wirtschaft',
    location: 'Switzerland',
    icon: '🎓',
    type: 'education',
    details: ['Business & IT Alignment', 'Business Intelligence', 'AI Models', 'Supply Chain Management'],
    projects: [
      'Master-Thesis: Generative AI-Assistant in E-Commerce',
      'BI Hiring Solution for Ewance',
      'Sustainability Recycling SCM for Swisscom',
      'FDH Operations Process Management for Baloise',
    ],
  },
  {
    year: 'Sep.2016 – Jun.2022',
    title: 'Bachelor\'s Degree (Part-time)',
    subtitle: 'Art Design',
    institution: 'Hunan Normal University',
    location: 'China',
    icon: '🎓',
    type: 'education',
  },
];

// 技能数据 — 瑞士招聘市场常见标签
const skillsData = [
  {
    title: 'Product & Business',
    items: ['Digital Transformation', 'Agile / Scrum', 'SAFe', 'Kanban', 'Design Thinking'],
  },
  {
    title: 'Tools & Tech',
    items: ['Power BI', 'Tableau', 'SQL', 'Jira', 'Confluence', 'Figma', 'Python', 'UX', 'Azure RAG', 'Microsoft 365', 'AI / Machine Learning', 'AI Developer for All Languages'],
  },
  {
    title: 'Languages',
    items: ['English — Fluent', 'Chinese — Native', 'German — B2'],
  },
];

const projectPreviewMap: Record<string, { title: string; image: string; href: string }> = {
  '2016': { title: 'Lazada Seller Center', image: '/images/work/Lazada.png', href: '/search?view=track-record' },
  '2017': { title: 'Lazada Seller Center', image: '/images/work/Lazada.png', href: '/search?view=track-record' },
  '2018': { title: 'Master Wan × IKEA O2O / WeiYun', image: '/images/work/Master wan.png', href: '/search?view=track-record&category=END-TO-END%20PROJECTS' },
  '2019': { title: 'Jelly ERP', image: '/images/work/Jelly Grow.png', href: '/search?view=track-record&category=E-COMMERCE%20%26%20LOGISTICS' },
  '2020': { title: 'TCL Smart Home App', image: '/images/work/TCL.png', href: '/search?view=track-record&category=END-TO-END%20PROJECTS' },
  '2021': { title: 'OPPO Mobile', image: '/images/work/OPPO.png', href: '/search?view=track-record&category=IT%20PRODUCT%20CONSULTING' },
  '2022': { title: 'Anjun Express', image: '/images/work/Anjun.png', href: '/search?view=track-record&category=E-COMMERCE%20%26%20LOGISTICS' },
  '2023': { title: 'Selected Work', image: '/images/work/Malim.png', href: '/search?view=track-record' },
  '2024': { title: 'Hampelmann Shopify', image: '/images/work/Hampelmann.png', href: '/search?view=track-record&category=SWISS%20PROJECTS' },
  '2025': { title: 'Malim Mobility Website', image: '/images/work/Malim.png', href: '/search?view=track-record&category=SWISS%20PROJECTS' },
  '2026': { title: 'Malim Mobility Website', image: '/images/work/Malim.png', href: '/search?view=track-record&category=SWISS%20PROJECTS' },
};

// 代表项目
const featuredProjects = [
  { title: 'Malim Mobility Website', desc: 'EV Subsidy Tracker & Consulting Platform', type: 'SWISS PROJECTS' },
  { title: 'Hampelmann Shopify', desc: 'Sustainable Kids Toy E-Commerce Platform', type: 'SWISS PROJECTS' },
  { title: 'Anjun Express', desc: 'Brazil Cross-Border Logistics System', type: 'E-COMMERCE & LOGISTICS' },
  { title: 'OPPO Mobile', desc: 'IT Product Consulting & Analysis', type: 'IT PRODUCT CONSULTING' },
];

function VerticalIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-start gap-0">
      <div className="w-[1px] h-8 bg-neutral-200 ml-0" />
      {sections.map((section, i) => (
        <a key={section.id} href={`#${section.id}`} className="group flex items-center py-[6px]">
          <motion.div
            className="h-[1px] rounded-full bg-neutral-300"
            animate={{
              width: activeIndex === i ? 36 : 16,
              backgroundColor: activeIndex === i ? '#000' : '#d4d4d4',
            }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          />
          <motion.span
            className="text-[10px] tracking-[0.2em] uppercase whitespace-nowrap ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {section.label}
          </motion.span>
        </a>
      ))}
      <div className="w-[1px] h-8 bg-neutral-200 ml-0" />
      <motion.div
        className="mt-3 text-[10px] font-mono text-neutral-400"
        key={activeIndex}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {String(activeIndex + 1).padStart(2, '0')}/{String(sections.length).padStart(2, '0')}
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedExp, setSelectedExp] = useState<typeof experienceData[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getDockWidth = (i: number) => {
    if (hoveredIndex === null) return 6;
    const distance = Math.abs(i - hoveredIndex);
    if (distance === 0) return 18;
    if (distance === 1) return 11;
    if (distance === 2) return 8;
    return 6;
  };

  const getDockHeightBoost = (i: number) => {
    if (hoveredIndex === null) return 0;
    const distance = Math.abs(i - hoveredIndex);
    if (distance === 0) return 20;
    if (distance === 1) return 10;
    if (distance === 2) return 4;
    return 0;
  };

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * sections.length), sections.length - 1);
    setActiveIndex(idx);
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <VerticalIndicator activeIndex={activeIndex} />

      {/* 悬浮下载简历按钮 */}
      <a
        href="/pdfs/CV/CV_Chenxue Branny.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-50 flex items-center gap-2 bg-black text-white text-xs px-4 py-3 rounded-full shadow-lg hover:bg-neutral-800 transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-y-0.5 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download CV
      </a>

      {/* Section 1: About + Experience — 和之前一样的布局 */}
      <motion.section 
        id="about" 
        className="min-h-screen flex items-center px-5 md:px-8 lg:px-20 lg:pl-36 py-20 md:py-0"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="w-full grid lg:grid-cols-[62%_38%] gap-12 lg:gap-14 items-start max-w-5xl">
          
          {/* 左侧: About 文案 + 手机端资料卡 + Timeline Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter mb-5 md:mb-6">About</h1>
            <div className="w-16 h-[1px] bg-black mb-6 md:mb-8" />
            <p className="text-neutral-500 leading-relaxed mb-8 md:mb-12 max-w-[620px]">
              Developer and designer based in Switzerland. 
              Building digital products that are clean, functional, 
              and thoughtfully crafted.
            </p>

            {/* 手机端: 资料块放在 About 文案下面 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:hidden flex flex-col items-start mb-10"
            >
              <div className="w-24 h-24 rounded-full bg-neutral-100 border border-neutral-200 mb-5 overflow-hidden">
                <img src="/avatar.jpg" alt="Chenxue Branny" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">Chenxue Branny</h2>
              <p className="text-xs text-neutral-400 tracking-[0.18em] mb-5">FULLSTACK DEVELOPER · SWITZERLAND</p>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6 max-w-sm">
                Specializing in full-stack development and AI integration. 
                From software licensing to EV charging platforms and 
                Swiss-compliant AI infrastructure.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Azure', 'Docker'].map((skill) => (
                  <span key={skill} className="text-[11px] text-neutral-500 hover:text-black transition-colors cursor-default">
                    #{skill}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2 mb-5 text-sm text-neutral-500">
                <a href="mailto:Sherryxuex@gmail.com" className="hover:text-black transition-colors">Sherryxuex@gmail.com</a>
                <a href="tel:+41762679796" className="hover:text-black transition-colors">+41 76 267 97 96</a>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:Sherryxuex@gmail.com" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">EMAIL ↗</a>
                <a href="https://github.com/AIB612" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">GITHUB ↗</a>
                <a href="https://ch.linkedin.com/in/princessbranny" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">LINKEDIN ↗</a>
              </div>
            </motion.div>

            {/* 时间轴 */}
            <div className="inline-flex flex-col items-start ml-0 md:ml-5 relative w-full max-w-[500px] overflow-x-auto pb-2">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3, delay: 1.5, repeat: 2, repeatDelay: 2 }}
                className="text-sm text-neutral-400 mb-6 flex items-center gap-2 whitespace-nowrap"
              >
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
                  👆
                </motion.span>
                Tap or hover to explore
              </motion.p>
              <div className="flex justify-between w-[500px] min-w-[500px]">
                {experienceData.map((exp, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center relative group cursor-pointer"
                    onClick={() => setSelectedExp(exp)}
                    onMouseEnter={() => {
                      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                        setHoveredIndex(i);
                      }
                    }}
                    onMouseLeave={() => {
                      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                        setHoveredIndex(null);
                      }
                    }}
                  >
                    <motion.div
                      className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none z-10"
                      initial={false}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-black text-white text-[10px] rounded-lg px-4 py-3 whitespace-nowrap shadow-lg">
                        <p className="font-bold text-[11px] mb-1">{exp.company}</p>
                        <p className="text-neutral-400">{exp.role}</p>
                        <p className="text-neutral-500 text-[9px] mt-1">{exp.period}</p>
                      </div>
                      <div className="w-2 h-2 bg-black rotate-45 mx-auto -mt-1" />
                    </motion.div>
                    <div className="h-[140px] flex items-end mb-2">
                      <motion.div
                        initial={{ height: 0, width: 6, opacity: 0 }}
                        animate={{
                          width: getDockWidth(i),
                          height: exp.h + getDockHeightBoost(i),
                          opacity: 1,
                        }}
                        transition={{
                          height: { type: "spring", stiffness: 400, damping: 30 },
                          width: { type: "spring", stiffness: 400, damping: 30 },
                          opacity: { duration: 0.5, delay: i * 0.08 },
                        }}
                        className="bg-black rounded-full cursor-pointer"
                      />
                    </div>
                    <span className="text-[11px] text-neutral-400 font-mono mt-2 group-hover:text-black group-hover:font-semibold transition-all duration-200">
                      {exp.year}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-[500px] min-w-[500px] h-[1px] bg-neutral-300 -mt-[13px] mb-6" />
            </div>
          </motion.div>

          {/* 桌面端右侧: 头像 + 简介 + 技能 + 联系方式 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex flex-col items-center lg:items-start"
          >
            <div className="w-28 h-28 rounded-full bg-neutral-100 border border-neutral-200 mb-6 overflow-hidden">
              <img src="/avatar.jpg" alt="Chenxue Branny" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-1">Chenxue Branny</h2>
            <p className="text-sm text-neutral-400 tracking-wider mb-6">FULLSTACK DEVELOPER · SWITZERLAND</p>
            <p className="text-sm text-neutral-500 leading-relaxed mb-8 max-w-sm">
              Specializing in full-stack development and AI integration. 
              From software licensing to EV charging platforms and 
              Swiss-compliant AI infrastructure.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Azure', 'Docker'].map((skill) => (
                <span key={skill} className="text-[11px] text-neutral-500 hover:text-black transition-colors cursor-default">
                  #{skill}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2 mb-6 text-sm text-neutral-500">
              <a href="mailto:Sherryxuex@gmail.com" className="hover:text-black transition-colors">Sherryxuex@gmail.com</a>
              <a href="tel:+41762679796" className="hover:text-black transition-colors">+41 76 267 97 96</a>
            </div>
            <div className="flex gap-5">
              <a href="mailto:Sherryxuex@gmail.com" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">EMAIL ↗</a>
              <a href="https://github.com/AIB612" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">GITHUB ↗</a>
              <a href="https://ch.linkedin.com/in/princessbranny" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">LINKEDIN ↗</a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 2: Education — 教育时间线 */}
      <motion.section 
        id="education" 
        className="min-h-screen flex items-center px-5 md:px-8 lg:px-20 lg:pl-36"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="w-full max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.3em] text-neutral-400 mb-4"
          >
            EDUCATION / CERTIFICATES
          </motion.p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">Education Tree</h2>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-neutral-200" />

            {educationTimeline.map((item, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
                className="relative pl-10 pb-6"
              >
                <div className="absolute left-[11px] top-[6px] w-3 h-3 rounded-full bg-black" />

                <p className="text-xs font-mono text-neutral-400 mb-1">{item.year}</p>

                <div className="flex items-start gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <h3 className="text-base font-bold tracking-tight">{item.title}</h3>
                    <p className="text-sm text-neutral-500">{item.subtitle}</p>
                    <p className="text-xs text-neutral-400">{item.institution} · {item.location}</p>
                  </div>
                </div>

                {item.details && (
                  <div className="pl-7 mt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.details.map((detail, i) => (
                        <span key={i} className="text-xs text-neutral-500 bg-neutral-100 rounded-full px-2.5 py-1">{detail}</span>
                      ))}
                    </div>
                  </div>
                )}

                {item.projects && (
                  <div className="pl-7 mt-2">
                    <p className="text-[10px] tracking-[0.15em] text-neutral-400 mb-1">PROJECTS</p>
                    <div className="space-y-0.5">
                      {item.projects.map((project, i) => (
                        <div key={i} className="flex items-start gap-1 text-sm text-neutral-600">
                          <span className="text-neutral-400">→</span>
                          <span>{project}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 3: Skills — 技能 */}
      <motion.section 
        id="skills" 
        className="min-h-screen flex items-center px-5 md:px-8 lg:px-20 lg:pl-36"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="w-full max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.3em] text-neutral-400 mb-4"
          >
            SKILLS
          </motion.p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">Skills & Tools</h2>

          <div className="space-y-8">
            {skillsData.map((category, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-bold tracking-tight">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: ci * 0.1 + i * 0.05 }}
                      className="text-sm text-neutral-600 border border-neutral-200 rounded-full px-4 py-2 hover:border-black hover:text-black transition-colors cursor-default"
                    >
                      <span className="text-neutral-400 text-base mr-1">#</span>{item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 4: Projects — 代表项目 */}
      <motion.section 
        id="projects" 
        className="min-h-screen flex items-center px-5 md:px-8 lg:px-20 lg:pl-36"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="w-full max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.3em] text-neutral-400 mb-4"
          >
            FEATURED PROJECTS
          </motion.p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-12">Selected Work</h2>

          <div className="space-y-0">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group border-b border-neutral-200 py-6 flex items-baseline justify-between hover:pl-2 transition-all duration-300 cursor-pointer"
              >
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                  <p className="text-sm text-neutral-500 mt-1">{project.desc}</p>
                </div>
                <span className="text-[10px] tracking-[0.2em] text-neutral-400 shrink-0 ml-4">
                  {project.type}
                </span>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
            >
              View all projects
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 5: Contact — 一起工作吧 */}
      <motion.section 
        id="contact" 
        className="min-h-screen flex items-center px-5 md:px-8 lg:px-20 lg:pl-36 py-16 md:py-0"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="w-full max-w-4xl grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1"
          >
            <p className="text-[10px] tracking-[0.3em] text-neutral-400 mb-5 md:mb-6">GET IN TOUCH</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Let&apos;s work<br />together.
            </h2>
            <p className="text-neutral-500 mb-6 md:mb-8 max-w-md text-sm leading-relaxed">
              Have a project in mind? Looking for a Product Manager with strong analytical skills and AI expertise? Let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:Sherryxuex@gmail.com"
                className="inline-block px-6 py-3 bg-black text-white text-sm tracking-wider hover:bg-neutral-800 transition-colors text-center"
              >
                SEND EMAIL
              </a>
              <a
                href="https://ch.linkedin.com/in/princessbranny"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-colors text-center"
              >
                LINKEDIN
              </a>
            </div>
          </motion.div>

          {/* SVG 插画：手机端上方居中，桌面端右侧 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 flex justify-center md:justify-start items-center"
          >
            <img src="/thinking-person.svg" alt="Thinking person illustration" className="w-[180px] md:w-[260px] opacity-80" />
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Detail Drawer */}
      <AnimatePresence>
        {(selectedExp || hoveredIndex !== null) && (
          <>
            {selectedExp && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-50"
                onClick={() => setSelectedExp(null)}
              />
            )}
            <motion.div
              initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: '100%' } : { x: '100%' }}
              animate={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: 0 } : { x: 0 }}
              exit={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: '100%' } : { x: '100%' }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="fixed right-0 bottom-0 md:top-0 h-[85vh] md:h-full w-full md:w-1/2 bg-white shadow-2xl overflow-y-auto z-[60] rounded-t-3xl md:rounded-none"
            >
              <button
                onClick={() => { setSelectedExp(null); setHoveredIndex(null); }}
                className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-all hover:scale-110 hover:bg-neutral-200 hover:text-black"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {(() => {
                const activeExp = selectedExp || (hoveredIndex !== null ? experienceData[hoveredIndex] : null);
                if (!activeExp) return null;
                return (
                  <div className="px-5 md:px-6 pb-8 pt-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center">
                        <span className="text-lg font-bold text-neutral-800">{activeExp.year.slice(2)}</span>
                      </div>
                      <div>
                        <h1 className="text-xl font-bold">{activeExp.details.title}</h1>
                        <p className="text-sm text-neutral-500">{activeExp.details.subtitle}</p>
                        <p className="text-xs text-neutral-400 mt-1">{activeExp.period}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-sm leading-relaxed text-neutral-600">
                        {activeExp.details.description}
                      </p>

                      <div className="rounded-xl border border-green-200 bg-green-50/80 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">✨</span>
                          <span className="text-sm font-bold text-green-800">Key Achievements</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm text-green-700">
                          {activeExp.details.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {activeExp.details.tags.map((tag, i) => (
                          <span key={i} className="text-xs text-neutral-500 border border-neutral-200 rounded-full px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <h2 className="text-sm font-bold mb-3 text-neutral-800">Project Preview</h2>
                        {(() => {
                          const projectPreview = projectPreviewMap[activeExp.year];
                          if (!projectPreview) return null;
                          return (
                            <div className="rounded-xl border border-neutral-200 overflow-hidden bg-white">
                              <div className="relative aspect-[2/1] bg-neutral-100">
                                <Image
                                  src={projectPreview.image}
                                  alt={projectPreview.title}
                                  fill
                                  sizes="(min-width: 768px) 420px, 100vw"
                                  className="object-cover object-center"
                                />
                              </div>
                              <div className="p-4 flex items-center justify-between gap-4">
                                <div>
                                  <h3 className="text-sm font-bold text-neutral-900">{projectPreview.title}</h3>
                                  <p className="text-xs text-neutral-500 mt-1">View the related project details</p>
                                </div>
                                <Link
                                  href={projectPreview.href}
                                  className="shrink-0 inline-flex items-center gap-2 text-sm font-medium text-black hover:gap-3 transition-all"
                                >
                                  View Project
                                  <span>→</span>
                                </Link>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
