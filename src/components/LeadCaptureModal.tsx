import { useState } from "react";
import { X, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLeadCapture } from "@/contexts/LeadCaptureContext";
import { saveLead } from "@/lib/leads";

const qualifySteps = [
  {
    key: "company",
    label: "What's your company name?",
    options: null, // free text for company name only
  },
  {
    key: "role",
    label: "What's your role?",
    options: ["CEO / Founder", "CTO / VP Engineering", "CISO / Security Lead", "Engineering Manager", "DevOps / Infrastructure", "Other"],
  },
  {
    key: "employees",
    label: "How many employees?",
    options: ["1-10", "11-50", "51-200", "201-500", "500+"],
  },
  {
    key: "compliance",
    label: "Do you have compliance needs?",
    multi: true,
    options: ["SOC 2", "ISO 27001", "HIPAA", "PCI-DSS", "GDPR", "Not sure yet", "None"],
  },
  {
    key: "concern",
    label: "What's your biggest security concern?",
    options: [
      "We need compliance for an enterprise deal",
      "We've never had a security assessment",
      "We were recently breached or had an incident",
      "Investors / board require a security audit",
      "We want to reduce our cyber insurance premiums",
      "General security hardening",
    ],
  },
];

type Answers = Record<string, string | string[]>;

const LeadCaptureModal = () => {
  const { isOpen, closeModal } = useLeadCapture();
  const [phase, setPhase] = useState<"info" | "qualify" | "booking">("info");
  const [qStep, setQStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Contact info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Qualifying answers
  const [answers, setAnswers] = useState<Answers>({});

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setPhase("info");
      setQStep(0);
      setName("");
      setEmail("");
      setPhone("");
      setAnswers({});
    }, 300);
  };

  const selectAnswer = (key: string, value: string, multi?: boolean) => {
    if (multi) {
      const current = (answers[key] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [key]: updated });
    } else {
      setAnswers({ ...answers, [key]: value });
      // Auto-advance after selection
      setTimeout(() => advanceQualify(key, value), 200);
    }
  };

  const advanceQualify = (key?: string, value?: string | string[]) => {
    const currentStep = qualifySteps[qStep];
    const answer = value ?? answers[currentStep.key];

    if (!answer || (Array.isArray(answer) && answer.length === 0)) return;

    if (qStep < qualifySteps.length - 1) {
      setQStep(qStep + 1);
    } else {
      // All done, save and go to booking
      setLoading(true);
      const finalAnswers = { ...answers };
      if (key && value) finalAnswers[key] = value;

      saveLead({
        name,
        email,
        phone,
        company: (finalAnswers.company as string) || "",
        role: (finalAnswers.role as string) || "",
        employees: (finalAnswers.employees as string) || "",
        compliance: (finalAnswers.compliance as string[]) || [],
        concern: (finalAnswers.concern as string) || "",
      });

      setTimeout(() => {
        setLoading(false);
        setPhase("booking");
      }, 500);
    }
  };

  const bookingUrl = (() => {
    const base = "https://app.yourmeet.io/book/cloud2pulse-copilot-security";
    const params = new URLSearchParams();
    if (name) params.set("prefill_name", name);
    if (email) params.set("prefill_email", email);
    if (phone) params.set("prefill_phone", phone);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  })();

  const totalSteps = qualifySteps.length + 2; // info + qualify steps + booking
  const currentProgress = phase === "info" ? 0 : phase === "qualify" ? 1 + qStep : totalSteps - 1;

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

  const currentQ = qualifySteps[qStep];
  const currentAnswer = answers[currentQ?.key];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={handleClose}
        >
          {/* Stop propagation on modal content so clicking inside doesn't close */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg rounded-xl border border-primary/20 bg-[hsl(222,47%,11%)] p-6 md:p-10 z-10 max-h-[80vh] overflow-y-auto shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="h-1 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${((currentProgress + 1) / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* PHASE: Contact Info */}
              {phase === "info" && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-2xl font-extrabold text-foreground mb-2">
                    Book Your Free Consultation Call
                  </h3>
                  <p className="text-muted-foreground text-sm mb-8">
                    Let's start with your contact details.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPhase("qualify");
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="lead-name" className="block text-sm font-medium text-foreground mb-1.5">
                        Full Name
                      </label>
                      <input id="lead-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="lead-email" className="block text-sm font-medium text-foreground mb-1.5">
                        Work Email
                      </label>
                      <input id="lead-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="lead-phone" className="block text-sm font-medium text-foreground mb-1.5">
                        Phone Number
                      </label>
                      <input id="lead-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" className={inputClass} />
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg glow-button transition-all hover:scale-[1.02]">
                      Next <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* PHASE: Qualifying - one question at a time */}
              {phase === "qualify" && !loading && (
                <motion.div
                  key={`q-${qStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs text-muted-foreground mb-2">
                    Question {qStep + 1} of {qualifySteps.length}
                  </p>
                  <h3 className="text-2xl font-extrabold text-foreground mb-8">
                    {currentQ.label}
                  </h3>

                  {currentQ.options ? (
                    <div className="space-y-3">
                      {currentQ.options.map((opt) => {
                        const isSelected = currentQ.multi
                          ? ((currentAnswer as string[]) || []).includes(opt)
                          : currentAnswer === opt;

                        return (
                          <button
                            key={opt}
                            onClick={() => selectAnswer(currentQ.key, opt, currentQ.multi)}
                            className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                              isSelected
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                isSelected ? "border-primary" : "border-border"
                              }`}>
                                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                              </div>
                              {opt}
                            </div>
                          </button>
                        );
                      })}

                      {/* Multi-select needs a continue button */}
                      {currentQ.multi && (
                        <button
                          onClick={() => advanceQualify()}
                          disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
                          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg glow-button transition-all hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 mt-4"
                        >
                          {qStep === qualifySteps.length - 1 ? "Book Your Call" : "Next"}
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ) : (
                    /* Company name - text input */
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        advanceQualify();
                      }}
                      className="space-y-4"
                    >
                      <input
                        type="text"
                        required
                        value={(answers[currentQ.key] as string) || ""}
                        onChange={(e) => setAnswers({ ...answers, [currentQ.key]: e.target.value })}
                        placeholder="Your company name"
                        className={inputClass}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg glow-button transition-all hover:scale-[1.02]"
                      >
                        Next <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>
                  )}

                  {/* Back button */}
                  <button
                    onClick={() => {
                      if (qStep === 0) setPhase("info");
                      else setQStep(qStep - 1);
                    }}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-6"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                </motion.div>
              )}

              {/* Loading */}
              {phase === "qualify" && loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Preparing your booking...</p>
                </motion.div>
              )}

              {/* PHASE: Booking embed */}
              {phase === "booking" && (
                <motion.div
                  key="booking"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-2xl font-extrabold text-foreground mb-2">
                    Pick a Time That Works for You
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Choose a slot below and we'll see you there, {name.split(" ")[0]}.
                  </p>

                  <div className="rounded-xl overflow-hidden border border-border">
                    <iframe
                      src={bookingUrl}
                      style={{ width: "100%", height: "550px", border: "none" }}
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadCaptureModal;
