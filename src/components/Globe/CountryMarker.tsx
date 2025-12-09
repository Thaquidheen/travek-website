"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Html } from "@react-three/drei";
import type { Country } from "@/types";

interface CountryMarkerProps {
  country: Country;
  position: [number, number, number];
}

export default function CountryMarker({ country, position }: CountryMarkerProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    router.push(`/countries/${country.slug}`);
  };

  return (
    <group position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={handleClick}>
      {/* Tooltip on hover */}
      {hovered && (
        <Html distanceFactor={10} position={[0, 0.2, 0]}>
          <div className="px-3 py-1 bg-dark/90 text-white text-sm rounded-lg backdrop-blur-sm border border-white/20 whitespace-nowrap pointer-events-none">
            {country.name}
          </div>
        </Html>
      )}
    </group>
  );
}
