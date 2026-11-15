import type { Metadata } from "next";
import AdminCrmDashboard from "@/components/AdminCrmDashboard";

export const metadata: Metadata = {
  title: "Admin CRM | Egy Nile Flax",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminCrmDashboard />;
}
