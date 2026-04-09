'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { portfolioItems, PortfolioItem } from 'lib/portfolio-data';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState, useRef, Suspense } from 'react';

// ============================================
// All Work 数据 (HR/猎头版 - 深度案例分析)
// ============================================
interface TrackRecordCase {
  id: string;
  title: string;
  role: string;
  teamSize: string;
  duration: string;
  context: string; // 企业处境
  execution: {
    architecture: string;
    compliance: string;
    leadership: string;
  };
  highlight: string; // 底部硬核数据
}

const trackRecordCases: TrackRecordCase[] = [
  {
    id: 'lazada-ued',
    title: 'Southeast Asian E-Commerce Standardization',
    role: 'Lead Tech PM',
    teamSize: '15+',
    duration: '4 Years',
    context: 'Legacy seller center running on fragmented frontend architectures across 6 Southeast Asian markets. Inefficient cross-functional handoffs causing 30% longer deployment cycles and severe operational overhead for cross-border operations.',
    execution: {
      architecture: 'Rebuilt the frontend ecosystem from the ground up. Architected a centralized, scalable component library integrated with standardized API handoffs, establishing a single source of truth for all regional engineering teams.',
      compliance: 'Implemented GDPR-aligned data handling for EU sellers, ensuring cross-border data flows met regional privacy requirements.',
      leadership: 'Coordinated 12 engineers and product managers across 5 departments, running weekly alignment sessions and quarterly roadmap reviews.',
    },
    highlight: 'Accelerated feature deployment cycles by <strong>40%</strong> while reducing frontend technical debt and system inconsistencies by <strong>60%</strong> across <strong>6</strong> regional markets.',
  },
  {
    id: 'tcl-app-design',
    title: 'IoT Product Line Digital Transformation',
    role: 'Senior Product Manager',
    teamSize: '8',
    duration: '2 Years',
    context: 'Fragmented smart home ecosystem with 5 separate applications for different appliance categories. User retention dropping 15% quarterly due to poor cross-platform integration. R&D and Marketing misaligned on product direction.',
    execution: {
      architecture: 'Unified 5 legacy applications into a single AIxIoT platform with modular microservices architecture supporting 50+ device types and real-time state synchronization.',
      compliance: 'Established IoT security protocols meeting China GB/T standards and EU CE marking requirements for cross-border product certification.',
      leadership: 'Bridged R&D, Marketing, and Operations teams through bi-weekly syncs, aligning product roadmap with business KPIs and quarterly OKRs.',
    },
    highlight: 'Achieved <strong>20%</strong> new user acquisition and <strong>35%</strong> retention improvement within <strong>12 months</strong> of unified platform launch.',
  },
  {
    id: 'weiju-saas',
    title: 'Cross-Border E-Commerce SaaS Platform',
    role: 'Product Manager',
    teamSize: '6',
    duration: '2 Years',
    context: 'Manual fulfillment processes consuming 50+ hours weekly. No integration with Brazil logistics partners blocking market entry. Technical debt from rapid MVP development blocking feature releases.',
    execution: {
      architecture: 'Designed microservices architecture with Brazil logistics API integration, enabling real-time inventory sync across 3 warehouses and automated order routing.',
      compliance: 'Implemented Brazil tax compliance (NFe/NFCe) and LGPD data protection requirements for local operations and cross-border transactions.',
      leadership: 'Built 0-to-1 product team, establishing agile ceremonies, defining OKRs, and managing technical debt backlog with prioritized sprint planning.',
    },
    highlight: 'Reduced operational overhead by <strong>80%</strong> while scaling order processing capacity <strong>3x</strong> without additional headcount.',
  },
  {
    id: 'swissazureai',
    title: 'Swiss-Compliant Enterprise AI Infrastructure',
    role: 'Technical Architect',
    teamSize: '3',
    duration: '6 Months',
    context: 'Swiss enterprises unable to adopt AI due to data residency concerns. No compliant RAG solutions available for FADP/FINMA regulated industries. Cross-border data transfer restrictions blocking cloud AI adoption.',
    execution: {
      architecture: 'Architected Azure Switzerland North deployment with pgvector for on-premise vector storage, ensuring zero data egress and full data sovereignty.',
      compliance: 'Achieved FADP compliance with data residency guarantees, FINMA-ready audit trails, and SOC2 aligned security controls for regulated industries.',
      leadership: 'Led technical decision-making across infrastructure, security, and ML teams, delivering production-ready POC in 6 months with full documentation.',
    },
    highlight: 'Enabled AI adoption for regulated Swiss industries with <strong>60%</strong> faster document processing and <strong>full compliance</strong> certification.',
  },
];

