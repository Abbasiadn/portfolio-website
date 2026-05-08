"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Tooltip from "./Tooltip";
import Loader from "./Loader";

const navItems = [
  { name: "Home", href: "/", icon: "home" },
  { name: "About", href: "/about", icon: "person" },
  { name: "AI Tools", href: "/ai-tools", icon: "smart_toy" },
  { name: "Projects", href: "/projects", icon: "code_blocks" },
  { name: "Contact", href: "/contact", icon: "mail" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 18, 37, 0)", "rgba(17, 18, 37, 0.9)"],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation with loader
  const handleNavigation = (href: string) => {
    if (pathname !== href) {
      setIsNavigating(true);
      setTimeout(() => {
        window.location.href = href;
      }, 100);
    }
  };

  // Check if current path matches nav item
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Navigation Loader */}
      <AnimatePresence>
        {isNavigating && (
          <Loader
            type="pulse"
            size="md"
            text="NAVIGATING"
            fullScreen
            isLoading={isNavigating}
          />
        )}
      </AnimatePresence>

      <motion.nav
        style={{ backgroundColor: navBackground }}
        className="fixed top-0 w-full z-40 backdrop-blur-xl shadow-[0px_20px_40px_rgba(0,242,255,0.08)] scan-line"
      >
        {/* Energy beam at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px energy-beam" />

        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          {/* Logo with Tooltip */}
          <Tooltip
            content="Return to Home Base"
            type="glitch"
            icon="rocket_launch"
            position="bottom"
          >
            <Link href="/" onClick={() => handleNavigation("/")}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <h1
                  className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] bg-clip-text text-transparent glitch-text"
                  data-text="NEURAL_ARCHITECT"
                >
                  NEURAL_ARCHITECT
                </h1>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00F2FF] to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
                {/* Hologram effect on logo */}
                <div className="absolute inset-0 hologram-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Link>
          </Tooltip>

          {/* Desktop Navigation with Tooltips */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <Tooltip
                key={item.href}
                content={`Navigate to ${item.name}`}
                type="cyber"
                icon={item.icon}
                shortcut={index === 0 ? "⌘H" : undefined}
                position="bottom"
              >
                <Link
                  href={item.href}
                  onClick={() => handleNavigation(item.href)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative px-4 py-2 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`relative font-headline tracking-tighter uppercase text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                        isActive(item.href)
                          ? "text-[#00F2FF]"
                          : "text-slate-400 hover:text-[#00F2FF]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {item.icon}
                      </span>
                      {item.name}

                      {/* Active indicator */}
                      {isActive(item.href) && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#00F2FF] to-[#4D96FF]"
                        />
                      )}
                    </motion.div>

                    {/* Hover effect - cyber border */}
                    <AnimatePresence>
                      {hoveredItem === item.href && !isActive(item.href) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 cyber-border rounded-md -z-10"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </Tooltip>
            ))}
          </div>

          {/* Hire Me Button with Tooltip */}
          <Tooltip
            content="Hire Me"
            icon="connect_without_contact"
            shortcut="⌘E"
            position="bottom"
            type="neon"
          >
            <Link href="/contact" onClick={() => handleNavigation("/contact")}>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group overflow-hidden bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] text-[#00363a] px-6 py-2 rounded-md font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0px_10px_20px_rgba(0,242,255,0.2)] pixel-corners"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">
                    bolt
                  </span>
                  Hire Me
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#4D96FF] to-[#00F2FF]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 hologram-effect opacity-0 group-hover:opacity-100" />
              </motion.button>
            </Link>
          </Tooltip>
        </div>

        {/* Mobile Navigation Indicator */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent opacity-50" />
      </motion.nav>
    </>
  );
}
