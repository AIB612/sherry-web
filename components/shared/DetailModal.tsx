"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

export function DetailModal({
  item,
  onClose,
  cases,
}: {
  item: CaseItem;
  onClose: () => void;
  cases: CaseItem[];
}) {
  const currentIndex = cases.findIndex((c) => c.id === item.id);
  const prevCase = currentIndex > 0 ? cases[currentIndex - 1] : null;
  const nextCase =
    currentIndex < cases.length - 1 ? cases[currentIndex + 1] : null;

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
          {/* Content will be added */}
          <div className="px-5 md:px-10 pt-10">
            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
            <p className="text-neutral-600">{item.subtitle}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export type { CaseItem };