// ============================================
// Business Impact 数据 (客户版 - ROI导向)
// ============================================
interface BusinessImpactCase {
  id: string;
  tag: string;
  tagColor: string;
  bottleneck: string;
  intervention: string;
  metrics: { value: string; label: string }[];
  cta: string;
}

const businessImpactCases: BusinessImpactCase[] = [
  {
    id: 'lazada-ued',
    tag: 'FRONTEND ARCHITECTURE OVERHAUL',
    tagColor: 'bg-neutral-900',
    bottleneck: 'Fragmented frontend infrastructure across 6 regional markets causing severe deployment delays and skyrocketing engineering overhead.',
    intervention: 'Architected a centralized, scalable component ecosystem, eliminating cross-team redundancy and standardizing API handoffs.',
    metrics: [
      { value: '-40%', label: 'Time-to-Market' },
      { value: '$200K', label: 'Annual Eng. Savings' },
      { value: '6', label: 'Markets Unified' },
    ],
    cta: 'Accelerate your time-to-market',
  },
  {
    id: 'tcl-app-design',
    tag: 'IoT ECOSYSTEM INTEGRATION',
    tagColor: 'bg-neutral-900',
    bottleneck: 'Disconnected smart home devices operating in data silos, driving a 15% quarterly user churn and inflating maintenance costs.',
    intervention: 'Engineered a unified IoT platform with centralized authentication, enabling seamless cross-device control and scalable data flows.',
    metrics: [
      { value: '+20%', label: 'Active Users' },
      { value: '+35%', label: 'Retention Rate' },
      { value: '50+', label: 'Hardware Supported' },
    ],
    cta: 'Fix your user retention',
  },
  {
    id: 'weiju-saas',
    tag: 'OPERATIONAL AUTOMATION',
    tagColor: 'bg-neutral-900',
    bottleneck: 'Manual fulfillment workflows consuming 50+ engineering hours weekly. No Brazil logistics integration blocking critical market expansion.',
    intervention: 'Built microservices-based SaaS platform with automated order routing and real-time inventory synchronization across 3 regional warehouses.',
    metrics: [
      { value: '-80%', label: 'Manual Overhead' },
      { value: '3x', label: 'Processing Capacity' },
      { value: '3', label: 'Warehouses Synced' },
    ],
    cta: 'Eliminate manual bottlenecks',
  },
  {
    id: 'swissazureai',
    tag: 'COMPLIANCE INFRASTRUCTURE',
    tagColor: 'bg-neutral-900',
    bottleneck: 'Swiss data residency requirements blocking enterprise AI adoption. No FADP/FINMA-compliant RAG solutions available in market.',
    intervention: 'Architected Swiss-hosted AI infrastructure with zero data egress, full audit trails, and SOC2-aligned security controls.',
    metrics: [
      { value: '100%', label: 'Swiss Compliant' },
      { value: '-60%', label: 'Processing Time' },
      { value: '0', label: 'Data Egress' },
    ],
    cta: 'Unlock compliant AI adoption',
  },
];

