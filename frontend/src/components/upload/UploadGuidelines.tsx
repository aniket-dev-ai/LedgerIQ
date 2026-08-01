import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scan, FileCheck, HardDrive } from "lucide-react";

export function UploadGuidelines() {
  const guidelines = [
    {
      icon: FileText,
      title: "PDF Format Recommended",
      description: "PDF files offer the highest parsing accuracy for tables.",
    },
    {
      icon: Scan,
      title: "Clear Scans Required",
      description:
        "Ensure high resolution and readable text for AI OCR extraction.",
    },
    {
      icon: FileCheck,
      title: "One Invoice per File",
      description: "Combine pages into a single document per transaction.",
    },
    {
      icon: HardDrive,
      title: "Maximum Size 10MB",
      description: "Compressed images and vectors upload faster.",
    },
  ];

  return (
    <Card className="bg-card text-card-foreground border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Upload Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {guidelines.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start space-x-3 text-sm">
              <div className="rounded-md bg-muted p-2 text-muted-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground leading-none">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground leading-normal">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
