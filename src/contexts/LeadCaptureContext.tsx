import { createContext, useContext, useState, ReactNode } from "react";

interface LeadCaptureContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | null>(null);

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LeadCaptureContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </LeadCaptureContext.Provider>
  );
}

export function useLeadCapture() {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) throw new Error("useLeadCapture must be used within LeadCaptureProvider");
  return ctx;
}
