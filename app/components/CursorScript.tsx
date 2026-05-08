"use client";

import { useEffect } from "react";

export default function CursorScript() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update cursor pseudo-elements position via CSS custom properties
      document.documentElement.style.setProperty(
        "--cursor-x",
        e.clientX + "px",
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        e.clientY + "px",
      );
    };

    // Create and inject dynamic style for cursor positioning
    const style = document.createElement("style");
    style.textContent = `
      body::before {
        left: var(--cursor-x, -100px) !important;
        top: var(--cursor-y, -100px) !important;
      }
      body::after {
        left: var(--cursor-x, -100px) !important;
        top: var(--cursor-y, -100px) !important;
      }
    `;
    document.head.appendChild(style);

    window.addEventListener("mousemove", handleMouseMove);

    // Set initial position
    document.documentElement.style.setProperty("--cursor-x", "-100px");
    document.documentElement.style.setProperty("--cursor-y", "-100px");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
