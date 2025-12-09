"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeroContent from "./HeroContent";
import SocialIcons from "./SocialIcons";
import TourCardList from "./TourCardList";
import BackgroundEffects from "./BackgroundEffects";
import type { Tour, HeroData } from "@/types";

// Dynamic import for PlaneAnimation to avoid SSR issues
const PlaneAnimation = dynamic(() => import("./PlaneAnimation"), {
  ssr: false,
});

// Default tours for slider - ensures we always have content
const defaultTours: Tour[] = [
  {
    id: "1",
    title: "Santorini Sunset Experience",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400",
    priceRange: { min: 299, max: 599, currency: "$" },
    location: "Greece",
    description: "Watch the famous Santorini sunset from Oia",
    duration: "5 Days",
    rating: 4.9,
  },
  {
    id: "2",
    title: "Bali Temple & Beach Tour",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
    priceRange: { min: 199, max: 399, currency: "$" },
    location: "Indonesia",
    description: "Explore ancient temples and pristine beaches",
    duration: "7 Days",
    rating: 4.8,
  },
  {
    id: "3",
    title: "Swiss Alps Adventure",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400",
    priceRange: { min: 499, max: 899, currency: "$" },
    location: "Switzerland",
    description: "Ski, hike and explore the majestic Alps",
    duration: "6 Days",
    rating: 4.9,
  },
  {
    id: "4",
    title: "Tokyo Cultural Immersion",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    priceRange: { min: 399, max: 799, currency: "$" },
    location: "Japan",
    description: "Experience the blend of tradition and modernity",
    duration: "8 Days",
    rating: 4.7,
  },
  {
    id: "5",
    title: "Maldives Paradise Escape",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400",
    priceRange: { min: 599, max: 1299, currency: "$" },
    location: "Maldives",
    description: "Crystal clear waters and luxury overwater villas",
    duration: "5 Days",
    rating: 5.0,
  },
  {
    id: "6",
    title: "Iceland Northern Lights",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400",
    priceRange: { min: 699, max: 1199, currency: "$" },
    location: "Iceland",
    description: "Chase the aurora and explore glaciers",
    duration: "6 Days",
    rating: 4.8,
  },
  {
    id: "7",
    title: "Machu Picchu Trek",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400",
    priceRange: { min: 449, max: 899, currency: "$" },
    location: "Peru",
    description: "Hike the Inca Trail to the ancient citadel",
    duration: "7 Days",
    rating: 4.9,
  },
  {
    id: "8",
    title: "Dubai Luxury Experience",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
    priceRange: { min: 399, max: 999, currency: "$" },
    location: "UAE",
    description: "Skyscrapers, desert safaris and luxury shopping",
    duration: "4 Days",
    rating: 4.6,
  },
];

interface ApiResponse {
  tours: Tour[];
  heroData: HeroData;
}

export default function HeroSection() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tours");
        const result = await response.json();
        // Ensure we have enough tours for the slider
        let extendedTours = result.tours;
        if (result.tours.length < 6) {
          const additionalNeeded = 6 - result.tours.length;
          const additionalTours = defaultTours.slice(0, additionalNeeded).map((tour, idx) => ({
            ...tour,
            id: `default-${idx + 1}`,
          }));
          extendedTours = [...result.tours, ...additionalTours];
        }
        setData({ ...result, tours: extendedTours });
      } catch (error) {
        console.error("Failed to fetch tour data:", error);
        // Use fallback data if fetch fails
        setData({
          tours: defaultTours,
          heroData: {
            location: "Explore The World",
            title: "Discover Amazing Places",
            description: "Unforgettable experiences await you in every corner of the globe",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="relative min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="relative min-h-screen bg-dark flex items-center justify-center">
        <p className="text-white">Failed to load content</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <BackgroundEffects />

      {/* Plane Animation */}
      <PlaneAnimation />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center py-20 sm:py-0">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="pt-16 sm:pt-20 order-1">
              <HeroContent data={data.heroData} />
            </div>

            {/* Right Side - Tour Cards */}
            <div className="lg:pl-12 order-2 pb-8 sm:pb-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
                <TourCardList tours={data.tours} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <SocialIcons />
    </section>
  );
}
