import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck, X, UploadCloud } from "lucide-react";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  onUpload: () => void;
  isUploading: boolean;
}

export function FilePreview({
  file,
  onRemove,
  onUpload,
  isUploading,
}: FilePreviewProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <FileCheck className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-foreground text-sm sm:text-base truncate max-w-[200px] sm:max-w-[300px]">
                {file.name}
              </span>
              <Badge variant="secondary" className="text-xs">
                Ready
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onRemove}
            disabled={isUploading}
            className="text-xs"
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
          <Button
            size="sm"
            onClick={onUpload}
            disabled={isUploading}
            className="text-xs"
          >
            <UploadCloud className="h-4 w-4 mr-1" />
            Process Invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
