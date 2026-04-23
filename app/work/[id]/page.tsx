import type { Metadata } from "next";
import { baseUrl } from "lib/utils";
import { getUnifiedWorkItem, unifiedWorkItems } from "lib/work-items";
import WorkDetailClient from "./work-detail-client";

export function generateStaticParams() {
  return unifiedWorkItems.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const item = getUnifiedWorkItem(id);

  if (!item) {
    return {
      title: "Work | Chenxue Branny",
      description: "Explore selected case studies and project work by Chenxue Branny.",
      alternates: {
        canonical: `${baseUrl}/work`,
        languages: {
          "en-US": `${baseUrl}/work`,
          "de-CH": `${baseUrl}/work`,
          "de-DE": `${baseUrl}/work`,
        },
      },
      openGraph: {
        type: "article",
        url: `${baseUrl}/work`,
        title: "Work | Chenxue Branny",
        description: "Explore selected case studies and project work by Chenxue Branny.",
        locale: "en_US",
        alternateLocale: ["de_CH", "de_DE"],
        images: [`${baseUrl}/social-share-cover.jpg`],
      },
      other: {
        "description:de": "Entdecken Sie ausgewählte Fallstudien und Projekte von Chenxue Branny.",
      },
    };
  }

  const pageUrl = `${baseUrl}/work/${item.id}`;
  const imageUrl = `${baseUrl}/work/${item.id}/opengraph-image`;
  const description = `${item.title} — ${item.subtitle}. ${item.description}`;
  const descriptionDe = `${item.title} — ${item.subtitle}. Entdecken Sie dieses Projekt von Chenxue Branny aus den Bereichen KI, IT, digitale Transformation und Produktstrategie.`;

  return {
    title: `${item.title} | Chenxue Branny`,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": pageUrl,
        "de-CH": pageUrl,
        "de-DE": pageUrl,
      },
    },
    openGraph: {
      type: "article",
      url: pageUrl,
      title: `${item.title} | Chenxue Branny`,
      description,
      locale: "en_US",
      alternateLocale: ["de_CH", "de_DE"],
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Chenxue Branny`,
      description,
      images: [imageUrl],
    },
    other: {
      "description:de": descriptionDe,
    },
  };
}

export default function WorkDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  return <WorkDetailClient params={props.params} />;
}
