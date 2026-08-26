"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// 尝试导入 track-record-view 的类型和数据
interface CaseItem {
  id: string;
  no: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  year: string;
  location: string;
  tags: string[];
  thumbnailBg: string;
  image?: string;
  detailImage1?: string;
  detailImage2?: string;
  isFullWidth?: boolean;
  previewUrl: string;
  videoUrl: string;
  teamSize: string;
  duration: string;
  context: string;
  execution: { architecture: string; compliance: string; leadership: string };
  highlight: string;
}

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

// 真实工作经历数据 - 每年一个柱子 2016-2026
const experienceData = [
  {
    h: 25,
    year: "2016",
    period: "Sep.2016 - Mar.2020",
    company: "Lazada Tech",
    location: "China",
    role: "Lead UX Designer",
    details: {
      title: "Lead UX Designer",
      subtitle: "Lazada Tech · China / SEA",
      description:
        "Worked on the primary admin and seller-facing CRM systems for the Lazada e-commerce platform.",
      highlights: [
        "Modernized the UED design system",
        "Designed User Growth Coins gamification system",
        "Supported 1 million seller operations",
      ],
      tags: ["Design System", "CRM", "E-commerce"],
    },
  },
  {
    h: 35,
    year: "2017",
    period: "Sep.2016 - Mar.2020",
    company: "Lazada Tech",
    location: "China",
    role: "Lead UX Designer",
    details: {
      title: "Lead UX Designer",
      subtitle: "Lazada Tech · China / SEA",
      description:
        "Continued optimizing seller-center workflows, CRM interactions, and multi-market design consistency.",
      highlights: [
        "Seller workflow optimization",
        "Cross-market localization",
        "Design system expansion",
      ],
      tags: ["UX/UI", "Localization", "CRM"],
    },
  },
  {
    h: 45,
    year: "2018",
    period: "Jan.2018 - Jun.2019",
    company: "Master Wan / WeiYun",
    location: "China",
    role: "Product Designer",
    details: {
      title: "Product Designer",
      subtitle: "Master Wan / WeiYun · China",
      description:
        "Worked on end-to-end digital platforms spanning home repair services and smart agricultural software.",
      highlights: [
        "O2O service platform design",
        "Smart farming IoT workflows",
        "Customer Journey Mapping",
      ],
      tags: ["O2O", "IoT", "Service Design"],
    },
  },
  {
    h: 55,
    year: "2019",
    period: "Jul.2019 - Sep.2020",
    company: "Jelly ERP / Korea Project",
    location: "Korea / China",
    role: "Product Designer",
    details: {
      title: "Product Designer",
      subtitle: "Jelly ERP · Korea / China",
      description:
        "Built a private-domain operations and customer growth management system based on Enterprise WeChat and app workflows.",
      highlights: [
        "Customer lifecycle management",
        "Enterprise WeChat collaboration",
        "Growth operations workflows",
      ],
      tags: ["Private Domain", "CRM", "Growth"],
    },
  },
  {
    h: 60,
    year: "2020",
    period: "Mar.2020 - Sep.2022",
    company: "TCL New Tech",
    location: "China",
    role: "Senior Product Manager",
    details: {
      title: "Senior Product Manager",
      subtitle: "TCL New Tech · China",
      description:
        "Led smart home application design for White Goods management and IoT connectivity.",
      highlights: [
        "IoT provisioning workflows",
        "Feature roadmap strategy",
        "Cross-device UX improvement",
      ],
      tags: ["IoT", "Smart Home", "UX Strategy"],
    },
  },
  {
    h: 70,
    year: "2021",
    period: "Sep.2021 - Mar.2022",
    company: "OPPO Mobile",
    location: "China",
    role: "Product Consultant",
    details: {
      title: "Product Consultant",
      subtitle: "OPPO Mobile · China",
      description:
        "Provided strategic IT product consulting for OPPO digital product teams.",
      highlights: [
        "NPS analysis",
        "Workshop facilitation",
        "Cloud & NFC use cases",
      ],
      tags: ["Consulting", "NPS", "Strategy"],
    },
  },
  {
    h: 75,
    year: "2022",
    period: "Mar.2022 - Jan.2023",
    company: "Anjun Express",
    location: "Brazil / China",
    role: "Product Manager",
    details: {
      title: "Product Manager",
      subtitle: "Anjun Express · Brazil / China",
      description:
        "Built a comprehensive logistics system integrating Mercado with Correios last-mile services.",
      highlights: [
        "Real-time API integration",
        "Cross-border logistics platform",
        "Operational efficiency +60%",
      ],
      tags: ["Logistics", "API", "Data Modeling"],
    },
  },
  {
    h: 80,
    year: "2023",
    period: "Mar.2023 - Sep.2024",
    company: "FHNW + Product Work",
    location: "Switzerland + China",
    role: "MSc Student + Product Owner",
    details: {
      title: "MSc Student + Product Owner",
      subtitle: "FHNW · Switzerland & Product Work · China",
      description:
        "Balanced graduate studies with ongoing product strategy and digital transformation work across e-commerce and operations systems.",
      highlights: [
        "Business Information Systems MSc",
        "Product strategy practice",
        "Cross-market project experience",
      ],
      tags: ["Education", "Product", "Strategy"],
    },
  },
  {
    h: 65,
    year: "2024",
    period: "Mar.2024 - Mar.2025",
    company: "Goldoak GmbH / Hampelmann",
    location: "Switzerland",
    role: "E-Commerce Consultant",
    details: {
      title: "E-Commerce Consultant",
      subtitle: "Goldoak GmbH / Hampelmann · Switzerland",
      description:
        "Worked on Hampelmann Shopify, a sustainable kids toy e-commerce platform for the Dutch market.",
      highlights: [
        "Dutch market strategy",
        "Category planning",
        "Conversion growth +20%",
      ],
      tags: ["Shopify", "E-commerce", "Growth"],
    },
  },
  {
    h: 50,
    year: "2025",
    period: "Jun.2025 - Present",
    company: "Malim Mobility",
    location: "Switzerland",
    role: "Founder & Developer",
    details: {
      title: "Founder & Developer",
      subtitle: "Malim Mobility · Switzerland",
      description:
        "Built a cloud-based mobility consulting platform and official website dedicated to EV solutions.",
      highlights: [
        "EV subsidy tracker",
        "ROI calculator",
        "Lead generation platform",
      ],
      tags: ["EV", "Consulting", "Web Platform"],
    },
  },
  {
    h: 45,
    year: "2026",
    period: "2026 - Now",
    company: "Independent Products",
    location: "Switzerland",
    role: "Freelance & Products",
    details: {
      title: "Freelance & Products",
      subtitle: "Switzerland",
      description:
        "Continuing to build digital products, portfolio systems, and new end-to-end product concepts.",
      highlights: [
        "Sherry-Web portfolio",
        "Independent product building",
        "New ventures",
      ],
      tags: ["Portfolio", "Products", "Freelance"],
    },
  },
];

