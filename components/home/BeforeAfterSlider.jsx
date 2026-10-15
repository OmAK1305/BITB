"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  petName,
  breed,
  service,
  story,
  aspectRatio = "aspect-[4/5]"
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    if (percent < 5) percent = 5;
    if (percent > 95) percent = 95;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(prev - 5, 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(prev + 5, 95));
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300">
      {/* Visual Comparison Area */}
      <div
        ref={containerRef}
        className={`relative w-full ${aspectRatio} select-none overflow-hidden cursor-ew-resize bg-slate-100`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        tabIndex={0}
        role="slider"
        aria-label={`Before and after comparison for ${petName} the ${breed}`}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
      >
        {/* Background Image: AFTER */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt={`After grooming: ${petName || "Pet"} (${breed || "Breed"})`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={false}
            unoptimized={Boolean(afterImage?.startsWith("blob:") || afterImage?.startsWith("data:"))}
          />
          <div className="absolute top-4 right-4 z-10 bg-emerald-600/90 text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm backdrop-blur-xs">
            After
          </div>
        </div>

        {/* Foreground Image: BEFORE (clipped) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}>
            <Image
              src={beforeImage}
              alt={`Before grooming: ${petName || "Pet"} (${breed || "Breed"})`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              unoptimized={Boolean(beforeImage?.startsWith("blob:") || beforeImage?.startsWith("data:"))}
            />
            <div className="absolute top-4 left-4 z-10 bg-[#1A4684]/90 text-[#F9F1E7] text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm backdrop-blur-xs">
              Before
            </div>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#1A4684] text-[#1A4684] flex items-center justify-center shadow-lg pointer-events-auto">
            <span className="text-xs font-bold select-none">↔</span>
          </div>
        </div>

        {/* Helper Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
          Drag slider or use arrow keys
        </div>
      </div>

      {/* Metadata / Details */}
      {(petName || service) && (
        <div className="p-5 bg-white border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-bold text-lg text-[#1A4684] font-['Nunito']">
              {petName} <span className="text-xs font-normal text-slate-500">({breed})</span>
            </h4>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F9F1E7] text-[#C6742A]">
              {service}
            </span>
          </div>
          {story && <p className="text-xs text-[#55677C] leading-relaxed">{story}</p>}
        </div>
      )}
    </div>
  );
}
