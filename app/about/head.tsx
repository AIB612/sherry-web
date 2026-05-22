import { baseUrl } from "lib/utils";

export default function Head() {
  const title =
    "About Chenxue Branny | Full-Stack IT Consultant & AI Transformation Specialist";
  const description =
    "10 years IT experience, 3 years in Switzerland. Master's degree holder specializing in digital transformation, AI automation, and product strategy for Swiss SMEs. From left-behind child to tech innovator.";
  const ogDescription =
    "Full-Stack IT Consultant with 10 years experience. Specializing in AI transformation, digital product strategy, and workflow automation for Swiss SMEs and international clients.";
  const url = `${baseUrl}/about`;
  const image = `${baseUrl}/images/og/about.jpg`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Chenxue Branny, Full-Stack IT consultant Switzerland, AI transformation specialist, digital product strategy, Swiss SME consultant, workflow automation expert, UX research, agile development, tech innovator Switzerland" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
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
