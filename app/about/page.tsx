'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  { num: '01', title: 'KeyFlow', type: 'SOFTWARE', year: '2025' },
  { num: '02', title: 'Malim', type: 'WEB APP', year: '2025' },
  { num: '03', title: 'Shopimage', type: 'TOOL', year: '2024' },
  { num: '04', title: 'EventMerch', type: 'PLATFORM', year: '2025' },
  { num: '05', title: 'SwissAzureAI', type: 'INFRA', year: '2024' },
  { num: '06', title: 'Pet Translator', type: 'APP', year: '2024' },
];

function AnimatedTitle({ title, delay = 0 }: { title: string; delay?: number }) {
  return (
    <div className="flex overflow-hidden">
      {title.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="h-screen flex flex-col justify-center px-10 md:px-16 relative"
    >
      {/* 编号 */}
      <motion.div style={{ y }} className="mb-6">
        <span className="text-[10px] tracking-[0.3em] text-neutral-400 font-mono">
          {project.num}
        </span>
        <span className="text-[10px] tracking-[0.3em] text-neutral-300 ml-4">
          / 06
        </span>
      </motion.div>

      {/* 大标题 - 逐字动画 */}
      <motion.div style={{ y }}>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
          <AnimatedTitle title={project.title} delay={index * 0.05} />
        </h2>
      </motion.div>

      {/* 详情 */}
      <motion.div style={{ y }} className="mt-8 flex gap-8">
        <div>
          <span className="text-[10px] tracking-[0.3em] text-neutral-400 block mb-1">TYPE</span>
          <span className="text-xs tracking-wider">{project.type}</span>
        </div>
        <div>
          <span className="text-[10px] tracking-[0.3em] text-neutral-400 block mb-1">YEAR</span>
          <span className="text-xs tracking-wider">{project.year}</span>
        </div>
      </motion.div>

      {/* 分割线 */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-0 left-10 right-10 md:left-16 md:right-16 h-[1px] bg-neutral-200 origin-left"
      />
    </motion.div>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const counterY = useTransform(scrollYProgress, [0, 1], ['0%', '-83.33%']);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        
        {/* 左侧: 垂直滚动项目 */}
        <div ref={containerRef} className="w-full md:w-1/2">
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>

        {/* 右侧: 固定面板 */}
        <div className="hidden md:flex md:w-1/2 h-screen sticky top-16 flex-col justify-between py-16 px-12 border-l border-neutral-100">
          
          {/* 上部: 大计数器 */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-[12rem] font-bold leading-none tracking-tighter text-neutral-100 overflow-hidden h-[12rem]">
              <motion.div style={{ y: counterY }}>
                {projects.map((p) => (
                  <div key={p.num} className="h-[12rem] flex items-center justify-center">
                    {p.num}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* 下部: 个人信息 */}
          <div>
            <div className="mb-8">
              <p className="text-xs tracking-[0.3em] text-neutral-400 mb-4">ABOUT</p>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-sm">
                <span className="text-black font-medium">Chenxue Branny</span> is a developer 
                and designer based in Switzerland, specializing in full-stack development 
                and AI integration.
              </p>
            </div>

            {/* 链接 */}
            <div className="flex gap-6">
              <a
                href="mailto:Sherryxuex@gmail.com"
                className="text-[10px] tracking-[0.3em] text-neutral-400 hover:text-black transition-colors"
              >
                EMAIL ↗
              </a>
              <a
                href="https://github.com/AIB612"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.3em] text-neutral-400 hover:text-black transition-colors"
              >
                GITHUB ↗
              </a>
              <a
                href="https://ch.linkedin.com/in/princessbranny"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.3em] text-neutral-400 hover:text-black transition-colors"
              >
                LINKEDIN ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
