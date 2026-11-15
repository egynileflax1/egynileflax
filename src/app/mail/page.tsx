import type { Metadata } from "next";
import B2BMailComposer from "@/components/B2BMailComposer";

export const metadata: Metadata = {
  title: "B2B Mail Sender | Egy Nile Flax",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MailPage() {
  return <B2BMailComposer />;
}
