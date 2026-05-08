"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  isLoading?: boolean;
  type?: "cyber" | "neural" | "matrix" | "quantum" | "pulse";
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export default function Loader({
  isLoading = true,
  type = "cyber",
  size = "md",
  text = "LOADING",
  fullScreen = false,
}: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading && mounted) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isLoading, mounted]);

  const containerClasses = fullScreen
    ? "fixed inset-0 z-[9999] flex items-center justify-center"
    : "flex items-center justify-center";

  const containerStyle: React.CSSProperties = fullScreen
    ? {
        background: "rgba(17, 18, 37, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }
    : {};

  const loaders = {
    cyber: <CyberLoader size={size} progress={progress} text={text} />,
    neural: <NeuralLoader size={size} progress={progress} text={text} />,
    matrix: <MatrixLoader size={size} progress={progress} text={text} />,
    quantum: <QuantumLoader size={size} progress={progress} text={text} />,
    pulse: <PulseLoader size={size} progress={progress} text={text} />,
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={containerClasses}
          style={containerStyle}
        >
          {loaders[type]}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Cyber Loader with rotating rings
function CyberLoader({
  size,
  progress,
  text,
}: {
  size: string;
  progress: number;
  text: string;
}) {
  const sizeMap: Record<string, number> = { sm: 64, md: 96, lg: 128 };
  const pixelSize = sizeMap[size] || 96;
  const circumference = 2 * Math.PI * (pixelSize / 2 - 4);

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div className="relative" style={{ width: pixelSize, height: pixelSize }}>
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid rgba(0, 242, 255, 0.2)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Middle ring - opposite direction */}
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{
            border: "2px solid transparent",
            borderTopColor: "#00F2FF",
            borderRightColor: "#4D96FF",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            border: "1px solid rgba(0, 242, 255, 0.3)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Center glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 20px rgba(0, 242, 255, 0.3)",
              "0 0 40px rgba(0, 242, 255, 0.6)",
              "0 0 20px rgba(0, 242, 255, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="rounded-full"
            style={{
              width: 4,
              height: 4,
              backgroundColor: "#00F2FF",
            }}
          />
        </motion.div>

        {/* Progress arc */}
        {/* <svg
          className="absolute inset-0"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx={pixelSize / 2}
            cy={pixelSize / 2}
            r={pixelSize / 2 - 4}
            fill="none"
            stroke="#00F2FF"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.3s ease",
            }}
          />
        </svg> */}
      </div>

      {/* Loading text with glitch effect */}
      <div className="relative">
        <motion.span
          className="text-sm font-bold tracking-widest glitch-text"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            color: "#00F2FF",
          }}
          data-text={`${text} ${progress}%`}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text} {progress}%
        </motion.span>
      </div>

      {/* Scanning line */}
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, #00F2FF, transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

// Neural Network Loader
function NeuralLoader({
  size,
  progress,
  text,
}: {
  size: string;
  progress: number;
  text: string;
}) {
  const nodes = 8;
  const radiusMap: Record<string, number> = { sm: 30, md: 40, lg: 50 };
  const radius = radiusMap[size] || 40;

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div
        className="relative"
        style={{ width: radius * 2.5, height: radius * 2.5 }}
      >
        {/* Neural nodes */}
        {Array.from({ length: nodes }).map((_, i) => {
          const angle = (i / nodes) * Math.PI * 2;
          const x = Math.cos(angle) * radius + radius * 1.25;
          const y = Math.sin(angle) * radius + radius * 1.25;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 12,
                height: 12,
                left: x,
                top: y,
                backgroundColor: "#00F2FF",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                boxShadow: [
                  "0 0 10px #00F2FF",
                  "0 0 20px #00F2FF",
                  "0 0 10px #00F2FF",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          );
        })}

        {/* Neural connections */}
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: nodes }).map((_, i) => {
            const angle1 = (i / nodes) * Math.PI * 2;
            const x1 = Math.cos(angle1) * radius + radius * 1.25;
            const y1 = Math.sin(angle1) * radius + radius * 1.25;

            return Array.from({ length: nodes }).map((_, j) => {
              if (i >= j) return null;
              const angle2 = (j / nodes) * Math.PI * 2;
              const x2 = Math.cos(angle2) * radius + radius * 1.25;
              const y2 = Math.sin(angle2) * radius + radius * 1.25;

              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#00F2FF"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: (i + j) * 0.05,
                  }}
                />
              );
            });
          })}
        </svg>

        {/* Center brain */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 32, color: "#00F2FF" }}
          >
            psychology
          </span>
        </motion.div>
      </div>

      <div className="text-center">
        <motion.div
          className="text-xs"
          style={{
            fontFamily: "monospace",
            color: "#00F2FF",
          }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          NEURAL_NETWORK_TRAINING
        </motion.div>
        <div className="text-[10px] mt-1" style={{ color: "#849495" }}>
          Epoch: {Math.floor(progress / 10)}/10
        </div>
      </div>
    </div>
  );
}

