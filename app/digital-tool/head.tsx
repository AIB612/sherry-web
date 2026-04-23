import { baseUrl } from "lib/utils";

const pageUrl = `${baseUrl}/digital-tool`;
const imageUrl = `${baseUrl}/social-share-cover.jpg`;
const description =
  "Use Chenxue Branny's digital maturity framework to identify growth gaps, prioritize transformation, and accelerate smarter decisions across strategy, technology, and operations.";
const descriptionDe =
  "Nutzen Sie das Digital-Maturity-Framework von Chenxue Branny, um Wachstumslücken zu erkennen, Transformation zu priorisieren und intelligentere Entscheidungen in Strategie, Technologie und Betrieb zu beschleunigen.";

export default function Head() {
  return (
    <>
      <title>Digital Tool | Chenxue Branny</title>
      <meta name="description" content={description} />
      <meta name="description:de" content={descriptionDe} />
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="en-US" href={pageUrl} />
      <link rel="alternate" hrefLang="de-CH" href={pageUrl} />
      <link rel="alternate" hrefLang="de-DE" href={pageUrl} />
      <meta property="og:title" content="Digital Tool | Chenxue Branny" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="de_CH" />
      <meta property="og:locale:alternate" content="de_DE" />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Digital Tool | Chenxue Branny" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
