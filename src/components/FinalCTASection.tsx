import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLeadCapture } from "@/contexts/LeadCaptureContext";

const FinalCTASection = () => {
  const { openModal } = useLeadCapture();

  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(263_70%_58%/0.15)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">
            Don't Deploy Copilot Without a Security Baseline.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book a free 30-minute consultation. We'll review your M365 security posture and show you exactly what needs to happen before (or after) Copilot goes live.
          </p>

          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 px-10 py-5 rounded-lg bg-primary text-primary-foreground font-bold text-xl glow-button transition-all hover:scale-[1.02]"
          >
            Book Your Free Consultation Call
            <ArrowRight className="w-6 h-6" />
          </button>

          <p className="text-sm text-amber-400/80 mt-6">
            We take on maximum <span className="font-semibold">5 new clients per month</span>. Limited spots available.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            No contracts. No commitment. Just clarity on your security posture.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