// 教育和证书时间线数据 - 从近到远排列
const educationTimeline = [
  {
    year: "Mar.2023 - Sep.2024",
    title: "Master of Science",
    subtitle: "Business Information Systems",
    institution: "FHNW - Hochschule für Wirtschaft",
    location: "Switzerland",
    icon: "🎓",
    type: "education",
    details: [
      "Business & IT Alignment",
      "Business Intelligence",
      "AI Models",
      "Supply Chain Management",
    ],
    projects: [
      "Master-Thesis: Generative AI-Assistant in E-Commerce",
      "BI Hiring Solution for Ewance",
      "Sustainability Recycling SCM for Swisscom",
      "FDH Operations Process Management for Baloise",
    ],
  },
  {
    year: "Sep.2016 - Jun.2022",
    title: "Bachelor's Degree (Part time)",
    subtitle: "Art Design",
    institution: "Hunan Normal University",
    location: "China",
    icon: "🎓",
    type: "education",
  },
];

// 技能数据 - 瑞士招聘市场常见标签
const skillsData = [
  {
    title: "Product & Business",
    items: [
      "Digital Transformation",
      "Agile / Scrum",
      "SAFe",
      "Kanban",
      "Design Thinking",
    ],
  },
  {
    title: "Tools & Tech",
    items: [
      "Power BI",
      "Tableau",
      "SQL",
      "Jira",
      "Confluence",
      "Figma",
      "Python",
      "UX",
      "Azure RAG",
      "Microsoft 365",
      "AI / Machine Learning",
      "AI Developer for All Languages",
    ],
  },
  {
    title: "Languages",
    items: ["English - Fluent", "Chinese - Native", "German - B2"],
  },
];

const projectPreviewMap: Record<
  string,
  { title: string; image: string; href: string }
> = {
  "2016": {
    title: "Lazada Seller Center",
    image: "/images/work/Lazada.png",
    href: "/all-work.html",
  },
  "2017": {
    title: "Lazada Seller Center",
    image: "/images/work/Lazada.png",
    href: "/all-work.html",
  },
  "2018": {
    title: "Master Wan × IKEA O2O / WeiYun",
    image: "/images/work/Master wan.png",
    href: "/all-work.html?category=END-TO-END%20PROJECTS",
  },
  "2019": {
    title: "Jelly ERP",
    image: "/images/work/Jelly Grow.png",
    href: "/all-work.html?category=E-COMMERCE%20%26%20LOGISTICS",
  },
  "2020": {
    title: "TCL Smart Home App",
    image: "/images/work/TCL.png",
    href: "/all-work.html?category=END-TO-END%20PROJECTS",
  },
  "2021": {
    title: "OPPO Mobile",
    image: "/images/work/OPPO.png",
    href: "/all-work.html?category=IT%20PRODUCT%20CONSULTING",
  },
  "2022": {
    title: "Anjun Express",
    image: "/images/work/Anjun.png",
    href: "/all-work.html?category=E-COMMERCE%20%26%20LOGISTICS",
  },
  "2023": {
    title: "Selected Work",
    image: "/images/work/Malim.png",
    href: "/all-work.html",
  },
  "2024": {
    title: "Hampelmann Shopify",
    image: "/images/work/Hampelmann.png",
    href: "/all-work.html?category=SWISS%20PROJECTS",
  },
  "2025": {
    title: "Malim Mobility Website",
    image: "/images/work/Malim.png",
    href: "/all-work.html?category=SWISS%20PROJECTS",
  },
  "2026": {
    title: "Malim Mobility Website",
    image: "/images/work/Malim.png",
    href: "/all-work.html?category=SWISS%20PROJECTS",
  },
};

