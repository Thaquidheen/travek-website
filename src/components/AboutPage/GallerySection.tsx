"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySectionProps {
  gallery: string[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Ensure gallery items are visible first
      gsap.set(".gallery-item", { opacity: 1, y: 0 });

      // Animate section label
      gsap.from(".gallery-label", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Animate title
      gsap.from(".gallery-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      });

      // Animate gallery items with random stagger
      gsap.from(".gallery-item", {
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        stagger: {
          amount: 0.8,
          from: "random",
        },
        duration: 0.6,
        ease: "power2.out",
        immediateRender: false,
      });
    },
    { scope: sectionRef }
  );

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section ref={sectionRef} className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* Label */}
            <div className="gallery-label flex items-center justify-center gap-3 mb-4">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-70"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-40"></span>
              </span>
              <span className="text-gray-600 text-sm font-medium uppercase tracking-[0.3em]">
                Our Gallery
              </span>
            </div>

            {/* Title */}
            <h2 className="gallery-title text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Capturing{" "}
              <span className="text-primary">Unforgettable Moments</span>
              <br />
              From Around The World
            </h2>
          </div>

          {/* Masonry Gallery Grid */}
          <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => {
              // Create varied heights for masonry effect
              const isLarge = index === 0 || index === 3;
              const isMedium = index === 2 || index === 5;

              return (
                <div
                  key={index}
                  className={`gallery-item group relative overflow-hidden rounded-2xl cursor-pointer ${
                    isLarge
                      ? "row-span-2 aspect-[3/4]"
                      : isMedium
                      ? "aspect-[4/3]"
                      : "aspect-square"
                  }`}
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-500 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/0 group-hover:bg-primary flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-500">
                      <svg
                        className="w-6 h-6 text-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300 z-50"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation - Previous */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300 z-50"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation - Next */}
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300 z-50"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-2xl"
              unoptimized
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {currentIndex + 1} / {gallery.length}
          </div>
        </div>
      )}
    </>
  );
}
