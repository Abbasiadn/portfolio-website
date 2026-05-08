"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Your actual skills, experience, and projects data
const MY_PROFILE = {
  name: "Adnan Abbasi",
  title: "Full Stack Developer & AI Engineer",
  skills: {
    backend: ["PHP", "Laravel", "Python", "Node.js", "REST APIs", "GraphQL"],
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5/CSS3",
    ],
    database: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite"],
    devops: ["Docker", "Git", "GitHub Actions", "AWS", "Nginx", "Apache"],
    ai_ml: [
      "TensorFlow",
      "OpenAI API",
      "LangChain",
      "Pandas",
      "NumPy",
      "Scikit-learn",
    ],
  },
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      highlights: [
        "Built scalable Laravel backend serving 50K+ daily users",
        "Developed React dashboard with real-time analytics",
        "Implemented AI-powered recommendation system using Python",
        "Optimized database queries reducing response time by 60%",
      ],
    },
    {
      title: "PHP/Laravel Developer",
      company: "WebStudio Agency",
      period: "2019 - 2022",
      highlights: [
        "Developed 15+ Laravel applications for various clients",
        "Created custom CMS using Laravel Nova",
        "Built RESTful APIs consumed by React Native mobile apps",
        "Integrated payment gateways (Stripe, PayPal)",
      ],
    },
    {
      title: "Junior Web Developer",
      company: "Digital Creations",
      period: "2017 - 2019",
      highlights: [
        "Maintained and enhanced legacy PHP applications",
        "Migrated jQuery frontend to React components",
        "Implemented responsive designs with Bootstrap",
      ],
    },
  ],
  projects: [
    {
      name: "AI Content Generator",
      description:
        "SaaS platform using Laravel backend with OpenAI integration",
      technologies: [
        "Laravel",
        "PHP",
        "React",
        "MySQL",
        "OpenAI API",
        "Tailwind CSS",
      ],
      features: [
        "AI text generation",
        "Subscription management",
        "Real-time editing",
      ],
      link: "#",
    },
    {
      name: "E-Commerce Analytics Dashboard",
      description: "Real-time analytics platform for e-commerce businesses",
      technologies: [
        "Next.js",
        "Laravel",
        "PostgreSQL",
        "Chart.js",
        "WebSockets",
      ],
      features: [
        "Live sales tracking",
        "Customer behavior analysis",
        "Predictive insights",
      ],
      link: "#",
    },
    {
      name: "TaskFlow Pro",
      description:
        "Project management tool with AI-powered task prioritization",
      technologies: ["React", "Node.js", "MongoDB", "Express", "TensorFlow.js"],
      features: ["Kanban boards", "Time tracking", "AI task suggestions"],
      link: "#",
    },
    {
      name: "Crypto Portfolio Tracker",
      description: "Cryptocurrency portfolio management with real-time prices",
      technologies: ["Laravel", "Vue.js", "MySQL", "Redis", "CoinGecko API"],
      features: ["Portfolio tracking", "Price alerts", "Performance analytics"],
      link: "#",
    },
  ],
  certifications: [
    "Microsoft Certified: Azure Solutions Architect",
    "AWS Certified Developer - Associate",
    "Laravel Certified Developer",
    "TensorFlow Developer Certificate",
  ],
};

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

interface SkillMatch {
  skill: string;
  category: string;
  matchScore: number;
  yearsOfExperience: number;
  relevantProjects: string[];
}

interface AnalysisResult {
  overallMatch: number;
  skillMatches: SkillMatch[];
  topSkills: SkillMatch[];
  missingSkills: string[];
  relevantExperience: string[];
  suggestedProjects: typeof MY_PROFILE.projects;
  keywordMatches: string[];
  aiRecommendations: string[];
}