// 完整的项目数据（用于弹窗）
const fullProjectData: CaseItem[] = [
  {
    id: "malim-mobility",
    no: "01",
    title: "Malim Mobility Website",
    subtitle: "EV Subsidy Tracker & Consulting Platform",
    category: "SWISS PROJECTS",
    role: "Founder & Developer",
    year: "Jun 2025 – Present",
    location: "Switzerland",
    tags: ["Next.js", "EV Subsidy", "Lead Gen"],
    thumbnailBg: "from-emerald-900 to-emerald-950",
    image: "/images/work/Malim.png",
    detailImage1: "/images/work/malim1.png",
    detailImage2: "/images/work/malim2.png",
    isFullWidth: true,
    previewUrl: "",
    videoUrl: "",
    teamSize: "1",
    duration: "Ongoing",
    context: "A cloud-based mobility consulting platform and official website dedicated to EV (Electric Vehicle) solutions.",
    execution: {
      architecture: "Architected and deployed the scalable platform based on comprehensive competitor analysis and cutting-edge charging tech research; built a robust PgvectorSQL database on the cloud. Engineered an innovative, integrated EV subsidy tracker and ROI calculator.",
      compliance: "Architected and deployed the scalable platform based on comprehensive competitor analysis and cutting-edge charging tech research; built a robust PgvectorSQL database on the cloud. Engineered an innovative, integrated EV subsidy tracker and ROI calculator.",
      leadership: "Successfully launched the platform online, significantly driving targeted lead generation and accelerating overall user acquisition.",
    },
    highlight: "Successfully launched the platform online, significantly driving targeted <strong>lead generation</strong> and accelerating overall user acquisition.",
  },
  {
    id: "hampelmann",
    no: "02",
    title: "Hampelmann Shopify",
    subtitle: "Sustainable Kids Toy E-Commerce Platform",
    category: "SWISS PROJECTS",
    role: "E-Commerce Consultant",
    year: "Mar 2024 – Mar 2025",
    location: "Netherlands / Switzerland",
    tags: ["Shopify", "E-Commerce", "Dutch Market"],
    thumbnailBg: "from-amber-900 to-amber-950",
    image: "/images/work/Hampelmann.png",
    detailImage1: "/images/work/Hamplemann1.png",
    detailImage2: "/images/work/Hamplemann2.png",
    isFullWidth: false,
    previewUrl: "",
    videoUrl: "",
    teamSize: "3",
    duration: "1 Year",
    context: "It was positioned for the Dutch market with a focus on category strategy, customer engagement, and conversion growth.",
    execution: {
      architecture: "Conceptualized a visionary e-commerce strategy by segmenting toy categories based on achieving children's future dream jobs. Drove strategic expansion by optimizing product listings and pioneering new customer engagement models.",
      compliance: "Conceptualized a visionary e-commerce strategy by segmenting toy categories based on achieving children's future dream jobs. Drove strategic expansion by optimizing product listings and pioneering new customer engagement models.",
      leadership: "Reactivated legacy users through targeted holiday events and data-driven email marketing, leveraging complex Dutch market data to boost user experience and increase payment conversion rates by 20%.",
    },
    highlight: "Reactivated legacy users through targeted holiday events and data-driven email marketing, boosting user experience and increasing <strong>payment conversion rates by 20%</strong>.",
  },
  {
    id: "anjun-express",
    no: "03",
    title: "Anjun Express",
    subtitle: "Brazil Cross-Border Logistics System",
    category: "E-COMMERCE & LOGISTICS",
    role: "Product Manager",
    year: "Mar 2022 – Jan 2023",
    location: "Brazil / China",
    tags: ["API Integration", "Mercado", "Data Modeling"],
    thumbnailBg: "from-green-900 to-green-950",
    image: "/images/work/Anjun.png",
    detailImage1: "/images/work/Anjun1.png",
    detailImage2: "/images/work/Anjun2.png",
    isFullWidth: false,
    previewUrl: "",
    videoUrl: "",
    teamSize: "10",
    duration: "10 Months",
    context: "A comprehensive logistics system integrating the Mercado E-commerce platform with the Correios last-mile service.",
    execution: {
      architecture: "Architected advanced data models for seamless, real-time API integrations. Designed innovative prototypes and intuitive interactions for backend systems and mobile operational software, efficiently managing cross-border agile development teams.",
      compliance: "Architected advanced data models for seamless, real-time API integrations. Designed innovative prototypes and intuitive interactions for backend systems and mobile operational software, efficiently managing cross-border agile development teams.",
      leadership: "Leveraged deep logistics status data analysis to monitor and optimize lead times from order to last-mile delivery, driving a remarkable 60% surge in overall operational efficiency.",
    },
    highlight: "Leveraged deep logistics status data analysis to monitor and optimize lead times from order to last-mile delivery, driving a remarkable <strong>60% surge</strong> in overall operational efficiency.",
  },
  {
    id: "oppo-mobile",
    no: "04",
    title: "OPPO Mobile",
    subtitle: "IT Product Consulting & Analysis",
    category: "IT PRODUCT CONSULTING",
    role: "Product Consultant",
    year: "Sep 2021 – Mar 2022",
    location: "China",
    tags: ["NPS Analysis", "Product Strategy", "UX Research"],
    thumbnailBg: "from-sky-900 to-sky-950",
    image: "/images/work/OPPO.png",
    detailImage1: "/images/work/Oppo1.png",
    detailImage2: "/images/work/Oppo2.png",
    isFullWidth: true,
    previewUrl: "",
    videoUrl: "",
    teamSize: "8",
    duration: "6 Months",
    context: "Strategic IT product consulting for OPPO's digital product teams focusing on future product experience improvement.",
    execution: {
      architecture: "Orchestrated interactive workshops and synthesized quantitative and qualitative research. Formulated innovative user cases to seamlessly integrate cross-functional teams with emerging technical products like Cloud and NFC services.",
      compliance: "Orchestrated interactive workshops and synthesized quantitative and qualitative research. Formulated innovative user cases to seamlessly integrate cross-functional teams with emerging technical products like Cloud and NFC services.",
      leadership: "Delivered forward-thinking strategic guidance that elevated user engagement through optimized features, advanced NPS analysis, and dynamic KPI-tracking data dashboards.",
    },
    highlight: "Delivered forward-thinking strategic guidance that elevated user engagement through optimized features, advanced <strong>NPS analysis</strong>, and dynamic KPI-tracking data dashboards.",
  },
];

// 代表项目
const featuredProjects = [
  {
    id: "malim-mobility",
    title: "Malim Mobility Website",
    desc: "EV Subsidy Tracker & Consulting Platform",
    type: "SWISS PROJECTS",
    role: "Founder & Developer",
    year: "Jun 2025 – Present",
    location: "Switzerland",
    tags: ["Next.js", "EV Subsidy", "Lead Gen"],
    image: "/images/work/Malim.png",
    context: "A cloud-based mobility consulting platform and official website dedicated to EV (Electric Vehicle) solutions.",
    highlight: "Successfully launched the platform online, significantly driving targeted lead generation and accelerating overall user acquisition.",
  },
  {
    id: "hampelmann",
    title: "Hampelmann Shopify",
    desc: "Sustainable Kids Toy E-Commerce Platform",
    type: "SWISS PROJECTS",
    role: "E-Commerce Consultant",
    year: "Mar 2024 – Mar 2025",
    location: "Netherlands / Switzerland",
    tags: ["Shopify", "E-Commerce", "Dutch Market"],
    image: "/images/work/Hampelmann.png",
    context: "A Shopify-based e-commerce platform for sustainable wooden toys targeting the Dutch market.",
    highlight: "Delivered a complete Shopify store with localized payment and shipping, driving early sales growth.",
  },
  {
    id: "anjun-express",
    title: "Anjun Express",
    desc: "Brazil Cross-Border Logistics System",
    type: "E-COMMERCE & LOGISTICS",
    role: "Product Manager",
    year: "Sep 2022 – Dec 2023",
    location: "China / Brazil",
    tags: ["Logistics", "Cross-Border", "Brazil Market"],
    image: "/images/work/Anjun.png",
    context: "A comprehensive cross-border logistics platform connecting Chinese suppliers with Brazilian retailers.",
    highlight: "Streamlined international shipping operations and reduced delivery times by 30%.",
  },
  {
    id: "oppo-mobile",
    title: "OPPO Mobile",
    desc: "IT Product Consulting & Analysis",
    type: "IT PRODUCT CONSULTING",
    role: "Product Consultant",
    year: "Jan 2021 – Aug 2022",
    location: "China",
    tags: ["Mobile", "Product Strategy", "Market Analysis"],
    image: "/images/work/OPPO.png",
    context: "Strategic product consulting for OPPO's mobile device ecosystem and market positioning.",
    highlight: "Provided data-driven insights that influenced product roadmap decisions for key markets.",
  },
];

