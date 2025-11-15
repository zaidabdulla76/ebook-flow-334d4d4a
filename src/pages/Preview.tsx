import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import { Play, Pause, Volume2, Download, BookOpen } from "lucide-react";
import { toast } from "sonner";

const Preview = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([80]);
  const [highlightedWord, setHighlightedWord] = useState(0);

  // Mock text content
  const textContent = `Welcome to your interactive audiobook. This is a demonstration of how text highlighting works in sync with audio narration. As you listen, each word will be highlighted in real-time, making it easier to follow along and improve comprehension. This feature is particularly useful for learning new languages, studying complex materials, or simply enjoying a more immersive listening experience.`.split(" ");

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Simulate word highlighting
      let wordIndex = 0;
      const interval = setInterval(() => {
        if (wordIndex < textContent.length) {
          setHighlightedWord(wordIndex);
          wordIndex++;
          setProgress([Math.floor((wordIndex / textContent.length) * 100)]);
        } else {
          clearInterval(interval);
          setIsPlaying(false);
          setHighlightedWord(0);
        }
      }, 300);
    } else {
      setHighlightedWord(0);
    }
  };

  const handleDownloadAudiobook = () => {
    toast.success("Audiobook downloaded successfully!");
  };

  const handleDownloadAudio = () => {
    toast.success("Audio file downloaded successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto smooth-fade-in space-y-8">
          {/* Audio Player */}
          <Card className="p-6 shadow-lg border-0 sticky top-20 z-10 bg-card/95 backdrop-blur">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  onClick={togglePlayback}
                  className="rounded-full h-14 w-14 shadow-md hover:shadow-lg transition-all"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{Math.floor(progress[0] / 100 * 180)}s</span>
                    <span>3:00</span>
                  </div>
                  <Slider
                    value={progress}
                    onValueChange={setProgress}
                    max={100}
                    step={1}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-2 w-32">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Document Preview */}
          <Card className="p-12 shadow-md border-0">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Your Audiobook</h2>
                  <p className="text-sm text-muted-foreground">Interactive Preview</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleDownloadAudio}
                  className="rounded-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Audio
                </Button>
                <Button
                  onClick={handleDownloadAudiobook}
                  className="rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Audiobook
                </Button>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h1 className="text-3xl font-bold mb-6">Chapter 1: Introduction</h1>
              
              <p className="text-lg leading-relaxed">
                {textContent.map((word, index) => (
                  <span
                    key={index}
                    className={`transition-all duration-300 ${
                      index === highlightedWord && isPlaying
                        ? "text-highlight font-semibold"
                        : ""
                    }`}
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground mt-6">
                The document continues with more content that would be displayed here in a real application. You can customize the formatting, add images, tables, and other elements to match your original document's structure.
              </p>
            </div>
          </Card>

          {/* Export Options */}
          <Card className="p-8 shadow-md border-0 bg-gradient-primary">
            <div className="text-center text-primary-foreground">
              <h3 className="text-2xl font-bold mb-3">Love Your Audiobook?</h3>
              <p className="mb-6 opacity-90">
                Download it now and take your listening experience anywhere
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleDownloadAudiobook}
                  className="rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  Download Audiobook
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDownloadAudio}
                  className="rounded-full bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  Download Audio
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Preview;
