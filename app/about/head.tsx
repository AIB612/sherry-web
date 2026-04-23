import { baseUrl } from "lib/utils";

const pageUrl = `${baseUrl}/about`;
const imageUrl = `${baseUrl}/social-share-cover.jpg`;
const description =
  "Meet Chenxue Branny — an AI & IT expert helping organizations unlock growth through product strategy, digital transformation, UX leadership, and business-focused technology execution.";
const descriptionDe =
  "Lernen Sie Chenxue Branny kennen — eine KI- und IT-Expertin, die Unternehmen mit Produktstrategie, digitaler Transformation, UX-Führung und geschäftsorientierter Technologieumsetzung beim Wachstum unterstützt.";

export default function Head() {
  return (
    <>
      <title>About | Chenxue Branny</title>
      <meta name="description" content={description} />
      <meta name="description:de" content={descriptionDe} />
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="en-US" href={pageUrl} />
      <link rel="alternate" hrefLang="de-CH" href={pageUrl} />
      <link rel="alternate" hrefLang="de-DE" href={pageUrl} />
      <meta property="og:title" content="About | Chenxue Branny" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="de_CH" />
      <meta property="og:locale:alternate" content="de_DE" />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About | Chenxue Branny" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
