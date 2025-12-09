"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import type { HeroData } from "@/types";

interface HeroContentProps {
  data: HeroData;
}

export default function HeroContent({ data }: HeroContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-location", {
        y: 30,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".hero-title",
          {
            y: 80,
            opacity: 0,
            duration: 1,
          },
          "-=0.3"
        )
        .from(
          ".hero-description",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-button",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative z-10 max-w-xl">
      <span className="hero-location text-primary text-sm tracking-[0.3em] font-medium">
        {data.location}
      </span>

      <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4 leading-tight">
        {data.title}
      </h1>

      <p className="hero-description text-gray-300 mt-6 text-lg leading-relaxed">
        {data.description}
      </p>

      <button className="hero-button mt-8 bg-primary hover:bg-primary-dark text-dark font-semibold px-8 py-4 rounded-full flex items-center gap-3 transition-colors group">
        <span>Explore</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
