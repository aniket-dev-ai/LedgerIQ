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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentInvoice } from "./mock-dashboard-data";

interface RecentInvoicesTableProps {
  invoices: RecentInvoice[];
}

export function RecentInvoicesTable({ invoices }: RecentInvoicesTableProps) {
  return (
    <Card className="rounded-xl border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          Recent High Risk Invoices
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Invoices flagged for potential anomaly or fraud review
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">
                  Invoice ID
                </TableHead>
                <TableHead className="text-muted-foreground">Vendor</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">
                  Risk Score
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow
                  key={inv.id}
                  className="border-border hover:bg-accent/50"
                >
                  <TableCell className="font-mono text-xs font-medium text-foreground">
                    {inv.id}
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {inv.vendor}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {inv.amount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={inv.riskScore > 75 ? "destructive" : "secondary"}
                      className="font-mono text-xs"
                    >
                      {inv.riskScore} / 100
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-xs border-border text-foreground"
                    >
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-accent hover:text-accent-foreground text-xs"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
