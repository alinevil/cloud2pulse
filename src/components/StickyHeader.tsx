import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLeadCapture } from "@/contexts/LeadCaptureContext";

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useLeadCapture();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6 md:px-12">
        <a href="#" className="flex items-center gap-2">
          <img src="/logo.png" alt="Cloud2Pulse" className="h-8 w-auto" />
          <span className="text-lg font-bold text-foreground">Cloud2Pulse</span>
        </a>

        <button
          onClick={openModal}
          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-button transition-all"
        >
          Book Free Call
        </button>
      </div>
    </motion.header>
  );
};

export default StickyHeader;
