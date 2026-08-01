import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VendorData } from "./mock-dashboard-data";

interface VendorLeaderboardProps {
  vendors: VendorData[];
}

export function VendorLeaderboard({ vendors }: VendorLeaderboardProps) {
  return (
    <Card className="rounded-xl border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          Top Risk Vendors
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Vendors with highest aggregate fraud risk metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent/40"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-foreground">
                  {vendor.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {vendor.invoiceCount} invoices ({vendor.flaggedCount} flagged)
                </p>
              </div>
              <Badge variant="destructive" className="font-mono text-xs">
                Score {vendor.riskScore}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
