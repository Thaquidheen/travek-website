"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ChevronDown, Plane } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is included in the tour package?",
    answer: "Our tour packages include accommodation, transportation, guided tours, and most meals. Specific inclusions vary by package, so please check the detailed itinerary for each tour.",
  },
  {
    id: "2",
    question: "Do I need travel insurance?",
    answer: "We highly recommend purchasing comprehensive travel insurance that covers medical emergencies, trip cancellation, and personal belongings. While not mandatory, it provides peace of mind during your travels.",
  },
  {
    id: "3",
    question: "What is the cancellation policy?",
    answer: "Cancellations made 30 days or more before departure receive a full refund minus a 10% processing fee. Cancellations 15-30 days before receive a 50% refund. Cancellations less than 15 days before are non-refundable.",
  },
  {
    id: "4",
    question: "How do I book a tour?",
    answer: "You can book directly through our website by selecting your desired tour and dates, or contact our travel consultants who can help customize your itinerary and handle all booking arrangements.",
  },
  {
    id: "5",
    question: "What should I pack for my trip?",
    answer: "Packing lists vary by destination and season. We provide detailed packing recommendations in your tour confirmation email, including weather-appropriate clothing, essential documents, and recommended items for your specific destination.",
  },
  {
    id: "6",
    question: "Are flights included in the tour price?",
    answer: "Most of our tour packages include international flights. Domestic flights within the destination country may be included depending on the itinerary. Please check the specific tour details for complete information.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openItems, setOpenItems] = useState<string[]>(["1"]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate title only
      gsap.from(".faq-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Panel - Title Section */}
          <div className="lg:col-span-1 bg-[#101828] rounded-3xl p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            {/* Decorative Element */}
            <div className="absolute bottom-0 right-0 opacity-10">
              <Plane className="w-48 h-48 text-white transform rotate-12" />
            </div>

            <div className="relative z-10">
              <h2 className="faq-title text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Find answers to common questions about our travel services and tour packages.
              </p>
            </div>
          </div>

          {/* Right Panel - FAQ Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
              {faqData.map((item) => {
                const isOpen = openItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="faq-item border-b border-gray-200 last:border-b-0 transition-all opacity-100"
                    style={{ opacity: 1 }}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left group hover:bg-gray-50 transition-colors"
                    >
                      <span
                        className={`font-semibold text-base md:text-lg pr-4 transition-colors ${
                          isOpen
                            ? "text-black"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? "transform rotate-180 text-gray-700"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

