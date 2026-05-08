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

const PARTICLE_POSITIONS = generateParticlePositions(25);

const techStack = [
  {
    name: "React.js",
    icon: "code",
    description: "Frontend Development",
  },
  {
    name: "Next.js",
    icon: "bolt",
    description: "Full Stack Web Apps",
  },
  {
    name: "Node.js",
    icon: "node",
    description: "Backend Development",
  },
  {
    name: "Laravel",
    icon: "layers",
    description: "API & Backend Systems",
  },
  {
    name: "REST APIs",
    icon: "api",
    description: "Integration & Services",
  },
  {
    name: "PostgreSQL / MySQL",
    icon: "database",
    description: "Database Design",
  },
];
const timelineData = [
  {
    title: "Software Engineer",
    company: "Intrapreneur",
    period: "Sep 2024 — Present",
    highlights: [
      "Developing scalable web applications using modern full stack technologies.",
      "Building and maintaining SaaS-based features with focus on performance and usability.",
      "Working on backend APIs and frontend interfaces for production systems.",
    ],
    active: true,
  },
  {
    title: "Web & PHP Developer Intern",
    company: "Hidaya Software House",
    period: "Feb 2024 — May 2024",
    highlights: [
      "Worked on web development projects using PHP and modern frontend technologies.",
      "Developed and maintained dynamic web applications and admin panels.",
      "Collaborated with senior developers to improve code quality and system functionality.",
    ],
    active: false,
  },
];

const certifications = [
  {
    title: "MERN Stack Development",
    validUntil: "IBA / Government of Sindh • 4 Months",
  },
  {
    title: "PHP Programming",
    validUntil: "ZABTECH ITVE Hyderabad • 4 Months",
  },
];
export default function AboutPage() {
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

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <HeroSection mounted={mounted} />

        {/* Tech Stack */}
        <TechStackSection techStack={techStack} />

        {/* Timeline & Education */}
        <TimelineEducationSection
          timelineData={timelineData}
          certifications={certifications}
        />

        {/* Contact CTA */}
        <ContactSection />
      </div>
    </>
  );
}

