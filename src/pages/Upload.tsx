import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Upload as UploadIcon, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF, DOCX, or TXT file");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    toast.success("File uploaded successfully!");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleContinue = () => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }
    navigate("/processing");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto smooth-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3">Upload Your Document</h1>
            <p className="text-lg text-muted-foreground">
              Drag and drop your file or click to browse
            </p>
          </div>

          <Card
            className={`p-12 border-2 border-dashed transition-all cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5 scale-105"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            } ${file ? "border-accent bg-accent/5" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.txt"
              onChange={handleFileInput}
            />

            <div className="text-center">
              {file ? (
                <div className="space-y-4">
                  <div className="mx-auto w-fit">
                    <div className="rounded-full bg-accent/10 p-6">
                      <CheckCircle2 className="h-12 w-12 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2">{file.name}</p>
                    <p className="text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="rounded-full"
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto w-fit">
                    <div className="rounded-full bg-primary/10 p-6">
                      <UploadIcon className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2">
                      Drop your file here
                    </p>
                    <p className="text-muted-foreground mb-4">
                      or click to browse
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        PDF
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        DOCX
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        TXT
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Maximum file size: 10MB
            </p>
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!file}
              className="rounded-full px-12 shadow-lg hover:shadow-xl transition-all"
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
