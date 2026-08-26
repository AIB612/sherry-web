import type { Metadata } from "next";
import { baseUrl } from "lib/utils";
import {
  categories,
  getCategoryAndSub,
  getAllMethodologyPaths,
} from "lib/methodology-data";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  return getAllMethodologyPaths();
}

export async function generateMetadata(props: {
  params: Promise<{ categoryId: string; subId: string }>;
}): Promise<Metadata> {
  const { categoryId, subId } = await props.params;
  const result = getCategoryAndSub(categoryId, subId);

  if (!result) {
    return {
      title: "My Methodology | Chenxue Branny",
    };
  }

  const { category, sub } = result;
  const title = `${sub.title} - ${category.title} | Chenxue Branny`;
  const description = sub.description;
  const url = `${baseUrl}/my-methodology/${categoryId}/${subId}`;
  const ogImage = sub.image?.src || `${baseUrl}/social-share-cover.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: sub.title,
        },
      ],
      siteName: "Chenxue Branny",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function MethodologySubPage(props: {
  params: Promise<{ categoryId: string; subId: string }>;
}) {
  const { categoryId, subId } = await props.params;
  const result = getCategoryAndSub(categoryId, subId);

  if (!result) {
    redirect("/my-methodology");
  }

  // Redirect to main page with hash anchor for the sub item
  redirect(`/my-methodology#${subId}`);
}
