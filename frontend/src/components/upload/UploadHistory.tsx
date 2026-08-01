import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadItem } from "@/lib/mock/uploads";
import { EmptyUploadState } from "./EmptyUploadState";
import { Eye, FileText } from "lucide-react";

interface UploadHistoryProps {
  items: UploadItem[];
  onViewItem: (item: UploadItem) => void;
}

export function UploadHistory({ items, onViewItem }: UploadHistoryProps) {
  if (items.length === 0) {
    return <EmptyUploadState />;
  }

  const getStatusBadge = (status: UploadItem["status"]) => {
    switch (status) {
      case "Completed":
        return <Badge variant="default">{status}</Badge>;
      case "Processing":
        return <Badge variant="secondary">{status}</Badge>;
      case "Failed":
        return <Badge variant="destructive">{status}</Badge>;
    }
  };

  const getRiskBadge = (risk: UploadItem["risk"]) => {
    switch (risk) {
      case "High":
        return <Badge variant="destructive">{risk} Risk</Badge>;
      case "Medium":
        return <Badge variant="secondary">{risk} Risk</Badge>;
      case "Low":
        return <Badge variant="outline">{risk} Risk</Badge>;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recent Uploads
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Uploaded At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-sm truncate max-w-[220px]">
                          {item.filename}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.size}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {item.uploadedAt}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{getRiskBadge(item.risk)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewItem(item)}
                      className="h-8 px-2 text-xs"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-3 p-4 md:hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col p-3 rounded-lg border border-border bg-card space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-2 truncate">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium truncate">
                    {item.filename}
                  </span>
                </div>
                {getStatusBadge(item.status)}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>{item.size}</span>
                <span>{item.uploadedAt}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                {getRiskBadge(item.risk)}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewItem(item)}
                  className="h-7 text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" /> View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
