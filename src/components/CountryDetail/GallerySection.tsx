"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySectionProps {
  gallery: string[];
  countryName: string;
}

export default function GallerySection({ gallery, countryName }: GallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!galleryRef.current) return;

      const items = galleryRef.current.querySelectorAll(".gallery-item");

      gsap.from(items, {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: galleryRef }
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => (prev! + 1) % gallery.length);
  const prevImage = () => setLightboxIndex((prev) => (prev! - 1 + gallery.length) % gallery.length);

  return (
    <>
      <section ref={galleryRef} className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {gallery.map((image, index) => (
              <div
                key={index}
                className="gallery-item relative h-[250px] sm:h-[300px] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image}
                  alt={`${countryName} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 p-3 rounded-full">
                    <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
            <Image
              src={gallery[lightboxIndex]}
              alt={`${countryName} - Image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {gallery.length}
          </div>
        </div>
      )}
    </>
  );
}