export default function AIToolsPage() {
  const [mounted, setMounted] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const analyzeJobDescription = (text: string): AnalysisResult => {
    const lowerText = text.toLowerCase();

    // Flatten all skills
    const allSkills = Object.entries(MY_PROFILE.skills).flatMap(
      ([category, skills]) => skills.map((skill) => ({ skill, category })),
    );

    // Calculate skill matches
    const skillMatches: SkillMatch[] = allSkills.map(({ skill, category }) => {
      const skillLower = skill.toLowerCase();
      const isMatch = lowerText.includes(skillLower);

      // Calculate years of experience based on career timeline
      let yearsOfExperience = 0;
      MY_PROFILE.experience.forEach((exp) => {
        const periodYears =
          parseInt(exp.period.split(" - ")[1]) -
          parseInt(exp.period.split(" - ")[0]);
        if (exp.highlights.some((h) => h.toLowerCase().includes(skillLower))) {
          yearsOfExperience += periodYears;
        }
      });

      // Find relevant projects
      const relevantProjects = MY_PROFILE.projects
        .filter((p) =>
          p.technologies.some((t) => t.toLowerCase().includes(skillLower)),
        )
        .map((p) => p.name);

      // Calculate match score
      let matchScore = 0;
      if (isMatch) {
        matchScore = 50; // Base score for mention
        if (
          lowerText.includes(`experience with ${skillLower}`) ||
          lowerText.includes(`proficient in ${skillLower}`)
        ) {
          matchScore += 30;
        }
        if (yearsOfExperience > 2) matchScore += 20;
        if (relevantProjects.length > 0) matchScore += 10;
      }

      return {
        skill,
        category,
        matchScore: Math.min(matchScore, 100),
        yearsOfExperience,
        relevantProjects,
      };
    });

    // Sort by match score
    const sortedMatches = skillMatches.sort(
      (a, b) => b.matchScore - a.matchScore,
    );

    // Top skills (score > 60)
    const topSkills = sortedMatches
      .filter((s) => s.matchScore > 60)
      .slice(0, 8);

    // Missing skills (not mentioned but have experience)
    const missingSkills = skillMatches
      .filter((s) => s.matchScore === 0 && s.yearsOfExperience > 0)
      .slice(0, 5)
      .map((s) => s.skill);

    // Find keyword matches
    const keywords = [
      "php",
      "laravel",
      "react",
      "next.js",
      "python",
      "tensorflow",
      "aws",
      "docker",
      "mysql",
      "postgresql",
      "mongodb",
      "redis",
      "api",
      "rest",
      "graphql",
      "javascript",
      "typescript",
      "node",
      "express",
      "vue",
    ];

    const keywordMatches = keywords.filter((kw) => lowerText.includes(kw));

    // Calculate overall match
    const overallMatch = Math.round(
      topSkills.reduce((sum, s) => sum + s.matchScore, 0) /
        Math.max(topSkills.length, 1),
    );

    // Generate AI recommendations
    const aiRecommendations: string[] = [];

    if (lowerText.includes("php") || lowerText.includes("laravel")) {
      aiRecommendations.push(
        "Highlight your Laravel certification and 15+ Laravel projects experience",
      );
    }

    if (lowerText.includes("react") || lowerText.includes("next.js")) {
      aiRecommendations.push(
        "Emphasize your React/Next.js projects including the AI Content Generator",
      );
    }

    if (
      lowerText.includes("python") ||
      lowerText.includes("ai") ||
      lowerText.includes("machine learning")
    ) {
      aiRecommendations.push(
        "Showcase your Python AI/ML experience with TensorFlow and OpenAI integration",
      );
    }

    if (topSkills.length > 0) {
      aiRecommendations.push(
        `You match ${topSkills.length} key skills - make these prominent in your resume`,
      );
    }

    // Suggest relevant projects
    const suggestedProjects = MY_PROFILE.projects.filter((project) =>
      project.technologies.some((tech) =>
        keywordMatches.some((kw) => tech.toLowerCase().includes(kw)),
      ),
    );

    // Relevant experience highlights
    const relevantExperience = MY_PROFILE.experience
      .filter((exp) =>
        exp.highlights.some((highlight) =>
          keywordMatches.some((kw) => highlight.toLowerCase().includes(kw)),
        ),
      )
      .map((exp) => `${exp.title} at ${exp.company}`);

    return {
      overallMatch,
      skillMatches: sortedMatches,
      topSkills,
      missingSkills,
      relevantExperience,
      suggestedProjects,
      keywordMatches,
      aiRecommendations,
    };
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = analyzeJobDescription(jobDescription);
    setAnalysisResult(result);

    setIsAnalyzing(false);
  };

  // Sample job description for demo
  const loadSampleJD = () => {
    setJobDescription(`Senior Full Stack Developer

We are looking for an experienced Full Stack Developer with strong PHP and Laravel skills. The ideal candidate will have experience building scalable web applications and RESTful APIs.

Requirements:
- 5+ years of experience with PHP and Laravel framework
- Strong proficiency in React and Next.js
- Experience with MySQL and database optimization
- Knowledge of Docker and AWS services
- Familiarity with Python for AI/ML integration is a plus
- Experience with real-time applications using WebSockets
- Strong understanding of RESTful API design
- Git version control

Responsibilities:
- Develop and maintain Laravel-based backend services
- Build responsive React frontends with Next.js
- Design and optimize database schemas
- Integrate third-party APIs and AI services
- Implement real-time features and analytics dashboards
- Write clean, maintainable, and testable code

Nice to Have:
- Experience with TensorFlow or OpenAI API
- Knowledge of GraphQL
- DevOps experience with CI/CD pipelines`);
  };

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

      <div className="pt-24 min-h-screen px-6 lg:px-12 pb-12 max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <HeaderSection onLoadSample={loadSampleJD} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Section */}
          <InputSection
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />

          {/* Results Section */}
          {analysisResult && (
            <ResultsSection result={analysisResult} isAnalyzing={isAnalyzing} />
          )}
        </div>
      </div>
    </>
  );
}

