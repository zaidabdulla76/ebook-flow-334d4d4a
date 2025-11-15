import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Headphones, BookOpen, Sparkles, Zap, Shield } from "lucide-react";
const Landing = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4 sm:py-32">
        <div className="container mx-auto">
          <div className="smooth-fade-in mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-block">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                Transform Documents with AI
              </span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Convert Documents to
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}Interactive Audiobooks
              </span>
            </h1>
            
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              Upload any document and instantly transform it into an immersive audiobook with AI-generated narration in multiple languages. Listen with synchronized text highlighting.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/upload">
                <Button size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
                  Start Converting
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8 shadow-sm hover:shadow-md transition-all">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to create amazing audiobooks
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-8 shadow-md hover:shadow-lg transition-all border-0 bg-card hover:scale-105 duration-300">
              <div className="mb-4 rounded-2xl bg-primary/10 p-4 w-fit">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Multilingual Support & Detection</h3>
              <p className="text-muted-foreground">
                Our application automatically detects multiple languages in your documents and generates realistic, natural-sounding audio narration in the specific language detected.
              </p>
            </Card>

            <Card className="p-8 shadow-md hover:shadow-lg transition-all border-0 bg-card hover:scale-105 duration-300">
              <div className="mb-4 rounded-2xl bg-accent/10 p-4 w-fit">
                <Headphones className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">AI Audio Narration</h3>
              <p className="text-muted-foreground">
                Get natural-sounding AI-generated audio narration for your entire document. Perfect for learning on the go.
              </p>
            </Card>

            <Card className="p-8 shadow-md hover:shadow-lg transition-all border-0 bg-card hover:scale-105 duration-300">
              <div className="mb-4 rounded-2xl bg-primary/10 p-4 w-fit">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Synced Text Highlighting</h3>
              <p className="text-muted-foreground">
                Follow along with intelligent text highlighting that syncs perfectly with audio narration for enhanced comprehension and immersive listening.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-20 px-4">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to your perfect audiobook
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-2xl font-bold text-primary-foreground shadow-lg">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Upload</h3>
                <p className="text-muted-foreground">
                  Drag and drop your document or click to upload
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-2xl font-bold text-primary-foreground shadow-lg">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Process</h3>
                <p className="text-muted-foreground">
                  AI converts and generates audio narration
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-2xl font-bold text-primary-foreground shadow-lg">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Preview</h3>
                <p className="text-muted-foreground">
                  Listen and download your audiobook
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-primary">
            <div className="p-12 text-center text-primary-foreground">
              <Shield className="mx-auto mb-6 h-16 w-16 opacity-90" />
              <h2 className="mb-4 text-4xl font-bold">Ready to Get Started?</h2>
              <p className="mb-8 text-lg opacity-90">
                Join thousands of users creating amazing audiobooks every day
              </p>
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="rounded-full px-8 shadow-md hover:shadow-lg transition-all">
                  Create Your Free Account
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Landing;