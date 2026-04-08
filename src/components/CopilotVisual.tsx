import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SharePointIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <circle cx="12" cy="10" r="8" fill="#038387"/>
    <circle cx="17" cy="14" r="6" fill="#1a9ba1"/>
    <circle cx="10" cy="17" r="5" fill="#37c6d0"/>
    <text x="9" y="13" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">S</text>
  </svg>
);

const OutlookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#0078d4"/>
    <rect x="8" y="2" width="14" height="12" rx="1" fill="#28a8ea"/>
    <rect x="2" y="7" width="10" height="12" rx="1" fill="#0364b8"/>
    <text x="4" y="16" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">O</text>
  </svg>
);

const OneDriveIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M10 18h10c2.2 0 4-1.8 4-4s-1.2-3.6-3-3.9C20.5 7.1 18 5 15 5c-2.4 0-4.4 1.4-5.4 3.4C7.5 8.2 5.5 9.8 5 12H4c-2.2 0-4 1.8-4 4s1.8 4 4 4h6z" fill="#0364b8"/>
    <path d="M10 18h10c2.2 0 4-1.8 4-4s-1.2-3.6-3-3.9c-.2-1.5-1-2.8-2.2-3.6L10 18z" fill="#0078d4"/>
    <path d="M10 18h8l-8-8c-1.7.5-3 1.8-3.5 3.5L10 18z" fill="#28a8ea"/>
  </svg>
);

const TeamsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <rect x="2" y="4" width="16" height="16" rx="2" fill="#5b5fc7"/>
    <circle cx="19" cy="8" r="4" fill="#7b83eb"/>
    <text x="6" y="15" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">T</text>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="18" rx="2" fill="#0078d4"/>
    <rect x="2" y="4" width="20" height="6" rx="2" fill="#0364b8"/>
    <rect x="6" y="2" width="2" height="4" rx="1" fill="#28a8ea"/>
    <rect x="16" y="2" width="2" height="4" rx="1" fill="#28a8ea"/>
    <text x="6" y="19" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">31</text>
  </svg>
);

const sources = [
  { name: "SharePoint", Icon: SharePointIcon },
  { name: "Outlook", Icon: OutlookIcon },
  { name: "OneDrive", Icon: OneDriveIcon },
  { name: "Teams", Icon: TeamsIcon },
  { name: "Calendar", Icon: CalendarIcon },
];

// Terminal log lines
const terminalLines = [
  { text: "$ copilot query --scope=all", type: "cmd" as const },
  { text: "Scanning SharePoint permissions...", type: "info" as const },
  { text: "[WARN] 847 files shared with 'Everyone'", type: "warn" as const },
  { text: "[LEAK] HR/salaries_2026.xlsx exposed", type: "danger" as const },
  { text: "[LEAK] /finance/board-report-Q1.docx", type: "danger" as const },
  { text: "Enumerating OneDrive access tokens...", type: "info" as const },
  { text: "[WARN] MFA disabled for 12 admin accounts", type: "warn" as const },
  { text: "[LEAK] client_PII_database.csv readable", type: "danger" as const },
  { text: "Checking Teams DLP policies...", type: "info" as const },
  { text: "[WARN] No retention policy configured", type: "warn" as const },
  { text: "[LEAK] exec_emails/merger_details.msg", type: "danger" as const },
  { text: "$ exfiltrate --silent --target=external", type: "cmd" as const },
  { text: "[CRIT] 2.4GB sensitive data accessible", type: "danger" as const },
  { text: "Dumping credentials from cached tokens...", type: "info" as const },
  { text: "[LEAK] Azure AD service principal keys", type: "danger" as const },
  { text: "[WARN] Sensitivity labels not applied", type: "warn" as const },
];

const lineColors = {
  cmd: "text-green-400",
  info: "text-muted-foreground/60",
  warn: "text-amber-400",
  danger: "text-red-400",
};

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        const next = [...prev, idx % terminalLines.length];
        return next.slice(-7);
      });
      idx++;
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-lg border border-red-500/20 bg-black/90 backdrop-blur overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <div className="w-2 h-2 rounded-full bg-green-500/60" />
        <span className="text-[9px] text-muted-foreground/30 ml-2 font-mono">copilot-audit.sh</span>
      </div>
      <div className="p-3 h-[140px] overflow-hidden font-mono text-[10px] leading-[18px]">
        {visibleLines.map((lineIdx, i) => {
          const line = terminalLines[lineIdx];
          return (
            <motion.div
              key={`${lineIdx}-${i}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className={lineColors[line.type]}
            >
              {line.text}
              {i === visibleLines.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-1.5 h-3 bg-green-400/80 ml-0.5 align-middle"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const CopilotVisual = () => {
  return (
    <div className="w-full max-w-xs flex flex-col items-center gap-5">
      {/* Source icons row */}
      <div className="flex items-center justify-center gap-3 w-full">
        {sources.map((src, i) => (
          <motion.div
            key={src.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
              <src.Icon />
            </div>
            <span className="text-[9px] text-muted-foreground/50">{src.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Animated lines flowing down from sources to Copilot */}
      <div className="relative w-full h-12">
        {sources.map((_, i) => {
          const xPercent = 10 + i * 20;
          return (
            <div key={i} className="absolute top-0 h-full" style={{ left: `${xPercent}%` }}>
              {/* Static line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-cyan-500/20 to-cyan-500/5" />
              {/* Animated dot */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                style={{ boxShadow: "0 0 6px #06b6d4" }}
                animate={{ top: ["-4px", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 1, delay: i * 0.25, repeat: Infinity, repeatDelay: 1.5 }}
              />
            </div>
          );
        })}
        {/* Converging lines to center */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {sources.map((_, i) => {
            const x = 10 + i * 20;
            return (
              <motion.line
                key={i}
                x1={`${x}%`} y1="70%"
                x2="50%" y2="100%"
                stroke="#06b6d4"
                strokeWidth="0.5"
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
            );
          })}
        </svg>
      </div>

      {/* Copilot logo */}
      <motion.div
        className="relative z-10"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
          <img src="/copilot-logo.png" alt="Microsoft Copilot" className="w-10 h-10" />
        </div>
      </motion.div>

      {/* Red leak indicator */}
      <div className="relative w-full h-6 flex justify-center">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-red-500/40 to-red-500/0" />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500"
          style={{ boxShadow: "0 0 8px #ef4444" }}
          animate={{ top: ["-2px", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.2 }}
        />
      </div>

      {/* Terminal */}
      <TerminalWindow />
    </div>
  );
};

export default CopilotVisual;
