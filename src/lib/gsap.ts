"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

// Default animation settings
gsap.defaults({
  duration: 1,
  ease: "power2.out",
});

export { gsap, ScrollTrigger, MotionPathPlugin };