// ============================================
import { TrackRecordView } from 'components/track-record-view';
function BusinessImpactView() {
  const [selectedCase, setSelectedCase] = useState<BusinessImpactCase | null>(null);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="px-5 md:px-8 lg:px-20 pt-12 pb-8">
        <p className="text-[10px] tracking-[0.3em] text-neutral-400 mb-3">LEISTUNGSVERSPRECHEN</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Business Impact</h1>
        <p className="text-neutral-500 max-w-2xl">
          Clear ROI. Measurable results. Click to see the full transformation story.
        </p>
      </div>

      {/* Simple Card Grid */}
      <div className="px-5 md:px-8 lg:px-20 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {businessImpactCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedCase(caseItem)}
              className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 cursor-pointer hover:border-neutral-400 hover:shadow-lg transition-all group"
            >
              {/* Tag */}
              <span className="inline-block bg-neutral-900 text-white text-[10px] tracking-wider font-semibold px-3 py-1 rounded-full mb-4">
                {caseItem.tag}
              </span>

              {/* Big Numbers */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {caseItem.metrics.map((metric, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'Inter, Helvetica Neue, system-ui, sans-serif' }}>{metric.value}</p>
                    <p className="text-[10px] text-[#555] tracking-[1px] mt-1 uppercase">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* View Details */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <span className="text-sm text-neutral-500">See transformation</span>
                <svg className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 md:px-8 py-6 flex items-start justify-between">
                <span className="inline-block bg-neutral-900 text-white text-[10px] tracking-wider font-semibold px-3 py-1 rounded-full">
                  {selectedCase.tag}
                </span>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  &#x2715;
                </button>
              </div>

              {/* Content */}
              <div className="px-6 md:px-8 py-6 space-y-6">
                {/* Before */}
                <div className="bg-red-50 rounded-xl p-5">
                  <p className="text-[#991B1B] text-xs font-bold tracking-wide mb-2">THE BOTTLENECK</p>
                  <p className="text-neutral-700 leading-relaxed">{selectedCase.bottleneck}</p>
                </div>

                {/* After */}
                <div className="bg-green-50 rounded-xl p-5">
                  <p className="text-[#166534] text-xs font-bold tracking-wide mb-2">THE INTERVENTION</p>
                  <p className="text-neutral-700 leading-relaxed">{selectedCase.intervention}</p>
                </div>

                {/* Results */}
                <div className="bg-neutral-50 rounded-xl p-5">
                  <p className="text-neutral-500 text-xs font-bold tracking-wide mb-4">RESULTS</p>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedCase.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <p className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'Inter, Helvetica Neue, system-ui, sans-serif' }}>{metric.value}</p>
                        <p className="text-[10px] text-[#555] tracking-[1px] mt-1 uppercase">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="https://calendly.com/cxbranny/30min"
                  target="_blank"
                  className="block w-full bg-black text-white text-center py-4 rounded-xl font-medium hover:bg-neutral-800 transition-colors"
                >
                  {selectedCase.cta} &rarr;
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Productized Services - 明码标价 */}
      <div className="px-5 md:px-8 lg:px-20 pb-20">
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] text-neutral-400 mb-3">PRODUCTIZED SERVICES</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Ready-to-Deploy Solutions</h2>
          <p className="text-neutral-500 max-w-xl">Fixed scope. Fixed price. No surprises.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Service 1: Architecture Teardown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 hover:border-neutral-400 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="inline-block bg-blue-500 text-white text-[10px] tracking-wider font-semibold px-3 py-1 rounded-full">
                DIAGNOSTIC
              </span>
              <div className="text-right">
                <p className="text-2xl font-extrabold font-mono">CHF 499</p>
                <p className="text-[10px] text-neutral-400">one-time</p>
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-2">Architecture & UX Teardown</h3>
            <p className="text-neutral-500 text-sm mb-6">
              Deep-dive analysis of your frontend architecture, UX bottlenecks, and technical debt. 
              Perfect for startups preparing for scale or Series A.
            </p>
            
            <div className="border-t border-neutral-100 pt-4 mb-6">
              <p className="text-xs font-semibold text-neutral-400 mb-2">DELIVERABLES</p>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  20-min video report (English)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Priority action roadmap
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  30-min follow-up call
                </li>
              </ul>
            </div>
            
            <Link
              href="https://calendly.com/cxbranny/30min"
              target="_blank"
              className="block w-full bg-black text-white text-center py-3 rounded-lg font-medium text-sm hover:bg-neutral-800 transition-colors"
            >
              Start Project &rarr;
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================
function SearchContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || '';
  const category = searchParams.get('category') || 'ALL';
  
  const isTrackRecord = view === 'track-record';

  if (isTrackRecord) {
    return <TrackRecordView initialCategory={category} />;
  }
  
  return <BusinessImpactView />;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SearchContent />
    </Suspense>
  );
}
