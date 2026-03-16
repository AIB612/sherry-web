'use client';

import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const timelineData = [
  { 
    h: 30, year: '2017', 
    work: 'Universität Studium', project: '-', life: 'Nach Schweiz gezogen',
    details: {
      title: '2017 — Anfang',
      subtitle: 'Universität Studium',
      description: 'Beginn des Studiums in der Schweiz. Erste Schritte in einem neuen Land, neue Kultur und Sprache entdecken.',
      highlights: ['Universität Einschreibung', 'Erste Programmierkurse', 'Schweizer Kultur kennenlernen'],
      tags: ['Studium', 'Schweiz', 'Neuanfang'],
    }
  },
  { 
    h: 50, year: '2018', 
    work: 'Praktikum', project: '-', life: 'Deutsch lernen',
    details: {
      title: '2018 — Wachstum',
      subtitle: 'Praktikum',
      description: 'Erstes Praktikum in der Tech-Branche. Intensives Deutsch lernen und erste professionelle Erfahrungen sammeln.',
      highlights: ['Erstes Tech-Praktikum', 'Deutsch B1 erreicht', 'Netzwerk aufbauen'],
      tags: ['Praktikum', 'Deutsch', 'Erfahrung'],
    }
  },
  { 
    h: 40, year: '2019', 
    work: 'Junior Developer', project: 'First Web App', life: 'Basel entdecken',
    details: {
      title: '2019 — Einstieg',
      subtitle: 'Junior Developer',
      description: 'Erste Vollzeitstelle als Junior Developer. Entwicklung der ersten eigenen Web-Applikation.',
      highlights: ['Erste Vollzeitstelle', 'React & Node.js gelernt', 'Erste Web App veröffentlicht'],
      tags: ['React', 'Node.js', 'Web Development'],
    }
  },
  { 
    h: 70, year: '2020', 
    work: 'Frontend Developer', project: 'E-Commerce Platform', life: 'Remote Work Start',
    details: {
      title: '2020 — Remote',
      subtitle: 'Frontend Developer',
      description: 'Aufstieg zum Frontend Developer. Arbeit an einer E-Commerce-Plattform während der Remote-Work-Ära.',
      highlights: ['E-Commerce Platform gebaut', 'Remote Work Workflow', 'TypeScript Migration'],
      tags: ['E-Commerce', 'TypeScript', 'Remote'],
    }
  },
  { 
    h: 55, year: '2021', 
    work: 'Full Stack Developer', project: 'SaaS Dashboard', life: 'Neue Wohnung',
    details: {
      title: '2021 — Full Stack',
      subtitle: 'Full Stack Developer',
      description: 'Erweiterung der Skills auf Backend-Entwicklung. SaaS Dashboard mit komplexer Datenvisualisierung.',
      highlights: ['Full Stack Transition', 'SaaS Dashboard', 'PostgreSQL & APIs'],
      tags: ['Full Stack', 'SaaS', 'PostgreSQL'],
    }
  },
  { 
    h: 80, year: '2022', 
    work: 'Senior Developer', project: 'Cloud Migration', life: 'Reisen in Europa',
    details: {
      title: '2022 — Senior',
      subtitle: 'Senior Developer',
      description: 'Beförderung zum Senior Developer. Leitung einer Cloud-Migration und Architektur-Entscheidungen.',
      highlights: ['Cloud Migration geleitet', 'Azure & Docker', 'Team Mentoring'],
      tags: ['Cloud', 'Azure', 'Leadership'],
    }
  },
  { 
    h: 65, year: '2023', 
    work: 'Tech Lead', project: 'AI Integration', life: 'Side Projects',
    details: {
      title: '2023 — AI Era',
      subtitle: 'Tech Lead',
      description: 'Tech Lead Rolle mit Fokus auf AI-Integration. Erste Erfahrungen mit LLMs und generativer KI.',
      highlights: ['AI/ML Integration', 'Tech Lead Rolle', 'LangChain & OpenAI'],
      tags: ['AI', 'Tech Lead', 'LLM'],
    }
  },
  { 
    h: 45, year: '2024', 
    work: 'Solution Architect', project: 'SwissAzureAI', life: 'Konferenzen',
    details: {
      title: '2024 — Architektur',
      subtitle: 'Solution Architect',
      description: 'SwissAzureAI — Swiss-compliant RAG-Deployment auf Azure. Konferenzen und Knowledge Sharing.',
      highlights: ['SwissAzureAI Projekt', 'Azure RAG Architecture', 'FADP/FINMA Compliance'],
      tags: ['Architecture', 'Azure', 'Compliance'],
    }
  },
  { 
    h: 75, year: '2025', 
    work: 'Freelance & Consulting', project: 'Malim Energy', life: 'Startup Gründung',
    details: {
      title: '2025 — Startup',
      subtitle: 'Freelance & Consulting',
      description: 'Gründung von Malim Energy — Swiss EV Charging Subsidy Explorer. Freelance Consulting und eigene Produkte.',
      highlights: ['Malim Energy gegründet', 'EV Charging Platform', 'Freelance Consulting'],
      tags: ['Startup', 'Energy', 'Freelance'],
    }
  },
  { 
    h: 60, year: '2026', 
    work: 'Building Products', project: 'Sherry-Web', life: 'Neue Abenteuer',
    details: {
      title: '2026 — Produkte',
      subtitle: 'Building Products',
      description: 'Fokus auf eigene digitale Produkte. Sherry-Web Portfolio und neue Projekte.',
      highlights: ['Sherry-Web Portfolio', 'Neue Produkte', 'Wachstum'],
      tags: ['Products', 'Portfolio', 'Growth'],
    }
  },
];

