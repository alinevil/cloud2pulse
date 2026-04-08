import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { useLeadCapture } from "@/contexts/LeadCaptureContext";

const stats = [
  { value: 550, suffix: "%", label: "Faster Threat Detection with Copilot" },
  { value: 204, suffix: "%", label: "More Policy Gaps Discovered by AI" },
  { value: 200, suffix: "h", label: "Saved Monthly Automating False Positives" },
  { value: 60, suffix: "%", label: "Faster Analysis with Security Copilot" },
];

const testimonials = [
  {
    quote: "We were about to close a $2M enterprise deal but got stuck on the security questionnaire. Cloud2Pulse did our full assessment in 3 weeks, and we passed SOC 2 readiness review on the first try. That one deal paid for the engagement 10x over.",
    name: "Sarah Chen",
    title: "CTO",
    company: "SaaS Company",
  },
  {
    quote: "I've worked with three different security firms. They all gave me massive reports I couldn't act on. Cloud2Pulse was the first team that actually sat with our engineers and helped us FIX things. 47 vulnerabilities found and resolved in under 30 days.",
    name: "Marcus Rivera",
    title: "VP Engineering",
    company: "Fintech Startup",
  },
  {
    quote: "Our cyber insurance premium dropped 28% after we implemented Cloud2Pulse's recommendations. The assessment literally paid for itself in insurance savings alone, and we found 12 critical issues we had no idea existed.",
    name: "Jennifer Walsh",
    title: "CFO",
    company: "Healthtech Company",
  },
];

function AnimatedCounter({ target, suffix, prefix }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          step();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black text-gradient">
      {prefix}{count}{suffix}
    </div>
  );
}

const SocialProofSection = () => {
  const { openModal } = useLeadCapture();

  return (
    <section id="results" className="section-padding relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground/60 text-center mb-16">Source: Microsoft Security Copilot adoption data</p>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass-card p-8 flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary/40 mb-4" />
              <p className="text-foreground italic leading-relaxed mb-6 flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.title}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA after testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg glow-button transition-all hover:scale-[1.02]"
          >
            Book Your Free Consultation Call
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
