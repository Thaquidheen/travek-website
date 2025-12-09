"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Phone, MessageCircle, Mail } from "lucide-react";
import type { Country } from "@/types";

interface ContactSectionProps {
  country: Country;
}

export default function ContactSection({ country }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(".contact-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".contact-button", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: "back.out(1.2)",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="contact-card backdrop-blur-xl bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Ready to Plan Your Trip?
              </h2>
              <p className="text-gray-600 text-lg">
                Get in touch with us for personalized travel assistance and visa support
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={`tel:${country.contact.phone}`}
                className="contact-button flex-1 bg-primary hover:bg-primary-dark text-dark font-bold text-lg px-10 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                <span>CALL NOW</span>
              </a>

              <a
                href={`https://wa.me/${country.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-button flex-1 bg-white hover:bg-gray-50 text-dark font-bold text-lg px-10 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 border-2 border-gray-200"
              >
                <MessageCircle className="w-6 h-6 text-green-500" />
                <span>WHATSAPP US</span>
              </a>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-semibold">{country.contact.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <MessageCircle className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-sm text-gray-500">WhatsApp</div>
                  <div className="font-semibold">{country.contact.whatsapp}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-semibold">{country.contact.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
