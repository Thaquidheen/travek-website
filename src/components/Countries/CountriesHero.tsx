"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";
import type { Country } from "@/types";

const GlobeScene = dynamic(() => import("@/components/Globe").then(mod => mod.GlobeScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-white/60 text-lg">Loading Globe...</div>
    </div>
  ),
});

interface CountriesHeroProps {
  countries: Country[];
}

export default function CountriesHero({ countries }: CountriesHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .from(
          ".hero-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-stats",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] overflow-hidden bg-gradient-to-b from-dark to-dark-light"
    >
      {/* 3D Globe Background */}
      <div className="absolute inset-0 z-0">
        <GlobeScene countries={countries} />
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-dark/80 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center">
          {/* Glassmorphism Container */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl">
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Explore the World
            </h1>

            <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              Discover amazing destinations across the globe. From vibrant cities to serene landscapes,
              your next adventure awaits.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
              <div className="hero-stats backdrop-blur-md bg-white/10 rounded-xl p-4">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {countries.length}+
                </div>
                <div className="text-white/70 text-sm">Countries</div>
              </div>

              <div className="hero-stats backdrop-blur-md bg-white/10 rounded-xl p-4">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">100+</div>
                <div className="text-white/70 text-sm">Destinations</div>
              </div>

              <div className="hero-stats backdrop-blur-md bg-white/10 rounded-xl p-4 col-span-2 md:col-span-1">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">24/7</div>
                <div className="text-white/70 text-sm">Support</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="text-sm">Scroll to explore</span>
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
        </div>
      </div>
    </section>
  );
}
