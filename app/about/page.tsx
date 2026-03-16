'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const skills = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'Python', 'PostgreSQL', 'Docker',
  'AWS', 'Azure', 'Figma', 'Git',
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
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1">
      {/* 上方线 */}
      <div className="w-[1px] h-12 bg-neutral-200" />

      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group flex items-center gap-3 py-2"
        >
          {/* 刻度点 */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="w-[3px] rounded-full bg-neutral-300"
              animate={{
                height: activeIndex === i ? 28 : 12,
                backgroundColor: activeIndex === i ? '#000' : '#d4d4d4',
              }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            />
          </div>

          {/* 标签 */}
          <motion.span
            className="text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
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

      {/* 下方线 */}
      <div className="w-[1px] h-12 bg-neutral-200" />

      {/* 当前编号 */}
      <motion.div
        className="mt-2 text-[10px] font-mono text-neutral-400"
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

      {/* Section 1: Intro */}
      <section id="intro" className="min-h-screen flex items-center justify-center px-8 md:px-20 md:pl-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
              About
            </h1>
            <div className="w-16 h-[1px] bg-black mb-8" />
            <p className="text-lg text-neutral-600 leading-relaxed">
              <span className="text-black font-semibold">Chenxue Branny</span> — developer 
              and designer based in Switzerland. Building digital products that are clean, 
              functional, and thoughtfully crafted.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Skills */}
      <section id="skills" className="min-h-screen flex items-center px-8 md:px-20 md:pl-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.3em] text-neutral-400 mb-8"
          >
            SKILLS & TOOLS
          </motion.p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border border-neutral-300 px-5 py-2.5 text-sm tracking-wider hover:bg-black hover:text-white hover:border-black transition-colors duration-200 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Projects */}
      <section id="projects" className="min-h-screen flex items-center px-8 md:px-20 md:pl-24">
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
      <section id="contact" className="min-h-screen flex items-center px-8 md:px-20 md:pl-24">
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
