import Image from "next/image";
import Link from "next/link";
import { daycareProgram, salonPhotos, siteSettings } from "@/lib/data";
import AppointmentForm from "@/components/forms/AppointmentForm";

export const metadata = {
  title: "Supervised Boutique Dog Daycare in Pune",
  description:
    "Calm, small-capacity dog daycare in Karvenagar, Pune. Structured daily routine, air-conditioned play zones, quiet rest spaces, and continuous supervision.",
};

export default function DaycarePage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Daycare Banner */}
      <section className="bg-gradient-to-b from-[#F9F1E7] to-white py-14 sm:py-20 border-b border-[#F9F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            Karvenagar, Pune · Small Capacity & Calm Atmosphere
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1A4684] font-['Nunito']">
            Boutique Dog Daycare & Socialization
          </h1>
          <p className="text-base sm:text-lg text-[#55677C] max-w-2xl mx-auto leading-relaxed">
            {daycareProgram.headline} We limit our daily intake so that every dog receives genuine companionship, supervision, and peaceful rest.
          </p>
        </div>
      </section>

      {/* Routine & Schedule Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
              Daily Rhythm
            </span>
            <h2 className="text-3xl font-black text-[#1A4684] font-['Nunito']">
              A Structured, Enriching Day
            </h2>
            <p className="text-sm text-[#55677C] leading-relaxed">
              Dogs thrive on routine. Rather than chaotic all-day barking, our schedule balances active play with crucial midday quiet hours.
            </p>

            <div className="space-y-4 pt-2">
              {daycareProgram.schedule.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-[#C6742A] uppercase tracking-wider block">
                      ⏰ {item.time}
                    </span>
                    <h3 className="font-bold text-base text-[#1A4684] font-['Nunito']">
                      {item.activity}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & Protocol Card */}
          <div className="lg:col-span-5 bg-[#1A4684] text-white rounded-3xl p-8 shadow-xl space-y-6">
            <h3 className="text-xl font-black font-['Nunito'] text-[#F3C097]">
              Strict Safety & Health Protocols
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              We never compromise on the health or safety of our daycare guests:
            </p>

            <ul className="space-y-3 text-xs text-slate-200">
              {daycareProgram.safetyRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 pb-2 border-b border-white/10 last:border-0">
                  <span className="text-[#F3C097] font-bold text-sm">✓</span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs text-slate-300">
              <strong className="block text-white mb-1">First-Time Guests:</strong>
              A 30-minute free temperament introduction is required prior to your dog&apos;s first full daycare day.
            </div>

            <div className="pt-2">
              <Link
                href="#daycare-form"
                className="w-full py-3.5 rounded-full text-xs font-bold bg-[#C6742A] text-white hover:bg-[#a85f1e] transition-colors block text-center shadow-md"
              >
                Request Daycare Admission →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Photos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            Sanitized Spaces
          </span>
          <h2 className="text-3xl font-black text-[#1A4684] font-['Nunito']">
            Our Karvenagar Facility
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {salonPhotos.slice(2, 6).map((photo, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 text-white text-xs font-bold">
                {photo.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daycare Booking Form */}
      <section id="daycare-form" className="max-w-4xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <AppointmentForm preselectedService="Daycare / Day Boarding" />
      </section>
    </div>
  );
}
