"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { Award, Users, Shield, CheckCircle2 } from "lucide-react";

interface CommitmentItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface CommitmentData {
  title: string;
  items: CommitmentItem[];
}

interface CommitmentSectionProps {
  commitment: CommitmentData;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  award: Award,
  users: Users,
  shield: Shield,
};

export default function CommitmentSection({ commitment }: CommitmentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Ensure elements are visible first
      gsap.set(".commitment-card", { opacity: 1, y: 0 });
      gsap.set(".commitment-image", { opacity: 1, scale: 1 });

      // Animate section title
      gsap.from(".commitment-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate image
      gsap.from(".commitment-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        immediateRender: false,
      });

      // Animate cards with stagger and bouncy effect
      gsap.from(".commitment-card", {
        scrollTrigger: {
          trigger: ".commitment-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        immediateRender: false,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image with decorative elements */}
          <div className="commitment-image relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800"
                alt="Quality Commitment"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-primary rounded-2xl p-4 shadow-xl">
              <CheckCircle2 className="w-8 h-8 text-dark" />
            </div>

            {/* Stats badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-3xl font-bold text-dark mb-1">100%</div>
              <div className="text-gray-600 text-sm">Satisfaction Rate</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Label */}
            <div className="flex items-center gap-3">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-70"></span>
                <span className="w-2 h-2 rounded-full bg-primary opacity-40"></span>
              </span>
              <span className="text-gray-600 text-sm font-medium uppercase tracking-[0.3em]">
                Our Commitment
              </span>
            </div>

            {/* Title */}
            <h2 className="commitment-title text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {commitment.title}
            </h2>

            {/* Commitment Cards */}
            <div className="commitment-grid space-y-4">
              {commitment.items.map((item) => {
                const Icon = iconMap[item.icon] || Award;

                return (
                  <div
                    key={item.id}
                    className="commitment-card group flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary group-hover:text-dark transition-colors" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Check icon */}
                    <CheckCircle2 className="flex-shrink-0 w-6 h-6 text-green-500 ml-auto" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
