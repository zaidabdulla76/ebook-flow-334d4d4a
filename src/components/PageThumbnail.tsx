import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText } from 'lucide-react';

interface PageThumbnailProps {
  pageNumber: number;
  isSelected: boolean;
  onToggle: () => void;
}

export const PageThumbnail = ({ pageNumber, isSelected, onToggle }: PageThumbnailProps) => {
  return (
    <Card 
      className={`relative cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:ring-1 hover:ring-border'
      }`}
      onClick={onToggle}
    >
      <div className="aspect-[3/4] p-4 flex items-center justify-center bg-muted/30 relative">
        {/* Mock page preview */}
        <div className="w-full h-full border border-border rounded bg-background/80 flex flex-col gap-2 p-3">
          <div className="h-2 bg-muted rounded w-3/4" />
          <div className="h-2 bg-muted rounded w-full" />
          <div className="h-2 bg-muted rounded w-5/6" />
          <div className="h-2 bg-muted rounded w-full" />
          <div className="h-2 bg-muted rounded w-2/3" />
          <div className="flex-1" />
          <div className="flex items-center justify-center">
            <FileText className="h-8 w-8 text-muted-foreground/30" />
          </div>
        </div>
        
        {/* Checkbox overlay */}
        <div className="absolute top-2 right-2 bg-background rounded-md p-1 shadow-sm">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggle}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      
      {/* Page number label */}
      <div className="p-2 text-center border-t">
        <span className="text-sm font-medium">Page {pageNumber}</span>
      </div>
    </Card>
  );
};
