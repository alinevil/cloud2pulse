import { Search, ShieldAlert, FileWarning } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
  {
    icon: Search,
    title: "Copilot Sees Everything",
    description:
      "Copilot for M365 inherits your users' permissions. If access controls are misconfigured, it surfaces confidential data to anyone who asks. Most organizations don't know until it's too late.",
  },
  {
    icon: ShieldAlert,
    title: "Oversharing Is the New Breach",
    description:
      "Without proper data encryption and retention policies, sensitive files, emails, and reports leak across teams silently. Your security baseline needs to match Copilot's speed.",
  },
  {
    icon: FileWarning,
    title: "Compliance Can't Keep Up",
    description:
      "GDPR, CCPA, SOC 2 weren't designed for AI assistants. If Copilot accesses patient records, financial data, or PII without data privacy controls, you're exposed.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const ProblemSection = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute top-0 left-1/2 w-64 h-64 bg-destructive/10 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
            AI Is Moving Fast.{" "}
            <span className="text-gradient">Your Security Isn't.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Adopting Copilot for Microsoft 365 without improving your security baseline first is like giving everyone in the company a master key. The AI works brilliantly, but it exposes every permission mistake you've ever made.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
