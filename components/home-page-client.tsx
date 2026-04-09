'use client';

import { motion, AnimatePresence } from "framer-motion";
import { StaggerContainer, StaggerItem, FadeInView } from "components/animations";
import Link from "next/link";
import TrackRecord from "components/track-record";
import { useState, useRef, useEffect } from "react";

const services = [
  {
    id: 1,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "IT Strategy & Growth",
    titleDe: "IT-Strategie & Wachstum",
    desc: "Strategic consulting for digital transformation and customer growth",
    descDe: "Strategische Beratung für digitale Transformation und Kundenwachstum",
    duration: "ab 1 Tag",
    tags: ["Consulting", "Strategy"],
    tech: ["OKR Frameworks", "SWOT Analysis", "Product-Market Fit", "Growth Hacking"],
    painPoints: ["Unclear digital roadmap", "Low customer retention", "Inefficient processes"],
    useCases: ["Swiss SME digital transformation roadmap", "E-commerce growth strategy for DACH market", "Product-led growth consulting for SaaS startups"],
  },
  {
    id: 2,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: "Azure Enterprise Workflow",
    titleDe: "Azure Enterprise Workflow",
    desc: "Custom Azure development with private deployment for enterprise workflows",
    descDe: "Massgeschneiderte Azure-Entwicklung mit privater Bereitstellung",
    duration: "ab 1 Woche",
    tags: ["Azure", "Private Cloud"],
    tech: ["Azure OpenAI", "Azure Functions", "Cosmos DB", "Azure DevOps", "Bicep/Terraform"],
    painPoints: ["Data leaving Switzerland", "Vendor lock-in concerns", "Complex compliance requirements"],
    useCases: ["Private RAG system for Swiss bank (FINMA compliant)", "Azure-based document processing for insurance", "Enterprise workflow automation with Swiss data residency"],
  },
  {
    id: 3,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    title: "AI RAG Enterprise",
    titleDe: "AI RAG Enterprise",
    desc: "AI-powered retrieval augmented generation for enterprise knowledge systems",
    descDe: "KI-gestützte RAG-Systeme für Unternehmenswissen",
    duration: "ab 1 Woche",
    tags: ["AI", "RAG", "Private"],
    tech: ["LangChain", "pgvector", "Azure OpenAI", "LlamaIndex", "Embedding Models"],
    painPoints: ["Knowledge scattered across systems", "Slow information retrieval", "Hallucination in AI responses"],
    useCases: ["Internal knowledge base for 500+ employee company", "Legal document Q&A system for law firm", "Multilingual customer support AI (DE/FR/EN)"],
  },
  {
    id: 4,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
    title: "SME Web & E-Commerce",
    titleDe: "KMU Web & E-Commerce",
    desc: "Fast website and e-commerce development for small and medium businesses",
    descDe: "Schnelle Website- und E-Commerce-Entwicklung für KMU",
    duration: "1 Woche Launch",
    tags: ["Web", "E-Commerce"],
    tech: ["Next.js", "Shopify", "Stripe", "Tailwind CSS", "Vercel"],
    painPoints: ["No online presence", "Slow legacy website", "Poor mobile experience"],
    useCases: ["Shopify store for Swiss artisan brand", "Portfolio website for consulting firm", "Multi-language e-commerce (DE/FR/IT) for Swiss retailer"],
  },
  {
    id: 5,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
      </svg>
    ),
    title: "Automation & AI Assistant",
    titleDe: "Automatisierung & KI-Assistent",
    desc: "Custom automation workflows and AI assistant installation with OpenClaw",
    descDe: "Massgeschneiderte Automatisierung und KI-Assistenten mit OpenClaw",
    duration: "flexibel",
    tags: ["Automation", "OpenClaw"],
    tech: ["OpenClaw", "n8n", "Zapier", "Python", "Telegram/Slack Bots"],
    painPoints: ["Repetitive manual tasks", "No cross-system integration", "Slow response to customers"],
    useCases: ["AI assistant for daily business operations", "Automated invoice processing pipeline", "Multi-channel customer notification system"],
  },
  {
    id: 6,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "Microsoft 365 & Cloud",
    titleDe: "Microsoft 365 & Cloud",
    desc: "Microsoft 365 automation, cloud management, and system installation",
    descDe: "Microsoft 365 Automatisierung, Cloud-Management und Systeminstallation",
    duration: "flexibel",
    tags: ["M365", "Cloud"],
    tech: ["Power Automate", "SharePoint", "Teams", "Azure AD", "Intune"],
    painPoints: ["Underutilized M365 licenses", "Manual document workflows", "Poor team collaboration"],
    useCases: ["SharePoint intranet for 200-person company", "Automated approval workflows with Power Automate", "Teams + Azure AD setup for new Swiss office"],
  },
];

