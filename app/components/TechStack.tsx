"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "PHP", icon: "code", description: "Backend Logic", color: "#8892BF" },
  {
    name: "Laravel",
    icon: "terminal",
    description: "Framework Core",
    color: "#FF2D20",
  },
  {
    name: "React",
    icon: "rebase_edit",
    description: "Reactive UI",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    icon: "layers",
    description: "Full Stack JS",
    color: "#000000",
  },
  {
    name: "Python",
    icon: "psychology",
    description: "AI / ML Data",
    color: "#3776AB",
  },
  {
    name: "SQL",
    icon: "database",
    description: "Data Persistence",
    color: "#4479A1",
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="py-24 px-8 bg-surface-container-low relative overflow-hidden"
      ref={ref}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(#00F2FF_1px,transparent_1px),linear-gradient(90deg,#00F2FF_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="label-md uppercase tracking-[0.3em] text-primary-fixed-dim">
              Stack_Manifesto
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Technical Arsenal
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-on-surface-variant text-sm font-mono max-w-xs text-right relative"
          >
            <span className="inline-block animate-pulse mr-2">⬤</span>
            [SYSTEM_CORE]: MULTI-LAYER_INTEGRATION_CAPABLE
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: `0px 0px 30px ${skill.color}20`,
      }}
      className="glass-panel p-6 rounded-xl border border-outline-variant/10 hover:border-primary-container/40 transition-all duration-500 group cursor-pointer relative overflow-hidden transform-gpu preserve-3d"
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${skill.color}20, transparent 70%)`,
        }}
      />

      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative z-10"
      >
        <div className="mb-4 text-primary-container">
          <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform duration-300">
            {skill.icon}
          </span>
        </div>

        <h3 className="font-bold text-lg mb-1 group-hover:text-primary-container transition-colors">
          {skill.name}
        </h3>

        <p className="text-xs text-on-surface-variant font-mono">
          {skill.description}
        </p>

        {/* Skill level indicator */}
        <div className="mt-3 h-0.5 w-full bg-surface-variant/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-container to-secondary-container"
            initial={{ width: 0 }}
            animate={
              isInView ? { width: `${85 + Math.random() * 15}%` } : { width: 0 }
            }
            transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
