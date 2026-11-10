import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FlaxProvider } from "@/context/FlaxContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#14231A",
};

export const metadata: Metadata = {
  title: "EgyNile Flax™ | ISO 9001:2015 Certified Egyptian Flax Fibre Exporter",
  description:
    "Processor and international exporter of premium Egyptian Scutched Flax, Hackled Flax, Slivers, Tow, Cottonised Flax, Plumbing Flax, and Natural Twines since 2008.",
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
        className="antialiased selection:bg-amber-300 selection:text-stone-950"
      >
        <FlaxProvider>{children}</FlaxProvider>
      </body>
    </html>
  );
}
