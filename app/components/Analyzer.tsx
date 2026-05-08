"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Analyzer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <section className="py-24 px-8 relative bg-surface-container-low" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="glass-panel p-12 rounded-xl border border-primary-container/10 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative"
        >
          {/* Animated background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-container/5 rounded-full blur-3xl" />
          </div>

          <div className="flex-1 space-y-6 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="w-12 h-1 bg-gradient-to-r from-primary-container to-transparent mb-2"
            />

            <h2 className="text-4xl font-bold">
              The Analyzer{" "}
              <motion.span
                className="text-primary-container inline-block"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                v2.1
              </motion.span>
            </h2>

            <p className="text-on-surface-variant text-lg">
              Stop guessing. My custom AI tool parses job descriptions to
              identify key technological requirements and generates a strategy
              for your application.
            </p>

            <div className="space-y-4 pt-4">
              {[
                "IDENTIFY KEY SKILL GAPS",
                "PREDICT INTERVIEW TOPICS",
                "OPTIMIZE RESUME SEMANTICS",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="material-symbols-outlined text-primary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </motion.span>
                  <span className="text-sm font-mono tracking-tighter group-hover:text-primary-container transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 bg-surface-container-highest border border-primary-container/30 text-primary-container px-8 py-4 rounded-md font-bold uppercase tracking-widest hover:bg-primary-container hover:text-[#00363a] transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Access Beta Tool</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-container to-secondary-container"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </div>

          <div className="flex-1 w-full md:w-auto relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-2xl relative overflow-hidden"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-error animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-secondary-container" />
                <div className="w-3 h-3 rounded-full bg-primary-container animate-pulse" />
                <span className="ml-2 text-xs font-mono text-on-surface-variant">
                  ANALYZER_SESSION
                </span>
              </div>

              <div className="space-y-3">
                <div className="h-4 w-3/4 bg-surface-variant rounded relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-container/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="h-4 w-full bg-surface-variant rounded relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-container/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                </div>

                <div className="h-24 w-full bg-surface-variant/30 rounded border border-dashed border-outline-variant/50 relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="PASTE_JOB_DESCRIPTION_HERE"
                    className="w-full h-full bg-transparent p-3 text-xs font-mono text-on-surface-variant resize-none focus:outline-none focus:border-primary-container/50"
                  />

                  {/* Cursor blink */}
                  {!inputValue && (
                    <motion.span
                      className="absolute top-3 left-3 w-0.5 h-3 bg-primary-container"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    onClick={handleAnalyze}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-8 px-4 bg-primary-container/20 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-primary-container/40 transition-colors"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.span
                          className="w-3 h-3 border-2 border-primary-container border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        ANALYZING...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-sm">
                          play_arrow
                        </span>
                        ANALYZE
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Analysis results overlay */}
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-surface-container-lowest/95 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      className="text-4xl mb-4"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      🧠
                    </motion.div>
                    <p className="font-mono text-xs text-primary-container">
                      NEURAL_NETWORK_PROCESSING
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Neon glow effect */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-primary-container/10 blur-[60px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
