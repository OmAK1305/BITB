import Image from "next/image";
import Link from "next/link";
import { businessStory, teamMembers, siteSettings } from "@/lib/data";

export const metadata = {
  title: "Our Story, Mission & Founder Profile",
  description:
    "Learn about Beauty in the Beast Pune, founded in 2017 by Mihir Sahasrabuddhe. Our journey, compassionate pet care mission, and experienced grooming team.",
};

export default function AboutPage() {
  const [mihir, samir] = teamMembers;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F9F1E7] to-white py-14 sm:py-20 border-b border-[#F9F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            Established 2017 · Karvenagar, Pune
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1A4684] font-['Nunito']">
            {businessStory.title}
          </h1>
          <p className="text-base sm:text-lg text-[#55677C] max-w-2xl mx-auto leading-relaxed">
            {businessStory.subtitle}
          </p>
        </div>
      </section>

      {/* Story Narration & Milestone */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6 text-sm sm:text-base text-[#14202E] leading-relaxed">
        {businessStory.content.map((paragraph, index) => (
          <p key={index} className="first-letter:text-4xl first-letter:font-black first-letter:text-[#1A4684] first-letter:float-left first-letter:mr-2">
            {paragraph}
          </p>
        ))}

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="bg-[#1A4684] text-white rounded-3xl p-7 shadow-lg space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F3C097] block">
              Our Mission
            </span>
            <h3 className="text-xl font-black font-['Nunito']">Compassionate Care</h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              {businessStory.mission}
            </p>
          </div>

          <div className="bg-[#C6742A] text-white rounded-3xl p-7 shadow-lg space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F9F1E7] block">
              Our Vision
            </span>
            <h3 className="text-xl font-black font-['Nunito']">Ecosystem for India</h3>
            <p className="text-xs text-amber-50 leading-relaxed">
              {businessStory.vision}
            </p>
          </div>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            Experienced Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A4684] font-['Nunito']">
            Meet the Groomers Behind BITB
          </h2>
        </div>

        <div className="space-y-16">
          {/* Mihir Sahasrabuddhe */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 relative aspect-[4/5] bg-slate-100">
              <Image
                src={mihir.image}
                alt="Mihir Sahasrabuddhe Co-founder Beauty in the Beast"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-4">
              <span className="text-xs font-extrabold uppercase text-[#C6742A]">
                {mihir.experience}
              </span>
              <h3 className="text-3xl font-black text-[#1A4684] font-['Nunito']">
                {mihir.name}
              </h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                {mihir.role}
              </p>
              <p className="text-xs sm:text-sm text-[#55677C] leading-relaxed">
                {mihir.bio}
              </p>
              <div className="pt-2">
                <span className="text-xs font-bold text-[#1A4684] block mb-2">Core Specialities:</span>
                <div className="flex flex-wrap gap-2">
                  {mihir.specialities.map((s, idx) => (
                    <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F9F1E7] text-[#1A4684]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Samir S. */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-4 order-2 lg:order-1">
              <span className="text-xs font-extrabold uppercase text-[#C6742A]">
                {samir.experience}
              </span>
              <h3 className="text-3xl font-black text-[#1A4684] font-['Nunito']">
                {samir.name}
              </h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                {samir.role}
              </p>
              <p className="text-xs sm:text-sm text-[#55677C] leading-relaxed">
                {samir.bio}
              </p>
              <div className="pt-2">
                <span className="text-xs font-bold text-[#1A4684] block mb-2">Core Specialities:</span>
                <div className="flex flex-wrap gap-2">
                  {samir.specialities.map((s, idx) => (
                    <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F9F1E7] text-[#1A4684]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative aspect-[4/5] bg-slate-100 order-1 lg:order-2">
              <Image
                src={samir.image}
                alt="Samir S. Senior Groomer at Beauty in the Beast"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Zero Sedation Pledge */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-[#1A4684] text-white rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#F3C097]">
            Our Safety Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-['Nunito']">
            The Zero-Sedation & Patient Handling Pledge
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto">
            We never drug, tranquilize, or force pets. If a pet feels overwhelmed, we pause, offer soothing tactile reassurance, and allow them to decompress. Every dog leaves our salon confident, happy, and calm.
          </p>
          <div className="pt-3">
            <Link
              href="/contact#appointment-form"
              className="inline-flex items-center px-8 py-3.5 rounded-full text-xs font-bold bg-[#C6742A] text-white hover:bg-[#a85f1e] transition-colors"
            >
              Book an Appointment with Our Team →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
