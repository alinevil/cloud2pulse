import { LeadCaptureProvider } from "@/contexts/LeadCaptureContext";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ValueStackSection from "@/components/ValueStackSection";
import SocialProofSection from "@/components/SocialProofSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import FooterSection from "@/components/FooterSection";
import MobileCTABar from "@/components/MobileCTABar";

const Index = () => {
  return (
    <LeadCaptureProvider>
      <div className="min-h-screen bg-background">
        <StickyHeader />
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <ValueStackSection />
        <SocialProofSection />
        <GuaranteeSection />
        <FAQSection />
        <FinalCTASection />
        <FooterSection />
        <MobileCTABar />
        <LeadCaptureModal />
      </div>
    </LeadCaptureProvider>
  );
};

export default Index;
