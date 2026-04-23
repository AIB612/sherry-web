import type { Metadata } from "next";
import HomePageClient from "components/home-page-client";
import { baseUrl } from "lib/utils";

const title = "Chenxue Branny | AI & IT Expert in Switzerland";
const description =
  "Chenxue Branny is an AI & IT expert in Switzerland helping businesses grow through digital transformation, AI automation, RAG systems, Azure workflows, and customer-focused product strategy.";
const descriptionDe =
  "Chenxue Branny ist eine KI- und IT-Expertin in der Schweiz und unterstützt Unternehmen mit digitaler Transformation, KI-Automatisierung, RAG-Systemen, Azure-Workflows und kundenzentrierter Produktstrategie beim Wachstum.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "de-CH": "/",
      "de-DE": "/",
    },
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: baseUrl,
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

export default function HomePage() {
  return <HomePageClient />;
}