function DetailModal({
  item,
  onClose,
  onNavigate,
}: {
  item: CaseItem;
  onClose: () => void;
  onNavigate: (item: CaseItem) => void;
}) {
  const currentIndex = fullProjectData.findIndex((c) => c.id === item.id);
  const prevCase = currentIndex > 0 ? fullProjectData[currentIndex - 1] : null;
  const nextCase =
    currentIndex < fullProjectData.length - 1 ? fullProjectData[currentIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-stretch justify-end"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={
          typeof window !== "undefined" && window.innerWidth < 768
            ? { y: "100%" }
            : { x: "100%" }
        }
        animate={
          typeof window !== "undefined" && window.innerWidth < 768
            ? { y: 0 }
            : { x: 0 }
        }
        exit={
          typeof window !== "undefined" && window.innerWidth < 768
            ? { y: "100%" }
            : { x: "100%" }
        }
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative bg-white w-full md:w-1/2 h-[88vh] md:h-full shadow-2xl ml-auto overflow-hidden flex flex-col rounded-t-3xl md:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-11 h-11 bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.10)] hover:bg-neutral-200 hover:text-black transition-all hover:scale-110"
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

        <div className="flex-1 overflow-y-auto pb-10 md:pb-12">
          <div className="mb-8 md:mb-10 px-6 md:px-10 pt-5 md:pt-5">
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-[-0.02em] leading-tight mb-4 text-left">
              {item.title}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-[11px] tracking-[0.25em] font-mono text-neutral-400">
                {item.no}
              </span>
              <span className="h-px w-8 bg-neutral-200" />
              <span className="text-[10px] tracking-[0.2em] font-mono text-neutral-400">
                {item.year}
              </span>
            </div>
          </div>

          <div className="px-6 md:px-10 mb-8 md:mb-10">
            <div
              className={`w-full aspect-[2/1] rounded-2xl ${item.detailImage1 ? "bg-neutral-100" : "bg-gradient-to-br " + item.thumbnailBg} overflow-hidden relative`}
            >
              {item.detailImage1 ? (
                <Image
                  src={item.detailImage1}
                  alt={`${item.title} detail 1`}
                  fill
                  sizes="(min-width: 768px) 700px, 100vw"
                  quality={100}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ) : item.image && !item.previewUrl ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 700px, 100vw"
                  quality={100}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ) : null}
              {item.previewUrl && (
                <video
                  src={item.previewUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              )}
              <span
                className="absolute bottom-4 right-6 text-[80px] font-bold leading-none"
                style={{ color: "rgba(255,255,255,0.06)" }}
              >
                {item.no}
              </span>
            </div>
          </div>

          <div className="flex justify-center mb-8 md:mb-10 px-6 md:px-14 lg:px-20">
            <p className="text-center text-neutral-600 text-sm leading-relaxed max-w-xl">
              {item.title} is a {item.subtitle.toLowerCase()}. {item.context}
            </p>
          </div>

          <div className="h-px w-[40px] bg-neutral-400 mx-auto mb-8 md:mb-10" />

          <div className="px-6 md:px-10 mb-8 md:mb-10">
            <div
              className={`w-full aspect-[2/1] rounded-2xl ${item.detailImage2 ? "bg-neutral-100" : "bg-gradient-to-tl " + item.thumbnailBg} overflow-hidden opacity-90 relative`}
            >
              {item.detailImage2 ? (
                <Image
                  src={item.detailImage2}
                  alt={`${item.title} detail 2`}
                  fill
                  sizes="(min-width: 768px) 700px, 100vw"
                  quality={100}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ) : item.image ? (
                <Image
                  src={item.image}
                  alt={`${item.title} alternate detail`}
                  fill
                  sizes="(min-width: 768px) 700px, 100vw"
                  quality={100}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
                />
              ) : null}
            </div>
          </div>

          <div className="flex justify-center mb-8 md:mb-10 px-6 md:px-14 lg:px-20">
            <p className="text-center text-neutral-600 text-sm leading-relaxed max-w-xl">
              {item.execution.architecture}
            </p>
          </div>

          <div className="h-px w-[40px] bg-neutral-400 mx-auto mb-10 md:mb-12" />

          <div className="mb-8 px-6 md:px-14 lg:px-20 text-center">
            <h3 className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 mb-5 md:mb-6">
              SUMMARY
            </h3>
            <p
              className="text-center text-neutral-600 text-sm leading-relaxed max-w-xl mx-auto"
              dangerouslySetInnerHTML={{ __html: item.highlight }}
            />

            <div className="flex flex-wrap justify-center gap-2 mt-6 md:mt-8">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-widest border border-neutral-200 px-4 py-1.5 text-neutral-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-neutral-200 grid grid-cols-2 bg-white">
          {prevCase ? (
            <button
              className="p-5 md:p-8 flex flex-col items-start border-r border-neutral-200 hover:bg-neutral-50 transition-colors group"
              onClick={() => onNavigate(prevCase)}
            >
              <span className="text-[9px] tracking-[0.2em] text-neutral-400 mb-2 flex items-center gap-2 group-hover:text-black transition-colors">
                <svg
                  className="w-3 h-3 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                PREV PROJECT
              </span>
              <span className="font-semibold text-sm truncate w-full text-left">
                {prevCase.title}
              </span>
            </button>
          ) : (
            <div className="p-6 md:p-8 border-r border-neutral-200" />
          )}

          {nextCase ? (
            <button
              className="p-5 md:p-8 flex flex-col items-end hover:bg-neutral-50 transition-colors group text-right"
              onClick={() => onNavigate(nextCase)}
            >
              <span className="text-[9px] tracking-[0.2em] text-neutral-400 mb-2 flex items-center gap-2 group-hover:text-black transition-colors">
                NEXT PROJECT
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <span className="font-semibold text-sm truncate w-full">
                {nextCase.title}
              </span>
            </button>
          ) : (
            <div className="p-6 md:p-8" />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

const VIEW_CATEGORIES = [
  { key: "ALL", label: "All Projects" },
  { key: "SWISS PROJECTS", label: "Swiss Projects" },
  { key: "IT PRODUCT CONSULTING", label: "IT Product Consulting & Analysis" },
  { key: "E-COMMERCE & LOGISTICS", label: "E-commerce & Logistics" },
  { key: "END-TO-END PROJECTS", label: "End-to-End Projects" },
];

function VerticalIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-start gap-0">
      <div className="w-[1px] h-8 bg-neutral-200 ml-0" />
      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group flex items-center py-[6px]"
        >
          <motion.div
            className="h-[1px] rounded-full bg-neutral-300"
            animate={{
              width: activeIndex === i ? 36 : 16,
              backgroundColor: activeIndex === i ? "#000" : "#d4d4d4",
            }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          />
          <motion.span className="text-[10px] tracking-[0.2em] uppercase whitespace-nowrap ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        {String(activeIndex + 1).padStart(2, "0")}/
        {String(sections.length).padStart(2, "0")}
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedExp, setSelectedExp] = useState<
    (typeof experienceData)[0] | null
  >(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [travelMapOpen, setTravelMapOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [mapMode, setMapMode] = useState<"travel" | "education" | "tech-travel">("travel");
  const [activePlace, setActivePlace] = useState<string>("Shenzhen");
  const [hoveredPlace, setHoveredPlace] = useState<string | null>(null);

  const travelPlaces = [
    { name: "Shenzhen", x: "79%", y: "43%", mapX: 780, mapY: 258, emphasis: true, note: "From Shenzhen to Switzerland - a core part of my personal story." },
    { name: "Zurich", x: "51%", y: "31%", mapX: 486, mapY: 196, emphasis: true, note: "Current Swiss base and part of my ongoing life and work in Switzerland." },
    { name: "Basel", x: "50%", y: "30%", mapX: 481, mapY: 191, note: "A meaningful Swiss stop in my local journey and cultural experience." },
    { name: "Paris", x: "49%", y: "30%", mapX: 463, mapY: 187, note: "A travel memory shaped by curiosity, design, and cultural exploration." },
    { name: "Milan", x: "51%", y: "33%", mapX: 500, mapY: 208, note: "A city connected to style, movement, and observing how people live and work." },
    { name: "Seoul", x: "84%", y: "40%", mapX: 797, mapY: 218, note: "Part of my East Asia perspective across product, work, and culture." },
    { name: "Bangkok", x: "76%", y: "56%", mapX: 728, mapY: 311, note: "A travel point that reflects openness to different rhythms and cultures." },
        { name: "Vietnam", x: "77%", y: "52%", mapX: 742, mapY: 284, labelDx: 16, labelDy: -24, note: "Travel highlight in Southeast Asia." },
    { name: "Bali", x: "80%", y: "66%", mapX: 771, mapY: 374, labelDx: 18, labelDy: 8, note: "Indonesia · Bali travel highlight." },
    { name: "France", x: "48%", y: "31%", mapX: 455, mapY: 190, labelDx: -62, labelDy: -24, note: "European travel highlight." },
    { name: "Germany", x: "50%", y: "29%", mapX: 476, mapY: 180, labelDx: -6, labelDy: -34, note: "European travel highlight." },
    { name: "Austria", x: "52%", y: "31%", mapX: 502, mapY: 194, labelDx: 28, labelDy: -26, note: "European travel highlight." },
    { name: "Italy", x: "52%", y: "34%", mapX: 507, mapY: 214, labelDx: 24, labelDy: 8, note: "European travel highlight." },
    { name: "United States", x: "22%", y: "34%", mapX: 210, mapY: 206, note: "Long-distance travel highlight." },
    { name: "UAE", x: "61%", y: "41%", mapX: 590, mapY: 237, labelDx: 18, labelDy: -28, note: "Middle East travel highlight." },
    { name: "Dubai", x: "61%", y: "41%", mapX: 594, mapY: 239, labelDx: 32, labelDy: 4, note: "City highlight in the UAE." },
    { name: "Qatar", x: "60%", y: "41%", mapX: 582, mapY: 239, labelDx: -56, labelDy: 2, note: "Middle East travel highlight." },
    { name: "Turkey", x: "55%", y: "34%", mapX: 531, mapY: 205, note: "Bridge between Europe and Asia in the travel map." },
    { name: "Hungary", x: "53%", y: "31%", mapX: 512, mapY: 191, labelDx: 46, labelDy: -30, note: "Central Europe travel highlight." },
    { name: "Spain", x: "45%", y: "35%", mapX: 430, mapY: 210, labelDx: -56, labelDy: 2, note: "Southern Europe travel highlight." },
    { name: "Lisbon", x: "43%", y: "35%", mapX: 407, mapY: 208, labelDx: -74, labelDy: 22, note: "Portugal · Lisbon travel highlight." },
    { name: "Croatia", x: "53%", y: "33%", mapX: 515, mapY: 203, labelDx: 44, labelDy: -8, note: "Adriatic travel highlight." },
  ];

  const educationPlaces = [
    { name: "China · Research / Workshops", x: "78%", y: "42%", mapX: 770, mapY: 250, emphasis: true, note: "Child sexuality education related research and workshop context connected to China." },
    { name: "Switzerland · Community Dialogue", x: "51%", y: "31%", mapX: 486, mapY: 196, emphasis: true, note: "Community dialogue and social education related work rooted in Switzerland." },
    { name: "Online / Cross-border Advocacy", x: "61%", y: "23%", mapX: 570, mapY: 130, note: "Cross-border, digital-first public interest work beyond a single physical location." },
  ];

  const techTravelPlaces = [
    { name: "Shenzhen · Tech Roots", x: "79%", y: "43%", mapX: 780, mapY: 258, emphasis: true, note: "Technology roots, product thinking, and the beginning of the Shenzhen to Switzerland journey." },
    { name: "Zurich · Swiss Tech Life", x: "51%", y: "31%", mapX: 486, mapY: 196, emphasis: true, note: "Where technology, work, and life in Switzerland come together." },
        { name: "Seoul · Product & Culture", x: "84%", y: "40%", mapX: 797, mapY: 218, note: "A city connecting digital culture, product inspiration, and East Asian perspective." },
  ];

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

  useMotionValueEvent(scrollYProgress, "change", (v) => {
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        Download CV
      </a>

      {/* Section 1: About + Experience - 和之前一样的布局 */}
      <motion.section
        id="about"
        className="min-h-screen flex items-center px-6 md:px-8 lg:px-20 lg:pl-36 py-20 md:py-0"
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
            <div className="w-16 h-[1px] bg-black mb-6 md:mb-8" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              About
            </h1>

            {/* 手机端: 资料块放在 About 标题下面 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:hidden flex flex-col items-start mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-neutral-100 border border-neutral-200 mb-5 overflow-hidden">
                <img
                  src="/avatar.jpg"
                  alt="Chenxue Branny"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">
                Chenxue Branny
              </h2>
              <p className="text-xs text-neutral-400 tracking-[0.18em] mb-5">
                FULL-STACK IT
              </p>
              <div className="space-y-3 text-sm text-neutral-500 leading-relaxed mb-6 max-w-sm">
                <p>Focused on digital transformation, AI automation, product strategy, and modern software systems that help businesses grow faster and operate more intelligently.</p>
                <p>Designed business services for 20+ SMEs.</p>
                <p>Independently managed, developed, and deployed 8+ large-scale SaaS systems.</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "IT",
                  "AI",
                  "Agile life",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] text-neutral-500 hover:text-black transition-colors cursor-default"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2 mb-5 text-sm text-neutral-500">
                <a
                  href="mailto:Sherryxuex@gmail.com"
                  className="hover:text-black transition-colors"
                >
                  Sherryxuex@gmail.com
                </a>
              </div>
            </motion.div>

            <div className="space-y-2 text-sm text-neutral-500 leading-relaxed mb-8 max-w-[620px] text-justify">
              <p>A woman in tech building a path from Shenzhen, China, to Switzerland.</p>
              <p>10 years of experience working in IT field.</p>
              <p>3 years in Switzerland, completing a Master's degree while working in IT field.</p>
              <p>Passionate about innovation and new technologies.</p>
              <p>
                Love traveling and exploring diverse cultures around the world.{" "}
                <button
                  type="button"
                  onClick={() => setTravelMapOpen(true)}
                  className="text-black underline underline-offset-4 hover:text-neutral-600 transition-colors"
                >
                  Places I've been
                </button>
              </p>
              <p>From a 14-year 'left-behind child' to a tech innovator. This AI-RAG Child Sexuality Education{" "}
                <a
                  href="https://rag-chilren.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline underline-offset-4 hover:text-neutral-600 transition-colors"
                >
                  Demo
                </a>
                {" "}is my vision for Lifelong Personal Sustainability.
              </p>
              <p>
                Learning German to C1 level. Published and updated a podcast:{" "}
                <a
                  href="https://podcasts.apple.com/ch/podcast/learn-german-with-the-little-prince/id1896780524?l=de-DE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline underline-offset-4 hover:text-neutral-600 transition-colors"
                >
                  Learn German with The Little Prince
                </a>
                .
              </p>
            </div>

            {/* 时间轴 */}
            <div className="inline-flex flex-col items-start ml-0 md:ml-5 relative w-full max-w-[500px] overflow-x-auto pb-2">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3,
                  delay: 1.5,
                  repeat: 2,
                  repeatDelay: 2,
                }}
                className="text-sm text-neutral-400 mb-6 flex items-center gap-2 whitespace-nowrap"
              >
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
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
                      if (
                        typeof window !== "undefined" &&
                        window.innerWidth >= 768
                      ) {
                        setHoveredIndex(i);
                      }
                    }}
                    onMouseLeave={() => {
                      if (
                        typeof window !== "undefined" &&
                        window.innerWidth >= 768
                      ) {
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
                        <p className="font-bold text-[11px] mb-1">
                          {exp.company}
                        </p>
                        <p className="text-neutral-400">{exp.role}</p>
                        <p className="text-neutral-500 text-[9px] mt-1">
                          {exp.period}
                        </p>
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
                          height: {
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          },
                          width: {
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          },
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
              <img
                src="/avatar.jpg"
                alt="Chenxue Branny"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              Chenxue Branny
            </h2>
            <p className="text-sm text-neutral-400 tracking-wider mb-5">
              FULL-STACK IT
            </p>
            <div className="space-y-3 text-sm text-neutral-500 leading-relaxed mb-8 max-w-sm">
              <p>Focused on digital transformation, AI automation, product strategy, and modern software systems that help businesses grow faster and operate more intelligently.</p>
              <p>Designed business services for 20+ SMEs.</p>
              <p>Independently managed, developed, and deployed 8+ large-scale SaaS systems.</p>
              <p>
                How I approach projects?{" "}
                <a
                  href="/my-methodology"
                  className="text-black underline underline-offset-4 hover:text-neutral-600 transition-colors"
                >
                  Explore My Methodology ↗
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "IT",
                "AI",
                "Agile life",
              ].map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] text-neutral-500 hover:text-black transition-colors cursor-default"
                >
                  #{skill}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2 mb-6 text-sm text-neutral-500">
              <a
                href="mailto:Sherryxuex@gmail.com"
                className="hover:text-black transition-colors"
              >
                Sherryxuex@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Travel / Research Map Modal */}
      <AnimatePresence>
        {travelMapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm"
            onClick={() => setTravelMapOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.25 }}
              className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl p-6 md:p-8 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-neutral-400 mb-2">
                    World Map
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    Places I've Been
                  </h2>
                  <p className="text-sm text-neutral-500 max-w-lg leading-relaxed">
                    Two layers of places are highlighted here: travel memories and child sexuality education related work.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTravelMapOpen(false)}
                  className="text-neutral-400 hover:text-black transition-colors text-sm"
                >
                  Close
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => { setMapMode("travel"); setActivePlace("Shenzhen"); }}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    mapMode === "travel"
                      ? "bg-black text-white"
                      : "bg-neutral-100 text-neutral-500 hover:text-black"
                  }`}
                >
                  Travel highlights
                </button>
                <button
                  type="button"
                  onClick={() => { setMapMode("education"); setActivePlace("China · Research / Workshops"); }}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    mapMode === "education"
                      ? "bg-black text-white"
                      : "bg-neutral-100 text-neutral-500 hover:text-black"
                  }`}
                >
                  Child sexuality education
                </button>
                <button
                  type="button"
                  onClick={() => { setMapMode("tech-travel"); setActivePlace("Shenzhen · Tech Roots"); }}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    mapMode === "tech-travel"
                      ? "bg-black text-white"
                      : "bg-neutral-100 text-neutral-500 hover:text-black"
                  }`}
                >
                  Tech Travel
                </button>
              </div>

              {(() => {
                const currentPlaces =
                  mapMode === "travel"
                    ? travelPlaces
                    : mapMode === "education"
                      ? educationPlaces
                      : techTravelPlaces;
                const selectedPlace =
                  currentPlaces.find((place) => place.name === activePlace) ||
                  currentPlaces[0];

                return (
                  <>
                    <div className="relative rounded-3xl border border-neutral-200 bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f4_100%)] p-4 md:p-5 overflow-hidden">
                      <div className="relative">
                        <Image
                          src="/maps/world-map.svg"
                          alt="World map"
                          width={950}
                          height={620}
                          className="w-full h-auto opacity-[0.95]"
                          unoptimized
                        />

                        <svg
                          viewBox="0 0 950 620"
                          className="absolute inset-0 w-full h-full"
                          aria-hidden="true"
                        >
                          {currentPlaces.map((place) => {
                            const isActive = activePlace === place.name;
                            const isHovered = hoveredPlace === place.name;
                            const isEmphasis = Boolean(place.emphasis);
                            const showCard = isHovered || isActive;
                            const showLabel = false;
                            const cardWidth = 180;
                            const zoomWidth = 104;
                            const zoomHeight = 72;
                            const zoomScale = 3.1;
                            const zoomX = place.mapX - zoomWidth / 2 - place.mapX * zoomScale;
                            const zoomY = place.mapY - 88 - zoomHeight / 2 - place.mapY * zoomScale;
                            const cardX = Math.min(
                              Math.max(place.mapX + 18, 12),
                              950 - cardWidth - 12
                            );
                            const cardY = Math.min(
                              Math.max(place.mapY - 90, 12),
                              620 - 86
                            );

                            return (
                              <g
                                key={place.name}
                                transform={`translate(${place.mapX}, ${place.mapY})`}
                                onMouseEnter={() => {
                                  setHoveredPlace(place.name);
                                  setActivePlace(place.name);
                                }}
                                onMouseLeave={() => setHoveredPlace(null)}
                                onClick={() => setActivePlace(place.name)}
                                className="cursor-pointer"
                              >
                                {isHovered && (
                                  <g>
                                    <defs>
                                      <clipPath id={`hoverZoom-${place.name.replace(/\s+/g, "-")}`}>
                                        <rect x={place.mapX - zoomWidth / 2} y={place.mapY - 88 - zoomHeight / 2} rx="14" ry="14" width={zoomWidth} height={zoomHeight} />
                                      </clipPath>
                                    </defs>
                                    <rect
                                      x={place.mapX - zoomWidth / 2 - 4}
                                      y={place.mapY - 88 - zoomHeight / 2 - 4}
                                      rx="16"
                                      ry="16"
                                      width={zoomWidth + 8}
                                      height={zoomHeight + 8}
                                      fill="rgba(255,255,255,0.96)"
                                      stroke="#111111"
                                      strokeWidth="1.2"
                                    />
                                    <image
                                      href="/maps/world-map.svg"
                                      x={zoomX}
                                      y={zoomY}
                                      width={950 * zoomScale}
                                      height={620 * zoomScale}
                                      clipPath={`url(#hoverZoom-${place.name.replace(/\s+/g, "-")})`}
                                      opacity="0.98"
                                    />
                                    <rect
                                      x={place.mapX - zoomWidth / 2}
                                      y={place.mapY - 88 - zoomHeight / 2}
                                      rx="14"
                                      ry="14"
                                      width={zoomWidth}
                                      height={zoomHeight}
                                      fill="none"
                                      stroke="#111111"
                                      strokeOpacity="0.08"
                                    />
                                    <rect
                                      x={place.mapX - Math.max(34, place.name.length * 3.6)}
                                      y={place.mapY - 146}
                                      rx="10"
                                      ry="10"
                                      width={Math.max(68, place.name.length * 7.2)}
                                      height="24"
                                      fill="rgba(255,255,255,0.96)"
                                      stroke="#111111"
                                      strokeOpacity="0.12"
                                    />
                                    <text
                                      x={place.mapX}
                                      y={place.mapY - 130}
                                      fontSize="11"
                                      fill="#111111"
                                      textAnchor="middle"
                                      fontWeight="600"
                                    >
                                      {place.name}
                                    </text>
                                  </g>
                                )}
                                <circle
                                  r={isHovered ? (isEmphasis ? 22 : 16) : isEmphasis ? 18 : 12}
                                  fill={
                                    isActive || isEmphasis
                                      ? "rgba(0,0,0,0.18)"
                                      : "rgba(163,163,163,0.14)"
                                  }
                                />
                                <circle
                                  r={isHovered ? (isEmphasis ? 8 : 6) : isEmphasis ? 6 : 4}
                                  fill={
                                    isActive || isEmphasis
                                      ? "#111111"
                                      : "#a3a3a3"
                                  }
                                />
                                {showCard && (
                                  <g transform={`translate(${cardX - place.mapX}, ${cardY - place.mapY})`}>
                                    <defs>
                                      <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                                        <feOffset dx="0" dy="2" result="offsetblur"/>
                                        <feComponentTransfer>
                                          <feFuncA type="linear" slope="0.2"/>
                                        </feComponentTransfer>
                                        <feMerge>
                                          <feMergeNode/>
                                          <feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                      </filter>
                                    </defs>
                                    <rect
                                      x={0}
                                      y={0}
                                      rx={20}
                                      ry={20}
                                      width={200}
                                      height={84}
                                      fill="rgba(255,255,255,0.96)"
                                      stroke={isActive ? "#1f2937" : "#e5e7eb"}
                                      strokeWidth="1.5"
                                      filter="url(#cardShadow)"
                                    />
                                    <circle
                                      cx={cardX - place.mapX + (place.mapX < cardX ? 12 : 188)}
                                      cy={cardY - place.mapY + 48}
                                      r="3"
                                      fill={mapMode === "travel"
                                      ? isActive || isEmphasis
                                        ? "#111827"
                                        : "#a3a3a3"
                                      : isActive || isEmphasis
                                        ? "#2563eb"
                                        : "#a3a3a3"}
                                    />
                                    <line
                                      x1={cardX - place.mapX + (place.mapX < cardX ? 12 : 188)}
                                      y1={cardY - place.mapY + 48}
                                      x2={place.mapX < cardX ? -8 : 8}
                                      y2={0}
                                      stroke={mapMode === "travel"
                                      ? isActive || isEmphasis
                                        ? "#111827"
                                        : "#a3a3a3"
                                      : isActive || isEmphasis
                                        ? "#2563eb"
                                        : "#a3a3a3"}
                                      strokeWidth="1.5"
                                      strokeDasharray="3 3"
                                      opacity="0.4"
                                    />
                                    <text x={16} y={26} fontSize="10" fill="#a3a3a3" letterSpacing="2" fontWeight="500">
                                      {mapMode === "travel" ? "ALL TRAVEL" : mapMode === "education" ? "EDUCATION" : "TECH TRAVEL"}
                                    </text>
                                    <text x={16} y={48} fontSize="15" fill="#111111" fontWeight="600">
                                      {place.name}
                                    </text>
                                    <text x={16} y={68} fontSize="11" fill="#525252">
                                      {mapMode === "travel" ? "Visited place" : mapMode === "education" ? "Education place" : "Tech travel place"}
                                    </text>
                                  </g>
                                )}
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-neutral-200 bg-white px-4 py-4">
                      <p className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mb-2">
                        Selected place
                      </p>
                      <h3 className="text-lg font-semibold text-black">
                        {selectedPlace?.name}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed mt-2">
                        {selectedPlace?.note}
                      </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-neutral-200 bg-white px-4 py-4">
                      <p className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mb-3">
                        Places
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentPlaces.map((place) => (
                          <button
                            key={place.name}
                            type="button"
                            onClick={() => setActivePlace(place.name)}
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                              activePlace === place.name
                                ? "border-black text-black bg-neutral-50"
                                : "border-neutral-200 text-neutral-500 hover:text-black hover:border-neutral-300"
                            }`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                activePlace === place.name || place.emphasis
                                  ? "bg-black"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>{place.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 2: Projects - 代表项目 */}
      <motion.section
        id="projects"
        className="min-h-screen flex items-center px-6 md:px-8 lg:px-20 lg:pl-36"
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
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-12">
            Selected Work
          </h2>

          <div className="space-y-0">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setSelectedProject(project.id)}
                className="group border-b border-neutral-200 py-6 flex items-baseline justify-between hover:pl-2 transition-all duration-300 cursor-pointer"
              >
                <div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    {project.desc}
                  </p>
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
              href="/all-work"
              className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
            >
              View all projects
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 3: Education - 教育时间线 */}
      <motion.section
        id="education"
        className="min-h-screen flex items-center px-6 md:px-8 lg:px-20 lg:pl-36"
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
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
            Education Tree
          </h2>

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

                <p className="text-xs font-mono text-neutral-400 mb-1">
                  {item.year}
                </p>

                <div className="flex items-start gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <h3 className="text-base font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-500">{item.subtitle}</p>
                    <p className="text-xs text-neutral-400">
                      {item.institution} · {item.location}
                    </p>
                  </div>
                </div>

                {item.details && (
                  <div className="pl-7 mt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.details.map((detail, i) => (
                        <span
                          key={i}
                          className="text-xs text-neutral-500 bg-neutral-100 rounded-full px-2.5 py-1"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.projects && (
                  <div className="pl-7 mt-2">
                    <p className="text-[10px] tracking-[0.15em] text-neutral-400 mb-1">
                      PROJECTS
                    </p>
                    <div className="space-y-0.5">
                      {item.projects.map((project, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1 text-sm text-neutral-600"
                        >
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

      {/* Section 4: Skills - 技能 */}
      <motion.section
        id="skills"
        className="min-h-screen flex items-center px-6 md:px-8 lg:px-20 lg:pl-36"
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
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
            Skills & Tools
          </h2>

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
                  <h3 className="text-lg font-bold tracking-tight">
                    {category.title}
                  </h3>
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
                      <span className="text-neutral-400 text-base mr-1">#</span>
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 5: Contact - 一起工作吧 */}
      <motion.section
        id="contact"
        className="min-h-screen flex items-center px-6 md:px-8 lg:px-20 lg:pl-36 py-16 md:py-0"
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
            <p className="text-[10px] tracking-[0.3em] text-neutral-400 mb-5 md:mb-6">
              GET IN TOUCH
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Let&apos;s work
              <br />
              together.
            </h2>
            <p className="text-neutral-500 mb-6 md:mb-8 max-w-md text-sm leading-relaxed">
              Have a project in mind? Looking for a Product Manager with strong
              analytical skills and AI expertise? Let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:Sherryxuex@gmail.com"
                className="inline-block px-6 py-3 bg-black text-white text-sm tracking-wider hover:bg-neutral-800 transition-colors text-center"
              >
                SEND EMAIL
              </a>
              <a
                href="https://ch.linkedin.com/in/chenxuebranny"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-colors text-center"
              >
                LINKEDIN
              </a>
            </div>
          </motion.div>

          {/* SVG 插画:手机端上方居中,桌面端右侧 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 flex justify-center md:justify-start items-center"
          >
            <img
              src="/thinking-person.svg"
              alt="Thinking person illustration"
              className="w-[180px] md:w-[260px] opacity-80"
            />
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
              initial={
                typeof window !== "undefined" && window.innerWidth < 768
                  ? { y: "100%" }
                  : { x: "100%" }
              }
              animate={
                typeof window !== "undefined" && window.innerWidth < 768
                  ? { y: 0 }
                  : { x: 0 }
              }
              exit={
                typeof window !== "undefined" && window.innerWidth < 768
                  ? { y: "100%" }
                  : { x: "100%" }
              }
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="fixed right-0 bottom-0 md:top-0 h-[85vh] md:h-full w-full md:w-1/2 bg-white shadow-2xl overflow-y-auto z-[60] rounded-t-3xl md:rounded-none"
            >
              <button
                onClick={() => {
                  setSelectedExp(null);
                  setHoveredIndex(null);
                }}
                className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-all hover:scale-110 hover:bg-neutral-200 hover:text-black"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {(() => {
                const activeExp =
                  selectedExp ||
                  (hoveredIndex !== null ? experienceData[hoveredIndex] : null);
                if (!activeExp) return null;
                return (
                  <div className="px-6 md:px-6 pb-8 pt-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center">
                        <span className="text-lg font-bold text-neutral-800">
                          {activeExp.year.slice(2)}
                        </span>
                      </div>
                      <div>
                        <h1 className="text-xl font-bold">
                          {activeExp.details.title}
                        </h1>
                        <p className="text-sm text-neutral-500">
                          {activeExp.details.subtitle}
                        </p>
                        <p className="text-xs text-neutral-400 mt-1">
                          {activeExp.period}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-sm leading-relaxed text-neutral-600">
                        {activeExp.details.description}
                      </p>

                      <div className="rounded-xl border border-green-200 bg-green-50/80 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">✨</span>
                          <span className="text-sm font-bold text-green-800">
                            Key Achievements
                          </span>
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
                          <span
                            key={i}
                            className="text-xs text-neutral-500 border border-neutral-200 rounded-full px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <h2 className="text-sm font-bold mb-3 text-neutral-800">
                          Project Preview
                        </h2>
                        {(() => {
                          const projectPreview =
                            projectPreviewMap[activeExp.year];
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
                                  <h3 className="text-sm font-bold text-neutral-900">
                                    {projectPreview.title}
                                  </h3>
                                  <p className="text-xs text-neutral-500 mt-1">
                                    View the related project details
                                  </p>
                                </div>
                                <Link
                                  href={projectPreview.href}
                                  className="shrink-0 inline-flex items-center gap-2 text-sm font-medium text-black hover:gap-3 transition-all"
                                >
                                  Case Study
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

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (() => {
          const project = fullProjectData.find(p => p.id === selectedProject);
          if (!project) return null;
          
          return (
            <DetailModal
              item={project}
              onClose={() => setSelectedProject(null)}
              onNavigate={(nextItem) => setSelectedProject(nextItem.id)}
            />
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
