import Link from "next/link";
import Image from "next/image";
import { siteSettings } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#1A4684] text-[#F9F1E7] pt-16 pb-12 border-t-4 border-[#C6742A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-xl p-1 flex-shrink-0">
                <Image
                  src="/images/brand/Blue/Beauty%20in%20the%20Beast%20Logos%20PNG-09.png"
                  alt="Beauty in the Beast Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="block text-xl font-black font-['Nunito'] text-white">
                  Beauty in the Beast
                </span>
                <span className="block text-xs font-semibold text-[#F3C097]">
                  Pet Salon · Day Care · Academy
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Founded in 2017 by Mihir Sahasrabuddhe. Compassionate, behavior-led pet care where every pet is treated with patience, respect, and clinical expertise.
            </p>
            <div className="pt-2">
              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
              >
                <span>📷 Follow on Instagram</span>
                <span className="text-[#F3C097]">↗</span>
              </a>
            </div>
          </div>

          {/* Column 2: Services & Academy */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F3C097] mb-4 font-['Nunito']">
              Services & Academy
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/services#full-grooming" className="hover:text-white transition-colors">
                  Breed-Specific Styling & Grooming
                </Link>
              </li>
              <li>
                <Link href="/services#bath-blowdry" className="hover:text-white transition-colors">
                  De-Shedding & Spa Baths
                </Link>
              </li>
              <li>
                <Link href="/services#puppy-intro" className="hover:text-white transition-colors">
                  Gentle Puppy Desensitization
                </Link>
              </li>
              <li>
                <Link href="/daycare" className="hover:text-white transition-colors">
                  Supervised Daycare & Rest Zones
                </Link>
              </li>
              <li>
                <Link href="/academy" className="hover:text-white transition-colors">
                  Intermediate Grooming Diploma (11 Modules)
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Before & After Transformations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Timings */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F3C097] mb-4 font-['Nunito']">
              Opening Hours & Contact
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 mb-4">
              <li className="flex justify-between border-b border-white/10 pb-1">
                <span>Mon – Sat:</span>
                <span className="font-semibold text-white">10:00 AM – 7:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-1">
                <span>Sunday:</span>
                <span className="font-semibold text-white">10:00 AM – 5:00 PM</span>
              </li>
              <li className="text-[11px] text-amber-200/80 pt-1">
                * Prior appointment recommended for full styling.
              </li>
            </ul>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p>
                <span className="text-slate-400">Phone: </span>
                <a href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`} className="hover:text-white font-semibold">
                  {siteSettings.phone}
                </a>
              </p>
              <p>
                <span className="text-slate-400">Email: </span>
                <a href={`mailto:${siteSettings.email}`} className="hover:text-white font-semibold">
                  {siteSettings.email}
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Salon Location (NAP) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F3C097] mb-4 font-['Nunito']">
              Karvenagar Salon
            </h3>
            <address className="not-italic text-xs text-slate-300 leading-relaxed mb-4">
              {siteSettings.address}
            </address>
            <div className="space-y-2">
              <a
                href={siteSettings.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F3C097] hover:underline"
              >
                📍 Open in Google Maps ↗
              </a>
              <div className="text-[11px] text-slate-400">
                Serving: Karvenagar, Kothrud, Warje, Erandwane, Deccan & nearby Pune areas.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Beauty in the Beast Pet Salon & Day Care. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white">Founder Story</Link>
            <span>·</span>
            <Link href="/academy" className="hover:text-white">Academy Curriculum</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white">Book Appointment</Link>
            <span>·</span>
            <Link href="/admin" className="text-[#F3C097] hover:text-white font-bold flex items-center gap-1">🔐 Admin Portal</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
