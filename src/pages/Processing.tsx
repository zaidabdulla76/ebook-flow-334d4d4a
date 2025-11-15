import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";

const Processing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing for 3 seconds
    const timer = setTimeout(() => {
      navigate("/preview");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <Card className="p-12 max-w-md w-full border-0 shadow-lg smooth-fade-in">
        <div className="text-center space-y-6">
          <div className="mx-auto w-fit processing-pulse">
            <div className="rounded-full bg-gradient-primary p-8 shadow-glow">
              <Sparkles className="h-16 w-16 text-primary-foreground animate-spin" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Processing Your Document</h2>
            <p className="text-muted-foreground">
              Our AI is detecting languages and generating natural-sounding audio narration for your audiobook...
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>This usually takes a few seconds</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-primary animate-pulse" style={{ width: "70%" }} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Processing;
