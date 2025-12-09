"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import {
  Globe,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "#countries" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "#blog" },
];

const popularDestinations = [
  { label: "Paris, France", href: "#paris" },
  { label: "Bali, Indonesia", href: "#bali" },
  { label: "Tokyo, Japan", href: "#tokyo" },
  { label: "New York, USA", href: "#newyork" },
  { label: "Dubai, UAE", href: "#dubai" },
];

const supportLinks = [
  { label: "Help Center", href: "#help" },
  { label: "Safety Information", href: "#safety" },
  { label: "Cancellation Policy", href: "#cancellation" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-section", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="bg-dark text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
          <div className="footer-section flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                Subscribe to our Newsletter
              </h3>
              <p className="text-white/60 text-sm sm:text-base">
                Get the latest travel deals and destination guides directly to your inbox.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-primary w-full sm:w-72 transition-colors"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-dark font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="footer-section lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Globe className="w-6 h-6 text-dark" />
              </div>
              <span className="text-white font-semibold text-xl">travel agency</span>
            </Link>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Discover the world with us. We create unforgettable travel experiences
              that connect you with the most amazing destinations on Earth.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>123 Travel Street, Adventure City, 10001</span>
              </div>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>+1 (555) 123-4567</span>
                  <span>+1 (555) 987-6543</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>hello@travelagency.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center text-white/60 hover:text-dark transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="footer-section lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 text-lg">Popular Destinations</h4>
            <ul className="space-y-3">
              {popularDestinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-section lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} Travel Agency. All rights reserved.
            </p>

            {/* Additional Info */}
            <div className="flex items-center gap-4 text-white/40 text-sm">
              <span>Secure Payments</span>
              <span className="hidden sm:inline">|</span>
              <span>24/7 Support</span>
              <span className="hidden sm:inline">|</span>
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
