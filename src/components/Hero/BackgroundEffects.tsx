"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function BackgroundEffects() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax effect on scroll
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: backgroundRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });

  // Floating particles effect
  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = particlesRef.current.querySelectorAll(".bg-particle");

    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: `random(-30, 30)`,
        x: `random(-20, 20)`,
        opacity: `random(0.3, 0.8)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <>
      {/* Background Image with Parallax */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 hero-gradient"
      />

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="bg-particle absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Stars/Dots Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-0.5 h-0.5 rounded-full bg-white/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
