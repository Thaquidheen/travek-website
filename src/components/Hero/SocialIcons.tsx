"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Facebook, Instagram, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export default function SocialIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".social-icon", {
        x: -20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        delay: 1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute left-4 sm:left-8 bottom-8 sm:bottom-1/4 flex flex-row sm:flex-col gap-4 sm:gap-6 z-10"
    >
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          className="social-icon w-10 h-10 sm:w-auto sm:h-auto flex items-center justify-center rounded-full bg-white/10 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none text-white/70 hover:text-primary hover:bg-white/20 sm:hover:bg-transparent transition-all duration-300"
          aria-label={social.label}
        >
          <social.icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}
