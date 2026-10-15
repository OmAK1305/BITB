"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteSettings } from "@/lib/data";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Academy", href: "/academy" },
    { name: "Daycare", href: "/daycare" },
    { name: "Before & After", href: "/gallery" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-smooth">
      {/* Utility Bar */}
      <div className="bg-[#1A4684] text-[#F9F1E7] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Karvenagar, Pune · Open Mon–Sat 10 AM–7:30 PM, Sun 10 AM–5 PM
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}
              className="hover:text-[#F3C097] transition-colors flex items-center gap-1 font-semibold"
            >
              📞 Call: {siteSettings.phone}
            </a>
            <span className="opacity-40">|</span>
            <a
              href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F3C097] transition-colors flex items-center gap-1 font-semibold"
            >
              💬 WhatsApp
            </a>
            <span className="opacity-40">|</span>
            <Link
              href="/admin"
              className="hover:text-white bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded text-[11px] font-bold text-[#F3C097] transition-colors flex items-center gap-1"
            >
              🔐 Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/images/brand/Blue/Beauty%20in%20the%20Beast%20Logos%20PNG-09.png"
              alt="Beauty in the Beast"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="block text-xl font-extrabold tracking-tight text-[#1A4684] font-['Nunito'] leading-tight group-hover:text-[#24589f] transition-colors">
              Beauty in the Beast
            </span>
            <span className="block text-[11px] font-semibold tracking-wider uppercase text-[#C6742A]">
              Pet Salon · Day Care · Academy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-[#14202E] hover:text-[#1A4684] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C6742A] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Action CTA + Admin Portal Link */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact#appointment-form"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold bg-[#1A4684] text-[#F9F1E7] hover:bg-[#123363] hover:shadow-md transition-smooth"
          >
            Book Appointment
            <span className="ml-1.5 text-[#F3C097]">→</span>
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-[#1A4684] bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors shadow-xs"
            title="Salon Staff Admin Portal"
          >
            <span>🔐</span>
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          type="button"
          aria-label="Toggle Menu"
          className="lg:hidden p-2 rounded-lg text-[#1A4684] hover:bg-slate-100 transition-colors focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold text-[#14202E] hover:text-[#1A4684] py-2 border-b border-slate-100"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                href="/contact#appointment-form"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 rounded-full text-sm font-bold bg-[#1A4684] text-[#F9F1E7]"
              >
                Book Appointment
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-full text-xs font-bold bg-slate-100 text-[#1A4684] border border-slate-200"
              >
                🔐 Open Admin Portal
              </Link>
              <a
                href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-3 rounded-full text-sm font-bold border border-emerald-600 text-emerald-700 bg-emerald-50"
              >
                Chat on WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
