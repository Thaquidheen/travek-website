"use client";

import Image from "next/image";
import type { DestinationCategory } from "@/types";

interface DestinationCardProps {
  destination: DestinationCategory;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="destination-card relative w-full h-full overflow-hidden rounded-2xl cursor-pointer group opacity-100" style={{ opacity: 1 }}>
      <Image
        src={destination.image}
        alt={destination.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
        unoptimized
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white font-semibold text-lg">{destination.title}</h3>
        <p className="text-white/80 text-sm">{destination.stays} stays</p>
      </div>
    </div>
  );
}
