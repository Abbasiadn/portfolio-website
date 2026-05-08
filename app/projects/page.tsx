"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

const PARTICLE_POSITIONS = generateParticlePositions(20);

const projects = [
  {
    id: 1,
    title: "Synapse Engine",
    description:
      "A real-time neural processing core designed for low-latency edge computing and autonomous decision-making.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPMeYMBBxae41Egh0PZQwPdNYEXuWzH8-agKaT2CKxtXtCSuylBlN5Y5mUg1fTemdw-hq6TjrZhy7eC6I1rfgiOB0kEw8VFFo0Zv4U4umAdpLHJ_WOronH2axSFVRU-jl50MEMFf9G2cZhXmsJiyNt_MysQ3kJLDEcUPmV36A85kzbPR4FRO_PH7SKCWS_azdKTmjWlZg-bHgVyw0RASYOgNgItjf3dR8lPPG2WF07sc5EO00pNtDRLogMQy3LL3lLPQlcWdHiozZb",
    technologies: ["PyTorch", "CUDA", "FastAPI"],
    aiComplexity: 94,
    icon: "deployed_code",
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "Void Architect",
    description:
      "Generative CAD system utilizing transformer models to produce hyper-optimized structural designs for orbital habitats.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYaloGm_fAhknI8d3UnEG8KMEHX0_63pWXFza_dPmTncs4krc3eR25U97Q1s5m0xhndOQVynt71TXJk0w5OtaFXwz7r7bvgIAMuBn9M0Y6K_W782rKyqrht8mZpsNmgOr1Ru4sp9HFzvZLzA78YSwDP-S_FM3GjiljUkzRONhyg6NOAINbURm5uTjyJjpcFfD17FHIsN61T63r6Q5ErAaCTjOd9Jirm15vv29m6AQqkm76ZrcYllxsqYkZFzka86v3NSTjCC7y1beX",
    technologies: ["Three.js", "OpenAI", "Rust"],
    aiComplexity: 88,
    icon: "architecture",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Sentience Mesh",
    description:
      "A decentralized multi-agent system where small AI models collaborate to solve complex optimization problems.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyPhHaBqDBDHn3y8JYIMrNdzVRItKO_WjNEweshyCrYHIunkSotJMjcrvLtzU2DTfqgM7iqnjijuDY3ok_ksarKeFXETVYnRtCTltMX-Jl1ngSmwUYv6fEsu7Q1lb834HEouv6A8WiXQ70lU0_simUUsrRdz0FroyzJA5u74XUc2cHbnqp1OA8-rCNHz9ksucJ9yKvGP1bFVH2tsQIT7Nh5928WGImncLJDxge3ve2JoyOWpg1dL4co7hnBVa-VUXQ7WLhYBdMFp_o",
    technologies: ["Solidity", "LangChain", "Node.js"],
    aiComplexity: 76,
    icon: "hub",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Neural Vision OS",
    description:
      "A spatial computing operating system powered by multimodal LLMs, enabling zero-latency gestural control and environment mapping.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBq5Jgch6ci5aan3FbBKLKfHA9jXTY7UbaI6MLxRCdkUE0dGEE3Zx-PAaD1Avpc7k06UCgIkBLmAhqg3RGDU_JdTQQ4vVmulToFPDy4m7NZpNGyLzLS1d6qWiuUHFu-ZzW0uHiUaxEor9AL4mihYw2c5tWLXAaotCdRket6kiW45dzuFCrVagLNWYAkx7EGpNYFK2Bsw3FlbESmtVk2Bfpp20DLJUaAZpcpDP07ifJBRM0WQNT9xqrK6ui6MzM1Ldk841s765PsST-D",
    technologies: ["C++", "TensorFlow", "OpenCV", "Unity"],
    aiComplexity: 99,
    icon: "visibility",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 5,
    title: "Storm Predictor",
    description:
      "Hyper-local weather forecasting using GANs to simulate atmospheric turbulence with 95% accuracy up to 72 hours.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8I9xWc_lRZqpQtqxev6AQy2ERXFFPtmKcaC5TAR9krLm73LG6QClNnNiIFOcw6I6iajfWlW4i6tyYGx26lE3U8SGLaEKyULM5u1kh2aObTCtIKDXnKXOH_3-tLF8QPJW0qosVAZp2XVXmT7k6208DpIKaGuLldrJ1WL_ORMdkBiRgquUKr-MhAfhGxduxLWxYrNTAoiv3QEAa3wieORUAo4igepP-CXpvs6oKik7uu1WMm3vFDnBsq3Ata6FHrFVPJWHEtLzbnJ3g",
    technologies: ["Python", "Keras", "AWS"],
    aiComplexity: 82,
    icon: "thunderstorm",
    github: "#",
    demo: "#",
  },
];

