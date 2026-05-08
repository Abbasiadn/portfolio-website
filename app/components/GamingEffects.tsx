"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Particle Field Component
export function ParticleField({ count = 50, className = "" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-container/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Cyber Grid Component
export function CyberGrid({ className = "" }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0 hexagon-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,242,255,0.05)_100%)]" />
    </div>
  );
}

// Energy Shield Effect
export function EnergyShield({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00F2FF] via-[#4D96FF] to-[#00F2FF] rounded-lg blur opacity-30 animate-pulse" />
      <div className="relative">{children}</div>
    </div>
  );
}

// Scanning Line Effect
export function ScanningLine({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// Glitch Container
export function GlitchContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative group ${className}`}>
      {children}
      <div className="absolute inset-0 bg-[#00F2FF] opacity-0 group-hover:opacity-10 transition-opacity duration-100 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[#FF00FF] opacity-0 group-hover:opacity-10 transition-opacity duration-100 delay-50 mix-blend-overlay translate-x-0.5" />
    </div>
  );
}

// Neon Border Box
export function NeonBorderBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-lg border border-primary-container/30 animate-pulse" />
      <div className="absolute inset-0 rounded-lg border border-transparent bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] opacity-0 hover:opacity-20 transition-opacity duration-500" />
      {children}
    </div>
  );
}

// Animated Counter
export function AnimatedCounter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count}</span>;
}

// Radar Scanner
export function RadarScanner({ className = "" }) {
  return (
    <div className={`relative w-64 h-64 radar-sweep ${className}`}>
      <div className="absolute inset-0 rounded-full border border-primary-container/20" />
      <div className="absolute inset-2 rounded-full border border-primary-container/10" />
      <div className="absolute inset-4 rounded-full border border-primary-container/5" />
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#00F2FF] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00F2FF]" />
    </div>
  );
}

// Digital Rain Effect
export function DigitalRain({ className = "" }) {
  return (
    <div className={`matrix-rain ${className}`}>
      <div className="absolute inset-0 opacity-10" />
    </div>
  );
}

// Loading Spinner with Cyber Style
export function CyberSpinner({ className = "" }) {
  return (
    <div className={`relative w-12 h-12 ${className}`}>
      <motion.div
        className="absolute inset-0 border-2 border-transparent border-t-[#00F2FF] border-r-[#4D96FF] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 border-2 border-transparent border-b-[#00F2FF] border-l-[#4D96FF] rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 bg-[#00F2FF] rounded-full shadow-[0_0_10px_#00F2FF]" />
      </div>
    </div>
  );
}
