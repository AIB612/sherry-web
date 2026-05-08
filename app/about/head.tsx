import { baseUrl } from "lib/utils";

export default function Head() {
  const title =
    "About Chenxue Branny | Digitalization, Product Strategy & Swiss Market Experience";
  const description =
    "Learn about Chenxue Branny’s background across Switzerland, Europe, and international product work — from digitalization and workflow design to UX strategy, e-commerce, and AI-supported business systems.";
  const ogDescription =
    "A cross-market background in Switzerland, product strategy, digital transformation, UX, and business systems — with local relevance for Swiss SMEs and service businesses.";
  const url = `${baseUrl}/about`;
  const image = `${baseUrl}/social-share-cover.jpg`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="about Chenxue Branny, Switzerland digitalization consultant, Swiss SME consultant, product strategy Switzerland, UX strategy Europe, workflow automation consultant Switzerland" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en-US" href={url} />
      <link rel="alternate" hrefLang="de-CH" href={url} />
      <link rel="alternate" hrefLang="de-DE" href={url} />
    </>
  );
}
