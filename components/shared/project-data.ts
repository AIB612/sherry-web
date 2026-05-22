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

const cases: CaseItem[] = [
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
    context:
      "A cloud-based mobility consulting platform and official website dedicated to EV (Electric Vehicle) solutions.",
    execution: {
      architecture:
        "Architected and deployed the scalable platform based on comprehensive competitor analysis and cutting-edge charging tech research; built a robust PgvectorSQL database on the cloud. Engineered an innovative, integrated EV subsidy tracker and ROI calculator.",
      compliance:
        "Architected and deployed the scalable platform based on comprehensive competitor analysis and cutting-edge charging tech research; built a robust PgvectorSQL database on the cloud. Engineered an innovative, integrated EV subsidy tracker and ROI calculator.",
      leadership:
        "Successfully launched the platform online, significantly driving targeted lead generation and accelerating overall user acquisition.",
    },
    highlight:
      "Successfully launched the platform online, significantly driving targeted <strong>lead generation</strong> and accelerating overall user acquisition.",
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
    context:
      "It was positioned for the Dutch market with a focus on category strategy, customer engagement, and conversion growth.",
    execution: {
      architecture:
        "Conceptualized a visionary e-commerce strategy by segmenting toy categories based on achieving children’s future dream jobs. Drove strategic expansion by optimizing product listings and pioneering new customer engagement models.",
      compliance:
        "Conceptualized a visionary e-commerce strategy by segmenting toy categories based on achieving children’s future dream jobs. Drove strategic expansion by optimizing product listings and pioneering new customer engagement models.",
      leadership:
        "Reactivated legacy users through targeted holiday events and data-driven email marketing, leveraging complex Dutch market data to boost user experience and increase payment conversion rates by 20%.",
    },
    highlight:
      "Reactivated legacy users through targeted holiday events and data-driven email marketing, boosting user experience and increasing <strong>payment conversion rates by 20%</strong>.",
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
    context:
      "A comprehensive logistics system integrating the Mercado E-commerce platform with the Correios last-mile service.",
    execution: {
      architecture:
        "Architected advanced data models for seamless, real-time API integrations. Designed innovative prototypes and intuitive interactions for backend systems and mobile operational software, efficiently managing cross-border agile development teams.",
      compliance:
        "Architected advanced data models for seamless, real-time API integrations. Designed innovative prototypes and intuitive interactions for backend systems and mobile operational software, efficiently managing cross-border agile development teams.",
      leadership:
        "Leveraged deep logistics status data analysis to monitor and optimize lead times from order to last-mile delivery, driving a remarkable 60% surge in overall operational efficiency.",
    },
    highlight:
      "Leveraged deep logistics status data analysis to monitor and optimize lead times from order to last-mile delivery, driving a remarkable <strong>60% surge</strong> in overall operational efficiency.",
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
    context:
      "Strategic IT product consulting for OPPO's digital product teams focusing on future product experience improvement.",
    execution: {
      architecture:
        "Orchestrated interactive workshops and synthesized quantitative and qualitative research. Formulated innovative user cases to seamlessly integrate cross-functional teams with emerging technical products like Cloud and NFC services.",
      compliance:
        "Orchestrated interactive workshops and synthesized quantitative and qualitative research. Formulated innovative user cases to seamlessly integrate cross-functional teams with emerging technical products like Cloud and NFC services.",
      leadership:
        "Delivered forward-thinking strategic guidance that elevated user engagement through optimized features, advanced NPS analysis, and dynamic KPI-tracking data dashboards.",
    },
    highlight:
      "Delivered forward-thinking strategic guidance that elevated user engagement through optimized features, advanced <strong>NPS analysis</strong>, and dynamic KPI-tracking data dashboards.",
  },
  {
    id: "lazada-ued",
    no: "05",
    title: "Lazada Seller Center",
    subtitle: "Operating Center & Seller CRM System",
    category: "E-COMMERCE & LOGISTICS",
    role: "Lead UX Designer",
    year: "Sep 2016 – Mar 2020",
    location: "China / SEA",
    tags: ["Design System", "Gamification", "CRM"],
    thumbnailBg: "from-orange-900 to-orange-950",
    image: "/images/work/Lazada.png",
    detailImage1: "/images/work/Lazada1.png",
    detailImage2: "/images/work/Lazada2.png",
    isFullWidth: false,
    previewUrl: "",
    videoUrl: "",
    teamSize: "15+",
    duration: "4 Years",
    context:
      "The primary admin and seller-facing CRM systems for the Lazada e-commerce platform.",
    execution: {
      architecture:
        "Modernized the UED design system across the platform. Conceptualized, designed, and launched a highly innovative User Growth Coins gamification system.",
      compliance:
        "Modernized the UED design system across the platform. Conceptualized, designed, and launched a highly innovative User Growth Coins gamification system.",
      leadership:
        "Successfully surged platform engagement and activity among a massive user base of 1 million sellers by an impressive 60%.",
    },
    highlight:
      "Successfully surged platform engagement and activity among a massive user base of <strong>1 million sellers</strong> by an impressive <strong>60%</strong>.",
  },
  {
    id: "jelly-erp",
    no: "06",
    title: "Jelly ERP",
    subtitle: "Private Domain Operations & Customer Growth Management System",
    category: "E-COMMERCE & LOGISTICS",
    role: "Product Designer",
    year: "Jul 2019 – Mar 2020",
    location: "Korea / China",
    tags: [
      "Private Domain Operations",
      "Enterprise WeChat",
      "Customer Segmentation",
    ],
    thumbnailBg: "from-pink-900 to-pink-950",
    image: "/images/work/Jelly Grow.png",
    detailImage1: "/images/work/Jelly ERP1.png",
    detailImage2: "/images/work/Jelly ERP2.png",
    isFullWidth: false,
    previewUrl: "",
    videoUrl: "",
    teamSize: "6",
    duration: "8 Months",
    context:
      "A private-domain customer operations system based on Enterprise WeChat and mobile app workflows.",
    execution: {
      architecture:
        "Co-pioneered a targeted growth and customer recommendation strategy with the team. Led end-to-end UI and UX design for customer management, data analysis, lifecycle operations, and collaborative workflows across app and Enterprise WeChat touchpoints.",
      compliance:
        "Co-pioneered a targeted growth and customer recommendation strategy with the team. Led end-to-end UI and UX design for customer management, data analysis, lifecycle operations, and collaborative workflows across app and Enterprise WeChat touchpoints.",
      leadership:
        "Successfully built and delivered a high-quality private-domain operations system that improved customer management efficiency, operational coordination, and experience-driven growth.",
    },
    highlight:
      "Successfully built and delivered a high-quality <strong>private-domain operations system</strong> that improved customer management efficiency, operational coordination, and experience-driven growth.",
  },
  {
    id: "tcl-smart-home",
    no: "07",
    title: "TCL Smart Home App",
    subtitle: "White Goods Management & IoT Connectivity Platform",
    category: "END-TO-END PROJECTS",
    role: "Senior Product Manager",
    year: "Mar 2020 – Sep 2022",
    location: "China",
    tags: ["IoT", "Smart Home", "Hardware-Software"],
    thumbnailBg: "from-blue-900 to-blue-950",
    image: "/images/work/TCL.png",
    detailImage1: "/images/work/TCL1.png",
    detailImage2: "/images/work/TCL2.png",
    isFullWidth: true,
    previewUrl: "",
    videoUrl: "",
    teamSize: "20+",
    duration: "2.5 Years",
    context:
      "A smart home application focusing on White Goods management and IoT connectivity.",
    execution: {
      architecture:
        "Strategized visionary feature roadmaps to elevate holistic UX. Designed innovative, seamless provisioning and pairing workflows across LAN and PAN, LPWAN, and Cellular networks tailored to highly specific user scenarios.",
      compliance:
        "Strategized visionary feature roadmaps to elevate holistic UX. Designed innovative, seamless provisioning and pairing workflows across LAN and PAN, LPWAN, and Cellular networks tailored to highly specific user scenarios.",
      leadership:
        "Leveraged dynamic product usage data to iteratively innovate interaction patterns and security protocols between digital interfaces and physical hardware, significantly improving the end-to-end user journey.",
    },
    highlight:
      "Leveraged dynamic product usage data to iteratively innovate interaction patterns and security protocols between digital interfaces and physical hardware, significantly improving the <strong>end-to-end user journey</strong>.",
  },
  {
    id: "weiyun",
    no: "08",
    title: "WeiYun Agricultural Software",
    subtitle: "Smart Farming IoT Platform",
    category: "END-TO-END PROJECTS",
    role: "Product Designer",
    year: "Jan 2018 – Jun 2019",
    location: "China",
    tags: ["IoT Sensors", "Agriculture Tech", "Real-time Data"],
    thumbnailBg: "from-lime-900 to-lime-950",
    image: "/images/work/Weiyun.png",
    detailImage1: "/images/work/weiyun1.png",
    detailImage2: "/images/work/weiyun2.png",
    isFullWidth: false,
    previewUrl: "",
    videoUrl: "",
    teamSize: "8",
    duration: "1.5 Years",
    context:
      "A smart planting control system for agricultural monitoring and remote operations.",
    execution: {
      architecture:
        "Designed and implemented a real-time data acquisition system based on multi-dimensional sensors including temperature, humidity, soil EC, and light intensity, with anomaly trigger mechanisms for second-level crop disaster alerting.",
      compliance:
        "Designed and implemented a real-time data acquisition system based on multi-dimensional sensors including temperature, humidity, soil EC, and light intensity, with anomaly trigger mechanisms for second-level crop disaster alerting.",
      leadership:
        "Led deep optimization of the mobile control interface, simplifying remote irrigation and ventilation control into one-click interactions for non-technical growers.",
    },
    highlight:
      "Enabled <strong>second-level crop disaster alerting</strong> and simplified remote irrigation and ventilation control into one-click interactions for non-technical growers.",
  },
  {
    id: "bafan",
    no: "09",
    title: "BaFan O2O",
    subtitle: "Restaurant Management System",
    category: "END-TO-END PROJECTS",
    role: "Product Manager",
    year: "2021",
    location: "China",
    tags: ["O2O", "SaaS", "Catering"],
    thumbnailBg: "from-rose-900 to-rose-950",
    image: "/images/work/BaFan.png",
    detailImage1: "/images/work/Bafan1.png",
    detailImage2: "/images/work/Bafan2.png",
    isFullWidth: false,
    previewUrl: "",
    videoUrl: "",
    teamSize: "5",
    duration: "1 Year",
    context:
      "A restaurant management and digital operations system for local catering businesses.",
    execution: {
      architecture:
        "Designed a comprehensive O2O solution covering restaurant operations, ordering workflows, and service management for catering businesses.",
      compliance:
        "Designed a comprehensive O2O solution covering restaurant operations, ordering workflows, and service management for catering businesses.",
      leadership:
        "Successfully digitized operations for more than 50 local restaurants through a streamlined restaurant management system.",
    },
    highlight:
      "Successfully digitized operations for <strong>50+ local restaurants</strong> through a streamlined restaurant management system.",
  },
  {
    id: "master-wan",
    no: "10",
    title: "Master Wan × IKEA O2O",
    subtitle: "Home Repair & Installation Platform",
    category: "END-TO-END PROJECTS",
    role: "Lead UX Designer",
    year: "Jan 2018 – Jun 2019",
    location: "China",
    tags: ["O2O", "Service Design", "IKEA"],
    thumbnailBg: "from-violet-900 to-violet-950",
    image: "/images/work/Master wan.png",
    detailImage1: "/images/work/Master wan1.png",
    detailImage2: "/images/work/Master wan2.png",
    isFullWidth: true,
    previewUrl: "",
    videoUrl: "",
    teamSize: "10",
    duration: "1.5 Years",
    context:
      "Master Wan and IKEA O2O service platforms for home repair and installation.",
    execution: {
      architecture:
        "Reimagined the UI and UX architecture. Implemented innovative service rating systems, Gold Coin reward loops, and pioneering voice-ordering strategies to modernize platform visualization.",
      compliance:
        "Reimagined the UI and UX architecture. Implemented innovative service rating systems, Gold Coin reward loops, and pioneering voice-ordering strategies to modernize platform visualization.",
      leadership:
        "Iteratively elevated platform performance and usability through in-depth user interviews and sophisticated Customer Journey Mapping, creating a seamless end-to-end experience.",
    },
    highlight:
      "Iteratively elevated platform performance and usability through in-depth user interviews and sophisticated <strong>Customer Journey Mapping</strong>, creating a seamless end-to-end experience.",
  },
];

export type { CaseItem };
export default cases;