function HeaderSection({ onLoadSample }: { onLoadSample: () => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-container font-headline text-xs tracking-[0.3em] uppercase mb-2 block"
          >
            Analyzer_Core v2.4 | Profile: Adnan Abbasi
          </motion.span>

          <h1 className="text-5xl lg:text-7xl font-headline font-bold tracking-tighter text-on-surface leading-none">
            JOB{" "}
            <span
              className="bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] bg-clip-text text-transparent glitch-text"
              data-text="INTELLIGENCE"
            >
              INTELLIGENCE
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-outline max-w-xl body-md"
          >
            AI-powered analysis matching your PHP/Laravel expertise, React
            skills, and project experience against job requirements.
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onLoadSample}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 border border-primary-container/30 text-primary-container rounded-md text-xs uppercase tracking-widest hover:bg-primary-container/10 transition-all"
        >
          Load Sample JD
        </motion.button>
      </div>
    </motion.header>
  );
}

function InputSection({
  jobDescription,
  setJobDescription,
  onAnalyze,
  isAnalyzing,
}: any) {
  return (
    <motion.section
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="lg:col-span-5 space-y-6"
    >
      <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <motion.span
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="material-symbols-outlined text-primary-container/20 text-4xl"
          >
            terminal
          </motion.span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-primary-container"
          />
          <h2 className="font-headline text-sm uppercase tracking-widest text-primary-fixed-dim">
            Source Input
          </h2>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-outline mb-2 block">
              Job Description Text
            </span>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-96 bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary-container focus:ring-0 text-on-surface font-body text-sm p-4 rounded-t-lg transition-all resize-none"
              placeholder="Paste the full job description here to analyze against your PHP, Laravel, React, and AI/ML expertise..."
            />
          </label>

          <div className="pt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAnalyze}
              disabled={isAnalyzing || !jobDescription.trim()}
              className="relative bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] text-on-primary px-8 py-3 rounded-md font-headline font-bold uppercase text-xs tracking-widest transition-all shadow-[0px_10px_20px_rgba(0,242,255,0.2)] pixel-corners overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isAnalyzing ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="material-symbols-outlined text-sm"
                    >
                      progress_activity
                    </motion.span>
                    ANALYZING PROFILE...
                  </>
                ) : (
                  "Analyze Against My Profile"
                )}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ResultsSection({ result, isAnalyzing }: any) {
  return (
    <section className="lg:col-span-7 space-y-6">
      {/* Overall Match Score */}
      <MatchScoreCard overallMatch={result.overallMatch} />

      {/* Top Skill Matches */}
      <SkillMatchesCard topSkills={result.topSkills} />

      {/* Project Matches */}
      <ProjectMatchesCard projects={result.suggestedProjects} />

      {/* Missing Skills & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MissingSkillsCard missingSkills={result.missingSkills} />
        <RecommendationsCard recommendations={result.aiRecommendations} />
      </div>

      {/* Relevant Experience */}
      <ExperienceCard experience={result.relevantExperience} />
    </section>
  );
}

