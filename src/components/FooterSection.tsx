import { Linkedin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2">
            <img src="/logo.png" alt="Cloud2Pulse" className="h-7 w-auto" />
            <span className="font-bold text-foreground">Cloud2Pulse</span>
          </a>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground">&copy; 2026 Cloud2Pulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
