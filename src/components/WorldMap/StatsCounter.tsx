"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

interface StatsCounterProps {
  stats: Stat[];
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to({ val: 0 }, {
              val: value,
              duration: 2,
              ease: "power2.out",
              onUpdate: function() {
                setDisplayValue(Math.floor(this.targets()[0].val));
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  const formatValue = (val: number) => {
    if (suffix === "M+") {
      return (val / 10).toFixed(1);
    }
    if (suffix === "K+") {
      return val;
    }
    return val;
  };

  return (
    <span ref={numberRef} className="stat-number">
      {formatValue(displayValue)}{suffix}
    </span>
  );
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl shadow-xl py-8 px-6 md:px-12"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`stat-item text-center ${
              index < stats.length - 1 ? "md:border-r md:border-gray-200" : ""
            }`}
          >
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-gray-500 text-sm md:text-base">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