const coreTechnologies = [
  {
    number: "01",
    title: "Deep Learning",
    description: "LLMs, GANs, Transformers",
  },
  {
    number: "02",
    title: "Architecture",
    description: "Serverless, Microservices, Edge",
  },
  {
    number: "03",
    title: "Interfaces",
    description: "Next.js, Three.js, WebGL",
  },
  { number: "04", title: "Systems", description: "Rust, C++, Go, Python" },
];

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {mounted &&
          PARTICLE_POSITIONS.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-primary-container/30 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
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

      <div className="pt-32 pb-20 px-8 max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <HeroHeader />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Core Technologies Section */}
        <CoreTechnologiesSection technologies={coreTechnologies} />
      </div>
    </>
  );
}

function HeroHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="h-[1px] w-12 bg-primary-container origin-left"
        />
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="font-headline text-primary-container tracking-widest uppercase text-xs font-bold"
        >
          Project Archive 2024
        </motion.span>
      </div>

      <h1 className="font-headline text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-none">
        CRAFTING{" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] bg-clip-text text-transparent glitch-text"
          data-text="DIGITAL"
        >
          DIGITAL
        </motion.span>{" "}
        INTELLIGENCE.
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-on-surface-variant max-w-2xl text-lg leading-relaxed font-light"
      >
        An editorial collection of neural networks, autonomous agents, and
        architectural interfaces built to push the boundaries of the digital
        void.
      </motion.p>
    </motion.header>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  if (project.featured) {
    return (
      <motion.article
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group lg:col-span-2 flex flex-col md:flex-row surface-container-high rounded-xl overflow-hidden glass-panel ghost-border transition-all duration-500 hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="md:w-1/2 relative overflow-hidden">
          <motion.img
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7 }}
            className="object-cover w-full h-full"
            src={project.image}
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-high/40 to-transparent md:block hidden" />

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-container/10 to-transparent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="p-8 md:w-1/2 flex flex-col">
          <div className="mb-4">
            <motion.span
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="px-3 py-1 bg-primary-container text-on-primary-container rounded-sm text-[10px] font-bold uppercase tracking-widest mb-4 inline-block"
            >
              Flagship Project
            </motion.span>
            <h3 className="font-headline text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-on-surface-variant text-base mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech: string) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-wider"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="mt-auto">
            <div className="mb-8">
              <div className="flex justify-between text-[10px] font-headline uppercase tracking-widest text-primary-container mb-2">
                <span>AI Complexity</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                >
                  {project.aiComplexity}%
                </motion.span>
              </div>
              <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={
                    isInView ? { width: `${project.aiComplexity}%` } : {}
                  }
                  transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#00F2FF] to-[#4D96FF]"
                  style={{ boxShadow: "0 0 15px #00F2FF" }}
                />
              </div>
            </div>

            <div className="flex gap-8">
              <motion.a
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary hover:text-white transition-colors group/link"
                href={project.github}
              >
                <span className="material-symbols-outlined text-lg">code</span>
                GitHub Repository
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary hover:text-white transition-colors group/link"
                href={project.demo}
              >
                <span className="material-symbols-outlined text-lg">
                  videocam
                </span>
                Case Study
              </motion.a>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group flex flex-col surface-container-high rounded-xl overflow-hidden glass-panel ghost-border transition-all duration-500 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        <motion.img
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7 }}
          className="object-cover w-full h-full"
          src={project.image}
          alt={project.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high to-transparent opacity-60" />

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-container/10 to-transparent"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-headline text-2xl font-bold text-white tracking-tight group-hover:text-primary-container transition-colors">
            {project.title}
          </h3>
          <motion.span
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="material-symbols-outlined text-primary-container"
          >
            {project.icon}
          </motion.span>
        </div>

        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech: string) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-wider"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="mb-6">
            <div className="flex justify-between text-[10px] font-headline uppercase tracking-widest text-primary-container mb-2">
              <span>AI Complexity</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
              >
                {project.aiComplexity}%
              </motion.span>
            </div>
            <div className="h-1 w-full bg-surface-variant rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${project.aiComplexity}%` } : {}}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#00F2FF] to-[#4D96FF]"
                style={{ boxShadow: "0 0 10px #00F2FF" }}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <motion.a
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary hover:text-white transition-colors group/link"
              href={project.github}
            >
              <span className="material-symbols-outlined text-base">code</span>
              GitHub
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary hover:text-white transition-colors group/link"
              href={project.demo}
            >
              <span className="material-symbols-outlined text-base">
                open_in_new
              </span>
              Live Demo
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CoreTechnologiesSection({ technologies }: { technologies: any[] }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mt-40"
    >
      <h2 className="font-headline text-4xl font-bold tracking-tight text-white mb-12">
        Core Technologies
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.number}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-8 surface-container-low rounded-xl border-l-4 border-primary-container flex flex-col justify-center cursor-pointer group"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="font-headline text-primary-container font-bold text-3xl mb-2 group-hover:scale-110 transition-transform"
            >
              {tech.number}
            </motion.span>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">
              {tech.title}
            </h4>
            <p className="text-[10px] text-on-surface-variant mt-2">
              {tech.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
