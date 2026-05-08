"use client";

import { useEffect, useRef } from "react";

import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Analyzer from "./components/Analyzer";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mouse move parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();

      const xPos = (clientX / width - 0.5) * 20;
      const yPos = (clientY / height - 0.5) * 20;

      const elements = document.querySelectorAll(".parallax");
      elements.forEach((el, index) => {
        const speed = (index + 1) * 0.5;
        (el as HTMLElement).style.transform =
          `translate(${xPos * speed}px, ${yPos * speed}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-radial-gradient from-primary-container/5 to-transparent" />
      </div>

      <Navbar />
      <main className="relative z-10">
        {/* Parallax elements */}

        <Hero />
        <TechStack />
        <Projects />
        <Analyzer />
        <Testimonials />
      </main>
    </div>
  );
}
