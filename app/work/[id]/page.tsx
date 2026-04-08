import { portfolioItems } from 'lib/portfolio-data';
import WorkDetailClient from './work-detail-client';

export function generateStaticParams() {
  return portfolioItems.map((item) => ({
    id: item.id,
  }));
}

export default function WorkDetailPage(props: { params: Promise<{ id: string }> }) {
  return <WorkDetailClient params={props.params} />;
}

