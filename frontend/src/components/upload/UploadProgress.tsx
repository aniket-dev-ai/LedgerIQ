import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export type UploadStage =
  | "idle"
  | "waiting"
  | "uploading"
  | "processing"
  | "completed"
  | "failed";

interface UploadProgressProps {
  stage: UploadStage;
  progress: number;
}

export function UploadProgress({ stage, progress }: UploadProgressProps) {
  if (stage === "idle") return null;

  const getStageBadge = () => {
    switch (stage) {
      case "waiting":
        return (
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" /> Waiting
          </Badge>
        );
      case "uploading":
        return (
          <Badge variant="secondary" className="gap-1">
            <Loader2 className="h-3 w-3 animate-spin" /> Uploading ({progress}%)
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="secondary" className="gap-1">
            <Loader2 className="h-3 w-3 animate-spin" /> Processing AI
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="default" className="gap-1">
            <CheckCircle2 className="h-3 w-3" /> Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" /> Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4 sm:p-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Status</span>
          {getStageBadge()}
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {stage === "waiting" && "Initializing security scan..."}
          {stage === "uploading" && "Transferring file securely..."}
          {stage === "processing" &&
            "Running AI fraud detection and OCR parsing..."}
          {stage === "completed" &&
            "Analysis complete! Record added to history."}
        </p>
      </CardContent>
    </Card>
  );
}
