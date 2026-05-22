import { baseUrl } from "lib/utils";

export default function Head() {
  const title =
    "My Methodology | AI Transformation, Product Strategy & Digital Workflow Design";
  const description =
    "Comprehensive methodology for AI transformation, digital product strategy, UX research, and workflow automation. Proven frameworks for Swiss SMEs including supply chain optimization, customer analytics, and agile product development.";
  const ogDescription =
    "Practical methodology for AI transformation and digital product strategy. From supply chain analytics to customer lifecycle management — built for Swiss SMEs and European businesses.";
  const url = `${baseUrl}/my-methodology`;
  const image = `${baseUrl}/images/og/my-methodology.jpg`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="AI transformation methodology, digital product strategy, supply chain analytics, customer lifecycle management, agile product development, UX research framework, workflow automation Switzerland, Swiss SME digitalization, business model canvas, OKR framework, design thinking" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Chenxue Branny" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@Gloombubu" />
      
      {/* Canonical & Alternates */}
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="de-CH" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Chenxue Branny" />
      <meta name="language" content="English" />
    </>
  );
}
