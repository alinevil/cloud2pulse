import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { useLeadCapture } from "@/contexts/LeadCaptureContext";

const MobileCTABar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { openModal } = useLeadCapture();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary p-3 flex items-center gap-2">
      <button
        onClick={openModal}
        className="flex items-center justify-center gap-2 flex-1 py-2.5 text-primary-foreground font-bold text-sm"
      >
        Book Free Call
        <ArrowRight className="w-4 h-4" />
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="text-primary-foreground/70 hover:text-primary-foreground p-1"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MobileCTABar;
