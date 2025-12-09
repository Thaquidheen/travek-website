"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import type { Country } from "@/types";
import { FileText, Clock, Calendar, CreditCard, Languages, CheckCircle } from "lucide-react";

interface DetailsSectionProps {
  country: Country;
}

export default function DetailsSection({ country }: DetailsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll(".detail-card");

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
          Travel Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Visa Info */}
          <div className="detail-card backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Visa Information</h3>
                <p className="text-gray-600 text-sm mt-1">{country.visaInfo.type}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Required:</span>
                <span className="font-semibold text-gray-900">
                  {country.visaInfo.required ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing:</span>
                <span className="font-semibold text-gray-900">{country.visaInfo.processingTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Validity:</span>
                <span className="font-semibold text-gray-900">{country.visaInfo.validity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stay Duration:</span>
                <span className="font-semibold text-gray-900">{country.visaInfo.stayDuration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Entry Type:</span>
                <span className="font-semibold text-gray-900">{country.visaInfo.entryType}</span>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="detail-card backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Requirements</h3>
                <p className="text-gray-600 text-sm mt-1">Documents needed</p>
              </div>
            </div>
            <ul className="space-y-2">
              {country.visaInfo.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Best Time to Visit */}
          <div className="detail-card backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Best Time to Visit</h3>
                <p className="text-gray-600 text-sm mt-1">Ideal travel season</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">{country.bestTimeToVisit}</p>
          </div>

          {/* Currency */}
          <div className="detail-card backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Currency</h3>
                <p className="text-gray-600 text-sm mt-1">Local currency</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">{country.currency}</p>
          </div>

          {/* Language */}
          <div className="detail-card backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Languages className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Language</h3>
                <p className="text-gray-600 text-sm mt-1">Official language(s)</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">{country.language}</p>
          </div>

          {/* Timezone */}
          <div className="detail-card backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Timezone</h3>
                <p className="text-gray-600 text-sm mt-1">Local time zone</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">{country.timezone}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
