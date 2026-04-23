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

const defaultTitle = "Chenxue Branny | AI & IT Expert";
const defaultDescription =
  "Chenxue Branny helps ambitious companies turn AI, IT, and digital transformation into measurable business growth through sharper product strategy, scalable systems, and customer-centered execution.";
const defaultDescriptionDe =
  "Chenxue Branny unterstützt ambitionierte Unternehmen dabei, KI, IT und digitale Transformation in messbares Geschäftswachstum, klare Produktstrategien und skalierbare Systeme zu übersetzen.";

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
    "AI consultant",
    "digital transformation expert",
    "business growth",
    "product strategist",
    "UX strategist",
    "business information systems",
    "Switzerland",
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
