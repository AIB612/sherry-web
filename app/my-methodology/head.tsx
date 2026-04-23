import { baseUrl } from "lib/utils";

const pageUrl = `${baseUrl}/my-methodology.html`;
const imageUrl = `${baseUrl}/social-share-cover.jpg`;
const description =
  "See the frameworks Chenxue Branny uses to turn complex business challenges into clear AI, IT, product, and digital transformation strategies that scale.";
const descriptionDe =
  "Sehen Sie die Frameworks, mit denen Chenxue Branny komplexe geschäftliche Herausforderungen in klare, skalierbare Strategien für KI, IT, Produkt und digitale Transformation übersetzt.";

export default function Head() {
  return (
    <>
      <title>My Methodology | Chenxue Branny</title>
      <meta name="description" content={description} />
      <meta name="description:de" content={descriptionDe} />
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="en-US" href={pageUrl} />
      <link rel="alternate" hrefLang="de-CH" href={pageUrl} />
      <link rel="alternate" hrefLang="de-DE" href={pageUrl} />
      <meta property="og:title" content="My Methodology | Chenxue Branny" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="de_CH" />
      <meta property="og:locale:alternate" content="de_DE" />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="My Methodology | Chenxue Branny" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
