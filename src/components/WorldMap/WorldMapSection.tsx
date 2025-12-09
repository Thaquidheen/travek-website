"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import dynamic from "next/dynamic";
import StatsCounter from "./StatsCounter";

const MapPlaneAnimation = dynamic(() => import("./MapPlaneAnimation"), {
  ssr: false,
});

interface WorldMapData {
  title: string;
  subtitle: string;
  stats: {
    id: string;
    value: number;
    suffix: string;
    label: string;
  }[];
}

// Destination markers with coordinates (percentage-based for responsive positioning)
const destinations = [
  { id: 1, name: "New York", x: 22, y: 32 },
  { id: 2, name: "London", x: 45, y: 24 },
  { id: 3, name: "Dubai", x: 62, y: 42 },
  { id: 4, name: "Tokyo", x: 89, y: 34 },
  { id: 5, name: "Sydney", x: 88, y: 88 },
  { id: 6, name: "Rio", x: 24, y: 78 },
  { id: 7, name: "Cape Town", x: 52, y: 82 },
  { id: 8, name: "Paris", x: 48, y: 26 },
];

export default function WorldMapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [data, setData] = useState<WorldMapData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tours");
        const result = await response.json();
        setData(result.worldMap);
      } catch (error) {
        console.error("Failed to fetch world map data:", error);
        // Set default data if fetch fails
        setData({
          title: "Explore The World",
          subtitle: "Discover amazing destinations across the globe with our expert travel guides",
          stats: [
            { id: "1", value: 500, suffix: "+", label: "Destinations" },
            { id: "2", value: 10000, suffix: "+", label: "Happy Travelers" },
            { id: "3", value: 50, suffix: "+", label: "Countries" },
          ],
        });
      }
    };

    fetchData();
  }, []);

  useGSAP(
    () => {
      if (!data) return;

      // Set initial visible state first, then animate
      gsap.set([".map-title", ".map-subtitle", ".world-map-container", ".destination-marker"], {
        opacity: 1,
        clearProps: "all"
      });

      gsap.from(".map-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(".map-subtitle", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
      });

      gsap.from(".world-map-container", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      // Animate destination markers
      gsap.from(".destination-marker", {
        scrollTrigger: {
          trigger: ".world-map-container",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // Refresh ScrollTrigger after animations are set up
      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [data] }
  );

  if (!data) {
    return (
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-700 rounded mx-auto mb-4"></div>
            <div className="h-4 w-96 bg-gray-700 rounded mx-auto mb-12"></div>
            <div className="h-[400px] bg-gray-800 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-dark overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="map-title text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            {data.title}
          </h2>
          <p className="map-subtitle text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-2">
            {data.subtitle}
          </p>
        </div>

        {/* Map Container */}
        <div className="world-map-container relative mb-8 sm:mb-12">
          <div className="relative w-full max-w-5xl mx-auto" style={{ minHeight: "200px" }}>
            {/* World Map Container */}
            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden bg-slate-900">
              {/* Inline SVG World Map - Always loads */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 500"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ocean background */}
                <rect width="1000" height="500" fill="#0f172a" />

                {/* Grid lines */}
                {[...Array(9)].map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={(i + 1) * 50} x2="1000" y2={(i + 1) * 50} stroke="#1e3a5f" strokeWidth="0.5" opacity="0.3" />
                ))}
                {[...Array(19)].map((_, i) => (
                  <line key={`v${i}`} x1={(i + 1) * 50} y1="0" x2={(i + 1) * 50} y2="500" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.3" />
                ))}

                {/* North America */}
                <path
                  d="M50 120 L80 100 L120 95 L160 100 L200 95 L240 100 L270 120 L280 150 L270 180 L250 200 L220 220 L190 235 L160 240 L140 250 L130 280 L140 310 L160 330 L150 350 L130 340 L110 320 L90 290 L70 250 L50 210 L40 170 L45 140 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />
                {/* Alaska */}
                <path
                  d="M30 100 L60 85 L90 90 L80 110 L50 115 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />
                {/* Greenland */}
                <path
                  d="M320 60 L360 50 L400 55 L420 80 L400 110 L360 115 L330 100 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />

                {/* South America */}
                <path
                  d="M180 340 L220 330 L260 340 L280 370 L290 410 L280 450 L260 480 L230 490 L200 480 L180 450 L170 410 L175 370 Z"
                  fill="#166534"
                  stroke="#22c55e"
                  strokeWidth="1"
                />

                {/* Europe */}
                <path
                  d="M440 100 L470 90 L510 95 L540 100 L560 120 L550 150 L530 165 L500 175 L470 170 L450 155 L445 130 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />
                {/* UK */}
                <path
                  d="M430 110 L445 105 L450 120 L440 130 L430 125 Z"
                  fill="#166534"
                  stroke="#22c55e"
                  strokeWidth="1"
                />
                {/* Scandinavia */}
                <path
                  d="M480 60 L510 50 L530 70 L520 100 L490 95 L480 75 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />

                {/* Africa */}
                <path
                  d="M450 200 L500 190 L550 200 L580 240 L590 300 L580 360 L560 410 L520 440 L470 445 L440 420 L430 370 L440 310 L450 260 Z"
                  fill="#166534"
                  stroke="#22c55e"
                  strokeWidth="1"
                />
                {/* Madagascar */}
                <path
                  d="M590 380 L605 370 L615 400 L605 430 L590 420 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />

                {/* Middle East */}
                <path
                  d="M560 180 L600 170 L640 190 L650 230 L630 260 L590 250 L570 220 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />

                {/* Russia/Asia */}
                <path
                  d="M540 50 L620 40 L700 45 L780 55 L850 70 L900 100 L920 130 L900 160 L850 170 L800 165 L750 160 L700 150 L650 140 L600 130 L560 110 L550 80 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />

                {/* China/East Asia */}
                <path
                  d="M700 150 L760 140 L820 150 L860 180 L870 220 L850 260 L800 280 L750 275 L710 250 L680 210 L690 170 Z"
                  fill="#166534"
                  stroke="#22c55e"
                  strokeWidth="1"
                />

                {/* India */}
                <path
                  d="M660 230 L700 220 L730 250 L720 300 L690 340 L650 330 L640 290 L650 250 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />

                {/* Southeast Asia */}
                <path
                  d="M760 280 L800 270 L830 290 L840 330 L820 360 L780 365 L760 340 L755 310 Z"
                  fill="#166534"
                  stroke="#22c55e"
                  strokeWidth="1"
                />

                {/* Japan */}
                <path
                  d="M880 160 L900 150 L910 180 L900 210 L880 200 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />

                {/* Indonesia */}
                <path
                  d="M780 380 L820 375 L860 385 L880 400 L860 415 L820 420 L790 410 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />

                {/* Australia */}
                <path
                  d="M800 400 L860 390 L920 410 L950 450 L940 490 L890 500 L830 495 L790 470 L780 430 Z"
                  fill="#166534"
                  stroke="#22c55e"
                  strokeWidth="1"
                />

                {/* New Zealand */}
                <path
                  d="M960 470 L975 460 L980 490 L970 500 L955 490 Z"
                  fill="#134e4a"
                  stroke="#0d9488"
                  strokeWidth="1"
                />
              </svg>

              {/* Destination Markers */}
              {destinations.map((dest, index) => (
                <div
                  key={dest.id}
                  className="destination-marker absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${dest.x}%`, top: `${dest.y}%` }}
                >
                  {/* Pulse ring */}
                  <span
                    className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-75"
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  />
                  {/* Marker dot - responsive size */}
                  <span className="relative block w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50 border border-white sm:border-2" />
                  {/* Tooltip - hidden on mobile, visible on hover for larger screens */}
                  <span className="hidden sm:block absolute left-1/2 -translate-x-1/2 -top-7 md:-top-8 bg-white text-gray-900 px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    {dest.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Plane Animation Overlay */}
            <MapPlaneAnimation />
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto relative z-10">
          <StatsCounter stats={data.stats} />
        </div>
      </div>
    </section>
  );
}
