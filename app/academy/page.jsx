import Image from "next/image";
import Link from "next/link";
import { academyCurriculum, teamMembers, siteSettings } from "@/lib/data";
import AppointmentForm from "@/components/forms/AppointmentForm";

export const metadata = {
  title: "Grooming Academy & Professional Diploma Course",
  description:
    "Become a certified pet groomer in Pune. Learn directly from master trainer Mihir Sahasrabuddhe: 11 comprehensive modules, 10 theory + 25 live practical sessions over 75 days.",
};

export default function AcademyPage() {
  const mihir = teamMembers[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Academy Banner */}
      <section className="bg-gradient-to-b from-[#1A4684] to-[#123363] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#C6742A] text-white text-xs font-black uppercase tracking-wider">
                Certified Professional Diploma
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Nunito'] leading-tight">
                Beauty in the Beast <br />
                <span className="text-[#F3C097]">International Grooming Academy</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                Learn the art, science, and empathy of canine styling directly under Master Groomer{" "}
                <strong className="text-white">Mihir Sahasrabuddhe</strong>. A hands-on, career-launching curriculum based at our Karvenagar academy in Pune.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="/BitB-Intermediate-Grooming-Course.pdf"
                  target="_blank"
                  download
                  className="px-7 py-3.5 rounded-full text-sm font-bold bg-[#C6742A] text-white hover:bg-[#a85f1e] transition-smooth flex items-center gap-2 shadow-lg"
                >
                  📥 Download Official Curriculum PDF
                </a>
                <Link
                  href="#enroll"
                  className="px-7 py-3.5 rounded-full text-sm font-bold bg-white text-[#1A4684] hover:bg-slate-100 transition-smooth"
                >
                  Enquire for Next Batch →
                </Link>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="lg:col-span-4 bg-white text-[#14202E] rounded-3xl p-7 shadow-2xl border border-white/20 space-y-4">
              <h3 className="font-extrabold text-lg text-[#1A4684] font-['Nunito'] border-b border-slate-100 pb-3">
                Course Fast Facts
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Instructor:</span>
                  <span className="font-bold text-[#1A4684]">Mihir S. (Master Groomer)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Duration:</span>
                  <span className="font-bold">2 – 2.5 Months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Theory Sessions:</span>
                  <span className="font-bold text-[#C6742A]">10 In-depth Classes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Practical Sessions:</span>
                  <span className="font-bold text-emerald-700">25 Live Dog Groomings</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Attendance Requirement:</span>
                  <span className="font-bold">35 sessions over 75 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Certification:</span>
                  <span className="font-bold text-[#1A4684]">Practical Exam & Diploma</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl">
                ✓ Includes all grooming tool familiarization, live models, safety kits, and certificate upon graduation.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#F9F1E7]/50 rounded-3xl p-8 sm:p-12 border border-[#F3C097]/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="/images/team/team_photo_1.jpg"
                alt="Mihir Sahasrabuddhe on stairs with four dogs"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
                Your Mentor & Instructor
              </span>
              <h2 className="text-3xl font-black text-[#1A4684] font-['Nunito']">
                Mihir Sahasrabuddhe
              </h2>
              <p className="text-xs font-bold text-[#C6742A] uppercase tracking-wide">
                Co-Founder · Master Groomer & Certified Behavior Trainer · 10+ Years Experience
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-[#55677C] leading-relaxed">
                <p>
                  Mihir&apos;s connection with animals began as a teenage rescuer, followed by years of clinical veterinary assistance and international grooming certification.
                </p>
                <p>
                  Unlike courses that focus solely on clipping hair, Mihir trains future groomers in canine stress signals, table safety, ergonomics, and scissoring precision. Under his guidance, you will develop the patience and clinical confidence required to build a thriving pet styling business.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {mihir.specialities.map((item, i) => (
                  <span key={i} className="text-xs font-bold px-3 py-1 rounded-full bg-white text-[#1A4684] border border-slate-200">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete 11 Modules Syllabus Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            Comprehensive Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A4684] font-['Nunito']">
            All 11 Course Modules
          </h2>
          <p className="text-sm text-[#55677C]">
            A balanced synthesis of theory, animal psychology, hands-on scissor maneuvering, and salon safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {academyCurriculum.modules.map((m) => (
            <div
              key={m.moduleNumber}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#1A4684] text-[#F9F1E7] font-black font-['Nunito'] flex items-center justify-center text-sm">
                    {m.moduleNumber}
                  </span>
                  <h3 className="text-base font-bold text-[#1A4684] font-['Nunito']">
                    {m.title}
                  </h3>
                </div>
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                    m.type.includes("Practical")
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-[#F9F1E7] text-[#C6742A]"
                  }`}
                >
                  {m.type}
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                {m.topics.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C6742A] font-bold text-xs mt-0.5">•</span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certification & Attendance Criteria Policy */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-[#1A4684] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#F3C097]">
            Certification Standards
          </span>
          <h3 className="text-2xl font-black font-['Nunito']">
            Attendance & Final Practical Assessment Exam
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <p>
              Students must attend a minimum of <strong>35 sessions over a duration of 75 days</strong> to be eligible for the final examination and certification.
            </p>
            <p>
              The official Diploma Certificate is handed out <strong>AFTER</strong> the student demonstrates mastery during the live hands-on grooming evaluation and achieves satisfactory results in pet safety, tool handling, and styling.
            </p>
          </div>
          <div className="pt-2">
            <a
              href="/BitB-Intermediate-Grooming-Course.pdf"
              target="_blank"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-[#C6742A] text-white hover:bg-[#a85f1e] transition-colors"
            >
              📥 Download Complete Course Curriculum PDF (6 Pages)
            </a>
          </div>
        </div>
      </section>

      {/* Enrollment & Course Enquiry Form */}
      <section id="enroll" className="max-w-4xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            Next Batch Intake
          </span>
          <h2 className="text-3xl font-black text-[#1A4684] font-['Nunito']">
            Enquire for Course Admission
          </h2>
          <p className="text-xs text-[#55677C]">
            Seats are strictly limited per batch to ensure one-on-one table supervision. Submit your enquiry below to receive upcoming batch dates and fee details.
          </p>
        </div>
        <AppointmentForm preselectedService="Intermediate Grooming Academy (Diploma)" />
      </section>
    </div>
  );
}
