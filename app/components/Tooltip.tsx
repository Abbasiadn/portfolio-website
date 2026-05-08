"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  type?: "cyber" | "neon" | "hologram" | "glitch" | "quantum";
  delay?: number;
  className?: string;
  icon?: string;
  shortcut?: string;
}

export default function Tooltip({
  children,
  content,
  position = "top",
  type = "cyber",
  delay = 300,
  className = "",
  icon,
  shortcut,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = rect.top + scrollY - 10;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case "bottom":
        top = rect.bottom + scrollY + 10;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case "left":
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX - 10;
        break;
      case "right":
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + 10;
        break;
    }

    setTooltipPosition({ top, left });
  };

  const showTooltip = () => {
    calculatePosition();
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (type === "quantum") {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Update position on scroll
  useEffect(() => {
    if (isVisible) {
      const handleScroll = () => calculatePosition();
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [isVisible]);

  const getTransformOrigin = () => {
    switch (position) {
      case "top":
        return "bottom center";
      case "bottom":
        return "top center";
      case "left":
        return "right center";
      case "right":
        return "left center";
      default:
        return "center";
    }
  };

  const getInitialAnimation = () => {
    switch (position) {
      case "top":
        return { opacity: 0, scale: 0.8, y: 10 };
      case "bottom":
        return { opacity: 0, scale: 0.8, y: -10 };
      case "left":
        return { opacity: 0, scale: 0.8, x: 10 };
      case "right":
        return { opacity: 0, scale: 0.8, x: -10 };
      default:
        return { opacity: 0, scale: 0.8 };
    }
  };

  const getExitAnimation = () => {
    switch (position) {
      case "top":
        return { opacity: 0, scale: 0.8, y: 10 };
      case "bottom":
        return { opacity: 0, scale: 0.8, y: -10 };
      case "left":
        return { opacity: 0, scale: 0.8, x: 10 };
      case "right":
        return { opacity: 0, scale: 0.8, x: -10 };
      default:
        return { opacity: 0, scale: 0.8 };
    }
  };

  const tooltipTypes = {
    cyber: (
      <CyberTooltip
        content={content}
        icon={icon}
        shortcut={shortcut}
        position={position}
      />
    ),
    neon: (
      <NeonTooltip
        content={content}
        icon={icon}
        shortcut={shortcut}
        position={position}
      />
    ),
    hologram: (
      <HologramTooltip
        content={content}
        icon={icon}
        shortcut={shortcut}
        position={position}
      />
    ),
    glitch: (
      <GlitchTooltip
        content={content}
        icon={icon}
        shortcut={shortcut}
        position={position}
      />
    ),
    quantum: (
      <QuantumTooltip
        content={content}
        mousePosition={mousePosition}
        position={position}
      />
    ),
  };

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={getInitialAnimation()}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={getExitAnimation()}
          transition={{ duration: 0.2, type: "spring", stiffness: 200 }}
          style={{
            position: "fixed",
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform:
              position === "top" || position === "bottom"
                ? "translateX(-50%)"
                : "translateY(-50%)",
            transformOrigin: getTransformOrigin(),
            zIndex: 999999,
            pointerEvents: "none",
          }}
        >
          {tooltipTypes[type]}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={`relative inline-block ${className}`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  );
}

// Cyber Tooltip
function CyberTooltip({ content, icon, shortcut, position }: any) {
  const getArrowClass = () => {
    switch (position) {
      case "top":
        return "bottom-[-6px] left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-[-6px] left-1/2 -translate-x-1/2";
      case "left":
        return "right-[-6px] top-1/2 -translate-y-1/2";
      case "right":
        return "left-[-6px] top-1/2 -translate-y-1/2";
      default:
        return "bottom-[-6px] left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div className="relative pointer-events-auto">
      <div className="glass-panel-enhanced px-4 py-2 rounded-lg border border-primary-container/30 cyber-border shadow-2xl">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="material-symbols-outlined text-base text-[#00F2FF]">
              {icon}
            </span>
          )}
          <span className="text-xs font-headline text-on-surface whitespace-nowrap">
            {content}
          </span>
          {shortcut && (
            <kbd className="ml-2 px-2 py-0.5 text-[10px] font-mono bg-surface-container-lowest text-[#00F2FF] rounded border border-primary-container/30">
              {shortcut}
            </kbd>
          )}
        </div>
        <div className="absolute inset-0 hologram-effect rounded-lg" />
      </div>
      <div
        className={`absolute w-3 h-3 bg-primary-container/20 rotate-45 ${getArrowClass()} border-r border-b border-primary-container/30`}
      />
    </div>
  );
}

// Neon Tooltip
function NeonTooltip({ content, icon, shortcut, position }: any) {
  const getArrowClass = () => {
    switch (position) {
      case "top":
        return "bottom-[-6px] left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-[-6px] left-1/2 -translate-x-1/2";
      case "left":
        return "right-[-6px] top-1/2 -translate-y-1/2";
      case "right":
        return "left-[-6px] top-1/2 -translate-y-1/2";
      default:
        return "bottom-[-6px] left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div className="relative pointer-events-auto">
      <motion.div
        className="px-4 py-2 rounded-lg bg-black/95 border border-[#00F2FF] shadow-2xl"
        animate={{
          boxShadow: [
            "0 0 10px #00F2FF, 0 4px 20px rgba(0,0,0,0.5)",
            "0 0 20px #00F2FF, 0 4px 30px rgba(0,0,0,0.5)",
            "0 0 10px #00F2FF, 0 4px 20px rgba(0,0,0,0.5)",
          ],
          borderColor: ["#00F2FF", "#4D96FF", "#00F2FF"],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex items-center gap-2">
          {icon && (
            <motion.span
              className="material-symbols-outlined text-base text-[#00F2FF]"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {icon}
            </motion.span>
          )}
          <span className="text-xs font-headline text-[#00F2FF] whitespace-nowrap neon-flicker">
            {content}
          </span>
          {shortcut && (
            <kbd className="ml-2 px-2 py-0.5 text-[10px] font-mono bg-black/50 text-[#4D96FF] rounded border border-[#4D96FF]/50">
              {shortcut}
            </kbd>
          )}
        </div>
      </motion.div>
      <div
        className={`absolute w-3 h-3 bg-black/95 rotate-45 ${getArrowClass()} border-r border-b border-[#00F2FF]`}
      />
    </div>
  );
}

// Hologram Tooltip
function HologramTooltip({ content, icon, shortcut, position }: any) {
  const getArrowClass = () => {
    switch (position) {
      case "top":
        return "bottom-[-6px] left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-[-6px] left-1/2 -translate-x-1/2";
      case "left":
        return "right-[-6px] top-1/2 -translate-y-1/2";
      case "right":
        return "left-[-6px] top-1/2 -translate-y-1/2";
      default:
        return "bottom-[-6px] left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div className="relative pointer-events-auto">
      <div className="px-4 py-2 rounded-lg glass-panel-enhanced border border-primary-container/20 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-container/10 to-transparent animate-hologram" />
        <div className="flex items-center gap-2 relative z-10">
          {icon && (
            <span className="material-symbols-outlined text-base text-primary-container">
              {icon}
            </span>
          )}
          <span className="text-xs font-headline text-on-surface whitespace-nowrap">
            {content}
          </span>
          {shortcut && (
            <kbd className="ml-2 px-2 py-0.5 text-[10px] font-mono bg-primary-container/10 text-primary-container rounded border border-primary-container/20">
              {shortcut}
            </kbd>
          )}
        </div>
        <div className="absolute inset-0 scanning-line opacity-30" />
      </div>
      <div
        className={`absolute w-3 h-3 glass-panel-enhanced rotate-45 ${getArrowClass()} border-r border-b border-primary-container/20`}
      />
    </div>
  );
}

// Glitch Tooltip
function GlitchTooltip({ content, icon, shortcut, position }: any) {
  const getArrowClass = () => {
    switch (position) {
      case "top":
        return "bottom-[-6px] left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-[-6px] left-1/2 -translate-x-1/2";
      case "left":
        return "right-[-6px] top-1/2 -translate-y-1/2";
      case "right":
        return "left-[-6px] top-1/2 -translate-y-1/2";
      default:
        return "bottom-[-6px] left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div className="relative pointer-events-auto">
      <div className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-primary-container/30 shadow-2xl">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="material-symbols-outlined text-base text-[#00F2FF]">
              {icon}
            </span>
          )}
          <span
            className="text-xs font-headline text-on-surface whitespace-nowrap glitch-text"
            data-text={content}
          >
            {content}
          </span>
          {shortcut && (
            <kbd className="ml-2 px-2 py-0.5 text-[10px] font-mono bg-black/30 text-[#00F2FF] rounded border border-[#00F2FF]/30">
              {shortcut}
            </kbd>
          )}
        </div>
      </div>
      <div
        className="absolute inset-0 px-4 py-2 rounded-lg bg-[#00F2FF]/10 -z-10 translate-x-0.5 glitch-text pointer-events-none"
        data-text={content}
      />
      <div className="absolute inset-0 px-4 py-2 rounded-lg bg-[#FF00FF]/10 -z-20 -translate-x-0.5 pointer-events-none" />
      <div
        className={`absolute w-3 h-3 bg-surface-container-lowest rotate-45 ${getArrowClass()} border-r border-b border-primary-container/30`}
      />
    </div>
  );
}

// Quantum Tooltip
function QuantumTooltip({ content, mousePosition, position }: any) {
  const getArrowClass = () => {
    switch (position) {
      case "top":
        return "bottom-[-6px] left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-[-6px] left-1/2 -translate-x-1/2";
      case "left":
        return "right-[-6px] top-1/2 -translate-y-1/2";
      case "right":
        return "left-[-6px] top-1/2 -translate-y-1/2";
      default:
        return "bottom-[-6px] left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div className="relative pointer-events-auto">
      <div className="px-4 py-2 rounded-lg glass-panel-enhanced border border-primary-container/20 overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <span className="text-xs font-headline text-on-surface whitespace-nowrap">
            {content}
          </span>
        </div>
        <motion.div
          className="absolute w-20 h-20 bg-gradient-to-r from-[#00F2FF]/20 to-transparent rounded-full blur-xl"
          animate={{
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
          }}
          transition={{ type: "spring", damping: 20 }}
        />
      </div>
      <div
        className={`absolute w-3 h-3 glass-panel-enhanced rotate-45 ${getArrowClass()} border-r border-b border-primary-container/20`}
      />
    </div>
  );
}

// Tooltip Group for multiple tooltips
export function TooltipGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1">{children}</div>;
}

// Info Tooltip with icon
export function InfoTooltip({
  content,
  type = "cyber",
}: {
  content: string;
  type?: any;
}) {
  return (
    <Tooltip content={content} type={type} icon="info">
      <span className="material-symbols-outlined text-sm text-primary-container cursor-help">
        info
      </span>
    </Tooltip>
  );
}

// Help Tooltip with question mark
export function HelpTooltip({
  content,
  type = "cyber",
}: {
  content: string;
  type?: any;
}) {
  return (
    <Tooltip content={content} type={type} icon="help">
      <span className="material-symbols-outlined text-sm text-primary-container cursor-help">
        help
      </span>
    </Tooltip>
  );
}
