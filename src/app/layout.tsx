import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { FlaxProvider } from "@/context/FlaxContext";
import PageLoader from "@/components/PageLoader";
import { COMPANY } from "@/data/initialData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://egynileflax.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF8F5",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: "Egy Nile Flax™ | ISO 9001:2015 Certified Egyptian Flax Fibre Factory",
  description:
    "Egyptian processor of Scutched Flax (Grade A & B), Flax Arrous, Hackled Flax, Flax Dolls, and Sliver since 2008 in Tanta, Egypt.",
  keywords: [
    "Egyptian flax fiber",
    "scutched flax",
    "flax arrous",
    "hackled flax",
    "flax dolls",
    "jokia flax",
    "flax sliver",
    "Egy Nile Flax",
    "Tanta flax factory",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/Logo.webp",
    shortcut: "/Logo.webp",
    apple: "/Logo.webp",
  },
  openGraph: {
    title: "Egy Nile Flax™ | Egyptian Flax Fibre Factory",
    description:
      "ISO 9001:2015 certified processor of Scutched Flax, Flax Arrous, Hackled Flax, Flax Dolls, and Sliver since 2008 in Tanta, Egypt.",
    type: "website",
    siteName: "Egy Nile Flax™",
    images: [
      {
        url: "/Scutched flax.webp",
        alt: "Egy Nile Flax — Tanta Flax Fibre Processing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egy Nile Flax™ | Egyptian Flax Fibre Factory",
    description:
      "ISO 9001:2015 certified Egyptian flax fibre processor since 2008 in Tanta, Egypt.",
    images: ["/Scutched flax.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.brandName,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/Logo.webp`,
    foundingDate: String(COMPANY.foundedYear),
    email: COMPANY.primaryEmail,
    telephone: COMPANY.egyptPhone1.replace(/\s+/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tanta",
      addressRegion: "Gharbia",
      addressCountry: "EG",
    },
    sameAs: [
      `https://www.facebook.com/${COMPANY.facebookId}`,
      `https://www.instagram.com/${COMPANY.instagramId}`,
      `https://www.linkedin.com/company/${COMPANY.linkedinId}`,
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="antialiased selection:bg-[#EDC271] selection:text-[#260C42]"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NR56H5ML"
          strategy="afterInteractive"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
        </Script>
        <PageLoader />
        <FlaxProvider>{children}</FlaxProvider>
      </body>
    </html>
  );
}
