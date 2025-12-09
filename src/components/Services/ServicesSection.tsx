"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import { ArrowRight, Plane, Hotel, MapPin, Shield, FileText, Compass } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Tour Planning",
    description: "Expert guidance to create your perfect travel itinerary with handpicked destinations and experiences.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    icon: Compass,
  },
  {
    id: 2,
    title: "Flight Booking",
    description: "Find the best flight deals and seamless booking experience for domestic and international travel.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400",
    icon: Plane,
  },
  {
    id: 3,
    title: "Hotel Reservations",
    description: "Curated selection of accommodations from luxury resorts to boutique hotels worldwide.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    icon: Hotel,
  },
  {
    id: 4,
    title: "Local Experiences",
    description: "Discover authentic local experiences, guided tours, and hidden gems at every destination.",
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400",
    icon: MapPin,
  },
  {
    id: 5,
    title: "Travel Insurance",
    description: "Comprehensive travel protection plans to ensure peace of mind throughout your journey.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
    icon: Shield,
  },
  {
    id: 6,
    title: "Visa Assistance",
    description: "Hassle-free visa processing and documentation support for international destinations.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    icon: FileText,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(2);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Ensure all items are visible first
      const serviceCards = sectionRef.current.querySelectorAll(".service-card");
      serviceCards.forEach((card) => {
        gsap.set(card, { opacity: 1, y: 0 });
      });

      // Animate label
      gsap.from(".services-label", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate title
      gsap.from(".services-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
      });

      // Animate cards with stagger
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: "start",
        },
        ease: "power2.out",
        immediateRender: false,
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Label */}
        <div className="services-label flex items-center justify-center gap-2 mb-4">
          <span className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="w-2 h-2 rounded-full bg-primary opacity-70"></span>
            <span className="w-2 h-2 rounded-full bg-primary opacity-40"></span>
          </span>
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
            Our Services
          </span>
        </div>

        {/* Section Title */}
        <h2 className="services-title text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12 sm:mb-16">
          Elevate Your Journey
          <br />
          <span className="text-primary">with Our Expertise</span>
        </h2>

        {/* Services Grid - Bento Style */}
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeCard === service.id;

            return (
              <div
                key={service.id}
                className={`service-card group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer opacity-100 ${
                  isActive ? "ring-2 ring-primary ring-offset-2" : ""
                } ${index === 0 || index === 5 ? "sm:col-span-1" : ""}`}
                style={{ opacity: 1 }}
                onMouseEnter={() => setActiveCard(service.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      isActive
                        ? "scale-110 grayscale-0"
                        : "scale-100 grayscale hover:grayscale-0"
                    }`}
                    unoptimized
                  />
                  {/* Overlay gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  {/* Icon badge */}
                  <div
                    className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "bg-primary text-dark"
                        : "bg-white/90 text-gray-700 group-hover:bg-primary group-hover:text-dark"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <button
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-primary"
                        : "text-gray-700 group-hover:text-primary"
                    }`}
                  >
                    <span>Learn more</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? "translate-x-1" : "group-hover:translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Active indicator line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <button className="group flex items-center gap-3 bg-primary text-dark px-8 py-4 rounded-full font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            <span>View All Services</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
