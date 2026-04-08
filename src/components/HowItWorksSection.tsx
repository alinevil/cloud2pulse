import { Search, ShieldCheck, ClipboardList, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    title: "Phase 1: Security Assessment",
    description: "Baseline security posture review for M365. Gap analysis covering access control, data privacy, encryption policies, secure configuration, code review practices, monitoring and logging, employee training.",
  },
  {
    icon: ClipboardList,
    title: "Phase 2: Security Enhancement",
    description: "Crafting a security enhancement proposal informed by Phase 1 findings. Security controls implementation covering both technical and organizational aspects.",
  },
  {
    icon: ShieldCheck,
    title: "Phase 3: Copilot Deployment",
    description: "Secure Copilot rollout with proper RBAC, sensitivity labels, data loss prevention policies, and data retention rules in place. Every permission verified before go-live.",
  },
  {
    icon: Handshake,
    title: "Phase 4: Ongoing Support",
    description: "Post-deployment monitoring, incident response plan validation, and employee awareness training. We stay with you to make sure everything holds.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding relative">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            <span className="text-gradient">Service Approach</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From assessment to execution. A structured engagement to secure your M365 environment for full Copilot adoption.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-24 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30" />

          <div className="grid lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card p-8 relative transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
              >
                <div className="text-5xl font-black text-gradient opacity-30 mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical layout */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex gap-5"
            >
              <div className="flex-shrink-0">
                <div className="text-3xl font-black text-gradient opacity-30">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
