"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { Country } from "@/types";
import {
  CountryHero,
  GallerySection,
  DetailsSection,
  FAQSection,
  ContactSection,
} from "@/components/CountryDetail";

export default function CountryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`/api/countries/${slug}`);

        if (!response.ok) {
          throw new Error("Country not found");
        }

        const data = await response.json();
        setCountry(data);
      } catch (err) {
        console.error("Failed to fetch country:", err);
        setError(err instanceof Error ? err.message : "Failed to load country");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading country information...</p>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Country Not Found</h1>
          <p className="text-gray-600 mb-8">
            {error || "The country you're looking for doesn't exist or has been removed."}
          </p>
          <a
            href="/countries"
            className="inline-block bg-primary hover:bg-primary-dark text-dark font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Back to Countries
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <CountryHero country={country} />

      {/* Gallery Section */}
      <GallerySection gallery={country.gallery} countryName={country.name} />

      {/* Details Section */}
      <DetailsSection country={country} />

      {/* FAQ Section */}
      <FAQSection faqs={country.faqs} />

      {/* Contact Section */}
      <ContactSection country={country} />
    </main>
  );
}
