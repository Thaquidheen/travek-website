"use client";

import { forwardRef } from "react";

interface WorldMapSVGProps {
  className?: string;
}

const WorldMapSVG = forwardRef<SVGSVGElement, WorldMapSVGProps>(
  ({ className }, ref) => {
    return (
      <svg
        ref={ref}
        className={className}
        viewBox="0 0 1000 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* North America */}
        <path
          d="M150 80 L180 70 L220 75 L260 90 L280 120 L270 150 L250 180 L220 200 L180 210 L150 200 L120 180 L100 150 L90 120 L100 90 L130 75 Z"
          fill="#22c55e"
          opacity="0.9"
        />
        <path
          d="M180 210 L220 220 L260 250 L280 290 L260 320 L220 340 L180 330 L150 300 L140 260 L150 230 Z"
          fill="#16a34a"
          opacity="0.85"
        />

        {/* South America */}
        <path
          d="M250 340 L280 350 L300 390 L310 440 L290 480 L260 490 L230 470 L220 430 L230 390 L240 360 Z"
          fill="#22c55e"
          opacity="0.9"
        />
        <path
          d="M280 350 L310 360 L330 400 L320 450 L290 480 L310 440 L300 390 Z"
          fill="#15803d"
          opacity="0.8"
        />

        {/* Europe */}
        <path
          d="M450 80 L480 70 L520 75 L550 90 L560 120 L550 150 L520 170 L480 175 L450 165 L430 140 L420 110 L430 85 Z"
          fill="#22c55e"
          opacity="0.9"
        />
        <path
          d="M480 175 L520 180 L540 200 L530 220 L500 230 L470 225 L450 200 L460 185 Z"
          fill="#16a34a"
          opacity="0.85"
        />

        {/* Africa */}
        <path
          d="M470 240 L510 230 L550 250 L570 300 L560 360 L530 410 L490 430 L450 420 L430 380 L420 330 L430 280 L450 250 Z"
          fill="#22c55e"
          opacity="0.9"
        />
        <path
          d="M510 230 L550 250 L570 300 L560 360 L530 340 L520 290 L530 260 Z"
          fill="#15803d"
          opacity="0.8"
        />

        {/* Asia */}
        <path
          d="M580 60 L650 50 L720 60 L780 80 L820 120 L840 170 L830 220 L790 260 L740 280 L680 290 L620 280 L580 250 L560 200 L550 150 L560 100 Z"
          fill="#22c55e"
          opacity="0.9"
        />
        <path
          d="M650 50 L720 60 L780 80 L820 120 L800 100 L750 90 L700 85 L660 80 Z"
          fill="#16a34a"
          opacity="0.85"
        />
        <path
          d="M740 280 L780 300 L800 340 L780 380 L740 400 L700 390 L680 350 L690 310 L720 290 Z"
          fill="#15803d"
          opacity="0.8"
        />

        {/* Australia */}
        <path
          d="M780 380 L830 370 L880 390 L900 430 L880 470 L830 480 L780 460 L760 420 L770 390 Z"
          fill="#22c55e"
          opacity="0.9"
        />
        <path
          d="M830 370 L880 390 L900 430 L880 410 L850 395 L840 380 Z"
          fill="#16a34a"
          opacity="0.85"
        />

        {/* Indonesia/Pacific Islands */}
        <path
          d="M820 320 L850 315 L870 330 L860 350 L830 355 L815 340 Z"
          fill="#22c55e"
          opacity="0.8"
        />
        <path
          d="M750 340 L780 335 L795 350 L785 365 L755 368 L745 355 Z"
          fill="#16a34a"
          opacity="0.75"
        />

        {/* Destination markers */}
        <circle cx="200" cy="150" r="6" fill="#fbbf24" className="destination-marker" />
        <circle cx="500" cy="140" r="6" fill="#fbbf24" className="destination-marker" />
        <circle cx="700" cy="180" r="6" fill="#fbbf24" className="destination-marker" />
        <circle cx="840" cy="420" r="6" fill="#fbbf24" className="destination-marker" />
        <circle cx="280" cy="400" r="6" fill="#fbbf24" className="destination-marker" />
        <circle cx="500" cy="320" r="6" fill="#fbbf24" className="destination-marker" />
      </svg>
    );
  }
);

WorldMapSVG.displayName = "WorldMapSVG";

export default WorldMapSVG;
