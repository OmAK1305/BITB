import { siteSettings } from "@/lib/data";
import AppointmentForm from "@/components/forms/AppointmentForm";

export const metadata = {
  title: "Contact Us & Book an Appointment | Karvenagar Pune",
  description:
    "Get in touch with Beauty in the Beast in Karvenagar, Pune. Call, WhatsApp, view location map, or submit an appointment enquiry.",
};

export default function ContactPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F9F1E7] to-white py-14 sm:py-20 border-b border-[#F9F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            We&apos;re Here to Help
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1A4684] font-['Nunito']">
            Contact & Appointment Booking
          </h1>
          <p className="text-base sm:text-lg text-[#55677C] max-w-2xl mx-auto leading-relaxed">
            Reach out directly or send us an appointment enquiry. We are located in Karvenagar, Pune, and love answering any questions about your pet.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact & Location Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
              <h2 className="text-2xl font-black text-[#1A4684] font-['Nunito']">
                Salon Information
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
                  <span className="text-2xl flex-shrink-0">📍</span>
                  <div>
                    <strong className="block text-[#1A4684] font-bold mb-1">Postal Address:</strong>
                    <address className="not-italic text-slate-600 leading-relaxed">
                      {siteSettings.address}
                    </address>
                    <a
                      href={siteSettings.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-2 text-xs font-bold text-[#C6742A] hover:underline"
                    >
                      Open Google Maps Pin ↗
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
                  <span className="text-2xl flex-shrink-0">📞</span>
                  <div>
                    <strong className="block text-[#1A4684] font-bold mb-1">Telephone:</strong>
                    <a
                      href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`}
                      className="text-slate-600 hover:text-[#1A4684] font-semibold"
                    >
                      {siteSettings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
                  <span className="text-2xl flex-shrink-0">💬</span>
                  <div>
                    <strong className="block text-[#1A4684] font-bold mb-1">WhatsApp Chat:</strong>
                    <a
                      href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 font-semibold hover:underline"
                    >
                      Chat with Groomers on WhatsApp ↗
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
                  <span className="text-2xl flex-shrink-0">✉️</span>
                  <div>
                    <strong className="block text-[#1A4684] font-bold mb-1">Official Email:</strong>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="text-slate-600 hover:text-[#1A4684] font-semibold"
                    >
                      {siteSettings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="text-2xl flex-shrink-0">📷</span>
                  <div>
                    <strong className="block text-[#1A4684] font-bold mb-1">Instagram:</strong>
                    <a
                      href={siteSettings.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#C6742A] font-semibold hover:underline"
                    >
                      @beauty.in.thebeast ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-[#1A4684] text-white rounded-3xl p-8 shadow-md space-y-4">
              <h3 className="text-lg font-black font-['Nunito'] text-[#F3C097]">
                Salon & Daycare Hours
              </h3>
              <ul className="space-y-2 text-xs text-slate-200">
                {siteSettings.businessHours.map((h, i) => (
                  <li key={i} className="flex justify-between pb-1 border-b border-white/10 last:border-0">
                    <span className="font-medium">{h.day}</span>
                    <span className="font-bold text-white">{h.hours}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-amber-200/90 pt-1">
                * We recommend booking 24–48 hours in advance for weekend slots.
              </p>
            </div>

            {/* Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-72 relative bg-slate-100">
              <iframe
                title="Google Maps Location"
                src="https://maps.google.com/maps?q=Beauty%20in%20the%20Beast,%20Shop%20no.%203%20%26%204,%20KBC%20Towers,%20Karvenagar,%20Pune%20411052&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </div>
  );
}
