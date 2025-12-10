"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface MissionData {
  label: string;
  title: string;
  description: string;
  image: string;
}

interface VisionData {
  label: string;
  title: string;
  description: string;
  image: string;
}

interface MissionSectionProps {
  mission: MissionData;
  vision: VisionData;
}

export default function MissionSection({ mission, vision }: MissionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Ensure elements are visible first
      gsap.set(".mission-image, .mission-content, .vision-image, .vision-content", {
        opacity: 1, x: 0
      });

      // Mission Image parallax
      gsap.from(".mission-image", {
        scrollTrigger: {
          trigger: ".mission-block",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        immediateRender: false,
      });

      // Mission Content
      gsap.from(".mission-content", {
        scrollTrigger: {
          trigger: ".mission-block",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        immediateRender: false,
      });

      // Vision Image
      gsap.from(".vision-image", {
        scrollTrigger: {
          trigger: ".vision-block",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        immediateRender: false,
      });

      // Vision Content
      gsap.from(".vision-content", {
        scrollTrigger: {
          trigger: ".vision-block",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        immediateRender: false,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-dark">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        {/* Mission Block */}
        <div className="mission-block grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-32">
          {/* Image */}
          <div className="mission-image relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={mission.image}
                alt="Our Mission"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-dark/40 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 rounded-3xl -z-10" />
          </div>

          {/* Content */}
          <div className="mission-content space-y-6">
            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-70"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-40"></span>
              </span>
              <span className="text-primary text-sm font-medium uppercase tracking-[0.3em]">
                {mission.label}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {mission.title}
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-lg leading-relaxed">
              {mission.description}
            </p>

            {/* CTA Button */}
            <button className="group mt-4 bg-primary hover:bg-primary-dark text-dark font-semibold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              <span>Explore Our Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Vision Block - Reversed Layout */}
        <div className="vision-block grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content - First on mobile, second on desktop */}
          <div className="vision-content space-y-6 order-2 lg:order-1">
            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-70"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-40"></span>
              </span>
              <span className="text-primary text-sm font-medium uppercase tracking-[0.3em]">
                {vision.label}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {vision.title}
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-lg leading-relaxed">
              {vision.description}
            </p>

            {/* Feature list */}
            <ul className="space-y-3 pt-4">
              {[
                "Sustainable & responsible tourism",
                "Authentic cultural experiences",
                "Personalized travel solutions",
                "24/7 dedicated support",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="vision-image relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={vision.image}
                alt="Our Vision"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tl from-dark/40 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-primary/20 rounded-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
