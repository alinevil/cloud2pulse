import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What is a Copilot Security Assessment?",
    a: "It's a service designed to improve your security baseline required for the full adoption of Copilot for Microsoft 365. We assess your current M365 security posture, identify gaps, and implement the controls needed for a safe Copilot deployment.",
  },
  {
    q: "How long does the assessment take?",
    a: "Most assessments are completed within 30 days from kickoff. Complex environments may take up to 45 days. We'll give you an exact timeline during your free consultation call.",
  },
  {
    q: "Will this disrupt our production systems?",
    a: "No. We work within your existing M365 environment using non-destructive review methodologies. Your systems stay up, your users notice nothing.",
  },
  {
    q: "We already have Copilot deployed. Is it too late?",
    a: "Not at all. In fact, it's even more urgent. We can audit your current Copilot deployment, identify oversharing risks, and remediate access control issues before they become incidents.",
  },
  {
    q: "What compliance frameworks do you cover?",
    a: "GDPR, CCPA, SOC 2, HIPAA, PCI-DSS, and ISO 27001. We map our findings directly to the framework(s) relevant to your business.",
  },
  {
    q: "Can this be offered to our clients as a reseller?",
    a: "Yes. The Copilot Security Assessment can be delivered as a pre-packaged service directly to the end customer or as an enablement service for resellers, from service design to execution.",
  },
  {
    q: "What specific areas do you assess?",
    a: "Access control, data privacy and encryption policies, secure configuration, code review practices, monitoring and logging, employee training and awareness. We cover both technical and organizational aspects.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on the scope of your environment: number of users, M365 services in use, compliance requirements, and whether Copilot is already deployed. Book a free consultation call and we'll give you an exact quote within 24 hours.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-card px-6 border-none"
              >
                <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
