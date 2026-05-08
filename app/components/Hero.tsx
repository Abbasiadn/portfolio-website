"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";

// Generate deterministic positions based on index
const generateParticlePositions = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    // Use a seeded pseudo-random approach based on index
    const seed = i * 0.123456789;
    const left = (Math.sin(seed) * 0.5 + 0.5) * 100;
    const top = (Math.cos(seed * 2) * 0.5 + 0.5) * 100;
    const duration = 2 + (i % 3);
    const delay = (i * 0.5) % 2;
    return { left, top, duration, delay };
  });
};

const PARTICLE_POSITIONS = generateParticlePositions(20);

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);

  const springConfig = { damping: 25, stiffness: 700 };
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [15, -15]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-15, 15]),
    springConfig,
  );

  useEffect(() => {
    setIsClient(true);
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Don't render animated content until client-side hydration is complete
  if (!mounted) {
    return (
      <section className="relative pt-32 pb-20 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 rounded-full border border-primary-container/20 bg-primary-container/5">
              <span className="text-xs font-bold tracking-widest uppercase text-primary-container flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Building Scalable Web Systems
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
              I'm Adnan <br />
              <span className="bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] bg-clip-text text-transparent">
                Full Stack
              </span>{" "}
              <br />
              Developer
            </h1>
            <p className="text-on-surface-variant text-lg max-w-lg leading-relaxed">
              Full Stack Web Developer focused on designing and developing
              scalable web applications, SaaS products, and robust API-driven
              systems with a strong emphasis on performance and clean
              architecture.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="relative group overflow-hidden bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] text-[#00363a] px-8 py-4 rounded-md font-bold uppercase tracking-widest transition-all pixel-corners">
                View Portfolio
              </button>
              <button className="relative border border-primary-container/20 bg-transparent text-primary-container px-8 py-4 rounded-md font-bold uppercase tracking-widest transition-all">
                Analyze Job Description
              </button>
            </div>
          </div>
          <div className="relative aspect-square rounded-xl overflow-hidden glass-panel border border-outline-variant/10">
            <div className="w-full h-full bg-surface-container-lowest/50" />
          </div>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] -z-10" />
      </section>
    );
  }

  return (
    <section className="relative pt-32 pb-20 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block px-3 py-1 rounded-full border border-primary-container/20 bg-primary-container/5"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-primary-container flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Building Scalable Web Systems
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
            I'm Adnan <br />
            <span className="bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] bg-clip-text text-transparent">
              {isClient && (
                <TypeAnimation
                  sequence={[
                    "Full Stack Web",
                    2000,
                    "SaaS Platform",
                    2000,
                    "Scalable Web Apps",
                    2000,
                    "React & Next.js",
                    2000,
                    "Laravel Backend",
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              )}
            </span>{" "}
            <br />
            Developer
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-on-surface-variant text-lg max-w-lg leading-relaxed"
          >
            Full Stack Web Developer focused on designing and developing
            scalable web applications, SaaS products, and robust API-driven
            systems with a strong emphasis on performance and clean
            architecture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] text-[#00363a] px-8 py-4 rounded-md font-bold uppercase tracking-widest hover:shadow-[0px_0px_30px_rgba(0,242,255,0.3)] transition-all pixel-corners"
            >
              <span className="relative z-10">View Portfolio</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", skewX: -15 }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative border border-primary-container/20 bg-transparent text-primary-container px-8 py-4 rounded-md font-bold uppercase tracking-widest hover:bg-primary-container/10 transition-all overflow-hidden group"
            >
              <span className="relative z-10">Analyze Job Description</span>
              <motion.div
                className="absolute inset-0 bg-primary-container/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative group"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
        >
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"
            animate={{
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            style={{ rotateX, rotateY }}
            className="relative aspect-square rounded-xl overflow-hidden glass-panel border border-outline-variant/10 transform-gpu"
          >
            <img
              alt="Futuristic developer illustration"
              className="w-full h-full object-cover mix-blend-lighten opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCv7IJzfpwo457O_9yPFRg05xZZmlP3Bp22u6EUAcWf1u-dyBCxfm6Otbm69_ojHTXSXEYPySwVf-7FOoItBKDfJ7bz7A_KzDIT9pjhb6-3CuXtzzHCKgwmJIfj4JBpgWhIaAhkWSwjJCAvZ1h3-yVCE0fwafNAqG7NCBJSPy9funltwf8mukqzdwq9nF4bL1wBBpCRMK2h6ZUCMfH0f09pdWeF0heHyokTA84cDfEGabXxfLADkgZZs6r9_g3Xse07_xgyudB6rqt"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#00F2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F2FF]/20 to-transparent"
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Fixed: Use deterministic positions instead of Math.random() */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLE_POSITIONS.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-container/30 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
            }}
          />
        ))}
      </div>
    </section>
  );
}
