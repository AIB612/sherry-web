import { baseUrl } from "lib/utils";

export default function Head() {
  const title =
    "Digital Maturity Assessment Tool | Free SME Digital Transformation Assessment";
  const description =
    "Free digital maturity assessment tool for Swiss SMEs. Evaluate your company's digital transformation readiness across strategy, technology, processes, and culture. Get instant insights and actionable recommendations.";
  const ogDescription =
    "Assess your company's digital maturity in 5 minutes. Free tool for Swiss SMEs to evaluate digital transformation readiness and get personalized recommendations.";
  const url = `${baseUrl}/digital-tool`;
  const image = `${baseUrl}/images/og/digital-tool-assessment.jpg`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="digital maturity assessment, digital transformation tool Switzerland, SME digitalization assessment, digital readiness test, business digital assessment, Swiss SME digital tool, digital transformation readiness, digital maturity framework" />
      
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
