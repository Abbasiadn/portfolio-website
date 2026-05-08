"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "Adnan's ability to bridge the gap between complex AI logic and a fluid frontend is unparalleled. He transformed our data stream into a masterpiece.",
    name: "Sarah Chen",
    title: "CTO, SynthX Labs",
    featured: false,
  },
  {
    quote:
      "The neural architect we needed. The Laravel integration he built handles millions of requests while maintaining incredible AI response times.",
    name: "Marcus Thorne",
    title: "Lead Engineer, Vortex AI",
    featured: true,
  },
  {
    quote:
      "Clean code, visionary architectural decisions, and an obsession with UI precision. Adnan is a rare hybrid developer.",
    name: "Elena Rodriguez",
    title: "Founder, NeuralFlow",
    featured: false,
  },
];

// Generate deterministic particle positions
const generateParticlePositions = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const seed = i * 0.987654321;
    const left = (Math.sin(seed) * 0.5 + 0.5) * 100;
    const top = (Math.cos(seed * 3) * 0.5 + 0.5) * 100;
    const duration = 2 + (i % 4);
    const delay = (i * 0.7) % 3;
    return { left, top, duration, delay };
  });
};

const PARTICLE_POSITIONS = generateParticlePositions(30);

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeIndex, setActiveIndex] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-24 px-8 relative" ref={ref}>
      {/* Background particles - only render after mount */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLE_POSITIONS.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-primary-container/40 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: pos.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-primary-container to-white bg-clip-text text-transparent">
            Collaborator Feedback
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              isInView={isInView}
              isActive={activeIndex === index}
              onHover={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-primary-container"
                  : "w-2 bg-surface-variant hover:bg-primary-container/50"
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              animate={activeIndex === index ? { width: 32 } : { width: 8 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
  isInView,
  isActive,
  onHover,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -10 }}
      onMouseEnter={onHover}
      className={`relative p-8 rounded-xl border transition-all duration-500 cursor-pointer ${
        isActive
          ? "glass-panel border-primary-container/40 scale-105 bg-surface-container-high z-10 shadow-[0px_20px_40px_rgba(0,0,0,0.4),0px_0px_30px_rgba(0,242,255,0.1)]"
          : "glass-panel border-outline-variant/10"
      }`}
    >
      <motion.span
        className="material-symbols-outlined text-5xl text-primary-container/20 absolute top-4 right-4"
        animate={{
          rotate: isActive ? [0, 10, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        format_quote
      </motion.span>

      <p
        className={`italic mb-8 leading-relaxed relative ${
          isActive ? "text-on-surface" : "text-on-surface-variant"
        }`}
      >
        <span className="relative">
          {testimonial.quote}
          {isActive && (
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-container to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3 }}
            />
          )}
        </span>
      </p>

      <div className="flex items-center gap-4">
        <motion.div
          className={`w-12 h-12 rounded-full border-2 transition-colors ${
            isActive
              ? "bg-primary-container/20 border-primary-container/40"
              : "bg-surface-variant border-transparent"
          }`}
          whileHover={{ scale: 1.1 }}
        >
          {isActive && (
            <motion.div
              className="w-full h-full rounded-full bg-gradient-to-br from-primary-container to-secondary-container"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          )}
        </motion.div>

        <div className="text-left">
          <div className="font-bold">{testimonial.name}</div>
          <div
            className={`text-xs transition-colors ${
              isActive ? "text-primary-container" : "text-on-surface-variant"
            }`}
          >
            {testimonial.title}
          </div>
        </div>
      </div>

      {testimonial.featured && (
        <motion.div
          className="absolute -top-3 -left-3 px-3 py-1 bg-primary-container text-on-primary text-[10px] font-black tracking-widest uppercase rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          Featured
        </motion.div>
      )}

      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary-container rounded-full"
          layoutId="active-indicator"
        />
      )}
    </motion.div>
  );
}
