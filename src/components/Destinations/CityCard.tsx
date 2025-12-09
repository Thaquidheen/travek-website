"use client";

import Image from "next/image";
import type { NearbyCity } from "@/types";

interface CityCardProps {
  city: NearbyCity;
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <div className="city-card flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group w-full opacity-100" style={{ opacity: 1 }}>
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={city.image}
          alt={city.city}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 48px, 64px"
          unoptimized
        />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{city.city}</h4>
        <p className="text-gray-500 text-xs sm:text-sm truncate">{city.driveTime}</p>
      </div>
    </div>
  );
}
