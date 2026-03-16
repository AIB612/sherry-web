'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    num: '01',
    title: 'KeyFlow',
    type: 'SOFTWARE',
    role: 'FULLSTACK DEV',
    desc: 'Software license management system with real-time activation.',
    href: '/product/keyflow',
  },
  {
    num: '02',
    title: 'Malim Energy',
    type: 'WEB APP',
    role: 'FRONTEND DEV & DESIGN',
    desc: 'Swiss EV charging subsidy explorer with interactive canton map.',
    href: '/product/malim-energy',
  },
  {
    num: '03',
    title: 'Shopimage',
    type: 'TOOL',
    role: 'FULLSTACK DEV',
    desc: 'Image optimization tool for e-commerce platforms.',
    href: '/product/shopimage',
  },
  {
    num: '04',
    title: 'EventMerch',
    type: 'PLATFORM',
    role: 'FULLSTACK DEV & AI',
    desc: 'AI-powered personalized merchandise for events.',
    href: '/product/eventmerch',
  },
  {
    num: '05',
    title: 'SwissAzureAI',
    type: 'INFRASTRUCTURE',
    role: 'CLOUD & AI',
    desc: 'Swiss-compliant Azure RAG deployment with FADP/FINMA compliance.',
    href: '/product/swissazureai',
  },
  {
    num: '06',
    title: 'Pet Translator',
    type: 'APP',
    role: 'FRONTEND DEV',
    desc: 'Fun AI-powered pet emotion translator.',
    href: '/product/pet-translator',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col md:flex-row">
        
        {/* 左侧: 项目列表 (垂直滚动) */}
        <div className="md:w-1/2 md:h-[calc(100vh-64px)] md:overflow-y-auto md:sticky md:top-16 border-r border-neutral-200">
          {projects.map((project, i) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border-b border-neutral-200 px-8 py-8 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <Link href={project.href} className="block">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-neutral-400 font-mono">{project.num}</span>
                  <span className="text-xs text-neutral-400 tracking-widest">{project.type}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:tracking-wide transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-500 mb-3">{project.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 tracking-wider">{project.role}</span>
                  <span className="text-xs text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-200">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 右侧: 个人介绍 (固定) */}
        <div className="md:w-1/2 flex flex-col justify-center px-12 py-20 md:min-h-[calc(100vh-64px)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-baseline gap-4 mb-8">
              <h1 className="text-6xl font-bold tracking-tight">About</h1>
              <span className="text-sm text-neutral-400 font-mono">06 projects</span>
            </div>
            <div className="w-16 h-[1px] bg-black mb-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-6 text-neutral-600 leading-relaxed max-w-md"
          >
            <p className="text-lg">
              <span className="text-black font-semibold">Chenxue Branny</span> is a 
              developer and designer based in Switzerland, specializing in 
              full-stack development and AI integration.
            </p>
            <p>
              Building digital products that are clean, functional, and 
              thoughtfully crafted — from software licensing to EV charging 
              platforms and Swiss-compliant AI infrastructure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 space-y-6"
          >
            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Azure', 'AWS', 'Docker', 'PostgreSQL'].map((skill) => (
                <span key={skill} className="text-xs border border-neutral-300 px-3 py-1.5 text-neutral-500 hover:border-black hover:text-black transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-6 pt-4">
              <a
                href="mailto:Sherryxuex@gmail.com"
                className="text-xs tracking-wider text-neutral-400 hover:text-black transition-colors"
              >
                EMAIL ↗
              </a>
              <a
                href="https://github.com/AIB612"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-wider text-neutral-400 hover:text-black transition-colors"
              >
                GITHUB ↗
              </a>
              <a
                href="https://ch.linkedin.com/in/princessbranny"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-wider text-neutral-400 hover:text-black transition-colors"
              >
                LINKEDIN ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
