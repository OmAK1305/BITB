"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyActionBar from "@/components/layout/StickyActionBar";

export default function PublicSiteWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // Dedicated Admin Portal without public website header/footer/booking bar
    return <main className="min-h-screen bg-slate-50">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
