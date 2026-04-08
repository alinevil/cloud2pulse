import { ArrowRight } from "lucide-react";
import CopilotVisual from "./CopilotVisual";
import { motion } from "framer-motion";
import { useLeadCapture } from "@/contexts/LeadCaptureContext";

const HeroSection = () => {
  const { openModal } = useLeadCapture();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-grid-pattern">
      {/* Gradient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 pt-24 pb-16">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <img src="/logo.png" alt="" className="h-4 w-auto" />
              Copilot Security Assessment for Microsoft 365
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground mb-6"
            >
              Your Copilot Can Access Data It Shouldn't.{" "}
              <span className="text-gradient">We Find It and Fix It.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl"
            >
              We improve your security baseline for full Copilot for Microsoft 365 adoption. From access control and data encryption to compliance and incident response, delivered as a pre-packaged service or as enablement for resellers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg glow-button transition-all hover:scale-[1.02] w-full sm:w-auto justify-center"
              >
                Book Your Free Consultation Call
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-muted-foreground mt-4"
            >
              Free 30-min call · No commitment · See exactly where you're exposed
            </motion.p>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2 hidden lg:flex items-center justify-center"
          >
            <CopilotVisual />
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20 border-t border-border pt-10"
        >
          <p className="text-sm text-muted-foreground text-center mb-6">Trusted by teams at:</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
            {["Acme Corp", "Quantum", "NovaTech", "Helix AI", "Vertex"].map((name) => (
              <span key={name} className="text-lg font-bold text-foreground tracking-wide">{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
