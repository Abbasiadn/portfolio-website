"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    title: "CognitiveSaaS Engine",
    description:
      "A high-scale Laravel/React platform integrating GPT-4 for automated workflow optimization.",
    category: "Enterprise AI",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjoQGPn2SxfMMdRy-j4V_mzkTnlk-cmlUFmH3PWEzJO4nGh8I3YWPeO1HW5qcvn88s13E-DQoyO9_9l6W_UCIUD_7vtFwvb_kFgmbHB7WnRfgr3LxTGWk6Ue3oRyDzHronr989-9s1lEL15aaYPFtpBhjxgKH0hPDWVShZQepmX12211JwiTo9nBhtgzyfIfE2JT5DvKqTWxI68met07SIOeniByJmIBu-V_5Ite1yvb6I3W4lxEYwPzpZ3oZnk7qyXTgQK8rdQ5v",
    size: "large",
    stats: { users: "10K+", uptime: "99.9%", latency: "<100ms" },
  },
  {
    title: "Ether Dashboard",
    description: "Real-time monitoring for distributed networks.",
    category: "Monitoring",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACnWEcmKsd5WytUx6Djcbxm435-uzMDCNf-svTByvBhoeurpMCmp0Z6k8SLIYZfA_IEsDLBWLTNeGAlXcJZ425fAfUjkDDEopf1IlfRlUP9_WWyRTZiHMZDFIdPwg3STU32M_wXna4yR7rtTdIDs2QcXUudgnavINuze04w7UH6byzFXDQhQvKdYxYRibAWqLsH3AnLWFj2KTNCkbfRlfe7gCOZjdoqZw9W6zMovHwpYOFP27V8_Mj39M-OrTf5kcfBg12oV4UVO06",
    size: "small",
    stats: { uptime: "24/7", nodes: "500+" },
  },
  {
    title: "Flux IDE Plugin",
    description: "Intelligent syntax prediction for Next.js.",
    category: "Developer Tools",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA55iGrhY5_QvBLKvnNUrvHcb02rqi2ksoKAb6lFt7813SOyd3BLcly13YD0vk4THE0bmml1rOD2iCS5O0JqRc_DE3j9kqkk-V30euQ7iXU9HECglXE4GuEjQb_nTetaYQw595Ui94xfhaublMaqI4g3Byw3U4odJ_81jk3MXxTzKT-n04E7J5GAJ1i3PoJcH9HeuiYsmq6jhF571wRQ-E2a-Zm1_lVlakpE2RQc9XtDuAV3fR_dpYKcUM9GmPcbSYYJSuGcYshLQEY",
    size: "small",
    stats: { downloads: "5K+", rating: "4.9" },
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section className="py-24 px-8 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          Selected{" "}
          <span className="bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] bg-clip-text text-transparent">
            Deployments
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[800px] md:h-[600px]">
          {/* Large Project */}
          <ProjectCard
            project={projects[0]}
            index={0}
            isInView={isInView}
            isLarge
            isHovered={hoveredProject === 0}
            onHover={() => setHoveredProject(0)}
            onLeave={() => setHoveredProject(null)}
          />

          {/* Small Projects */}
          <ProjectCard
            project={projects[1]}
            index={1}
            isInView={isInView}
            isHovered={hoveredProject === 1}
            onHover={() => setHoveredProject(1)}
            onLeave={() => setHoveredProject(null)}
          />

          <ProjectCard
            project={projects[2]}
            index={2}
            isInView={isInView}
            isHovered={hoveredProject === 2}
            onHover={() => setHoveredProject(2)}
            onLeave={() => setHoveredProject(null)}
          />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
  isLarge = false,
  isHovered,
  onHover,
  onLeave,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className={`relative rounded-xl overflow-hidden group cursor-pointer ${
        isLarge ? "md:col-span-2" : ""
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Background Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.7 }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-container/10 to-transparent"
        animate={{
          y: ["-100%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 p-6 md:p-8 w-full">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.2 }}
          className="px-3 py-1 rounded-full bg-primary-container text-on-primary text-[10px] font-black tracking-widest uppercase mb-4 inline-block"
        >
          {project.category}
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.3 }}
          className={`font-bold mb-2 ${isLarge ? "text-3xl" : "text-xl"}`}
        >
          {project.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.4 }}
          className={`text-on-surface-variant ${isLarge ? "max-w-md" : "text-sm"} mb-6`}
        >
          {project.description}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex gap-4 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {Object.entries(project.stats).map(([key, value]: any) => (
            <div key={key} className="text-center">
              <div className="text-primary-container font-bold text-lg">
                {value}
              </div>
              <div className="text-on-surface-variant text-xs uppercase">
                {key}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#"
          className="inline-flex items-center gap-2 text-primary-container font-bold uppercase tracking-wider text-sm group/link"
          whileHover={{ x: 5 }}
        >
          {isLarge ? "Case Study" : "Explore"}{" "}
          <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </motion.a>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary-container/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary-container/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary-container/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary-container/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
