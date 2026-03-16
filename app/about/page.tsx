'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const skillCategories = [
  {
    title: 'DEVELOPMENT',
    items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'SQL', 'PostgreSQL', 'Docker', 'AWS', 'Azure', 'Git'],
  },
  {
    title: 'ANALYSIS & AI',
    items: ['Business Analysis', 'Process Modelling', 'Generative AI/ML', 'Tableau', 'Figma'],
  },
  {
    title: 'CERTIFICATE',
    items: ['PMP'],
  },
  {
    title: 'METHODOLOGY',
    items: ['Agile/Scrum', 'Digital Strategy'],
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

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * sections.length), sections.length - 1);
    setActiveIndex(idx);
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <VerticalIndicator activeIndex={activeIndex} />

      {/* Section 1: Intro — 左边介绍+跳转, 右边头像+简介+技能+联系 */}
      <section id="intro" className="min-h-screen flex items-center px-8 md:px-20 md:pl-32">
        <div className="w-full grid md:grid-cols-2 gap-16 items-center">
          
          {/* 左侧: 大标题 + 简短介绍 + 页面跳转 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
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

          {/* 右侧: 头像 + 简介 + 技能 + 联系方式 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
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

      {/* Section 2: Skills */}
      <section id="skills" className="min-h-screen flex items-center px-8 md:px-20 md:pl-32">
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
      <section id="projects" className="min-h-screen flex items-center px-8 md:px-20 md:pl-32">
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
      <section id="contact" className="min-h-screen flex items-center px-8 md:px-20 md:pl-32">
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
    </div>
  );
}
