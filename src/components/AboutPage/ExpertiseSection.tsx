"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Compass, Globe, HeadphonesIcon, FileCheck } from "lucide-react";

interface ExpertiseItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface ExpertiseSectionProps {
  expertise: ExpertiseItem[];
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  "01": Compass,
  "02": Globe,
  "03": FileCheck,
  "04": HeadphonesIcon,
};

export default function ExpertiseSection({ expertise }: ExpertiseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Ensure cards are visible first
      gsap.set(".expertise-card", { opacity: 1, y: 0 });

      // Animate section label
      gsap.from(".expertise-label", {
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
      gsap.from(".expertise-title", {
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

      // Animate cards with stagger
      gsap.from(".expertise-card", {
        scrollTrigger: {
          trigger: ".expertise-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        immediateRender: false,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Label */}
            <div className="expertise-label flex items-center gap-3">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-70"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-40"></span>
              </span>
              <span className="text-gray-600 text-sm font-medium uppercase tracking-[0.3em]">
                Our Expertise
              </span>
            </div>

            {/* Title */}
            <h2 className="expertise-title text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              We Design{" "}
              <span className="text-primary">Travel Experiences</span>
              <br />
              That Transform Lives
            </h2>
          </div>

          {/* Right Grid - Expertise Cards */}
          <div className="expertise-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
            {expertise.map((item) => {
              const Icon = iconMap[item.number] || Compass;

              return (
                <div
                  key={item.id}
                  className="expertise-card group p-6 bg-gray-50 hover:bg-dark rounded-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-primary/30"
                >
                  {/* Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-5xl font-bold text-gray-200 group-hover:text-white/10 transition-colors">
                      {item.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all duration-500">
                      <Icon className="w-6 h-6 text-primary group-hover:text-dark transition-colors" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">
                    {item.description}
                  </p>

                  {/* Hover Line */}
                  <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
