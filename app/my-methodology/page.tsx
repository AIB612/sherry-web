"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FadeInView } from "components/animations";
import Link from "next/link";
import {
  BMLoopChart,
  PMFChart,
  RetentionChart,
  LifecycleChart,
  AARRRFunnel,
  OKRChart,
  ResearchMethodsChart,
  JourneyStagesChart,
  ServiceBlueprintChart,
  NPSGaugeChart,
  HeuristicsChart,
  DesignSystemChart,
} from "components/protocol-charts";

import { categories, type Category, type SubCategory } from "lib/methodology-data";


export default function ProtocolPage() {
  const [activeCatId, setActiveCatId] = useState<string>(categories[0]!.id);
  const [activeSubId, setActiveSubId] = useState<string>(
    categories[0]!.subs[0]!.id,
  );
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [zoomedPdf, setZoomedPdf] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  // Read hash on mount and when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // remove #
      if (!hash) return;

      // Find which category + sub this hash belongs to
      for (const cat of categories) {
        const sub = cat.subs.find((s) => s.id === hash);
        if (sub) {
          setActiveCatId(cat.id);
          setActiveSubId(sub.id);
          return;
        }
      }
    };

    handleHashChange(); // run on mount
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Close share menu on outside click
  useEffect(() => {
    if (!shareMenuOpen) return;
    const handleClick = () => setShareMenuOpen(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [shareMenuOpen]);

  const activeCat = categories.find((c) => c.id === activeCatId)!;
  const activeSub =
    activeCat.subs.find((s) => s.id === activeSubId) || activeCat.subs[0]!;

  const handleCatClick = (catId: string) => {
    setActiveCatId(catId);
    const cat = categories.find((c) => c.id === catId)!;
    const firstSubId = cat.subs[0]!.id;
    setActiveSubId(firstSubId);
    window.location.hash = firstSubId;
  };

  const handleSubSelect = (catId: string, subId: string) => {
    setActiveCatId(catId);
    setActiveSubId(subId);
    setMobileMenuOpen(false);
    window.location.hash = subId;
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "My Methodology: AI Transformation & Digital Product Strategy",
            "description": "Comprehensive methodology for AI transformation, digital product strategy, UX research, and workflow automation for Swiss SMEs",
            "author": {
              "@type": "Person",
              "name": "Chenxue Branny",
              "jobTitle": "Full-Stack IT Consultant",
              "url": "https://chenxue-branny.vercel.app"
            },
            "publisher": {
              "@type": "Person",
              "name": "Chenxue Branny"
            },
            "datePublished": "2026-01-01",
            "dateModified": "2026-05-22",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://chenxue-branny.vercel.app/my-methodology"
            },
            "keywords": "AI transformation, digital product strategy, supply chain analytics, customer lifecycle management, agile development, UX research"
          })
        }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative px-6 md:px-8 lg:px-20 pt-7 md:pt-10 pb-0">
        {/* Background Image - Right Side - Fixed Position */}
        <img
          src="/protocol-hero.jpg"
          alt=""
          className="hidden md:block absolute right-8 lg:right-20 top-8 w-[400px] h-auto rounded-2xl z-0"
        />

        {/* Content - Left Side */}
        <div className="relative z-10 max-w-xl">
          <h1 className="text-[26px] md:text-3xl font-bold tracking-tighter mb-4">
            My Methodology
          </h1>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Product philosophy, Swiss IT compliance, consulting templates, and
            UX design frameworks.
          </p>
        </div>
      </div>

      {/* Main: Left Sidebar + Right Content */}
      <section className="px-6 md:px-8 lg:px-20 mt-7 md:mt-10 pb-16 md:pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 items-start">
          {/* Left: Category Tree */}
          <div className="md:hidden mb-5">
            <div className="border-b border-neutral-200 pb-5">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0 flex-1 pr-3">
                  <p className="text-[10px] tracking-[0.42em] font-mono text-neutral-300 mb-3 uppercase">
                    {activeCat.number}
                  </p>
                  <h2 className="text-[24px] leading-[1] font-bold tracking-[-0.04em] text-black">
                    {activeCat.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="shrink-0 flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-neutral-400 hover:text-black transition-colors pb-1"
                  aria-label="Open methodology menu"
                >
                  <span>Menu</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M4 7h16M4 12h16M4 17h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block md:sticky md:top-24 space-y-1"
          >
            {categories.map((cat) => (
              <div key={cat.id}>
                {/* Level 1 */}
                <button
                  onClick={() => handleCatClick(cat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                    activeCatId === cat.id
                      ? "bg-neutral-100 text-black"
                      : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                  }`}
                >
                  <span className="text-[11px] text-neutral-300 font-mono w-5">
                    {cat.number}
                  </span>
                  <span className="text-sm font-medium">{cat.title}</span>
                </button>

                {/* Level 2 */}
                <AnimatePresence>
                  {activeCatId === cat.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-8 border-l border-neutral-200 pl-3 py-1 space-y-0.5">
                        {cat.subs.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveSubId(sub.id);
                              window.location.hash = sub.id;
                            }}
                            className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-all duration-200 ${
                              activeSubId === sub.id
                                ? "text-black font-semibold bg-neutral-50"
                                : "text-neutral-400 hover:text-neutral-700"
                            }`}
                          >
                            {sub.title}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.nav>

          {/* Right: Content */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Breadcrumb + Share Button */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <span>{activeCat.number}</span>
                    <span>{activeCat.title}</span>
                    <span>/</span>
                    <span className="text-neutral-700">{activeSub.title}</span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareMenuOpen(!shareMenuOpen);
                      }}
                      className="flex items-center gap-1.5 text-[10px] text-neutral-400 hover:text-black transition-colors px-2 py-1 rounded hover:bg-neutral-50"
                      title="Share this section"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      <span>Share</span>
                    </button>

                    {/* Share dropdown */}
                    <AnimatePresence>
                      {shareMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-50 min-w-[160px]"
                        >
                          {(() => {
                            const shareUrl = `${window.location.origin}/my-methodology/${activeCat.id}/${activeSub.id}`;
                            const shareTitle = `${activeSub.title} - ${activeCat.title}`;
                            const shareText = activeSub.description;
                            return (
                              <>
                                {/* X / Twitter */}
                                <a
                                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-600 hover:bg-neutral-50 hover:text-black transition-colors"
                                  onClick={() => setShareMenuOpen(false)}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                  </svg>
                                  <span>Post on X</span>
                                </a>
                                {/* LinkedIn */}
                                <a
                                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-600 hover:bg-neutral-50 hover:text-black transition-colors"
                                  onClick={() => setShareMenuOpen(false)}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                  </svg>
                                  <span>LinkedIn</span>
                                </a>
                                {/* WhatsApp */}
                                <a
                                  href={`https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n${shareUrl}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-600 hover:bg-neutral-50 hover:text-black transition-colors"
                                  onClick={() => setShareMenuOpen(false)}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                  </svg>
                                  <span>WhatsApp</span>
                                </a>
                                {/* Divider */}
                                <div className="border-t border-neutral-100 my-1" />
                                {/* Copy Link */}
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                    setShareMenuOpen(false);
                                    const el = document.getElementById('share-copied-toast');
                                    if (el) {
                                      el.classList.remove('hidden');
                                      setTimeout(() => el.classList.add('hidden'), 2000);
                                    }
                                  }}
                                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-600 hover:bg-neutral-50 hover:text-black transition-colors w-full text-left"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                  </svg>
                                  <span>Copy Link</span>
                                </button>
                              </>
                            );
                          })()}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Copied toast */}
                    <div
                      id="share-copied-toast"
                      className="hidden absolute right-0 top-full mt-1 bg-black text-white text-[10px] px-2 py-1 rounded shadow-lg z-50 whitespace-nowrap"
                    >
                      ✓ Link copied!
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-[24px] md:text-2xl font-bold tracking-tight mb-4 text-left">
                  {activeSub.title}
                </h2>
                <p className="text-sm text-neutral-400 mb-6 text-left">
                  {activeSub.description}
                </p>

                {/* Image with Zoom */}
                {activeSub.image && (
                  <div className="mb-6">
                    <div
                      className="rounded-xl overflow-hidden border border-neutral-200 cursor-zoom-in hover:border-neutral-400 transition-colors"
                      onClick={() => setZoomedImage(activeSub.image!.src)}
                    >
                      <img
                        src={activeSub.image.src}
                        alt={activeSub.image.alt}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-[10px] text-neutral-300 mt-1.5">
                      Photo by{" "}
                      <a
                        href={activeSub.image.creditUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neutral-500 transition-colors"
                      >
                        {activeSub.image.credit}
                      </a>{" "}
                      / Unsplash · Click to zoom
                    </p>
                  </div>
                )}

                {/* PDF Previews */}
                {activeSub.pdfs && activeSub.pdfs.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">
                      REFERENCE DOCUMENTS
                    </p>
                    <div className="space-y-3">
                      {activeSub.pdfs.map(
                        (
                          pdf: { title: string; file: string; desc: string },
                          i: number,
                        ) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => setZoomedPdf(pdf.file)}
                          >
                            <div className="flex border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-400 transition-all hover:shadow-md">
                              <div className="w-48 h-32 bg-neutral-50 relative overflow-hidden flex-shrink-0">
                                <iframe
                                  src={`${pdf.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                  className="w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none"
                                  title={pdf.title}
                                  tabIndex={-1}
                                />
                                <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors" />
                                <span className="absolute top-2 right-2 text-[8px] font-mono bg-red-500 text-white px-1.5 py-0.5 rounded">
                                  PDF
                                </span>
                              </div>
                              <div className="p-3 flex flex-col justify-center">
                                <p className="text-sm font-medium text-neutral-700">
                                  {pdf.title}
                                </p>
                                <p className="text-[10px] text-neutral-400 mt-1">
                                  {pdf.desc}
                                </p>
                                <p className="text-[9px] text-neutral-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  Click to preview
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="border-t border-neutral-100 pt-8 mb-8">
                  {/* Chart for specific sections */}
                  {activeSub.id === "mvp" && <BMLoopChart />}
                  {activeSub.id === "pmf" && <PMFChart />}
                  {activeSub.id === "lifecycle" && <LifecycleChart />}
                  {activeSub.id === "user-research" && <ResearchMethodsChart />}
                  {activeSub.id === "growth" && <AARRRFunnel />}
                  {activeSub.id === "okr" && <OKRChart />}
                  {activeSub.id === "journey" && <JourneyStagesChart />}
                  {activeSub.id === "blueprint" && <ServiceBlueprintChart />}
                  {activeSub.id === "nps" && <NPSGaugeChart />}
                  {activeSub.id === "heuristics" && <HeuristicsChart />}
                  {activeSub.id === "design-system" && <DesignSystemChart />}

                  {/* Inline charts within content */}
                  <div className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
                    {activeSub.content.split("\n").map((line, i) => {
                      // Insert RetentionChart before "Before PMF" line
                      if (
                        activeSub.id === "pmf" &&
                        line.includes("Before PMF")
                      ) {
                        return (
                          <div key={i}>
                            <RetentionChart />
                            <p className="mb-1.5 leading-relaxed">
                              {line.split(/\*\*(.+?)\*\*/g).map((part, j) =>
                                j % 2 === 1 ? (
                                  <span
                                    key={j}
                                    className="text-black font-medium"
                                  >
                                    {part}
                                  </span>
                                ) : (
                                  <span key={j}>{part}</span>
                                ),
                              )}
                            </p>
                          </div>
                        );
                      }
                      // Formula lines (contains = and numbers/variables)
                      if (
                        line.includes(" = ") &&
                        (line.includes("×") ||
                          line.includes("+") ||
                          line.includes("/") ||
                          line.includes("%") ||
                          /\d/.test(line))
                      ) {
                        return (
                          <p
                            key={i}
                            className="my-2 text-sm font-semibold italic text-black"
                          >
                            <mark className="bg-yellow-200 px-1 py-0.5 rounded">
                              {line}
                            </mark>
                          </p>
                        );
                      }
                      // Bold headers
                      if (line.startsWith("**") && line.endsWith("**")) {
                        return (
                          <p
                            key={i}
                            className="text-[10px] tracking-[0.2em] text-neutral-400 mt-6 mb-3 uppercase"
                          >
                            {line.replace(/\*\*/g, "")}
                          </p>
                        );
                      }
                      // Bold inline
                      if (line.includes("**")) {
                        const parts = line.split(/\*\*(.+?)\*\*/g);
                        return (
                          <p key={i} className="mb-1.5 leading-relaxed">
                            {parts.map((part, j) =>
                              j % 2 === 1 ? (
                                <span
                                  key={j}
                                  className="text-black font-medium"
                                >
                                  {part}
                                </span>
                              ) : (
                                <span key={j}>{part}</span>
                              ),
                            )}
                          </p>
                        );
                      }
                      // Bullet points
                      if (line.startsWith("• ") || line.startsWith("- ")) {
                        const text = line.replace(/^[•\-]\s/, "");
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 mb-1.5"
                          >
                            <div className="w-1 h-1 rounded-full bg-neutral-400 mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{text}</span>
                          </div>
                        );
                      }
                      // Checkmarks
                      if (line.startsWith("✓ ")) {
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 mb-1.5"
                          >
                            <span className="text-neutral-700 flex-shrink-0">
                              ✓
                            </span>
                            <span className="leading-relaxed">
                              {line.slice(2)}
                            </span>
                          </div>
                        );
                      }
                      // Numbered items
                      if (/^(\d+)\.\s/.test(line)) {
                        const match = line.match(/^(\d+)\.\s(.*)/);
                        if (match) {
                          return (
                            <div
                              key={i}
                              className="flex items-start gap-3 mb-2"
                            >
                              <span className="text-[11px] font-mono text-neutral-300 mt-0.5 flex-shrink-0 w-4">
                                {match[1]}.
                              </span>
                              <span className="leading-relaxed">
                                {match[2]}
                              </span>
                            </div>
                          );
                        }
                      }
                      // Empty lines
                      if (line.trim() === "") {
                        return <div key={i} className="h-3" />;
                      }
                      // Regular text
                      return (
                        <p key={i} className="mb-1.5 leading-relaxed text-left">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Highlights as SEO Hashtags */}
                {activeSub.highlights && (
                  <div className="mb-8">
                    <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-4">
                      KEY AREAS
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                      {activeSub.highlights.map((h, idx) => (
                        <span
                          key={h}
                          className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
                        >
                          <span className="text-neutral-300">#</span>
                          {h.replace(/\s+/g, "")}
                          <span className="text-neutral-300 ml-0.5">#</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links / Resources */}
                {activeSub.links && activeSub.links.length > 0 && (
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-4">
                      RESOURCES
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {activeSub.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm border border-neutral-200 rounded-lg px-4 py-2.5 hover:border-black hover:text-black transition-colors text-neutral-500 flex items-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          {link.label}
                          <span className="text-xs">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Image Zoom Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:hidden"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative bg-white w-full max-h-[82vh] rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-white px-6 pt-4 pb-3 border-b border-neutral-100">
                <div className="w-10 h-1 rounded-full bg-neutral-200 mx-auto mb-4" />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[28px] font-bold tracking-[-0.045em] leading-[0.98] text-black">
                      MY METHODOLOGY
                    </p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-500 border border-neutral-200 flex items-center justify-center"
                    aria-label="Close methodology menu"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M1 13L13 1M1 1l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto px-6 pb-6">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="py-4 border-b border-neutral-100 last:border-b-0"
                  >
                    <div className="mb-3">
                      <p className="text-[10px] tracking-[0.24em] font-mono text-neutral-400 mb-1">
                        {cat.number}
                      </p>
                      <h3 className="text-base font-semibold tracking-tight text-black">
                        {cat.title}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {cat.subs.map((sub) => {
                        const isActive =
                          activeCatId === cat.id && activeSubId === sub.id;

                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleSubSelect(cat.id, sub.id)}
                            className={`w-full text-left rounded-2xl px-4 py-3 transition-all duration-200 border ${
                              isActive
                                ? "bg-black text-white border-black"
                                : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p
                                  className={`text-sm font-semibold tracking-tight ${isActive ? "text-white" : "text-black"}`}
                                >
                                  {sub.title}
                                </p>
                                <p
                                  className={`text-xs mt-1 leading-relaxed ${isActive ? "text-white/70" : "text-neutral-500"}`}
                                >
                                  {sub.description}
                                </p>
                              </div>
                              <span
                                className={`shrink-0 mt-0.5 ${isActive ? "text-white" : "text-neutral-300"}`}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                  />
                                </svg>
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Zoom Overlay */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center cursor-zoom-out p-8"
            onClick={() => setZoomedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={zoomedImage}
              alt="Zoomed image"
              className="max-w-full max-h-full object-contain rounded-xl"
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Zoom Overlay */}
      <AnimatePresence>
        {zoomedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-5xl h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 bg-neutral-50">
                <span className="text-xs text-neutral-500">
                  {zoomedPdf.split("/").pop()}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-neutral-300">
                    Preview only
                  </span>
                  <button
                    onClick={() => setZoomedPdf(null)}
                    className="text-neutral-400 hover:text-black transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <iframe
                src={`${zoomedPdf}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-full"
                title="PDF Viewer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
