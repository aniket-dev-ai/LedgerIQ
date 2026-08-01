import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, AlertTriangle } from "lucide-react";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  onError: (message: string) => void;
  disabled?: boolean;
}

export function UploadDropzone({
  onFileSelect,
  onError,
  disabled,
}: UploadDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
      multiple: false,
      disabled,
      onDropAccepted: (files) => {
        if (files.length > 0) {
          onFileSelect(files[0]);
        }
      },
      onDropRejected: (fileRejections) => {
        const error = fileRejections[0]?.errors[0];
        if (error?.code === "file-too-large") {
          onError("File exceeds maximum allowed size of 10 MB.");
        } else if (error?.code === "file-invalid-type") {
          onError("Invalid file type. Please upload a PDF, PNG, JPG, or JPEG.");
        } else {
          onError(error?.message || "Failed to accept file.");
        }
      },
    });

  return (
    <Card
      {...getRootProps()}
      className={`border-2 border-dashed bg-card transition-colors cursor-pointer ${
        isDragActive
          ? "border-primary bg-accent/50"
          : isDragReject
            ? "border-destructive bg-destructive/10"
            : "border-border hover:border-primary/50"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12 text-center">
        <input {...getInputProps()} />
        <div className="rounded-full bg-muted p-4 text-muted-foreground mb-4">
          {isDragReject ? (
            <AlertTriangle className="h-8 w-8 text-destructive" />
          ) : (
            <Upload className="h-8 w-8 text-primary" />
          )}
        </div>

        <h3 className="text-base font-semibold text-foreground">
          {isDragActive
            ? "Drop the invoice here"
            : isDragReject
              ? "Unsupported file format"
              : "Drag & Drop your invoice here"}
        </h3>

        <p className="text-xs sm:text-sm text-muted-foreground mt-1 mb-4 max-w-xs">
          Supported formats: PDF, PNG, JPG, JPEG (Max 10 MB)
        </p>

        <Button type="button" variant="outline" size="sm" disabled={disabled}>
          <FileUp className="h-4 w-4 mr-2" />
          Browse Files
        </Button>
      </CardContent>
    </Card>
  );
}
