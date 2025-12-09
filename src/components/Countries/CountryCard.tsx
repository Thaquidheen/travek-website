"use client";

import Image from "next/image";
import Link from "next/link";
import type { Country } from "@/types";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/countries/${country.slug}`}>
      <div className="country-card relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden cursor-pointer group">
        {/* Background Image */}
        <Image
          src={country.image}
          alt={country.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Glassmorphism Card Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-2xl">
            <h3 className="text-white font-bold text-2xl mb-2">{country.name}</h3>
            <p className="text-white/90 text-sm mb-3">{country.shortDescription}</p>

            <div className="flex items-center gap-4 text-white/80 text-xs">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {country.bestTimeToVisit}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {country.currency}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Arrow */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary text-dark p-2 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