function MatchScoreCard({ overallMatch }: { overallMatch: number }) {
  const [displayScore, setDisplayScore] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const controls = animate(0, overallMatch, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (value) => {
        setDisplayScore(Math.round(value));
        if (circleRef.current) {
          const circumference = 2 * Math.PI * 88;
          const offset = circumference - (value / 100) * circumference;
          circleRef.current.style.strokeDashoffset = String(offset);
        }
      },
    });
    return controls.stop;
  }, [overallMatch]);

  const getMatchLevel = (score: number) => {
    if (score >= 80) return { text: "Excellent Match", color: "#00F2FF" };
    if (score >= 60) return { text: "Strong Match", color: "#4D96FF" };
    if (score >= 40) return { text: "Moderate Match", color: "#FFB74D" };
    return { text: "Low Match", color: "#EF5350" };
  };

  const matchLevel = getMatchLevel(overallMatch);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/5"
    >
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-surface-container-lowest"
              cx="64"
              cy="64"
              fill="transparent"
              r="56"
              stroke="currentColor"
              strokeWidth="6"
            />
            <circle
              ref={circleRef}
              cx="64"
              cy="64"
              fill="transparent"
              r="56"
              stroke={matchLevel.color}
              strokeDasharray="351.86"
              strokeDashoffset="351.86"
              strokeLinecap="round"
              strokeWidth="6"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={displayScore}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-headline font-bold text-on-surface"
            >
              {displayScore}%
            </motion.span>
          </div>
        </div>

        <div className="flex-1">
          <h3
            className="font-headline text-xl font-bold"
            style={{ color: matchLevel.color }}
          >
            {matchLevel.text}
          </h3>
          <p className="text-sm text-outline mt-1">
            Based on analysis of your PHP/Laravel expertise, React skills, and
            project experience
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SkillMatchesCard({ topSkills }: { topSkills: SkillMatch[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10"
    >
      <h3 className="font-headline text-xs uppercase tracking-widest text-primary-container mb-4">
        Top Skill Matches
      </h3>

      <div className="space-y-3">
        {topSkills.map((skill, index) => (
          <motion.div
            key={skill.skill}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="group"
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-on-surface">
                  {skill.skill}
                </span>
                <span className="text-[10px] text-outline uppercase">
                  {skill.category}
                </span>
              </div>
              <span className="text-xs font-bold" style={{ color: "#00F2FF" }}>
                {skill.matchScore}%
              </span>
            </div>
            <div className="h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.matchScore}%` }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                className="h-full bg-gradient-to-r from-[#00F2FF] to-[#4D96FF]"
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-outline">
                {skill.yearsOfExperience}+ years experience
              </span>
              {skill.relevantProjects.length > 0 && (
                <span className="text-[10px] text-primary-container">
                  Used in: {skill.relevantProjects.slice(0, 2).join(", ")}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectMatchesCard({
  projects,
}: {
  projects: typeof MY_PROFILE.projects;
}) {
  if (projects.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10"
    >
      <h3 className="font-headline text-xs uppercase tracking-widest text-primary-container mb-4">
        Relevant Projects to Highlight
      </h3>

      <div className="space-y-4">
        {projects.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ x: 5 }}
            className="p-4 bg-surface-container-high/50 rounded-lg border border-outline-variant/20 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-headline font-bold text-sm group-hover:text-primary-container transition-colors">
                  {project.name}
                </h4>
                <p className="text-xs text-outline mt-1">
                  {project.description}
                </p>
              </div>
              <span className="material-symbols-outlined text-primary-container text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                open_in_new
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-primary-container/10 text-primary-container rounded text-[10px] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function MissingSkillsCard({ missingSkills }: { missingSkills: string[] }) {
  if (missingSkills.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <span className="material-symbols-outlined text-6xl">lightbulb</span>
      </div>

      <h3 className="font-headline text-xs uppercase tracking-widest text-yellow-500 mb-4">
        Skills to Mention
      </h3>

      <p className="text-xs text-outline mb-4">
        You have experience with these skills but they weren't highlighted in
        the job description:
      </p>

      <div className="flex flex-wrap gap-2">
        {missingSkills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + index * 0.05, type: "spring" }}
            className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs border border-yellow-500/30"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function RecommendationsCard({
  recommendations,
}: {
  recommendations: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10"
    >
      <h3 className="font-headline text-xs uppercase tracking-widest text-[#00F2FF] mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">auto_awesome</span>
        AI Recommendations
      </h3>

      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-start gap-3 text-xs text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-primary-container text-sm mt-0.5">
              check_circle
            </span>
            {rec}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function ExperienceCard({ experience }: { experience: string[] }) {
  if (experience.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10"
    >
      <h3 className="font-headline text-xs uppercase tracking-widest text-primary-container mb-4">
        Relevant Experience to Emphasize
      </h3>

      <div className="flex flex-wrap gap-3">
        {experience.map((exp, index) => (
          <motion.div
            key={exp}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-lg"
          >
            <span className="material-symbols-outlined text-primary-container text-sm">
              work
            </span>
            <span className="text-sm text-on-surface">{exp}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
