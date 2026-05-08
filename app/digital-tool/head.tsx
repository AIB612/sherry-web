import { baseUrl } from "lib/utils";

export default function Head() {
  const title =
    "Digital Tool | Booking Workflow Setup, Assessment & SME Digitalization";
  const description =
    "Explore practical digital tools by Chenxue Branny for Swiss SMEs and service businesses: booking workflow setup, digitalization guidance, and assessment tools designed to reduce manual work and improve operations.";
  const ogDescription =
    "A practical digital tools hub for Swiss SMEs: booking workflow setup, digitalization guidance, and workflow assessment with a Switzerland-first business focus.";
  const url = `${baseUrl}/digital-tool`;
  const image = `${baseUrl}/social-share-cover.jpg`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="digital tool Switzerland, booking workflow setup, Swiss SME digitalization, process automation tool, service business workflow, workflow assessment Switzerland" />
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
