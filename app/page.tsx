import type { Metadata } from "next";
import { baseUrl } from "lib/utils";
import AboutPage from "components/about-page";

const title =
  "Chenxue Branny | Digitalization, AI & Process Automation in Switzerland";
const description =
  "Chenxue Branny is based in Switzerland and helps Swiss SMEs and service businesses improve workflows, reduce manual work, and grow through digitalization, AI automation, Azure systems, and practical process design.";

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
};

export default function HomePage() {
  return <AboutPage />;
}
