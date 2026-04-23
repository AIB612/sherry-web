import { baseUrl } from "lib/utils";

const pageUrl = `${baseUrl}/about.html`;
const imageUrl = `${baseUrl}/social-share-cover.jpg`;
const description =
  "Meet Chenxue Branny — an AI & IT expert in Switzerland helping organizations grow through digital transformation, AI automation, RAG systems, Azure workflows, UX leadership, and business-focused product strategy.";
const descriptionDe =
  "Lernen Sie Chenxue Branny kennen — eine KI- und IT-Expertin in der Schweiz, die Unternehmen mit digitaler Transformation, KI-Automatisierung, RAG-Systemen, Azure-Workflows, UX-Führung und geschäftsorientierter Produktstrategie beim Wachstum unterstützt.";

export default function Head() {
  return (
    <>
      <title>About Chenxue Branny | AI & IT Expert in Switzerland</title>
      <meta name="description" content={description} />
      <meta name="description:de" content={descriptionDe} />
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="en-US" href={pageUrl} />
      <link rel="alternate" hrefLang="de-CH" href={pageUrl} />
      <link rel="alternate" hrefLang="de-DE" href={pageUrl} />
      <meta property="og:title" content="About Chenxue Branny | AI & IT Expert in Switzerland" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="de_CH" />
      <meta property="og:locale:alternate" content="de_DE" />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About Chenxue Branny | AI & IT Expert in Switzerland" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
