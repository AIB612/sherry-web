import { portfolioItems } from "lib/portfolio-data";
import { trackRecordCases } from "lib/track-record-data";

export type UnifiedWorkItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  year: string;
  company: string;
  location: string;
  image?: string;
  link?: string;
  featured?: boolean;
};

const normalizedPortfolioItems: UnifiedWorkItem[] = portfolioItems.map((item) => ({
  id: item.id,
  title: item.title,
  subtitle: item.subtitle,
  description: item.description,
  category: item.category,
  tags: item.tags,
  year: item.year,
  company: item.company,
  location: item.location,
  image: item.image,
  link: item.link,
  featured: item.featured,
}));

const normalizedTrackRecordCases: UnifiedWorkItem[] = trackRecordCases.map((item) => ({
  id: item.id,
  title: item.title,
  subtitle: item.subtitle,
  description: item.highlight.replace(/<[^>]+>/g, "") || item.context,
  category: item.category,
  tags: item.tags,
  year: item.year,
  company: item.role,
  location: item.location,
  image: item.image,
}));

const workMap = new Map<string, UnifiedWorkItem>();

for (const item of normalizedPortfolioItems) {
  workMap.set(item.id, item);
}

for (const item of normalizedTrackRecordCases) {
  workMap.set(item.id, item);
}

export const unifiedWorkItems: UnifiedWorkItem[] = Array.from(workMap.values());

export function getUnifiedWorkItem(id: string) {
  return workMap.get(id);
}
