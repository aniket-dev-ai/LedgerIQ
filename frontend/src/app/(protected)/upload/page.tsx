"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button"; 
import { History, FilePlus } from "lucide-react"; 
import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { FilePreview } from "@/components/upload/FilePreview";
import {
  UploadProgress,
  UploadStage,
} from "@/components/upload/UploadProgress";
import { UploadGuidelines } from "@/components/upload/UploadGuidelines";
import { UploadHistory } from "@/components/upload/UploadHistory";
import { mockUploads, UploadItem } from "@/lib/mock/uploads";

export default function UploadInvoicePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [stage, setStage] = useState<UploadStage>("idle");
  const [progress, setProgress] = useState<number>(0);
  const [history, setHistory] = useState<UploadItem[]>(mockUploads);
  const historyRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setStage("idle");
    setProgress(0); 
  };

  const handleError = (message: string) => { 
    console.log(message)
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setStage("idle");
    setProgress(0);
  };

  const scrollToHistory = () => {
    historyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSimulatedUpload = () => {
    if (!selectedFile) return;

    setStage("waiting");
    setProgress(0);

    setTimeout(() => {
      setStage("uploading");

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(interval);
          setStage("processing");

          setTimeout(() => {
            setStage("completed");
            const newRecord: UploadItem = {
              id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
              filename: selectedFile.name,
              size: (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB",
              uploadedAt: new Date()
                .toISOString()
                .replace("T", " ")
                .substring(0, 16),
              status: "Completed",
              risk:
                Math.random() > 0.7
                  ? "High"
                  : Math.random() > 0.4
                    ? "Medium"
                    : "Low",
            };

            setHistory((prev) => [newRecord, ...prev]);
            console.log("Invoice analyzed successfully!");
          }, 1500);
        }
      }, 300);
    }, 1000);
  };

  const handleViewItem = (item: UploadItem) => {
    console.log(`Viewing invoice ${item.id} (${item.filename})`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Upload Invoice
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload PDF or image invoices for AI-powered fraud detection and
            analysis.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={scrollToHistory}
          className="w-fit"
        >
          <History className="h-4 w-4 mr-2" />
          View Upload History
        </Button>
      </div>

      <div className="grid gap-6">
        {!selectedFile ? (
          <UploadDropzone
            onFileSelect={handleFileSelect}
            onError={handleError}
            disabled={stage !== "idle" && stage !== "completed"}
          />
        ) : (
          <div className="space-y-4">
            <FilePreview
              file={selectedFile}
              onRemove={handleRemoveFile}
              onUpload={handleSimulatedUpload}
              isUploading={
                stage === "waiting" ||
                stage === "uploading" ||
                stage === "processing"
              }
            />
            {stage !== "completed" && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  disabled={
                    stage === "waiting" ||
                    stage === "uploading" ||
                    stage === "processing"
                  }
                  className="text-xs"
                >
                  <FilePlus className="h-4 w-4 mr-1" />
                  Select Different File
                </Button>
              </div>
            )}
          </div>
        )}

        <UploadProgress stage={stage} progress={progress} />

        <UploadGuidelines />
      </div>

      <div ref={historyRef} className="pt-4">
        <UploadHistory items={history} onViewItem={handleViewItem} />
      </div>
    </div>
  );
}
