import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import { RichTextEditor } from "@/components/RichTextEditor";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Upload as UploadIcon, 
  FileText, 
  CheckCircle2, 
  Edit, 
  Save,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus
} from "lucide-react";
import { toast } from "sonner";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const Workspace = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [documentContent, setDocumentContent] = useState("");
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([80]);
  const [pageScrollPosition, setPageScrollPosition] = useState(0);
  const [currentReadingLine, setCurrentReadingLine] = useState(0);

  // Mock pages data
  const totalPages = 5;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
    // Mock document content
    setDocumentContent(`This is the content of your uploaded document: ${selectedFile.name}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nPage 2 content starts here...\n\nPage 3 content starts here...\n\nPage 4 content starts here...\n\nPage 5 content starts here...`);
    setSelectedPages([1, 2, 3, 4, 5]); // Select all by default
    toast.success("File uploaded successfully!");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Document saved successfully!");
  };

  const togglePage = (page: number) => {
    setSelectedPages(prev => 
      prev.includes(page) 
        ? prev.filter(p => p !== page)
        : [...prev, page].sort((a, b) => a - b)
    );
  };

  const handleContinue = () => {
    if (selectedPages.length === 0) {
      toast.error("Please select at least one page");
      return;
    }
    setShowPreview(true);
    toast.success("Preview loaded!");
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate reading progress
      const interval = setInterval(() => {
        setCurrentReadingLine(prev => prev + 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  };

  const selectAllPages = () => {
    if (selectedPages.length === totalPages) {
      setSelectedPages([]);
    } else {
      setSelectedPages(pages);
    }
  };

  const scrollPages = (direction: 'left' | 'right') => {
    const scrollAmount = 200;
    setPageScrollPosition(prev => 
      direction === 'left' 
        ? Math.max(0, prev - scrollAmount)
        : prev + scrollAmount
    );
  };

  const documentLines = documentContent.split('\n').filter(line => line.trim());

  const handleDownloadAudio = () => {
    toast.success("Audio file downloaded successfully!");
  };

  const handleDownloadAudiobook = () => {
    toast.success("Audiobook downloaded successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-12rem)] rounded-lg border">
          {/* Left Panel - Upload & Edit */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full p-6 overflow-y-auto">
              {!file ? (
                <Card
                  className={`h-full min-h-[400px] p-12 border-2 border-dashed transition-all cursor-pointer flex items-center justify-center ${
                    isDragging
                      ? "border-primary bg-primary/5 scale-105"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  }`}
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
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-fit">
                      <div className="rounded-full bg-primary/10 p-6">
                        <UploadIcon className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold mb-2">
                        Drop your document here
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
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* File Info */}
                  <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <CheckCircle2 className="h-6 w-6 text-accent" />
                    <div className="flex-1">
                      <p className="font-semibold">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFile(null);
                        setDocumentContent("");
                        setSelectedPages([]);
                        setShowPreview(false);
                      }}
                    >
                      Remove
                    </Button>
                  </div>

                  {/* Edit/Save Controls */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Document Content</h3>
                    {!isEditing ? (
                      <Button onClick={handleEdit} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <Button onClick={handleSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    )}
                  </div>

                  {/* Document Editor */}
              <RichTextEditor 
                content={documentContent}
                onChange={setDocumentContent}
              />

                  {/* Page Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold">Select Pages</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={selectAllPages}
                      >
                        {selectedPages.length === totalPages ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => scrollPages('left')}
                        className="shrink-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <ScrollArea className="w-full rounded-lg border bg-muted/30 p-2">
                        <div className="flex gap-1.5">
                          {pages.map((page) => (
                            <Button
                              key={page}
                              variant={selectedPages.includes(page) ? "default" : "outline"}
                              size="sm"
                              onClick={() => togglePage(page)}
                              className={`min-w-[40px] h-[40px] rounded-lg font-medium text-sm transition-all ${
                                selectedPages.includes(page) 
                                  ? 'bg-sky-500 hover:bg-sky-600 text-white' 
                                  : 'hover:bg-muted'
                              }`}
                            >
                              {page}
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => scrollPages('right')}
                        className="shrink-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedPages.length} of {totalPages} pages selected
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={handleContinue}
                      disabled={selectedPages.length === 0}
                      className="w-full rounded-full"
                      size="lg"
                    >
                      Continue to Preview
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Preview */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full p-6 overflow-y-auto bg-muted/20">
              {!showPreview ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div className="space-y-3">
                    <div className="mx-auto w-fit">
                      <div className="rounded-full bg-muted p-6">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold">Preview Area</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Upload a document, select pages, and click Continue to preview your audiobook
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Audio Player */}
                  <Card className="p-6 shadow-lg border-0 bg-card/95 backdrop-blur">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Button
                          size="lg"
                          onClick={togglePlayback}
                          className="rounded-full h-14 w-14 shadow-md hover:shadow-lg transition-all shrink-0"
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

                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setVolume([Math.max(0, volume[0] - 10)])}
                            className="h-9 w-9"
                          >
                            {volume[0] === 0 ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Minus className="h-4 w-4" />
                            )}
                          </Button>
                          <div className="w-24">
                            <Slider
                              value={volume}
                              onValueChange={setVolume}
                              max={100}
                              step={1}
                            />
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setVolume([Math.min(100, volume[0] + 10)])}
                            className="h-9 w-9"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Document Preview */}
                  <Card className="p-8 shadow-md border-0">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Selected Pages Preview</h3>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-muted-foreground">
                          Showing pages: {selectedPages.join(", ")}
                        </p>
                        <ScrollArea className="h-[400px] mt-4">
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="leading-relaxed space-y-2">
                              {documentLines.map((line, index) => (
                                <p
                                  key={index}
                                  className={`transition-all ${
                                    isPlaying && index === currentReadingLine
                                      ? 'bg-sky-200/50 dark:bg-sky-900/50 px-2 py-1 rounded'
                                      : ''
                                  }`}
                                >
                                  {line}
                                </p>
                              ))}
                            </div>
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </Card>

                  {/* Download Buttons */}
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      variant="outline"
                      onClick={handleDownloadAudio}
                      className="w-full rounded-full"
                      size="lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Audio
                    </Button>
                    <Button
                      onClick={handleDownloadAudiobook}
                      className="w-full rounded-full shadow-md hover:shadow-lg transition-all"
                      size="lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Audiobook
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default Workspace;
