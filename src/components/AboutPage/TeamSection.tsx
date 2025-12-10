"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TeamSectionProps {
  team: TeamMember[];
}

export default function TeamSection({ team }: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Ensure cards are visible first
      gsap.set(".team-card", { opacity: 1, scale: 1 });

      // Animate section label
      gsap.from(".team-label", {
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
      gsap.from(".team-title", {
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

      // Animate description
      gsap.from(".team-description", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });

      // Animate cards with scale effect
      gsap.from(".team-card", {
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        immediateRender: false,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-dark">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Label */}
          <div className="team-label flex items-center justify-center gap-3 mb-4">
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="w-2 h-2 rounded-full bg-primary opacity-70"></span>
              <span className="w-2 h-2 rounded-full bg-primary opacity-40"></span>
            </span>
            <span className="text-primary text-sm font-medium uppercase tracking-[0.3em]">
              Our Team
            </span>
          </div>

          {/* Title */}
          <h2 className="team-title text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Meet The{" "}
            <span className="text-primary">Passionate Experts</span>
            <br />
            Behind Your Adventures
          </h2>

          {/* Description */}
          <p className="team-description text-gray-400 text-lg">
            Our dedicated team of travel enthusiasts brings years of experience
            and a genuine passion for creating unforgettable journeys.
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="team-card group relative bg-dark-light rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Social Icons - Show on hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-primary transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
