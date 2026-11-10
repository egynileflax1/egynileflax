"use client";

import React from "react";
import { useFlax } from "@/context/FlaxContext";
import Navbar from "@/components/Navbar";
import ShowcaseView from "@/components/ShowcaseView";
import ClientPortalView from "@/components/ClientPortalView";
import AdminPanelView from "@/components/AdminPanelView";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { activeView } = useFlax();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {activeView === "showcase" && <ShowcaseView />}
        {activeView === "portal" && <ClientPortalView />}
        {activeView === "admin" && <AdminPanelView />}
      </main>
      <Footer />
    </div>
  );
}

