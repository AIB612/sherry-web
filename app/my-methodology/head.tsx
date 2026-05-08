import { baseUrl } from "lib/utils";

export default function Head() {
  const title =
    "My Methodology | Digitalization, Product Strategy & AI Workflow Design";
  const description =
    "Explore Chenxue Branny’s methodology for digitalization, product strategy, UX research, and AI workflow design. Built for Swiss SMEs, service businesses, and cross-border teams working across Switzerland, Europe, and the US.";
  const ogDescription =
    "A practical methodology for digitalization, workflow automation, UX, and product thinking — with a local focus on Switzerland and project relevance across Europe and the US.";
  const url = `${baseUrl}/my-methodology`;
  const image = `${baseUrl}/social-share-cover.jpg`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="digitalization methodology, process automation Switzerland, Swiss SME digitalization, product strategy Switzerland, UX research consultant Switzerland, AI workflow design Europe, local business digitalization Switzerland" />
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
