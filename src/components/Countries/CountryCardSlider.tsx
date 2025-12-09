"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Country } from "@/types";

interface CountryCardSliderProps {
  countries: Country[];
}

export default function CountryCardSlider({ countries }: CountryCardSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);

  // Update items to show based on screen size
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  // Max index is the last position where we can show itemsToShow items
  // This ensures we never show empty space
  const maxIndex = Math.max(0, countries.length - itemsToShow);

  // Auto-play logic
  useEffect(() => {
    if (isPaused || countries.length <= itemsToShow) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, maxIndex, countries.length, itemsToShow]);

  // Slide animation
  useGSAP(
    () => {
      if (!sliderRef.current) return;

      const cards = sliderRef.current.querySelectorAll(".destination-card");
      if (cards.length === 0) return;

      // Calculate the percentage to translate
      // Each card takes up (100 / countries.length)% of the slider width
      const translatePercent = currentIndex * (100 / countries.length);

      gsap.to(sliderRef.current, {
        x: `-${translatePercent}%`,
        duration: 0.8,
        ease: "power2.inOut",
      });

      // Animate visible cards
      cards.forEach((card, index) => {
        const isVisible = index >= currentIndex && index < currentIndex + itemsToShow;

        if (isVisible) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: (index - currentIndex) * 0.1,
            ease: "power2.out",
          });
        }
      });
    },
    { scope: sliderRef, dependencies: [currentIndex, itemsToShow, countries.length] }
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Calculate number of dots to show (based on unique stopping positions)
  const totalDots = maxIndex + 1;

  return (
    <div className="relative px-4 sm:px-8 lg:px-12">
      {/* Slider Container */}
      <div className="overflow-hidden">
        <div
          ref={sliderRef}
          className="flex"
          style={{
            width: `${(countries.length / itemsToShow) * 100}%`,
            willChange: "transform",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {countries.map((country) => (
            <div
              key={country.id}
              style={{
                width: `calc(${100 / countries.length}% - 16px)`,
                flexShrink: 0,
              }}
              className="px-2 sm:px-3"
            >
              <a
                href={`/countries/${country.slug}`}
                className="destination-card group block h-[320px] sm:h-[380px] md:h-[420px] relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                  <div className="bg-primary/90 backdrop-blur-sm text-dark px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    {country.code}
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                  <div className="space-y-2 sm:space-y-3">
                    {/* Country Name */}
                    <h3 className="text-white font-bold text-xl sm:text-2xl md:text-3xl leading-tight group-hover:text-primary transition-colors duration-300">
                      {country.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/80 text-sm sm:text-base line-clamp-2 leading-relaxed">
                      {country.shortDescription}
                    </p>

                    {/* Best Time Badge */}
                    <div className="pt-1 sm:pt-2">
                      <span className="inline-block text-xs sm:text-sm text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-lg">
                        Best: {country.bestTimeToVisit.split(',')[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/60 rounded-2xl transition-colors duration-300 pointer-events-none" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {countries.length > itemsToShow && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 md:-translate-x-6 bg-white hover:bg-primary text-dark hover:text-white p-2.5 sm:p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 md:translate-x-6 bg-white hover:bg-primary text-dark hover:text-white p-2.5 sm:p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Progress Indicators - Show only 5 dots for better UX */}
      <div className="flex justify-center gap-2 mt-6 sm:mt-8">
        {Array.from({ length: Math.min(totalDots, 5) }).map((_, index) => {
          // Map dot index to actual slide position
          const slideIndex = totalDots <= 5
            ? index
            : Math.round((index / 4) * maxIndex);
          const isActive = totalDots <= 5
            ? currentIndex === index
            : (index === 0 && currentIndex === 0) ||
              (index === 4 && currentIndex === maxIndex) ||
              (index > 0 && index < 4 && currentIndex > 0 && currentIndex < maxIndex &&
               Math.abs(currentIndex - slideIndex) <= Math.ceil(maxIndex / 8));

          return (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(slideIndex);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 5000);
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-8 sm:w-10 bg-primary"
                  : "w-1.5 sm:w-2 bg-gray-400 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
