import type { Metadata } from "next";
import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import Footer from "components/layout/footer";
import { WelcomeToast } from "components/welcome-toast";
import { Cardo } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cardo",
});

const defaultTitle =
  "Chenxue Branny | Digitalization, AI & Process Automation for Swiss SMEs";
const defaultDescription =
  "Chenxue Branny helps Swiss SMEs, service businesses, and international teams in Switzerland turn digitalization, AI, and workflow automation into clearer operations, less manual work, and practical business growth. Based in Switzerland, available for local and cross-border projects across Europe and the US.";
const defaultDescriptionDe =
  "Chenxue Branny unterstützt Schweizer KMU, Dienstleistungsunternehmen und internationale Teams in der Schweiz dabei, Digitalisierung, KI und Prozessautomatisierung in klarere Abläufe, weniger manuelle Arbeit und praktisches Wachstum zu übersetzen. Sitz in der Schweiz, verfügbar für lokale und grenzüberschreitende Projekte in Europa und den USA.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: `%s | Chenxue Branny`,
  },
  description: defaultDescription,
  applicationName: "Chenxue Branny",
  keywords: [
    "Chenxue Branny",
    "digitalization consultant Switzerland",
    "process automation Switzerland",
    "Swiss SME digitalization",
    "workflow automation for service businesses",
    "AI automation consultant Switzerland",
    "digital transformation Switzerland",
    "business workflow automation Europe",
    "product strategy Switzerland",
    "local business digitalization Switzerland",
    "Europe",
    "United States",
  ],
  authors: [{ name: "Chenxue Branny" }],
  creator: "Chenxue Branny",
  publisher: "Chenxue Branny",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "de-CH": "/",
      "de-DE": "/",
    },
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName: "Chenxue Branny",
    locale: "en_US",
    alternateLocale: ["de_CH", "de_DE"],
    images: [
      {
        url: "/social-share-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Chenxue Branny | AI & IT Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/social-share-cover.jpg"],
  },
  other: {
    "description:de": defaultDescriptionDe,
  },
  robots: {
    follow: true,
    index: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

// Mock cart promise
const mockCart = Promise.resolve(undefined);

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={cardo.variable}>
      <body
        className="text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white"
        style={{
          fontFamily: "var(--font-cardo), serif",
          backgroundColor: "white",
        }}
      >
        <CartProvider cartPromise={mockCart}>
          <Navbar />
          <main className="mt-0 pt-0">
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
