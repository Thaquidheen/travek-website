"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";

// Destinations matching WorldMapSection (percentage-based coordinates)
const destinations = [
  { id: 1, name: "New York", x: 22, y: 32 },
  { id: 2, name: "London", x: 45, y: 24 },
  { id: 3, name: "Paris", x: 48, y: 26 },
  { id: 4, name: "Dubai", x: 62, y: 42 },
  { id: 5, name: "Tokyo", x: 89, y: 34 },
  { id: 6, name: "Sydney", x: 88, y: 88 },
  { id: 7, name: "Cape Town", x: 52, y: 82 },
  { id: 8, name: "Rio", x: 24, y: 78 },
];

// Flight route order (indices into destinations array)
const flightOrder = [0, 1, 2, 3, 4, 5, 6, 7, 0]; // New York -> London -> Paris -> Dubai -> Tokyo -> Sydney -> Cape Town -> Rio -> back

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

export default function MapPlaneAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const [planePosition, setPlanePosition] = useState({ x: destinations[0].x, y: destinations[0].y });
  const [planeRotation, setPlaneRotation] = useState(0);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const currentRouteRef = useRef(0);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const trailIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate angle between two points
  const calculateAngle = useCallback((fromX: number, fromY: number, toX: number, toY: number) => {
    const deltaX = toX - fromX;
    const deltaY = toY - fromY;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  }, []);

  // Update trail with current position
  const updateTrail = useCallback((x: number, y: number) => {
    setTrail(prev => {
      const newTrail = [{ x, y, opacity: 1 }, ...prev.slice(0, 7)];
      return newTrail.map((point, index) => ({
        ...point,
        opacity: 1 - (index * 0.12)
      }));
    });
  }, []);

  useEffect(() => {
    if (!planeRef.current) return;

    const animateToNextDestination = () => {
      const currentIndex = currentRouteRef.current;
      const nextIndex = (currentIndex + 1) % flightOrder.length;

      const fromDest = destinations[flightOrder[currentIndex]];
      const toDest = destinations[flightOrder[nextIndex]];

      // Calculate rotation angle
      const angle = calculateAngle(fromDest.x, fromDest.y, toDest.x, toDest.y);
      setPlaneRotation(angle);

      // Create position object for animation
      const posObj = { x: fromDest.x, y: fromDest.y };

      // Start trail recording
      if (trailIntervalRef.current) {
        clearInterval(trailIntervalRef.current);
      }
      trailIntervalRef.current = setInterval(() => {
        updateTrail(posObj.x, posObj.y);
      }, 100);

      // Animate to next destination
      animationRef.current = gsap.to(posObj, {
        x: toDest.x,
        y: toDest.y,
        duration: 3,
        ease: "power1.inOut",
        onUpdate: () => {
          setPlanePosition({ x: posObj.x, y: posObj.y });
        },
        onComplete: () => {
          if (trailIntervalRef.current) {
            clearInterval(trailIntervalRef.current);
          }
          currentRouteRef.current = nextIndex;
          // Small pause at destination
          setTimeout(animateToNextDestination, 800);
        }
      });
    };

    // Start animation after initial delay
    const startTimeout = setTimeout(() => {
      animateToNextDestination();
    }, 1000);

    return () => {
      clearTimeout(startTimeout);
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (trailIntervalRef.current) {
        clearInterval(trailIntervalRef.current);
      }
    };
  }, [calculateAngle, updateTrail]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Trail dots */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {trail.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={Math.max(0.8 - index * 0.08, 0.2)}
            fill="#fbbf24"
            opacity={point.opacity * 0.7}
          />
        ))}
      </svg>

      {/* Airplane */}
      <div
        ref={planeRef}
        className="absolute w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-100"
        style={{
          left: `${planePosition.x}%`,
          top: `${planePosition.y}%`,
          transform: `translate(-50%, -50%) rotate(${planeRotation}deg)`,
        }}
      >
        <svg
          className="w-full h-full text-yellow-400 drop-shadow-lg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Airplane icon pointing right for correct rotation */}
          <path d="M21,16v-2l-8-5V3.5C13,2.67,12.33,2,11.5,2S10,2.67,10,3.5V9l-8,5v2l8-2.5V19l-2,1.5V22l3.5-1l3.5,1v-1.5L13,19v-5.5L21,16z"
                transform="rotate(90 12 12)" />
        </svg>
      </div>
    </div>
  );
}
