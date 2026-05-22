import { baseUrl } from "lib/utils";

export default function Head() {
  const title = "All Work | Portfolio & Case Studies";
  const description =
    "Explore high-impact case studies by Chenxue Branny spanning AI transformation, digital product strategy, enterprise platforms, UX research, and growth-focused execution. From Swiss SMEs to international projects.";
  const ogDescription =
    "Portfolio of AI transformation, digital product strategy, and enterprise platform projects. Real-world case studies from Swiss SMEs and international clients.";
  const url = `${baseUrl}/all-work`;
  const image = `${baseUrl}/images/og/all-work.jpg`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="portfolio, case studies, AI transformation projects, digital product strategy, enterprise platforms, UX research, Swiss SME projects, international projects, product execution" />
      
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