function HeroSection({ mounted }: { mounted: boolean }) {
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: true });

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-7"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container border border-outline-variant/20 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-pulse" />
          <span className="text-xs font-headline uppercase tracking-widest font-bold">
            Full Stack Developer
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter mb-8 leading-none">
          ADNAN <br />
          <span className="bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] bg-clip-text text-transparent">
            ABBASI
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl font-light"
        >
          I am a Computer Science graduate and Full Stack Engineer focused on
          building scalable web applications, SaaS platforms, and
          high-performance systems. I specialize in system architecture,
          algorithm optimization, and API-driven development using modern
          technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex gap-4"
        >
          <StatItem value="2+" label="Years Experience" />
          <div className="w-px h-12 bg-outline-variant/30 self-center" />
          <StatItem value="10+" label="Project Completed" />
        </motion.div>
      </motion.div>

      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="lg:col-span-5 relative"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="aspect-square rounded-xl overflow-hidden glass border border-outline-variant/20 relative z-10"
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVID2JNaXs0qSeQEUdhxT8Uf5RoBCk3uGN0EhxAlGYw9c6gqqaHKOwIj_xa6D7p5RIwEFuUEPyBGf1JKIDo2vJUtw-vOG7E74_jt_719qGYS-_iQtiJusQlpC5-gpcb-mvuGLKucm1ge4rRmMKIL0xM9fWltqwbq_P9UQpViHWD8Z_Hg_RygaT1cLcsBXGqt-K-UW4S47X2ALiMYAajzc8efEekLs5eUulTSxSKNwUAxo26_21t4TWcFSbzFvNgxxUq2mVYqAuFVM3"
            alt="Professional portrait of Adnan Abbasi"
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F2FF]/10 to-transparent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <div className="absolute -top-6 -right-6 w-full h-full bg-primary-container/5 rounded-xl -z-0" />

        <motion.div
          className="absolute -bottom-6 -left-6 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -z-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && value.includes("+")) {
      const target = parseInt(value);
      let current = 0;
      const timer = setInterval(() => {
        if (current < target) {
          current++;
          setCount(current);
        } else {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-3xl font-headline font-bold text-[#00F2FF]">
        {count > 0 ? `${count}+` : value}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
        {label}
      </span>
    </div>
  );
}

function TechStackSection({ techStack = [] }: { techStack: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="mb-32">
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        className="text-3xl font-headline font-bold tracking-tighter mb-12 flex items-center gap-4"
      >
        <span className="text-[#00F2FF]">01</span> TECH_STACK
        <span className="h-px grow bg-gradient-to-r from-outline-variant/50 to-transparent" />
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {techStack.map((tech: any, index: number) => (
          <TechCard
            key={tech.name}
            tech={tech}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
}

function TechCard({ tech, index, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="p-6 glass border border-outline-variant/10 rounded-xl hover:border-[#00F2FF]/40 transition-all group cursor-pointer relative overflow-hidden"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-[#00F2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <motion.span
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="material-symbols-outlined text-4xl text-[#00F2FF] mb-4 block relative z-10"
      >
        {tech.icon}
      </motion.span>

      <h3 className="font-headline font-bold text-sm tracking-tight mb-1 relative z-10">
        {tech.name}
      </h3>

      <p className="text-[10px] text-slate-500 uppercase tracking-widest relative z-10">
        {tech.description}
      </p>
    </motion.div>
  );
}

function TimelineEducationSection({ timelineData, certifications }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
      <TimelineSection timelineData={timelineData} />
      <EducationCertSection certifications={certifications} />
    </div>
  );
}

function TimelineSection({ timelineData }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="lg:col-span-7">
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        className="text-3xl font-headline font-bold tracking-tighter mb-12 flex items-center gap-4"
      >
        <span className="text-[#00F2FF]">02</span> CAREER_TIMELINE
      </motion.h2>

      <div className="relative pl-8 border-l border-outline-variant/30 space-y-12">
        {timelineData.map((item: any, index: number) => (
          <TimelineItem
            key={index}
            item={item}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ item, index, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className="relative"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.1, type: "spring" }}
        className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-4 ${
          item.active
            ? "border-[#00F2FF] shadow-[0_0_10px_rgba(0,242,255,0.5)]"
            : "border-outline-variant"
        }`}
      >
        {item.active && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#00F2FF]/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      <div className="flex justify-between items-start mb-2">
        <h3 className="font-headline font-bold text-xl">{item.title}</h3>
        <span
          className={`text-xs font-headline font-bold uppercase tracking-widest ${
            item.active ? "text-[#00F2FF]" : "text-slate-500"
          }`}
        >
          {item.period}
        </span>
      </div>

      <p className="text-slate-500 text-sm mb-4">{item.company}</p>

      {item.highlights ? (
        <ul className="space-y-2 text-on-surface-variant text-sm list-none">
          {item.highlights.map((highlight: string, i: number) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.3 + i * 0.1 }}
              className="flex gap-2"
            >
              <span className="text-[#00F2FF] opacity-50">/</span>
              {highlight}
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-on-surface-variant text-sm">{item.description}</p>
      )}
    </motion.div>
  );
}

function EducationCertSection({ certifications }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="lg:col-span-5 space-y-16">
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="text-3xl font-headline font-bold tracking-tighter mb-12"
        >
          <span className="text-[#00F2FF]">03</span> EDUCATION
        </motion.h2>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            whileHover={{ x: 10 }}
            className="p-6 bg-surface-container-low rounded-xl border-l-4 border-[#00F2FF]"
          >
            <h3 className="font-headline font-bold text-lg">
              M.S. in Computer Science
            </h3>
            <p className="text-sm text-slate-400 mb-2"> University Of Sindh </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Specialization in AI & Distributed Systems
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            whileHover={{ x: 10 }}
            className="p-6 bg-surface-container-low rounded-xl border-l-4 border-outline-variant"
          >
            <h3 className="font-headline font-bold text-lg">
              B.S. in Computer Science
            </h3>
            <p className="text-sm text-slate-400">University of Sindh</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Specialization in computing & Algorithm
            </p>
          </motion.div>
        </div>
      </div>

      <div>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="text-3xl font-headline font-bold tracking-tighter mb-12"
        >
          <span className="text-[#00F2FF]">04</span> CERTIFICATIONS
        </motion.h2>

        <div className="grid grid-cols-1 gap-4">
          {certifications.map((cert: any, index: number) => (
            <CertificationCard
              key={index}
              cert={cert}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CertificationCard({ cert, index, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={{ scale: 1.02, x: 5 }}
      className="flex items-center gap-4 p-4 glass border border-outline-variant/10 rounded-xl group cursor-pointer"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center"
      >
        <span className="material-symbols-outlined text-[#00F2FF]">
          verified
        </span>
      </motion.div>

      <div>
        <h4 className="text-sm font-bold font-headline group-hover:text-[#00F2FF] transition-colors">
          {cert.title}
        </h4>
        <p className="text-[10px] text-slate-500 uppercase">
          {cert.validUntil}
        </p>
      </div>
    </motion.div>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="relative p-12 md:p-24 overflow-hidden rounded-3xl bg-surface-container-lowest border border-outline-variant/20"
    >
      <div className="relative z-10 text-center">
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={isInView ? { scale: 1 } : {}}
          className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-8 leading-tight"
        >
          READY TO ARCHITECT THE <br />
          <span
            className="text-[#00F2FF] glitch-text"
            data-text="NEXT DIMENSION?"
          >
            NEXT DIMENSION?
          </span>
        </motion.h2>

        <p className="text-slate-400 mb-12 max-w-xl mx-auto">
          Currently accepting high-impact consultancy projects and technical
          architecture leadership roles.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] text-on-primary font-headline font-black uppercase tracking-widest rounded-md transition-all shadow-[0px_20px_40px_rgba(0,242,255,0.2)] pixel-corners relative overflow-hidden group"
            href="mailto:contact@adnanabbasi.tech"
          >
            <span className="relative z-10">Initialize Contact</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%", skewX: -15 }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-[#00F2FF]/30 text-[#00F2FF] font-headline font-black uppercase tracking-widest rounded-md hover:bg-[#00F2FF]/10 transition-all"
            href="#"
          >
            Download Dossier (CV)
          </motion.a>
        </div>
      </div>

      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-[#00F2FF]/5 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-[#4D96FF]/5 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#3a494b 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
    </motion.section>
  );
}
