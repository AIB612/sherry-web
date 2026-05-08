import type { Metadata } from "next";
import Link from "next/link";
import { baseUrl } from "lib/utils";

const title = "Digitalization for Swiss SMEs | Chenxue Branny";
const description =
  "Digitalization consulting for Swiss SMEs: reduce manual work, improve workflows, and build clearer systems for growth through practical automation and process design.";
const descriptionDe =
  "Digitalisierungsberatung für Schweizer KMU: weniger manuelle Arbeit, klarere Abläufe und bessere Systeme für Wachstum durch praktische Automatisierung und Prozessgestaltung.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/digitalization-for-swiss-smes",
    languages: {
      "en-US": "/digitalization-for-swiss-smes",
      "de-CH": "/digitalization-for-swiss-smes",
      "de-DE": "/digitalization-for-swiss-smes",
    },
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${baseUrl}/digitalization-for-swiss-smes.html`,
    locale: "en_US",
    alternateLocale: ["de_CH", "de_DE"],
    images: [`${baseUrl}/social-share-cover.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${baseUrl}/social-share-cover.jpg`],
  },
  other: {
    "description:de": descriptionDe,
  },
};

const problems = [
  "Information is copied between tools by hand",
  "Follow-ups depend too much on memory",
  "Repetitive tasks take too much time",
  "Teams work hard, but processes remain unclear",
  "Growth creates more operational complexity",
];

const priorities = [
  "Client inquiry handling",
  "Quote and request workflows",
  "Internal handoffs",
  "Recurring admin work",
  "Reporting and visibility",
];

const services = [
  "Workflow review",
  "Process simplification",
  "Automation opportunities",
  "Tool connection and cleanup",
  "Practical system design for daily operations",
];

const approach = [
  "Start with real business pain points",
  "Improve one workflow at a time",
  "Keep systems simple and usable",
  "Focus on practical results",
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6 md:mb-8">
      <p className="text-[11px] tracking-[0.24em] text-neutral-400 uppercase mb-3">
        {eyebrow}
      </p>
      <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.03em] leading-tight">
        {title}
      </h2>
    </div>
  );
}

export default function DigitalizationForSwissSMEsPage() {
  return (
    <main className="bg-white text-black">
      <section className="px-5 md:px-8 lg:px-20 pt-20 md:pt-28 pb-16 md:pb-24 border-b border-neutral-200">
        <div className="max-w-5xl">
          <p className="text-[11px] tracking-[0.24em] text-neutral-400 uppercase mb-4">
            Swiss SMEs · Digital Workflows
          </p>
          <h1 className="text-[2.4rem] sm:text-[3.2rem] md:text-[4.4rem] font-bold tracking-[-0.04em] leading-[1.02] max-w-4xl mb-6 md:mb-8">
            Digitalization for Swiss SMEs
          </h1>
          <p className="text-neutral-500 text-[15px] md:text-[18px] leading-[1.8] max-w-2xl mb-8 md:mb-10">
            Reduce manual work, improve workflows, and build clearer systems for
            growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/about.html#contact"
              className="px-7 py-3.5 bg-black text-white text-[11px] tracking-[0.1em] font-medium hover:bg-neutral-800 transition-colors text-center"
            >
              BOOK A FREE 20-MINUTE WORKFLOW CHECK
            </Link>
            <Link
              href="/about.html"
              className="px-7 py-3.5 border border-neutral-200 text-[11px] tracking-[0.1em] font-medium hover:border-black hover:bg-black hover:text-white transition-all text-center"
            >
              LEARN MORE ABOUT MY APPROACH
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 lg:px-20 py-16 md:py-24 border-b border-neutral-200">
        <div className="max-w-5xl grid lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-start">
          <div>
            <SectionTitle
              eyebrow="Overview"
              title="Manual work still slows down many growing businesses"
            />
            <p className="text-neutral-600 leading-[1.9] text-[15px] md:text-[17px] max-w-2xl">
              Many Swiss SMEs still rely on manual steps in their daily
              operations. Client follow-ups, internal coordination, repetitive
              admin work, and disconnected tools often create unnecessary
              complexity.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6 md:p-8 bg-neutral-50">
            <p className="text-sm text-neutral-500 leading-[1.8]">
              Digitalization does not have to start with a large transformation
              project. In many cases, the best results come from improving a few
              important workflows first.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 lg:px-20 py-16 md:py-24 border-b border-neutral-200">
        <div className="max-w-5xl grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <SectionTitle
              eyebrow="Common Problems"
              title="Where manual work creates friction"
            />
            <ul className="space-y-4 text-neutral-600 text-[15px] md:text-[16px] leading-[1.8]">
              {problems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle
              eyebrow="Priorities"
              title="What should be digitalized first"
            />
            <ul className="space-y-4 text-neutral-600 text-[15px] md:text-[16px] leading-[1.8]">
              {priorities.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 lg:px-20 py-16 md:py-24 border-b border-neutral-200">
        <div className="max-w-5xl grid lg:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-start">
          <div>
            <SectionTitle
              eyebrow="Services"
              title="How I can help"
            />
          </div>
          <div>
            <p className="text-neutral-600 text-[15px] md:text-[17px] leading-[1.9] mb-8">
              I help Swiss SMEs turn unclear and manual processes into more
              structured, practical, and scalable workflows.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {services.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-neutral-200 px-4 py-4 text-sm text-neutral-700 bg-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 lg:px-20 py-16 md:py-24 border-b border-neutral-200">
        <div className="max-w-5xl grid lg:grid-cols-[1fr_1fr] gap-10 md:gap-14 items-start">
          <div>
            <SectionTitle
              eyebrow="Approach"
              title="A practical approach to digitalization"
            />
            <p className="text-neutral-600 text-[15px] md:text-[17px] leading-[1.9]">
              The goal is not to automate everything at once. The goal is to
              improve the workflows that create the most friction.
            </p>
          </div>
          <div className="space-y-4">
            {approach.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 border-b border-neutral-200 pb-4"
              >
                <span className="text-neutral-400 text-sm font-mono pt-0.5">
                  0{index + 1}
                </span>
                <p className="text-neutral-700 text-[15px] md:text-[16px] leading-[1.8]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 lg:px-20 py-16 md:py-24">
        <div className="max-w-4xl rounded-3xl border border-neutral-200 p-8 md:p-12 bg-neutral-50">
          <p className="text-[11px] tracking-[0.24em] text-neutral-400 uppercase mb-4">
            Next Step
          </p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.03em] leading-tight mb-5">
            Book a free 20-minute workflow check
          </h2>
          <p className="text-neutral-600 text-[15px] md:text-[17px] leading-[1.9] max-w-2xl mb-8">
            In a short conversation, we can identify where manual work is
            slowing your business down and which workflow is worth improving
            first.
          </p>
          <Link
            href="/about.html#contact"
            className="inline-flex px-7 py-3.5 bg-black text-white text-[11px] tracking-[0.1em] font-medium hover:bg-neutral-800 transition-colors"
          >
            LET&apos;S REVIEW YOUR WORKFLOW
          </Link>
        </div>
      </section>
    </main>
  );
}
