"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import TourCard from "./TourCard";
import type { Tour } from "@/types";
import { ChevronUp, ChevronDown } from "lucide-react";

interface TourCardListProps {
  tours: Tour[];
}

export default function TourCardList({ tours }: TourCardListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Number of visible cards based on screen size
  const visibleCards = isMobile ? 1 : 3;
  const totalSlides = Math.max(0, tours.length - visibleCards + 1);

  // Slide to specific index with animation from top
  const slideTo = useCallback(
    (index: number, direction: "up" | "down" = "down") => {
      if (!sliderRef.current) return;

      const newIndex = Math.max(0, Math.min(index, totalSlides - 1));
      const cardHeight = isMobile ? 100 : 88; // Approximate card height + gap
      const targetY = -newIndex * cardHeight;

      // Animate cards
      gsap.to(sliderRef.current, {
        y: targetY,
        duration: 0.6,
        ease: "power2.out",
      });

      // Animate individual cards for stagger effect
      const cards = sliderRef.current.querySelectorAll(".tour-card-wrapper");
      cards.forEach((card, i) => {
        if (i >= newIndex && i < newIndex + visibleCards) {
          gsap.fromTo(
            card,
            {
              opacity: 0.5,
              y: direction === "down" ? -20 : 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: (i - newIndex) * 0.1,
              ease: "power2.out",
            }
          );
        }
      });

      setCurrentIndex(newIndex);
    },
    [totalSlides, visibleCards, isMobile]
  );

  // Go to next slide
  const nextSlide = useCallback(() => {
    const nextIndex = currentIndex >= totalSlides - 1 ? 0 : currentIndex + 1;
    slideTo(nextIndex, "down");
  }, [currentIndex, totalSlides, slideTo]);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    const prevIndex = currentIndex <= 0 ? totalSlides - 1 : currentIndex - 1;
    slideTo(prevIndex, "up");
  }, [currentIndex, totalSlides, slideTo]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && tours.length > visibleCards) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide, tours.length, visibleCards]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diff = touchStartY.current - touchEndY.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe up - go to next
        nextSlide();
      } else {
        // Swipe down - go to previous
        prevSlide();
      }
    }

    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Mouse enter/leave for autoplay control
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Initial entrance animation
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".tour-card-wrapper");

      gsap.from(cards, {
        y: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-dark">Hot Tours</h3>
        {/* Navigation arrows - visible on desktop */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary-dark transition-colors"
            aria-label="Previous tour"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary-dark transition-colors"
            aria-label="Next tour"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slider container */}
      <div
        className="relative overflow-hidden"
        style={{ height: isMobile ? "100px" : "280px" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={sliderRef} className="flex flex-col gap-3 sm:gap-4">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="tour-card-wrapper"
              style={{ opacity: 1 }}
            >
              <TourCard tour={tour} isActive={index >= currentIndex && index < currentIndex + visibleCards} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator for mobile */}
      <div className="flex justify-center gap-2 mt-4 sm:hidden">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => slideTo(index, index > currentIndex ? "down" : "up")}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress indicator for desktop */}
      <div className="hidden sm:flex items-center justify-center gap-1 mt-4">
        <span className="text-sm text-dark/60">
          {currentIndex + 1} / {totalSlides}
        </span>
        <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden ml-2">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
