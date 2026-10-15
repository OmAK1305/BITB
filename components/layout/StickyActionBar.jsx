"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function StickyActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-2xl transition-transform duration-300"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        <a
          href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1A4684] text-xs font-bold transition-colors"
        >
          <span className="text-base">📞</span>
          <span>Call Now</span>
        </a>

        <a
          href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
        >
          <span className="text-base">💬</span>
          <span>WhatsApp</span>
        </a>

        <Link
          href="/contact#appointment-form"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#1A4684] hover:bg-[#123363] text-white text-xs font-bold transition-colors shadow-sm"
        >
          <span className="text-base">📅</span>
          <span>Enquire</span>
        </Link>
      </div>
    </aside>
  );
}
