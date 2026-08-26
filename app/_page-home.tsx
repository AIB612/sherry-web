import type { Metadata } from "next";
import HomePageClient from "components/home-page-client";
import { baseUrl } from "lib/utils";

const title =
  "Chenxue Branny | Digitalization, AI & Process Automation in Switzerland";
const description =
  "Chenxue Branny is based in Switzerland and helps Swiss SMEs and service businesses improve workflows, reduce manual work, and grow through digitalization, AI automation, Azure systems, and practical process design. Available for local projects in Switzerland and selected work across Europe and the US.";
const descriptionDe =
  "Chenxue Branny ist in der Schweiz tätig und unterstützt Schweizer KMU und Dienstleistungsunternehmen dabei, Abläufe zu verbessern, manuelle Arbeit zu reduzieren und durch Digitalisierung, KI-Automatisierung, Azure-Systeme und praxisnahe Prozessgestaltung zu wachsen. Verfügbar für lokale Projekte in der Schweiz sowie ausgewählte Projekte in Europa und den USA.";

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
