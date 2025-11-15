import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-gradient-primary p-2 shadow-sm">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">DocToEbook</span>
          </div>
          
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Contact
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2024 DocToEbook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