export default function HomePageClient() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const N = 90;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i]!.x - particles[j]!.x;
          const dy = particles[i]!.y - particles[j]!.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i]!.x, particles[i]!.y);
            ctx.lineTo(particles[j]!.x, particles[j]!.y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 130) * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return (
    <>
      {/* Tech Banner - Black, particle network, scan line */}
      <section className="w-full bg-black text-white overflow-hidden relative min-h-[calc(82vh-200px)] md:min-h-[82vh]">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/Video/4月9日.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/55 z-0" />

        {/* Canvas particle network */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1]" />

        {/* Perspective grid overlay */}
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Scan line */}
        <motion.div
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          className="absolute left-0 w-full z-[2] pointer-events-none"
          style={{ height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', boxShadow: '0 0 30px rgba(255,255,255,0.1)' }}
        />

        {/* Corner decorations */}
        <div className="absolute top-8 left-5 md:left-8 lg:left-20 z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="w-6 h-6 border-l border-t border-white/20" />
          </motion.div>
        </div>
        <div className="absolute top-8 right-5 md:right-8 lg:right-20 z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="w-6 h-6 border-r border-t border-white/20" />
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-5 md:left-8 lg:left-20 z-10">
          <div className="w-6 h-6 border-l border-b border-white/20" />
        </div>
        <div className="absolute bottom-8 right-5 md:right-8 lg:right-20 z-10">
          <div className="w-6 h-6 border-r border-b border-white/20" />
        </div>

        {/* Meta labels removed */}


        {/* Main content - centered */}
        <div className="relative z-10 flex flex-col items-start justify-center px-5 md:px-8 lg:px-20 min-h-[calc(82vh-200px)] md:min-h-[82vh]">
          {/* Label */}
          <div className="overflow-hidden mb-8">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              className="text-[9px] tracking-[0.5em] text-white/40 font-mono"
            >
              FINE-TUNING · RAG · DIGITAL PRODUCT
            </motion.p>
          </div>

          {/* Philosophy headline */}
          {[
            { text: 'Small AI,', color: 'text-white' },
            { text: 'Only For You.', color: 'text-white/85' },
          ].map(({ text, color }, i) => (
            <div key={text} className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.4 + i * 0.12 }}
                className={`font-bold leading-[1.0] tracking-[-0.03em] ${color}`}
                style={{ fontSize: 'clamp(2.2rem, 6.4vw, 7rem)' }}
              >
                {text}
              </motion.h1>
            </div>
          ))}

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full mt-12 md:mt-16 gap-8 md:gap-0">
            <div className="flex flex-col items-start">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-white/70 text-[17px] md:text-[22px] leading-relaxed max-w-[520px] font-mono"
              >
                Your Computer. Your Data. Your AI. Total Privacy.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mt-6 md:hidden"
              >
                <a
                  href="https://calendly.com/cxbranny/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
                >
                  <span className="text-[12px] tracking-[0.28em] font-mono">BOOKING</span>
                  <motion.svg
                    className="w-3.5 h-3.5"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="hidden md:block"
            >
              <a
                href="https://calendly.com/cxbranny/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
              >
                <span className="text-[12px] tracking-[0.28em] font-mono">BOOKING</span>
                <motion.svg
                  className="w-3.5 h-3.5"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* Hero Section - Refined */}
      <section className="hidden min-h-[45vh] md:min-h-[55vh] items-center relative overflow-hidden bg-white pt-8 md:pt-0">
        {/* Subtle animated gradient mesh */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 15% 50%, rgba(0,0,0,0.02) 0%, transparent 40%), radial-gradient(circle at 85% 30%, rgba(0,0,0,0.015) 0%, transparent 35%)',
              'radial-gradient(circle at 25% 40%, rgba(0,0,0,0.02) 0%, transparent 40%), radial-gradient(circle at 75% 60%, rgba(0,0,0,0.015) 0%, transparent 35%)',
              'radial-gradient(circle at 15% 50%, rgba(0,0,0,0.02) 0%, transparent 40%), radial-gradient(circle at 85% 30%, rgba(0,0,0,0.015) 0%, transparent 35%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />

        {/* Elegant diagonal lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
          {Array.from({length: 6}).map((_, i) => (
            <motion.line
              key={i}
              x1={`${i * 18}%`} y1="0%" x2={`${100 - i * 18}%`} y2="100%"
              stroke="black" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.2 + i * 0.12 }}
            />
          ))}
        </svg>

        {/* Content */}
        <div className="w-full px-5 md:px-8 lg:px-20 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">

            {/* Left: Text */}
            <div>
              {/* Animated accent line */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 50 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-[1.5px] bg-[#FF0000] mb-8"
              />

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-[10px] tracking-[0.35em] text-neutral-400 mb-5 font-medium flex items-center gap-2"
              >
                <span className="inline-flex items-center justify-center w-4 h-4 bg-[#FF0000] rounded-sm">
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="currentColor">
                    <rect x="3.5" y="1" width="3" height="8" rx="0.5" />
                    <rect x="1" y="3.5" width="8" height="3" rx="0.5" />
                  </svg>
                </span>
                DIGITAL CONSULTING · SWITZERLAND
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.25 }}
                className="text-[1.75rem] sm:text-[2.4rem] md:text-[3.2rem] font-bold tracking-[-0.03em] leading-[1.1] mb-5 md:mb-7"
              >
                Build IT. Automate. <span className="relative inline-block"><span className="text-[#FF0000]">Transform.</span><motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
                    className="absolute -bottom-0.5 left-0 w-full h-[6px] bg-[#FF0000]/[0.12] -z-10 origin-left"
                  /></span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-neutral-500 text-[13px] md:text-[15px] leading-[1.7] max-w-[380px] mb-6 md:mb-10"
              >
                From IT strategy to AI-powered enterprise solutions.
                Swiss-based consulting for digital transformation,
                cloud infrastructure, and intelligent automation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="relative z-20 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href="/search"
                  className="px-7 py-3.5 bg-black text-white text-[11px] tracking-[0.1em] font-medium hover:bg-neutral-800 transition-colors"
                >
                  ALL WORK
                </Link>
                <Link
                  href="#services"
                  className="px-7 py-3.5 border border-neutral-200 text-[11px] tracking-[0.1em] font-medium hover:border-black hover:bg-black hover:text-white transition-all"
                >
                  SERVICES
                </Link>
              </motion.div>
            </div>

            {/* Right: Visual Dashboard */}
            <div className="relative h-[420px] hidden lg:block pointer-events-none">

              {/* Subtle pulsing rings */}
              <motion.div
                animate={{ scale: [1, 1.03, 1], opacity: [0.025, 0.045, 0.025] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-black"
              />
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.015, 0.035, 0.015] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-black"
              />

              {/* Card 1 - AI */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="absolute top-0 left-0 w-[250px] rounded-xl p-4 z-30"
                style={{
                  background: 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.02)',
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold">AI & RAG Enterprise</p>
                    <p className="text-[8px] text-neutral-400">Private Cloud · Swiss</p>
                  </div>
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <svg width="220" height="80" viewBox="0 0 220 80" className="mx-auto">
                  {[1, 0.66, 0.33].map((s, i) => (
                    <polygon key={i} points={[0,1,2,3,4].map(j => { const a = (j * 72 - 90) * Math.PI / 180; return (110 + 35 * s * Math.cos(a)) + ',' + (40 + 35 * s * Math.sin(a)); }).join(' ')} fill="none" stroke="#ebebeb" strokeWidth="0.5" />
                  ))}
                  <motion.polygon
                    points={[92, 88, 72, 82, 96].map((v, j) => { const a = (j * 72 - 90) * Math.PI / 180; const r = (v / 100) * 35; return (110 + r * Math.cos(a)) + ',' + (40 + r * Math.sin(a)); }).join(' ')}
                    fill="rgba(0,0,0,0.04)" stroke="black" strokeWidth="1.5"
                    initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.85 }} style={{ transformOrigin: '110px 40px' }}
                  />
                  {['RAG', 'Azure', 'pgvector', 'Search', 'Deploy'].map((l, j) => { const a = (j * 72 - 90) * Math.PI / 180; return <text key={j} x={110 + 45 * Math.cos(a)} y={40 + 45 * Math.sin(a)} textAnchor="middle" dominantBaseline="middle" fontSize="6.5" fill="#a3a3a3">{l}</text>; })}
                  {[92, 88, 72, 82, 96].map((v, j) => { const a = (j * 72 - 90) * Math.PI / 180; const r = (v / 100) * 35; return <motion.circle key={j} cx={110 + r * Math.cos(a)} cy={40 + r * Math.sin(a)} r="2" fill="black" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.95 + j * 0.04 }} />; })}
                </svg>
              </motion.div>

              {/* Card 2 - Growth */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.65, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="absolute top-[145px] left-[30px] w-[250px] rounded-xl p-4 z-20"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.015)',
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold">Strategy & Growth</p>
                    <p className="text-[8px] text-neutral-400">Digital Transformation</p>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-500">+127%</span>
                </div>
                <svg width="220" height="60" viewBox="0 0 220 60" className="mx-auto">
                  <motion.path d="M5,52 L38,45 L71,38 L104,27 L137,21 L170,12 L203,6 L203,55 L5,55 Z" fill="rgba(0,0,0,0.025)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1.05 }} />
                  <motion.path d="M5,52 L38,45 L71,38 L104,27 L137,21 L170,12 L203,6" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, delay: 0.95 }} />
                  {[[5,52],[38,45],[71,38],[104,27],[137,21],[170,12],[203,6]].map(([x,y], i) => (
                    <motion.circle key={i} cx={x} cy={y} r="2.5" fill="white" stroke="black" strokeWidth="1.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 + i * 0.06 }} />
                  ))}
                </svg>
              </motion.div>

              {/* Card 3 - Automation */}
              <motion.div
                initial={{ opacity: 0, y: 70, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="absolute top-[280px] left-[60px] w-[250px] rounded-xl p-4 z-10"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(0,0,0,0.035)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.01)',
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold">Automation & AI</p>
                    <p className="text-[8px] text-neutral-400">Intelligent Workflows</p>
                  </div>
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center gap-4">
                  <svg width="55" height="55" viewBox="0 0 70 70">
                    <circle cx="35" cy="35" r="24" fill="none" stroke="#f0f0f0" strokeWidth="5" />
                    <motion.circle cx="35" cy="35" r="24" fill="none" stroke="#000" strokeWidth="5"
                      strokeDasharray={150.8} strokeLinecap="round"
                      initial={{ strokeDashoffset: 150.8 }} animate={{ strokeDashoffset: 22.6 }}
                      transition={{ duration: 1.3, delay: 1.2 }}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                    />
                    <text x="35" y="33" textAnchor="middle" fontSize="11" fontWeight="bold" fill="black">85%</text>
                    <text x="35" y="42" textAnchor="middle" fontSize="5" fill="#a3a3a3">automated</text>
                  </svg>
                  <div className="flex-1 space-y-2">
                    {[
                      { label: 'Workflows', val: '24 active' },
                      { label: 'Time saved', val: '120h/mo' },
                      { label: 'Accuracy', val: '99.2%' },
                    ].map((m, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[8px] text-neutral-400">{m.label}</span>
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 + i * 0.08 }} className="text-[9px] font-semibold">{m.val}</motion.span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Subtle connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                <motion.line x1="18%" y1="16%" x2="22%" y2="32%" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="2 3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1 }}
                />
                <motion.line x1="22%" y1="42%" x2="28%" y2="58%" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="2 3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1.15 }}
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

{/* Services Section */}
      <section id="services" className="px-5 md:px-8 lg:px-20 py-20 md:py-32">
        <FadeInView>
          <div className="mb-14 md:mb-20 max-w-xl">
            <p className="text-[10px] tracking-[0.35em] text-neutral-400 mb-4 font-medium">SERVICES</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.05] mb-4">
              What I Offer
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              End-to-end digital solutions — from strategy and prototyping to deployment and iteration.
            </p>
          </div>
        </FadeInView>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 items-stretch auto-rows-fr">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              className={`group relative rounded-2xl border border-neutral-200 p-5 md:p-6 cursor-pointer transition-all duration-200 bg-white h-full min-h-[300px] flex flex-col self-stretch ${
                expandedId === service.id ? 'border-black shadow-[0_12px_40px_rgba(0,0,0,0.08)] -translate-y-1' : 'hover:border-black hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1'
              }`}
              onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg md:text-xl font-bold tracking-[-0.02em] line-clamp-2">
                      {service.title}
                    </h3>
                    <div className="text-neutral-400 group-hover:text-black transition-colors duration-200 flex-shrink-0 mt-0.5">
                      {service.icon}
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-1">
                    {service.titleDe}
                  </p>
                </div>
              </div>

              <p className="text-sm text-neutral-500 leading-relaxed mb-5 line-clamp-3 h-[64px]">
                {service.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5 h-[44px] content-start overflow-hidden">
                {service.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[9px] tracking-wide text-neutral-400 border border-neutral-200 rounded-full px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-neutral-100 mt-auto">
                <span className="text-[10px] tracking-wider text-neutral-400">
                  {service.duration}
                </span>
                <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-neutral-500 group-hover:text-black transition-colors">
                  <span>DETAILS</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Slide Panel */}
        <AnimatePresence>
          {expandedId !== null && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 z-40"
                onClick={() => setExpandedId(null)}
              />
              {/* Panel */}
              <motion.div
                initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: '100%' } : { x: '100%' }}
                animate={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: 0 } : { x: 0 }}
                exit={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: '100%' } : { x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 bottom-0 md:top-0 h-[85vh] md:h-full w-full md:max-w-[90vw] md:sm:max-w-md bg-white shadow-2xl z-50 overflow-y-auto rounded-t-3xl md:rounded-none"
              >
                {(() => {
                  const service = services.find(s => s.id === expandedId);
                  if (!service) return null;
                  return (
                    <div className="p-8">
                      {/* Close button */}
                      <button
                        onClick={() => setExpandedId(null)}
                        className="absolute top-6 right-6 p-2 hover:bg-neutral-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Header */}
                      <div className="mb-8">
                        <div className="text-neutral-700 mb-4">{service.icon}</div>
                        <h3 className="text-2xl font-bold mb-1">{service.title}</h3>
                        <p className="text-sm text-neutral-400 mb-4">{service.titleDe}</p>
                        <p className="text-neutral-600 leading-relaxed">{service.desc}</p>
                      </div>

                      {/* Duration + Tags */}
                      <div className="flex items-center gap-3 mb-8">
                        <span className="text-[10px] tracking-wider text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded">
                          {service.duration}
                        </span>
                        {service.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-neutral-500 border border-neutral-200 rounded-full px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-8">
                        <p className="text-[10px] tracking-[0.2em] text-neutral-400 font-medium mb-3">TECH STACK</p>
                        <div className="flex flex-wrap gap-2">
                          {service.tech.map((t) => (
                            <span key={t} className="text-[11px] bg-black text-white px-3 py-1 rounded">{t}</span>
                          ))}
                        </div>
                      </div>

                      {/* Pain Points */}
                      <div className="mb-8">
                        <p className="text-[10px] tracking-[0.2em] text-neutral-400 font-medium mb-3">PAIN POINTS SOLVED</p>
                        <div className="space-y-2.5">
                          {service.painPoints.map((p, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="text-[#FF0000] text-sm mt-0.5">×</span>
                              <span className="text-sm text-neutral-600">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Use Cases */}
                      <div className="mb-10">
                        <p className="text-[10px] tracking-[0.2em] text-neutral-400 font-medium mb-3">USE CASES</p>
                        <div className="space-y-2.5">
                          {service.useCases.map((u, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="text-[#FF0000] text-sm mt-0.5">→</span>
                              <span className="text-sm text-neutral-600">{u}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        href="/about#contact"
                        className="inline-block w-full text-center px-6 py-4 bg-black text-white text-[11px] tracking-[0.15em] font-medium hover:bg-neutral-800 transition-colors"
                      >
                        GET A QUOTE
                      </Link>
                    </div>
                  );
                })()}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* CTA Section */}
      <FadeInView>
        <section className="px-5 md:px-8 lg:px-20 py-14 md:py-20 bg-black text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14]" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <line x1="0" y1="120" x2="1440" y2="520" stroke="white" strokeWidth="1" />
            <line x1="120" y1="0" x2="1080" y2="600" stroke="white" strokeWidth="1" />
            <line x1="420" y1="0" x2="1440" y2="420" stroke="white" strokeWidth="1" />
            <line x1="0" y1="360" x2="980" y2="600" stroke="white" strokeWidth="1" />
          </svg>

          <div className="absolute left-0 right-0 top-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute left-0 right-0 bottom-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] tracking-[0.35em] text-neutral-500 mb-6 font-medium">GET IN TOUCH</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] mb-6 leading-[1.1]">
                Small AI, Only For You.
              </h2>
              <p className="text-neutral-400 text-sm md:text-base mb-10 max-w-md mx-auto leading-relaxed">
                Your Computer. Your Data. Your AI.<br />
                100% Total Privacy.
              </p>
              <Link 
                href="https://calendly.com/cxbranny/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-white text-black text-[11px] tracking-[0.15em] font-medium hover:bg-neutral-200 transition-colors"
              >
                GET IN TOUCH
              </Link>
            </motion.div>
          </div>
        </section>
      </FadeInView>
    </>
  );
}
