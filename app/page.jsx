import Link from "next/link";
import Image from "next/image";
import {
  siteSettings,
  businessStory,
  teamMembers,
  servicesList,
  academyCurriculum,
  daycareProgram,
  beforeAfterGallery,
  salonPhotos,
  testimonials,
  faqList,
} from "@/lib/data";
import { getGallery } from "@/lib/adminStore";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import AppointmentForm from "@/components/forms/AppointmentForm";

export default async function HomePage() {
  let displayGallery = beforeAfterGallery;
  try {
    const dynamicGallery = await getGallery();
    if (dynamicGallery && dynamicGallery.length > 0) {
      displayGallery = dynamicGallery;
    }
  } catch (e) {
    // Fallback to default
  }
  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F9F1E7]/70 via-[#F9F1E7]/40 to-white pt-12 pb-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A4684]/10 text-[#1A4684] text-xs font-extrabold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#C6742A]"></span>
                Pet Salon · Day Care · Academy · Karvenagar, Pune
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A4684] font-['Nunito'] leading-[1.12] tracking-tight">
                Grooming built <br />
                <span className="text-[#C6742A] relative">
                  around the dog.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F3C097] -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 Q50,20 100,10 Q50,0 0,10" fill="currentColor" />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#55677C] max-w-xl leading-relaxed">
                Expert grooming, patient handling, and zero stress. Founded by animal rescuer and master trainer{" "}
                <strong className="text-[#1A4684]">Mihir Sahasrabuddhe</strong>, we care for the whole pet — not just how they look.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="#book"
                  className="px-8 py-4 rounded-full text-base font-bold bg-[#1A4684] text-[#F9F1E7] hover:bg-[#123363] hover:shadow-xl transition-smooth flex items-center gap-2"
                >
                  Book Appointment
                  <span className="text-[#F3C097]">→</span>
                </Link>

                <Link
                  href="/services"
                  className="px-7 py-4 rounded-full text-base font-bold bg-white text-[#1A4684] border-2 border-[#1A4684]/20 hover:border-[#1A4684] hover:bg-slate-50 transition-smooth"
                >
                  Explore Services
                </Link>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-500 font-black">★★★★★</span>
                  <span className="font-bold text-slate-700">4.9/5 Rating</span>
                  <span>(250+ Pune pet parents)</span>
                </div>
                <div className="hidden sm:block text-slate-300">|</div>
                <div className="hidden sm:flex items-center gap-1">
                  <span className="text-[#1A4684] font-bold">✓ Zero Sedation Policy</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/images/real/bitb-home-hero.webp"
                    alt="Happy freshly groomed dog at Beauty in the Beast Pune"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#F3C097]">Real Result</p>
                    <p className="text-lg font-extrabold font-['Nunito']">Gentle grooming, calm results</p>
                  </div>
                </div>

                {/* Floating Trust Card 1 */}
                <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F9F1E7] flex items-center justify-center text-xl">
                    🐶
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-[#1A4684]">Behaviour-Led Care</span>
                    <span className="block text-[11px] text-slate-500">Patience before scissors</span>
                  </div>
                </div>

                {/* Floating Trust Card 2 */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xl">
                    🛡️
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-[#1A4684]">Sanitized Space</span>
                    <span className="block text-[11px] text-slate-500">Hospital-grade hygiene</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#1A4684] text-white rounded-3xl p-8 sm:p-10 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="space-y-1">
            <span className="block text-3xl sm:text-4xl font-black font-['Nunito'] text-[#F3C097]">
              {siteSettings.stats.yearsRunning}
            </span>
            <span className="block text-xs uppercase tracking-wider font-semibold text-slate-300">
              Years in Pune (Since 2017)
            </span>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <span className="block text-3xl sm:text-4xl font-black font-['Nunito'] text-[#F3C097]">
              {siteSettings.stats.petsGroomed}
            </span>
            <span className="block text-xs uppercase tracking-wider font-semibold text-slate-300">
              Pets Groomed with Care
            </span>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <span className="block text-3xl sm:text-4xl font-black font-['Nunito'] text-[#F3C097]">
              4.9 ★
            </span>
            <span className="block text-xs uppercase tracking-wider font-semibold text-slate-300">
              Google Customer Rating
            </span>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <span className="block text-3xl sm:text-4xl font-black font-['Nunito'] text-[#F3C097]">
              {siteSettings.stats.breedsHandled}
            </span>
            <span className="block text-xs uppercase tracking-wider font-semibold text-slate-300">
              Breeds Handled Safely
            </span>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE BEFORE & AFTER GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
              Real Transformations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A4684] font-['Nunito'] mt-1">
              See the Before & After Difference
            </h2>
            <p className="text-sm text-[#55677C] mt-2 max-w-xl">
              Drag the interactive slider below to reveal the precision and patience our master groomers put into every haircut and knot removal.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1A4684] hover:text-[#C6742A] transition-colors"
          >
            View Full Transformation Gallery ↗
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayGallery.slice(0, 4).map((item) => (
            <BeforeAfterSlider
              key={item.id}
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              petName={item.petName}
              breed={item.breed}
              service={item.service}
              story={item.story}
            />
          ))}
        </div>
      </section>

      {/* 4. SERVICES PREVIEW SECTION */}
      <section className="bg-[#F9F1E7]/50 py-16 sm:py-24 border-y border-[#F9F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
              Comprehensive Pet Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A4684] font-['Nunito']">
              Tailored Care for Every Need
            </h2>
            <p className="text-sm text-[#55677C]">
              From breed-standard scissoring to calm spa baths and a certified career academy, explore our core pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesList.slice(0, 3).map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#F9F1E7] p-2.5 flex items-center justify-center">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#1A4684]/10 text-[#1A4684]">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A4684] font-['Nunito'] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#55677C] mb-5 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    <span className="text-[11px] font-bold uppercase text-slate-400">Includes:</span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {service.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">⏳ {service.duration}</span>
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}#appointment-form`}
                    className="text-xs font-bold text-[#1A4684] hover:text-[#C6742A] flex items-center gap-1"
                  >
                    Enquire Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-[#1A4684] text-[#F9F1E7] hover:bg-[#123363] transition-colors"
            >
              View All Grooming Packages & Pricing Policy →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. MEET THE TEAM / FOUNDER STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Founder Visual */}
            <div className="lg:col-span-5 relative bg-[#F9F1E7] min-h-[380px] lg:min-h-full">
              <Image
                src="/images/team/team_photo_2.png"
                alt="Mihir Sahasrabuddhe with dogs at Beauty in the Beast"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A4684]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#F3C097]">
                  Founder & Master Groomer
                </span>
                <h3 className="text-2xl font-black font-['Nunito']">Mihir Sahasrabuddhe</h3>
                <p className="text-xs text-slate-200 mt-1">Over a decade of veterinary & grooming expertise</p>
              </div>
            </div>

            {/* Founder Story Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
                Our Philosophy & Origin
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A4684] font-['Nunito'] leading-tight">
                When you care for a pet, you care for the whole animal.
              </h2>
              <div className="space-y-3.5 text-sm text-[#55677C] leading-relaxed">
                <p>
                  Beauty in the Beast began with a simple belief: pets deserve to be treated with the same care, patience, and respect we would want for our own.
                </p>
                <p>
                  From rescuing animals as a teenager to working alongside veterinarians, and eventually becoming a professional groomer and trainer, Mihir noticed that good grooming is not just cosmetic. It is directly tied to the animal’s physical comfort, skin health, confidence, and peace of mind.
                </p>
                <p>
                  In 2017, that belief started from a small grooming kit. In 2022, it grew into our full-scale Karvenagar pet ecosystem — bringing together styling, daycare, and an international academy.
                </p>
              </div>

              {/* Senior Groomer Samir Callout */}
              <div className="p-4 rounded-2xl bg-[#F9F1E7] border border-[#F3C097]/40 flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                  <Image
                    src="/images/team/team_photo_3.png"
                    alt="Samir S. Senior Groomer at Beauty in the Beast"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-[#1A4684] block text-sm">
                    Samir S. · Senior Groomer
                  </span>
                  <span className="text-[#55677C]">
                    2+ years with BITB · Specialist in calm coat restoration, gentle handling, and puppy introductions.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1A4684] hover:text-[#C6742A] transition-colors"
                >
                  Read Our Full Story & Mission →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GROOMING ACADEMY SPOTLIGHT (11 Modules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#1A4684] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F3C097] text-xs font-bold uppercase">
                🎓 Career Diploma Course
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Nunito'] leading-tight">
                Beauty in the Beast <br />
                <span className="text-[#F3C097]">Grooming Academy</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                Learn professional dog grooming directly from Mihir Sahasrabuddhe. Our intensive Intermediate Grooming Course prepares you for a rewarding career or your own salon business.
              </p>

              {/* Course Key Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <span className="block text-2xl font-black text-[#F3C097]">10</span>
                  <span className="text-xs text-slate-300">Theory Sessions (Behavior, Tools, Safety)</span>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <span className="block text-2xl font-black text-[#F3C097]">25</span>
                  <span className="text-xs text-slate-300">Practical Live Grooming Sessions</span>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 col-span-2 sm:col-span-1">
                  <span className="block text-2xl font-black text-[#F3C097]">75 Days</span>
                  <span className="text-xs text-slate-300">Total 35 Sessions with Certification</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/academy"
                  className="px-7 py-3.5 rounded-full text-sm font-bold bg-[#C6742A] text-white hover:bg-[#a85f1e] transition-colors"
                >
                  View 11-Module Syllabus
                </Link>
                <a
                  href="/BitB-Intermediate-Grooming-Course.pdf"
                  target="_blank"
                  download
                  className="px-6 py-3.5 rounded-full text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors flex items-center gap-2"
                >
                  📥 Download Course PDF
                </a>
              </div>
            </div>

            {/* Academy Visual & Module List */}
            <div className="lg:col-span-5 bg-white text-[#14202E] rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-bold text-[#1A4684] font-['Nunito'] mb-4 flex items-center justify-between">
                <span>11 Core Modules</span>
                <span className="text-xs text-[#C6742A] font-semibold">Comprehensive Curriculum</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {academyCurriculum.modules.slice(0, 6).map((m) => (
                  <li key={m.moduleNumber} className="flex items-start gap-2.5 pb-2 border-b border-slate-100 last:border-0">
                    <span className="w-5 h-5 rounded-full bg-[#1A4684] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {m.moduleNumber}
                    </span>
                    <div>
                      <span className="font-bold text-slate-800">{m.title}</span>
                      <span className="block text-[11px] text-slate-500">({m.type})</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <Link href="/academy" className="text-xs font-bold text-[#1A4684] hover:underline">
                  + 5 more modules including First Aid & Assessment →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SALON INTERIOR SHOWCASE (14 Karvenagar Space Photos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            Inside Our Salon
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A4684] font-['Nunito']">
            A Calm, Purpose-Built Environment
          </h2>
          <p className="text-sm text-[#55677C]">
            Take a look at our hygienic styling bays, stainless steel deep wash tubs, and cozy daycare resting spaces in Karvenagar.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {salonPhotos.slice(0, 6).map((photo, i) => (
            <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <p className="font-bold text-sm font-['Nunito']">{photo.title}</p>
                <p className="text-[11px] text-slate-200">{photo.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS & REVIEWS */}
      <section className="bg-[#F9F1E7]/60 py-16 sm:py-24 border-y border-[#F9F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
              Pet Parent Love
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A4684] font-['Nunito']">
              What Pune Pet Parents Say
            </h2>
            <p className="text-sm text-[#55677C]">
              Real feedback from pet parents and academy graduates who trust Beauty in the Beast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-amber-500 text-sm mb-3">★★★★★</div>
                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <p className="font-bold text-xs text-[#1A4684]">{t.name}</p>
                  <p className="text-[11px] text-slate-500">{t.pet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            Common Questions
          </span>
          <h2 className="text-3xl font-black text-[#1A4684] font-['Nunito']">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-base text-[#1A4684] font-['Nunito'] mb-2">
                {faq.q}
              </h3>
              <p className="text-xs text-[#55677C] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. LOCATION & APPOINTMENT ENQUIRY SECTION */}
      <section id="book" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Location & Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
                Visit Us in Karvenagar
              </span>
              <h2 className="text-3xl font-black text-[#1A4684] font-['Nunito'] mt-1">
                Find Our Salon & Day Care
              </h2>
              <p className="text-xs text-[#55677C] mt-2">
                Conveniently located near K-52 in Karvenagar, easily accessible from Kothrud, Warje, and Sinhagad Road.
              </p>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div className="text-xs">
                  <strong className="block text-sm text-[#1A4684] mb-1">Full Postal Address:</strong>
                  <address className="not-italic text-slate-600 leading-relaxed">
                    {siteSettings.address}
                  </address>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <span className="text-xl">📞</span>
                <div className="text-xs">
                  <span className="text-slate-500 block">Phone Support:</span>
                  <a href={`tel:${siteSettings.phone.replace(/\s+/g, "")}`} className="font-bold text-[#1A4684] hover:underline">
                    {siteSettings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <span className="text-xl">✉️</span>
                <div className="text-xs">
                  <span className="text-slate-500 block">Official Email:</span>
                  <a href={`mailto:${siteSettings.email}`} className="font-bold text-[#1A4684] hover:underline">
                    {siteSettings.email}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={siteSettings.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center py-2.5 rounded-xl bg-[#F9F1E7] text-[#C6742A] text-xs font-bold hover:bg-[#fae7d7] transition-colors block"
                >
                  Open in Google Maps App ↗
                </a>
              </div>
            </div>

            {/* Map Embed or Visual representation */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md h-64 relative bg-slate-100">
              <iframe
                title="Beauty in the Beast Location Map"
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

          {/* Right: Appointment Enquiry Form */}
          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </div>
  );
}
