import Image from "next/image";
import Link from "next/link";
import { servicesList, siteSettings } from "@/lib/data";
import AppointmentForm from "@/components/forms/AppointmentForm";

export const metadata = {
  title: "Professional Dog Grooming & Spa Services",
  description:
    "Breed-specific styling, de-shedding spa baths, gentle puppy introductions, and hygiene care at Beauty in the Beast in Karvenagar, Pune.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F9F1E7] to-white py-14 sm:py-20 border-b border-[#F9F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            Karvenagar, Pune · Compassionate Care
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1A4684] font-['Nunito']">
            Our Grooming & Spa Services
          </h1>
          <p className="text-base sm:text-lg text-[#55677C] max-w-2xl mx-auto leading-relaxed">
            Every pet receives individualized handling tailored to their coat condition, skin sensitivity, and temperament. Zero sedation, zero force.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-y-12">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F9F1E7] p-2 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#1A4684]/10 text-[#1A4684]">
                      {service.badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#1A4684] font-['Nunito']">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-[#55677C] leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="bg-[#F9F1E7]/50 rounded-2xl p-5 border border-[#F3C097]/40">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A4684] mb-3">
                    What This Service Includes:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold text-sm">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-500 pt-1">
                  <strong>Recommended For: </strong>
                  {service.suitablePets}
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between h-full space-y-6 text-center">
                <div>
                  <span className="block text-xs uppercase text-slate-400 font-bold mb-1">
                    Typical Session Duration
                  </span>
                  <span className="text-2xl font-black text-[#1A4684] font-['Nunito']">
                    {service.duration}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-2">
                    * Exact time varies depending on coat knots, density, and pet cooperation.
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}#appointment-form`}
                    className="w-full py-3.5 rounded-xl text-xs font-bold bg-[#1A4684] text-white hover:bg-[#123363] transition-colors block text-center shadow-md"
                  >
                    Enquire for {service.title} →
                  </Link>
                  <a
                    href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20BITB,%20I'd%20like%20to%20enquire%20about%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors block text-center border border-emerald-200"
                  >
                    Ask on WhatsApp ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Policy Notice per BTech Specifications */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-[#F9F1E7] rounded-3xl p-8 border border-[#F3C097] space-y-3">
          <h3 className="text-lg font-black text-[#1A4684] font-['Nunito']">
            Our Pricing Philosophy: Honest & Customized
          </h3>
          <p className="text-xs text-[#55677C] leading-relaxed">
            In ethical pet grooming, fixed pricing without assessing the pet can compromise quality. A pet with a matted double coat requires two hours of gentle hand de-matting and conditioner soaks to avoid shaving, while a well-brushed single coat takes less time.
          </p>
          <p className="text-xs text-[#55677C] leading-relaxed">
            We provide a clear, fair price estimate upon initial consultation or in-person coat inspection before any service begins.
          </p>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <AppointmentForm />
      </section>
    </div>
  );
}
