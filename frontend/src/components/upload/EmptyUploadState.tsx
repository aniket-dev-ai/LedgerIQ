import { Inbox } from "lucide-react";

export function EmptyUploadState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-12 text-center">
      <div className="rounded-full bg-muted p-4 text-muted-foreground mb-4">
        <Inbox className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-medium text-foreground">No uploads yet</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-1">
        Upload your first invoice above to start AI-powered fraud detection and
        automated risk analysis.
      </p>
    </div>
  );
}
