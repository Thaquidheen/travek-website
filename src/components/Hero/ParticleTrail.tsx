"use client";

import { useRef, useEffect, MutableRefObject } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  decay: number;
  vx: number;
  vy: number;
  color: string;
}

interface ParticleTrailProps {
  planePositionRef: MutableRefObject<{ x: number; y: number }>;
}

export default function ParticleTrail({ planePositionRef }: ParticleTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastEmitRef = useRef<number>(0);
  const lastPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle configuration
    const EMIT_RATE = 30; // ms between emissions
    const PARTICLE_COUNT = 2; // particles per emission
    const PARTICLE_COLORS = ["#ffffff", "#FCD34D", "#F59E0B", "#FBBF24"];

    // Create particle
    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.6 + 0.4,
      decay: Math.random() * 0.015 + 0.008,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    });

    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x, y } = planePositionRef.current;

      // Only emit particles if plane is visible and moving
      const isMoving =
        x !== lastPositionRef.current.x || y !== lastPositionRef.current.y;

      if (
        timestamp - lastEmitRef.current > EMIT_RATE &&
        x > 0 &&
        y > 0 &&
        isMoving
      ) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          particlesRef.current.push(createParticle(x, y));
        }
        lastEmitRef.current = timestamp;
        lastPositionRef.current = { x, y };
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= particle.decay;
        particle.size *= 0.99;

        if (particle.alpha <= 0 || particle.size < 0.5) return false;

        // Draw particle core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(")", `, ${particle.alpha})`).replace("rgb", "rgba").replace("#", "");

        // Convert hex to rgba
        const hex = particle.color.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.alpha})`;
        ctx.fill();

        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${particle.alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      // Limit particle count for performance
      if (particlesRef.current.length > 150) {
        particlesRef.current = particlesRef.current.slice(-150);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [planePositionRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 15 }}
    />
  );
}