const skillCategories = [
  {
    title: 'DEVELOPMENT',
    items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'SQL', 'PostgreSQL', 'Docker', 'Azure', 'Git'],
  },
  {
    title: 'ANALYSIS & AI',
    items: ['Business Analysis', 'Process Modelling', 'Generative AI/ML', 'Enterprise Architecture', 'Tableau', 'Figma'],
  },
  {
    title: 'METHODOLOGY & CERT',
    items: ['PMP', 'Agile/Scrum', 'Digital Strategy'],
  },
  {
    title: 'LANGUAGES',
    items: ['English — Fluent', '中文 — Native', 'Deutsch — B2'],
  },
];

const projects = [
  { title: 'KeyFlow', desc: 'Software license management system', type: 'FULLSTACK' },
  { title: 'Malim Energy', desc: 'Swiss EV charging subsidy explorer', type: 'FRONTEND' },
  { title: 'Shopimage', desc: 'Image optimization for e-commerce', type: 'FULLSTACK' },
  { title: 'EventMerch', desc: 'AI-powered event merchandise', type: 'AI / FULLSTACK' },
  { title: 'SwissAzureAI', desc: 'Swiss-compliant Azure RAG deployment', type: 'CLOUD / AI' },
  { title: 'Pet Translator', desc: 'AI pet emotion translator', type: 'FRONTEND' },
];

function VerticalIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-start gap-0">
      {/* 上方竖线 */}
      <div className="w-[1px] h-8 bg-neutral-200 ml-0" />

      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group flex items-center py-[6px]"
        >
          {/* 横向刻度线 */}
          <motion.div
            className="h-[1px] rounded-full bg-neutral-300"
            animate={{
              width: activeIndex === i ? 36 : 16,
              backgroundColor: activeIndex === i ? '#000' : '#d4d4d4',
            }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          />

          {/* 标签 */}
          <motion.span
            className="text-[10px] tracking-[0.2em] uppercase whitespace-nowrap ml-3"
            animate={{
              opacity: activeIndex === i ? 1 : 0,
              x: activeIndex === i ? 0 : -8,
              color: activeIndex === i ? '#000' : '#a3a3a3',
            }}
            transition={{ duration: 0.3 }}
          >
            {section.label}
          </motion.span>
        </a>
      ))}

      {/* 下方竖线 */}
      <div className="w-[1px] h-8 bg-neutral-200 ml-0" />

      {/* 当前编号 */}
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
  const [selectedYear, setSelectedYear] = useState<typeof timelineData[0] | null>(null);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * sections.length), sections.length - 1);
    setActiveIndex(idx);
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <VerticalIndicator activeIndex={activeIndex} />

      {/* Section 1: Intro — 左边介绍+跳转, 右边头像+简介+技能+联系 */}
      <section id="intro" className="min-h-screen flex items-center px-8 md:px-20 md:pl-36">
        <div className="w-full grid md:grid-cols-2 gap-16 items-center">
          
          {/* 左侧: 大标题 + 简短介绍 + 页面跳转 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              About
            </h1>
            <div className="w-16 h-[1px] bg-black mb-8" />
            <p className="text-neutral-500 leading-relaxed mb-12">
              Developer and designer based in Switzerland. 
              Building digital products that are clean, functional, 
              and thoughtfully crafted.
            </p>

            {/* 跳转链接 */}
            <div className="space-y-4">
              {[
                { label: 'Skills & Tools', href: '#skills' },
                { label: 'Selected Projects', href: '#projects' },
                { label: 'Get in Touch', href: '#contact' },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="group flex items-center justify-between border-b border-neutral-200 pb-3 hover:border-black transition-colors"
                >
                  <span className="text-sm tracking-wider">{link.label}</span>
                  <span className="text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all text-sm">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Experience — Timeline */}
      <section id="experience" className="min-h-screen flex items-center px-8 md:px-20 md:pl-36">
        <div className="w-full grid md:grid-cols-[65%_35%] gap-12 items-center max-w-5xl">
          
          {/* 左侧: Timeline Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.3em] text-neutral-400 mb-12">EXPERIENCE</p>
            
            {/* 浮动条形图 + 年份 */}
            <div className="inline-flex flex-col items-start ml-5" style={{ width: '500px' }}>
              {/* 条形 + 年份一体化 */}
              <div className="flex justify-between w-full">
                {timelineData.map((bar, i) => (
                  <div key={i} className="flex flex-col items-center relative group cursor-pointer" onClick={() => setSelectedYear(bar)}>
                    {/* Hover Tooltip */}
                    <motion.div 
                      className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none z-10"
                      initial={false}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="bg-black text-white text-[10px] rounded-lg px-4 py-3 whitespace-nowrap shadow-lg"
                        initial={{ y: 5, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.15 }}
                      >
                        <p className="font-bold text-[11px] mb-2 border-b border-white/20 pb-1">{bar.year}</p>
                        <p><span className="text-neutral-400">工作：</span>{bar.work}</p>
                        <p><span className="text-neutral-400">项目：</span>{bar.project}</p>
                        <p><span className="text-neutral-400">生活：</span>{bar.life}</p>
                      </motion.div>
                      <div className="w-2 h-2 bg-black rotate-45 mx-auto -mt-1" />
                    </motion.div>
                    {/* 条形容器 */}
                    <div className="h-[120px] flex items-end mb-2">
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        whileInView={{ height: bar.h, opacity: 1 }}
                        whileHover={{ width: 9, backgroundColor: '#525252' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                        className="w-[6px] bg-black rounded-full cursor-pointer transition-all duration-200"
                      />
                    </div>
                    {/* 年份 */}
                    <span className="text-[11px] text-neutral-400 font-mono mt-2 group-hover:text-black group-hover:font-semibold transition-all duration-200">{bar.year}</span>
                  </div>
                ))}
              </div>

              {/* X轴线 */}
              <div className="w-full h-[1px] bg-neutral-300 -mt-[13px] mb-6" />
            </div>
          </motion.div>

          {/* 右侧: 头像 + 简介 + 技能 + 联系方式 (从 Intro 复制) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center md:items-start"
          >
            {/* 头像 */}
            <div className="w-28 h-28 rounded-full bg-neutral-100 border border-neutral-200 mb-6 flex items-center justify-center overflow-hidden">
              <span className="text-3xl font-bold text-neutral-300">CB</span>
            </div>

            {/* 名字 + 简介 */}
            <h2 className="text-2xl font-bold tracking-tight mb-1">Chenxue Branny</h2>
            <p className="text-sm text-neutral-400 tracking-wider mb-6">FULLSTACK DEVELOPER · SWITZERLAND</p>
            <p className="text-sm text-neutral-500 leading-relaxed mb-8 max-w-sm">
              Specializing in full-stack development and AI integration. 
              From software licensing to EV charging platforms and 
              Swiss-compliant AI infrastructure.
            </p>

            {/* 技能标签 */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Azure', 'Docker'].map((skill) => (
                <span key={skill} className="text-[11px] text-neutral-500 hover:text-black transition-colors cursor-default">
                  #{skill}
                </span>
              ))}
            </div>

            {/* 联系方式 */}
            <div className="flex gap-5">
              <a href="mailto:Sherryxuex@gmail.com" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">
                EMAIL ↗
              </a>
              <a href="https://github.com/AIB612" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">
                GITHUB ↗
              </a>
              <a href="https://ch.linkedin.com/in/princessbranny" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">
                LINKEDIN ↗
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Skills */}
      <section id="skills" className="min-h-screen flex items-center px-8 md:px-20 md:pl-36">
        <div className="w-full max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.3em] text-neutral-400 mb-16"
          >
            SKILLS & CERTIFICATES
          </motion.p>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.12 }}
                className="group"
              >
                {/* 分类编号 + 标题 */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-[40px] font-extralight text-neutral-300 leading-none group-hover:text-black transition-colors">
                    {String(ci + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs tracking-[0.25em] text-black font-semibold">{cat.title}</span>
                </div>

                {/* 技能列表 */}
                <div className="pl-[52px] flex flex-wrap gap-x-4 gap-y-2">
                  {cat.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: ci * 0.1 + i * 0.05 }}
                      className="text-sm text-neutral-600 hover:text-black transition-colors duration-300 cursor-default leading-relaxed"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Projects */}
      <section id="projects" className="min-h-screen flex items-center px-8 md:px-20 md:pl-36">
        <div className="w-full max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.3em] text-neutral-400 mb-10"
          >
            SELECTED PROJECTS
          </motion.p>
          <div className="space-y-0">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group border-b border-neutral-200 py-6 flex items-baseline justify-between hover:pl-2 transition-all duration-300"
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
        </div>
      </section>

      {/* Section 4: Contact */}
      <section id="contact" className="min-h-screen flex items-center px-8 md:px-20 md:pl-36">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.3em] text-neutral-400 mb-8">GET IN TOUCH</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-10">
              Let's work<br />together.
            </h2>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:Sherryxuex@gmail.com"
                className="text-sm tracking-wider text-neutral-500 hover:text-black transition-colors"
              >
                EMAIL ↗
              </a>
              <a
                href="https://github.com/AIB612"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wider text-neutral-500 hover:text-black transition-colors"
              >
                GITHUB ↗
              </a>
              <a
                href="https://ch.linkedin.com/in/princessbranny"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wider text-neutral-500 hover:text-black transition-colors"
              >
                LINKEDIN ↗
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Year Detail Drawer */}
      <AnimatePresence>
        {selectedYear && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setSelectedYear(null)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedYear(null)}
                className="sticky top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="px-6 pb-8 pt-2">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center">
                      <span className="text-xl font-bold text-neutral-800">{selectedYear.year.slice(2)}</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">{selectedYear.details.title}</h1>
                      <p className="text-sm text-neutral-500">{selectedYear.details.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-6">
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {selectedYear.details.description}
                  </p>

                  {/* Info Grid */}
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-sm">📋</span>
                      <span className="text-sm font-bold text-neutral-800">Übersicht</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">工作</span>
                        <span className="text-neutral-700 font-medium">{selectedYear.work}</span>
                      </div>
                      <div className="w-full h-[1px] bg-neutral-200" />
                      <div className="flex justify-between">
                        <span className="text-neutral-400">项目</span>
                        <span className="text-neutral-700 font-medium">{selectedYear.project}</span>
                      </div>
                      <div className="w-full h-[1px] bg-neutral-200" />
                      <div className="flex justify-between">
                        <span className="text-neutral-400">生活</span>
                        <span className="text-neutral-700 font-medium">{selectedYear.life}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="rounded-xl border border-green-200 bg-green-50/80 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-sm">✨</span>
                      <span className="text-sm font-bold text-green-800">Highlights</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 text-xs text-green-700">
                      {selectedYear.details.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="text-green-500">✓</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedYear.details.tags.map((tag, i) => (
                      <span key={i} className="text-xs text-neutral-500 border border-neutral-200 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Navigation to other years */}
                  <div className="border-t pt-4">
                    <h2 className="text-sm font-bold mb-3 text-neutral-800">Andere Jahre</h2>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {timelineData.filter(t => t.year !== selectedYear.year).map((t) => (
                        <button
                          key={t.year}
                          onClick={() => setSelectedYear(t)}
                          className="border rounded-lg px-4 py-2 hover:border-black transition-colors flex-shrink-0"
                        >
                          <span className="text-sm font-bold">{t.year}</span>
                          <p className="text-[10px] text-neutral-400 mt-0.5">{t.work}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
