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

const contactInfo = [
  {
    icon: "alternate_email",
    label: "Electronic Mail",
    value: "hello@neuralarchitect.io",
    link: "mailto:hello@neuralarchitect.io",
  },
  {
    icon: "location_on",
    label: "Base Operations",
    value: "Dubai, United Arab Emirates",
    link: "#",
  },
];

const socialLinks = [
  { icon: "terminal", href: "#", label: "GitHub" },
  { icon: "hub", href: "#", label: "LinkedIn" },
  { icon: "share", href: "#", label: "Twitter" },
  { icon: "forum", href: "#", label: "Discord" },
];

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "New AI Project",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "New AI Project",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Identity & Details */}
          <ContactInfoSection />

          {/* Right Side: Contact Form */}
          <ContactFormSection
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
          />
        </div>
      </main>

      {/* Map Section */}
      <MapSection />
    </>
  );
}

function ContactInfoSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-12 h-[2px] bg-primary-container origin-left"
          />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="font-headline text-primary-container uppercase tracking-[0.3em] text-sm font-bold"
          >
            Initiate Connection
          </motion.span>
        </div>

        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none text-on-surface">
          LET'S BUILD THE <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] bg-clip-text text-transparent glitch-text"
            data-text="FUTURE VOID."
          >
            FUTURE VOID.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-on-surface-variant text-lg max-w-md font-light leading-relaxed"
        >
          Ready to architect your next neural network or high-fidelity digital
          interface? Reach out through the secure channel.
        </motion.p>
      </header>

      <div className="space-y-8">
        {contactInfo.map((item, index) => (
          <ContactItem key={item.label} item={item} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="pt-8 flex gap-6"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container-high text-on-surface hover:text-[#00F2FF] transition-all relative group"
          >
            <span className="material-symbols-outlined">{social.icon}</span>
            <motion.span className="absolute -bottom-8 text-[10px] uppercase tracking-wider text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {social.label}
            </motion.span>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}

function ContactItem({ item, index }: { item: any; index: number }) {
  return (
    <motion.a
      href={item.link}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
      whileHover={{ x: 5 }}
      className="group flex items-start gap-6 p-4 rounded-xl transition-all duration-500 hover:bg-surface-container-low cursor-pointer block"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-14 h-14 rounded-full border border-outline-variant/20 flex items-center justify-center text-primary-container group-hover:border-primary-container/50 group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          {item.icon}
        </span>
      </motion.div>

      <div>
        <p className="font-headline text-xs uppercase tracking-widest text-slate-500 mb-1">
          {item.label}
        </p>
        <p className="text-xl font-medium text-on-surface group-hover:text-primary-container transition-colors">
          {item.value}
        </p>
      </div>
    </motion.a>
  );
}

function ContactFormSection({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  isSubmitted,
}: any) {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="glass-panel p-8 md:p-12 rounded-xl border border-outline-variant/10 shadow-[0px_40px_80px_rgba(0,0,0,0.3)] relative overflow-hidden"
    >
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary-container/30 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary-container/30 rounded-br-xl" />

      <form onSubmit={onSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-headline text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Identity Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-on-surface placeholder:text-slate-600 focus:ring-1 focus:ring-primary-container focus:shadow-[0_0_15px_rgba(0,242,255,0.15)] transition-all outline-none"
              placeholder="John Doe"
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-headline text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Email Address
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-on-surface placeholder:text-slate-600 focus:ring-1 focus:ring-primary-container focus:shadow-[0_0_15px_rgba(0,242,255,0.15)] transition-all outline-none"
              placeholder="john@domain.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-headline text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">
            Subject Matter
          </label>
          <div className="relative">
            <motion.select
              whileFocus={{ scale: 1.01 }}
              className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-on-surface focus:ring-1 focus:ring-primary-container focus:shadow-[0_0_15px_rgba(0,242,255,0.15)] transition-all outline-none appearance-none cursor-pointer"
              name="subject"
              value={formData.subject}
              onChange={onChange}
            >
              <option>New AI Project</option>
              <option>System Architecture</option>
              <option>Partnership Inquiry</option>
              <option>General Message</option>
            </motion.select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary-container pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-headline text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">
            Transmission Data
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-on-surface placeholder:text-slate-600 focus:ring-1 focus:ring-primary-container focus:shadow-[0_0_15px_rgba(0,242,255,0.15)] transition-all outline-none resize-none"
            placeholder="Detail your project requirements or mission objective..."
            rows={5}
            name="message"
            value={formData.message}
            onChange={onChange}
            required
          />
        </div>

        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-gradient-to-r from-[#00F2FF] to-[#4D96FF] text-on-primary py-5 rounded-lg font-headline font-bold text-lg uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,242,255,0.3)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting || isSubmitted}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isSubmitting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="material-symbols-outlined"
                  >
                    progress_activity
                  </motion.span>
                  TRANSMITTING...
                </>
              ) : isSubmitted ? (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="material-symbols-outlined"
                  >
                    check_circle
                  </motion.span>
                  TRANSMISSION SENT
                </>
              ) : (
                <>
                  Send Transmission
                  <span className="material-symbols-outlined">send</span>
                </>
              )}
            </span>
            {!isSubmitting && !isSubmitted && (
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", skewX: -15 }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-label flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-xs">lock</span>
          Encrypted 256-bit secure tunnel protocol active.
        </motion.p>
      </form>
    </motion.div>
  );
}

function MapSection() {
  const mapRef = useRef(null);
  const isInView = useInView(mapRef, { once: true });

  return (
    <motion.section
      ref={mapRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="w-full px-6 md:px-12 lg:px-24 mb-20 relative z-10"
    >
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden grayscale contrast-125 opacity-40 hover:opacity-70 transition-opacity duration-700 group">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Hs7ff-fYqxrdY8tTvHNq2YY7eZuHqxnzmwTqGAm4gS7ioj2TGbRgLEXepIRlP-xLaN2CL6LXa7Lz4nKIDRrARMLt0kXRiyB4fr8vf9ZVzzR2jYH5ITcMjN2N0YTHfws3zYxry_WGo2BYJqs7YagosQ2Im9Xdt70YCvdro7cj2lsF_vtH8W-SpH4IPM4Rz0VHQ-w-wFC_MwcMvKb9LBuGOUnbdl6My2-NSfaohYSb4Ch6FIQeB0i2PqCLH5w6ITy92fX_ReyXN3BJ"
          alt="Futuristic night cityscape of Dubai"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/40" />

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-container/10 to-transparent"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Animated location pin */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-6 h-6 bg-primary-container rounded-full"
            />
            <div className="w-6 h-6 bg-primary-container rounded-full shadow-[0_0_20px_#00F2FF] relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 bg-white/30 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Location label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 left-6 glass-panel px-4 py-2 rounded-lg border border-primary-container/30"
        >
          <p className="text-xs uppercase tracking-widest text-primary-container font-bold">
            Base Operations: Dubai, UAE
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
