'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const skills = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'Python', 'PostgreSQL', 'Docker',
  'AWS', 'Azure', 'Figma', 'Git',
  'GraphQL', 'REST API', 'CI/CD', 'Kubernetes',
  'Framer Motion', 'Three.js', 'Prisma', 'Drizzle',
  'Redis', 'MongoDB', 'Vercel', 'Terraform',
];

function ScrollColumn({ items, direction = 'up', duration = 25 }: { items: string[]; direction?: 'up' | 'down'; duration?: number }) {
  const doubled = [...items, ...items];
  const yFrom = direction === 'up' ? 0 : -50;
  const yTo = direction === 'up' ? -50 : 0;

  return (
    <div className="relative h-full overflow-hidden">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      
      <motion.div
        animate={{ y: [`${yFrom}%`, `${yTo}%`] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="flex flex-col gap-3"
      >
        {doubled.map((skill, i) => (
          <div
            key={`${skill}-${i}`}
            className="border border-neutral-300 rounded-full px-4 py-2 text-sm font-medium text-neutral-800 whitespace-nowrap text-center hover:bg-black hover:text-white hover:border-black transition-colors duration-200 cursor-default"
          >
            {skill}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const col1 = skills.slice(0, 8);
  const col2 = skills.slice(8, 16);
  const col3 = skills.slice(16, 24);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* 左侧: 垂直滚动技能标签 */}
          <div className="h-[70vh] flex gap-4">
            <ScrollColumn items={col1} direction="up" duration={20} />
            <ScrollColumn items={col2} direction="down" duration={25} />
            <ScrollColumn items={col3} direction="up" duration={22} />
          </div>

          {/* 右侧: 个人介绍 */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold mb-6 tracking-tight">
                About
              </h1>
              <div className="w-12 h-[2px] bg-black mb-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-neutral-600 leading-relaxed"
            >
              <p className="text-lg">
                Hi, I'm <span className="text-black font-semibold">Chenxue Branny</span> — 
                a developer and designer based in Switzerland.
              </p>
              <p>
                I build digital products that are clean, functional, and thoughtfully crafted. 
                From full-stack web applications to AI-powered tools, I focus on creating 
                experiences that feel effortless.
              </p>
              <p>
                Currently working on software licensing solutions, EV charging subsidy platforms, 
                and exploring the intersection of AI and Swiss compliance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex gap-4"
            >
              <a
                href="https://github.com/AIB612"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-200"
              >
                GitHub →
              </a>
              <a
                href="https://ch.linkedin.com/in/princessbranny"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-600 hover:border-black hover:text-black transition-colors duration-200"
              >
                LinkedIn →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
