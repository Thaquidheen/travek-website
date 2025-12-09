"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MotionPathPlugin } from "@/lib/gsap";
import ParticleTrail from "./ParticleTrail";

gsap.registerPlugin(MotionPathPlugin);

interface PlanePosition {
  x: number;
  y: number;
}

export default function PlaneAnimation() {
  const planeRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const positionRef = useRef<PlanePosition>({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    if (planeRef.current) {
      const rect = planeRef.current.getBoundingClientRect();
      positionRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
  }, []);

  useGSAP(() => {
    if (!planeRef.current || !pathRef.current) return;

    // Initial delay before starting the animation
    gsap.set(planeRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
      delay: 2,
    });

    tl.to(planeRef.current, {
      opacity: 1,
      duration: 0.5,
    }).to(planeRef.current, {
      duration: 10,
      ease: "power1.inOut",
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
        autoRotate: 90, // Add 180 degrees to flip the plane to point forward instead of backward
      },
      onUpdate: updatePosition,
    }).to(planeRef.current, {
      opacity: 0,
      duration: 0.5,
    });
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Hidden motion path */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          ref={pathRef}
          d="M-100,700 Q300,300 700,500 T1400,350 T2100,200"
          fill="none"
          stroke="transparent"
        />
      </svg>

      {/* Airplane SVG */}
      <svg
        ref={planeRef}
        className="absolute w-10 h-10 text-white/90 drop-shadow-lg"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ 
          opacity: 0, 
          transformOrigin: "center center"
        }}
      >
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>

      {/* Particle trail layer */}
      <ParticleTrail planePositionRef={positionRef} />
    </div>
  );
}
