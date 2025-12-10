"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import { Search, User, ChevronDown, Globe, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "#tours" },
  { label: "Countries", href: "/countries" },
  { label: "Services", href: "#services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Animate mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.from(".mobile-nav-item", {
        x: -20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  // Initial entrance animation
  useGSAP(
    () => {
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".nav-logo", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".nav-actions", {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: navRef }
  );

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-dark/90 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="nav-logo flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-dark" />
            </div>
            <span className="text-white font-semibold text-base sm:text-lg">
              travel agency
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.href} className="nav-item">
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-primary transition-colors text-sm font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="nav-actions hidden sm:flex items-center gap-3 lg:gap-4">
            <button className="text-white/80 hover:text-primary transition-colors p-2">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white/80 hover:text-primary transition-colors p-2">
              <User className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-1 text-white/80 hover:text-primary transition-colors text-sm p-2">
              En
              <ChevronDown className="w-4 h-4" />
            </button>
            <Link
              href="#book"
              className="bg-primary hover:bg-primary-dark text-dark font-semibold px-4 lg:px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 text-sm"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu with Glassmorphism */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden mt-2"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="pt-4 pb-6 bg-dark/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href} className="mobile-nav-item">
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className="block text-white/90 hover:text-primary hover:bg-white/5 transition-colors text-base font-medium py-3 px-4 rounded-lg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Actions */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 px-4">
              <button className="text-white/80 hover:text-primary transition-colors p-2">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-white/80 hover:text-primary transition-colors p-2">
                <User className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-1 text-white/80 hover:text-primary transition-colors text-sm p-2">
                En
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Book Now Button */}
            <div className="mt-4 px-4">
              <Link
                href="#book"
                onClick={handleNavClick}
                className="block w-full bg-primary hover:bg-primary-dark text-dark font-semibold px-6 py-3 rounded-full transition-all duration-300 text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