// Matrix Digital Rain Loader
function MatrixLoader({
  size,
  progress,
  text,
}: {
  size: string;
  progress: number;
  text: string;
}) {
  const columnsMap: Record<string, number> = { sm: 8, md: 12, lg: 16 };
  const columns = columnsMap[size] || 12;
  const rows = 10;

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(0, 255, 0, 0.2)",
        }}
      >
        <div className="flex gap-1 p-4">
          {Array.from({ length: columns }).map((_, col) => (
            <div key={col} className="flex flex-col gap-1">
              {Array.from({ length: rows }).map((_, row) => (
                <motion.div
                  key={row}
                  className="text-xs"
                  style={{
                    color: "#00FF00",
                    fontFamily: "monospace",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 1 + Math.random() * 2,
                    repeat: Infinity,
                    delay: col * 0.1 + row * 0.05,
                  }}
                >
                  {String.fromCharCode(0x30a0 + Math.random() * 96)}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="text-xs animate-pulse"
          style={{
            color: "#00FF00",
            fontFamily: "monospace",
          }}
        >
          ⬤
        </span>
        <span
          className="text-xs"
          style={{
            color: "#00FF00",
            fontFamily: "monospace",
          }}
        >
          {text} {progress}%
        </span>
      </div>
    </div>
  );
}

// Quantum Particle Loader
function QuantumLoader({
  size,
  progress,
  text,
}: {
  size: string;
  progress: number;
  text: string;
}) {
  const particles = 12;

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div className="relative" style={{ width: 128, height: 128 }}>
        {/* Quantum core */}
        <motion.div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 32,
            height: 32,
          }}
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 20px #00F2FF",
              "0 0 40px #4D96FF",
              "0 0 20px #00F2FF",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "linear-gradient(135deg, #00F2FF 0%, #4D96FF 100%)",
            }}
          />
        </motion.div>

        {/* Orbiting particles */}
        {Array.from({ length: particles }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 8,
              height: 8,
              top: "50%",
              left: "50%",
              backgroundColor: "#00F2FF",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Quantum entanglement lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.circle
            cx="50%"
            cy="50%"
            r="45"
            fill="none"
            stroke="#00F2FF"
            strokeWidth="0.5"
            strokeDasharray="10 20"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="text-center">
        <div
          className="text-xs tracking-wider"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            color: "#00F2FF",
          }}
        >
          QUANTUM_ENTANGLEMENT
        </div>
        <div className="text-[10px]" style={{ color: "#849495" }}>
          Coherence: {progress}%
        </div>
      </div>
    </div>
  );
}

// Pulse Wave Loader
function PulseLoader({
  size,
  progress,
  text,
}: {
  size: string;
  progress: number;
  text: string;
}) {
  const rings = 4;

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div className="relative" style={{ width: 128, height: 128 }}>
        {Array.from({ length: rings }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid #00F2FF",
            }}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{
              scale: [1, 1.5],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 16,
            height: 16,
            backgroundColor: "#00F2FF",
          }}
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Waveform visualization */}
      <div className="flex items-center gap-1" style={{ height: 32 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: 2,
              background: "linear-gradient(180deg, #00F2FF 0%, #4D96FF 100%)",
            }}
            animate={{
              height: [8, 24, 8],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.03,
            }}
          />
        ))}
      </div>

      <div
        className="text-xs"
        style={{
          fontFamily: "monospace",
          color: "#00F2FF",
        }}
      >
        {text} {progress}%
      </div>
    </div>
  );
}
