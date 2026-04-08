import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLeadCapture } from "@/contexts/LeadCaptureContext";

const items = [
  {
    name: "Data Access Control",
    desc: "Limit Copilot access to authorized personnel only. RBAC implementation to restrict access based on job roles. MFA enforcement to prevent unauthorized access.",
  },
  {
    name: "Data Encryption",
    desc: "Encrypt data in transit using HTTPS/TLS. Encrypt sensitive data at rest to prevent unauthorized access across your M365 environment.",
  },
  {
    name: "Data Privacy Compliance",
    desc: "Ensure compliance with GDPR, CCPA, and other regulations when using Copilot. Full alignment with terms of service and privacy policies.",
  },
  {
    name: "Data Retention Policies",
    desc: "Define and enforce data retention policies for Copilot data. Securely delete or archive unneeded data in compliance with regulations.",
  },
  {
    name: "Incident Response Plan",
    desc: "Develop and test a response plan for data security incidents. Define roles, escalation procedures, and communication protocols.",
  },
];

const ValueStackSection = () => {
  const { openModal } = useLeadCapture();

  return (
    <section id="what-you-get" className="section-padding relative">
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-4"
        >
          What's Covered in Your{" "}
          <span className="text-gradient">Copilot Security Assessment</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          Everything you need to secure your M365 environment before, during, and after Copilot deployment.
        </motion.p>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card gradient-border p-8 md:p-10 space-y-6 mb-10">
            {items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4"
              >
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

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
            <p className="text-sm text-muted-foreground mt-4">
              Available as a direct service or as enablement for resellers.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueStackSection;
