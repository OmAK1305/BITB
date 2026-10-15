"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { beforeAfterGallery as defaultGallery } from "@/lib/data";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";

export default function GalleryPage() {
  const [galleryList, setGalleryList] = useState(defaultGallery);
  const [selectedBreed, setSelectedBreed] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.success && data.items && data.items.length > 0) {
          setGalleryList(data.items);
        }
      } catch (err) {
        console.error("Failed to load gallery data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  // Dynamically extract unique breeds
  const breeds = useMemo(() => {
    const breedSet = new Set(["All"]);
    galleryList.forEach((item) => {
      if (item.breed) {
        // Extract primary breed name
        const cleanBreed = item.breed.split("(")[0].trim();
        if (cleanBreed) breedSet.add(cleanBreed);
      }
    });
    return Array.from(breedSet);
  }, [galleryList]);

  const filteredGallery = useMemo(() => {
    if (selectedBreed === "All") return galleryList;
    return galleryList.filter((item) =>
      item.breed?.toLowerCase().includes(selectedBreed.toLowerCase())
    );
  }, [galleryList, selectedBreed]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F9F1E7] to-white py-14 sm:py-20 border-b border-[#F9F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C6742A]">
            Real Results · Zero Filters
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1A4684] font-['Nunito']">
            Before & After Grooming Gallery
          </h1>
          <p className="text-base sm:text-lg text-[#55677C] max-w-2xl mx-auto leading-relaxed">
            Drag the interactive slider to see how patient hand-scissoring, soothing baths, and meticulous de-matting restore every pet&apos;s comfort and beauty.
          </p>
        </div>
      </section>

      {/* Filter Chips & Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breed Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <span className="text-xs font-bold text-slate-500 mr-2">Filter by Breed:</span>
          {breeds.map((breed) => (
            <button
              key={breed}
              onClick={() => setSelectedBreed(breed)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                selectedBreed === breed
                  ? "bg-[#1A4684] text-[#F9F1E7] shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {breed}
            </button>
          ))}
        </div>

        {/* Sliders Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-3 border-[#1A4684] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs font-semibold text-slate-500">Loading transformations...</p>
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
            <div className="text-3xl mb-2">🐾</div>
            <h3 className="font-bold text-base text-slate-700">No transformations under &quot;{selectedBreed}&quot;</h3>
            <p className="text-xs text-slate-500 mt-1">Check back soon or choose another breed filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredGallery.map((item) => (
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
        )}

        {/* Consent Notice */}
        <div className="mt-14 max-w-2xl mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
          🔒 <strong>Client Privacy & Consent:</strong> All transformation photographs are published with the kind permission and consent of our pet parents.
        </div>

        {/* CTA Block */}
        <div className="mt-16 bg-[#1A4684] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 max-w-3xl mx-auto shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black font-['Nunito'] text-[#F3C097]">
            Want a Transformation for Your Dog?
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
            Whether your pet needs full breed scissoring or gentle knot removal, book an appointment with our master groomers today.
          </p>
          <div className="pt-2">
            <Link
              href="/contact#appointment-form"
              className="inline-flex items-center px-8 py-3.5 rounded-full text-xs font-bold bg-[#C6742A] text-white hover:bg-[#a85f1e] transition-colors shadow-md"
            >
              Book Transformation Appointment →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
