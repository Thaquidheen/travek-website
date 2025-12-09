"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowRight, Target, Heart } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(".about-label", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      });

      gsap.from(".about-description", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      });

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });

      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Label */}
            <span className="about-label text-gray-600 text-sm tracking-[0.3em] font-medium uppercase">
              About FitClub
            </span>

            {/* Main Title */}
            <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
              Join FitClub
            </h2>

            {/* Description */}
            <p className="about-description text-gray-700 text-lg leading-relaxed max-w-lg">
              FitClub is dedicated to helping you achieve your fitness and wellness goals through expert coaching, personalized workout plans, and nutrition guidance.
            </p>

            {/* Join Us Button */}
            <button className="about-button mt-6 bg-primary hover:bg-primary-dark text-dark font-semibold px-8 py-4 rounded-full flex items-center gap-3 transition-colors group shadow-lg hover:shadow-xl">
              <span>Join Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side - Image and Cards */}
          <div className="space-y-8">
            {/* Main Image */}
            <div className="about-image relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Target className="w-24 h-24 mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Fitness Image</p>
                </div>
              </div>
            </div>

            {/* Vision and Mission Cards */}
            <div className="space-y-6">
              {/* Vision Card */}
              <div className="about-card bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">Our Vision</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To inspire and empower individuals to lead healthier, stronger, and more fulfilling lives through fitness and wellness.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission Card */}
              <div className="about-card bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">Our Mission</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To provide personalized coaching, expert guidance, and a supportive community that helps you achieve sustainable results and long-term success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

