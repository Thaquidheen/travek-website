"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import type { Country } from "@/types";
import { Clock, DollarSign, Globe, Calendar } from "lucide-react";

interface CountryHeroProps {
  country: Country;
}

export default function CountryHero({ country }: CountryHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  useGSAP(
    () => {
      if (!heroRef.current || !backgroundRef.current || !contentRef.current) return;

      // Background parallax (slowest)
      gsap.to(backgroundRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content parallax (medium speed)
      gsap.to(contentRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Entrance animations
      gsap.from(".hero-title-country", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".hero-description-country", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      });

      gsap.from(".hero-info-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: "power2.out",
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* Background Image Layer */}
      <div ref={backgroundRef} className="absolute inset-0 -top-[30%] h-[130%]">
        <Image
          src={country.heroImage}
          alt={country.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Content Layer */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl">
            {/* Title */}
            <h1 className="hero-title-country text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {country.name}
            </h1>

            {/* Description */}
            <p className="hero-description-country text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
              {country.description}
            </p>

            {/* Info Card */}
            <div className="hero-info-card backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 max-w-3xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">Visa Type</div>
                    <div className="text-white font-semibold text-sm">
                      {country.visaInfo.type}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">Best Time</div>
                    <div className="text-white font-semibold text-sm">
                      {country.bestTimeToVisit}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">Currency</div>
                    <div className="text-white font-semibold text-sm">
                      {country.currency}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">Timezone</div>
                    <div className="text-white font-semibold text-sm">
                      {country.timezone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
