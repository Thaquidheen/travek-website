"use client";

import Image from "next/image";
import { Bookmark, ArrowRight, Star } from "lucide-react";
import type { Tour } from "@/types";

interface TourCardProps {
  tour: Tour;
  isActive?: boolean;
}

export default function TourCard({ tour, isActive = true }: TourCardProps) {
  return (
    <div
      className={`tour-card bg-white rounded-2xl p-3 flex gap-3 sm:gap-4 items-center shadow-lg transition-all duration-300 h-[88px] sm:h-[104px] ${
        isActive
          ? "opacity-100 scale-100"
          : "opacity-50 scale-95"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          sizes="96px"
          unoptimized
        />
        {/* Rating badge */}
        {tour.rating && (
          <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-[10px] font-medium">{tour.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-dark font-semibold text-xs sm:text-sm leading-tight line-clamp-2">
          {tour.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-primary-dark font-bold text-xs sm:text-sm">
            {tour.priceRange.currency}{tour.priceRange.min}
          </p>
          {tour.duration && (
            <span className="text-dark/40 text-[10px] sm:text-xs">• {tour.duration}</span>
          )}
        </div>
        <button className="text-primary-dark text-[10px] sm:text-xs font-medium mt-1.5 sm:mt-2 flex items-center gap-1 hover:gap-2 transition-all group">
          More info
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bookmark */}
      <button className="p-1.5 sm:p-2 text-dark/40 hover:text-primary-dark transition-colors flex-shrink-0">
        <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
