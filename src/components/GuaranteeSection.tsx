import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const GuaranteeSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-card gradient-border p-10 md:p-14 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-pulse" style={{ animationDuration: "3s" }}>
            <ShieldCheck className="w-8 h-8 text-success" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
            Our "No Blind Spots" Guarantee
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
            If our assessment doesn't uncover at least <span className="text-foreground font-semibold">10 previously unknown vulnerabilities</span>, or if you feel the action plan isn't clear and actionable, we'll extend all support for <span className="text-foreground font-semibold">90 days free</span>. Full refund available within 60 days, no questions asked.
          </p>

          <p className="text-sm text-muted-foreground mb-8">
            In 5+ years, we've never had to honor this guarantee.
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success/10 border border-success/20 text-success font-bold">
            <ShieldCheck className="w-5 h-5" />
            100% Risk-Free
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
