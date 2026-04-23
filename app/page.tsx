import type { Metadata } from "next";
import HomePageClient from "components/home-page-client";
import { baseUrl } from "lib/utils";

const title = "Chenxue Branny | AI & IT Expert";
const description =
  "AI, IT, and digital transformation strategies that help businesses grow faster, build smarter systems, and create better customer experiences — led by Chenxue Branny.";
const descriptionDe =
  "Chenxue Branny entwickelt KI-, IT- und Digitalstrategien, die Unternehmen helfen, schneller zu wachsen, smartere Systeme aufzubauen und bessere Kundenerlebnisse zu schaffen.";

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
