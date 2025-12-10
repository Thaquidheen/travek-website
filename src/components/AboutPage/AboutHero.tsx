"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

interface HeroData {
  label: string;
  title: string;
  subtitle: string;
  description: string;
}

interface AboutHeroProps {
  hero: HeroData;
  stats: Stat[];
}

function StatCounter({ stat, shouldAnimate }: { stat: Stat; shouldAnimate: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: stat.value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        setDisplayValue(Math.floor(obj.val));
      },
    });
  }, [shouldAnimate, stat.value]);

  return (
    <div ref={counterRef} className="about-hero-stat text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
        {displayValue}
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
        {stat.label}
      </div>
    </div>
  );
}

export default function AboutHero({ hero, stats }: AboutHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".about-hero-label", {
        y: 30,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".about-hero-title",
          {
            y: 80,
            opacity: 0,
            duration: 1,
          },
          "-=0.3"
        )
        .from(
          ".about-hero-subtitle",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".about-hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".about-hero-image",
          {
            scale: 0.9,
            opacity: 0,
            duration: 1,
          },
          "-=0.6"
        )
        .add(() => {
          setShouldAnimateStats(true);
        }, "-=0.5")
        .from(
          ".about-hero-stat",
          {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
          },
          "-=0.5"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-dark overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />

      <div className="relative container mx-auto px-4 sm:px-8 lg:px-16 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Label */}
            <div className="about-hero-label flex items-center gap-3">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-70"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-40"></span>
              </span>
              <span className="text-primary text-sm font-medium uppercase tracking-[0.3em]">
                {hero.label}
              </span>
            </div>

            {/* Title */}
            <h1 className="about-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {hero.title.split(" ").slice(0, 3).join(" ")}
              <br />
              <span className="text-primary">
                {hero.title.split(" ").slice(3).join(" ")}
              </span>
            </h1>

            {/* Subtitle */}
            <h2 className="about-hero-subtitle text-xl md:text-2xl text-gray-300 font-medium">
              {hero.subtitle}
            </h2>

            {/* Description */}
            <p className="about-hero-description text-gray-400 text-lg leading-relaxed max-w-xl">
              {hero.description}
            </p>
          </div>

          {/* Right Image */}
          <div className="about-hero-image relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
                alt="Travel Adventure"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-dark-light/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10">
              <div className="text-3xl font-bold text-primary mb-1">
                {stats[0]?.value || 220}+
              </div>
              <div className="text-gray-400 text-sm">
                {stats[0]?.label || "Projects Done"}
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-full" />
            <div className="absolute -top-8 -right-8 w-32 h-32 border border-primary/20 rounded-full" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCounter
                key={stat.id}
                stat={stat}
                shouldAnimate={shouldAnimateStats}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
