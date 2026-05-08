"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0b0c1f] w-full py-12 px-8 border-t border-[#3a494b]/15 relative overflow-hidden">
      {/* Animated border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-container to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-lg font-black text-[#00F2FF] mb-2 uppercase tracking-widest relative group cursor-pointer">
            NEURAL ARCHITECT
            <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] group-hover:w-full transition-all duration-300" />
          </div>
          <div className="font-body text-xs tracking-widest uppercase text-slate-500">
            © 2024 NEURAL ARCHITECT. ENGINEERED FOR THE VOID.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-8"
        >
          {["GitHub", "LinkedIn", "Twitter", "Discord"].map((social, index) => (
            <motion.a
              key={social}
              href="#"
              className="font-body text-xs tracking-widest uppercase text-slate-500 hover:text-[#4D96FF] transition-all relative group"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {social}
              <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] group-hover:w-full transition-all duration-300" />
              {/* Neon dot */}
              <motion.span
                className="absolute -top-1 -right-1 w-1 h-1 bg-primary-container rounded-full"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring" }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom scan line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-container/30 to-transparent" />
    </footer>
  );
}
