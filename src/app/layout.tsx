import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FlaxProvider } from "@/context/FlaxContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF8F5",
};

export const metadata: Metadata = {
  title: "Egy Nile Flax™ | ISO 9001:2015 Certified Egyptian Flax Fibre Factory",
  description:
    "Egyptian processor of Scutched Flax, Hackled Flax, Slivers, Tow, Cottonised Flax, Plumbing Flax, and Natural Twines since 2008 in Tanta, Egypt.",
  icons: {
    icon: "/Logo.webp",
    shortcut: "/Logo.webp",
    apple: "/Logo.webp",
  },
  openGraph: {
    title: "Egy Nile Flax™ | Egyptian Flax Fibre Factory",
    description:
      "ISO 9001:2015 certified processor of Scutched Flax, Hackled Flax, Slivers, Tow, Cottonised Flax, Plumbing Flax, and Natural Twines since 2008 in Tanta, Egypt.",
    type: "website",
    siteName: "Egy Nile Flax™",
    images: [
      {
        url: "/IMG_9066.webp",
        alt: "Egy Nile Flax — Tanta Flax Fibre Processing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egy Nile Flax™ | Egyptian Flax Fibre Factory",
    description:
      "ISO 9001:2015 certified Egyptian flax fibre processor since 2008 in Tanta, Egypt.",
    images: ["/IMG_9066.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="antialiased selection:bg-[#EDC271] selection:text-[#260C42]"
      >
        <FlaxProvider>{children}</FlaxProvider>
      </body>
    </html>
  );
}
