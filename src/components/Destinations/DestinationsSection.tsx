"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import DestinationCard from "./DestinationCard";
import CityCard from "./CityCard";
import type { DestinationsData } from "@/types";

export default function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [data, setData] = useState<DestinationsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tours");
        const result = await response.json();
        if (!result.destinations?.categories?.length || !result.destinations?.nearby?.length) {
          throw new Error("Invalid data structure");
        }
        setData(result.destinations);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
        // Set default data if fetch fails
        setData({
          categories: [
            { id: "1", title: "Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400", stays: 150 },
            { id: "2", title: "Mountain", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400", stays: 120 },
            { id: "3", title: "City", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400", stays: 200 },
            { id: "4", title: "Adventure", image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=400", stays: 80 },
          ],
          nearby: [
            { id: "1", city: "Paris", driveTime: "2h flight", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200" },
            { id: "2", city: "London", driveTime: "1h flight", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=200" },
            { id: "3", city: "Rome", driveTime: "2.5h flight", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200" },
            { id: "4", city: "Barcelona", driveTime: "2h flight", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=200" },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useGSAP(
    () => {
      if (!data || !sectionRef.current) return;

      const destinationCards = sectionRef.current.querySelectorAll(".destination-card");
      const cityCards = sectionRef.current.querySelectorAll(".city-card");

      if (destinationCards.length === 0) return;

      // Ensure elements are visible first
      gsap.set(destinationCards, { opacity: 1, y: 0 });
      gsap.set(cityCards, { opacity: 1, x: 0 });

      // Simple entrance animation without ScrollTrigger for reliability
      gsap.fromTo(
        destinationCards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(
        cityCards,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out", delay: 0.3 }
      );
    },
    { scope: sectionRef, dependencies: [data] }
  );

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-[200px]"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">
          Destinations
        </h2>

        {/* Categories Grid - Simple 2x2 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {data.categories.map((category) => (
            <div key={category.id} className="relative h-[200px] sm:h-[250px]">
              <DestinationCard destination={category} />
            </div>
          ))}
        </div>

        {/* Explore Nearby Section */}
        <div className="explore-nearby">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">
            Explore nearby
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {data.nearby.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>

          {/* Explore More Button */}
          <div className="flex justify-center">
            <button className="group flex items-center gap-3 bg-primary text-dark px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base">
              <span>Explore more</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
