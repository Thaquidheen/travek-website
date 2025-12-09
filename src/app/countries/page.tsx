"use client";

import { useState, useEffect } from "react";
import { CountriesHero, CountryCardSlider } from "@/components/Countries";
import type { Country } from "@/types";

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/api/countries");
        const data = await response.json();

        if (!data.countries?.length) {
          throw new Error("No countries data");
        }

        setCountries(data.countries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        // Fallback data won't be needed as we have data in JSON
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white/60 text-lg">Loading countries...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark to-dark-light">
      {/* Hero Section with Globe */}
      <CountriesHero countries={countries} />

      {/* Countries Slider Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Popular Destinations
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Browse through our curated selection of amazing countries. Click on any destination to learn more about visa requirements, best time to visit, and more.
            </p>
          </div>

          <CountryCardSlider countries={countries} />
        </div>
      </section>

      {/* Featured Countries Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-dark-light">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              All Destinations
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Explore our complete collection of travel destinations worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {countries.map((country) => (
              <a
                key={country.id}
                href={`/countries/${country.slug}`}
                className="group block h-full overflow-hidden rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-transparent">
                  {country.image ? (
                    <img
                      src={country.image}
                      alt={country.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      {country.code === "AE"
                        ? "🇦🇪"
                        : country.code === "JP"
                        ? "🇯🇵"
                        : country.code === "FR"
                        ? "🇫🇷"
                        : country.code === "IT"
                        ? "🇮🇹"
                        : country.code === "ES"
                        ? "🇪🇸"
                        : country.code === "TH"
                        ? "🇹🇭"
                        : country.code === "AU"
                        ? "🇦🇺"
                        : country.code === "US"
                        ? "🇺🇸"
                        : country.code === "GB"
                        ? "🇬🇧"
                        : "🇨🇭"}
                    </div>
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-light via-transparent to-transparent opacity-60" />
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-white font-bold text-2xl sm:text-3xl group-hover:text-primary transition-colors">
                      {country.name}
                    </h3>
                    <span className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                      →
                    </span>
                  </div>

                  <p className="text-white/80 text-sm sm:text-base mb-4 line-clamp-3 leading-relaxed">
                    {country.shortDescription}
                  </p>

                  {/* Quick Info Tags */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-primary bg-primary/20 px-3 py-1.5 rounded-lg w-fit">
                        💱 {country.currency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/20 px-3 py-1.5 rounded-lg w-fit">
                        🗣️ {country.language}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/20 px-3 py-1.5 rounded-lg w-fit">
                        📋 {country.visaInfo.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-orange-400 bg-orange-400/20 px-3 py-1.5 rounded-lg w-fit">
                        🏆 {country.bestTimeToVisit ? country.bestTimeToVisit.split(" ").slice(0, 2).join(" ") : "Year-round"}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-white/70 text-xs sm:text-sm line-clamp-2 mb-3">
                      {country.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>Explore More</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
