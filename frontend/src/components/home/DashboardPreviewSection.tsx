import React from "react";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  Info,
  Building,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/home/card";
import { Badge } from "@/components/ui/home/badge";
import { Button } from "@/components/ui/home/button";

export const DashboardPreviewSection: React.FC = () => {
  return (
    <section
      id="dashboard-preview"
      className="py-20 border-t border-border/60 bg-muted/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Deep Dive
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Full-Spectrum Audit Intelligence Dashboard
          </p>
          <p className="text-muted-foreground text-base sm:text-lg">
            Inspect real-time risk scores, review automated flags, and audit
            vendor metrics in one unified workspace.
          </p>
        </div>

        {/* Large Mock Dashboard Wrapper */}
        <Card className="border-border/80 bg-card p-6 shadow-2xl space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Accounts Payable Audit Center
              </h3>
              <p className="text-sm text-muted-foreground">
                Showing live risk assessments for Q3 Fiscal Period
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 font-mono text-xs"
              >
                <span>Filter by Entity</span>
              </Button>
              <Button size="sm" className="gap-2 text-xs">
                <span>Export Audit Trail</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 border-border/60 bg-muted/30 transition-all duration-200 hover:border-border hover:bg-muted/50">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-medium">
                  Total Invoices Scanned
                </span>
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">24,510</div>
              <p className="text-xs text-muted-foreground mt-1">
                +8.2% from last month
              </p>
            </Card>

            <Card className="p-4 border-border/60 bg-muted/30 transition-all duration-200 hover:border-border hover:bg-muted/50">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-medium">Audit Pass Rate</span>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">96.4%</div>
              <p className="text-xs text-primary mt-1 flex items-center gap-1">
                +1.1% compliance gain
              </p>
            </Card>

            <Card className="p-4 border-border/60 bg-muted/30 transition-all duration-200 hover:border-border hover:bg-muted/50">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-medium">High Risk Flagged</span>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                882 Invoices
              </div>
              <p className="text-xs text-destructive mt-1 font-mono">
                3.6% flag rate
              </p>
            </Card>

            <Card className="p-4 border-border/60 bg-muted/30 transition-all duration-200 hover:border-border hover:bg-muted/50">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-xs font-medium">Leakage Prevented</span>
                <TrendingDown className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                $1,420,900
              </div>
              <p className="text-xs text-primary mt-1">
                Saved from duplicates/fraud
              </p>
            </Card>
          </div>

          {/* Main Dashboard Workspace (Table + AI Side Panel) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Invoice Table (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-foreground">
                  Recent High Risk Invoices
                </h4>
                <Badge variant="outline" className="font-mono text-xs">
                  Showing 3 of 14 flagged
                </Badge>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border/60 bg-background">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-muted/40 font-mono text-muted-foreground">
                    <tr>
                      <th className="p-3">Vendor</th>
                      <th className="p-3">Inv #</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Risk Level</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 font-sans">
                    <tr className="hover:bg-muted/20 transition-colors duration-150">
                      <td className="p-3 font-medium text-foreground">
                        AeroTech Consulting
                      </td>
                      <td className="p-3 font-mono text-muted-foreground">
                        #AT-9012
                      </td>
                      <td className="p-3 font-mono text-foreground">
                        $98,200.00
                      </td>
                      <td className="p-3">
                        <Badge variant="destructive">Critical (98)</Badge>
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                        >
                          Inspect
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors duration-150">
                      <td className="p-3 font-medium text-foreground">
                        Global Freight Co
                      </td>
                      <td className="p-3 font-mono text-muted-foreground">
                        #GF-4411
                      </td>
                      <td className="p-3 font-mono text-foreground">
                        $14,500.00
                      </td>
                      <td className="p-3">
                        <Badge variant="destructive">High (84)</Badge>
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                        >
                          Inspect
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors duration-150">
                      <td className="p-3 font-medium text-foreground">
                        Vortex Media Group
                      </td>
                      <td className="p-3 font-mono text-muted-foreground">
                        #VM-1102
                      </td>
                      <td className="p-3 font-mono text-foreground">
                        $6,750.00
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary">Medium (58)</Badge>
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                        >
                          Inspect
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Vendor Leaderboard Box */}
              <div className="pt-4">
                <Card className="p-4 border-border/60 bg-background space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        Top Anomaly Vendors
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Last 30 Days
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                      <span className="font-medium">AeroTech Consulting</span>
                      <span className="font-mono text-destructive">
                        3 Flags ($184k total)
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                      <span className="font-medium">Apex Logistics Inc</span>
                      <span className="font-mono text-muted-foreground">
                        2 Flags ($48k total)
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* AI Explanation Panel (1 col) */}
            <div className="space-y-4">
              <Card className="h-full border-primary/30 bg-primary/5 p-5 space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm border-b border-primary/20 pb-3">
                  <Sparkles className="h-4 w-4" />
                  <span>AI Audit Rationale Panel</span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded-xl bg-card border border-border space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-destructive">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Bank Routing Mismatch Detected</span>
                    </div>
                    <p className="text-muted-foreground">
                      The bank account specified on #AT-9012 differs from the
                      verified vendor profile on record.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <Info className="h-3.5 w-3.5 text-primary" />
                      <span>Price Inflation Anomaly</span>
                    </div>
                    <p className="text-muted-foreground">
                      Line item #3 (&quot;Server Hosting Surcharge&quot;) is 34%
                      higher than the Master Services Agreement rate.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-card border border-border space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <Info className="h-3.5 w-3.5 text-primary" />
                      <span>Potential Duplicate Entry</span>
                    </div>
                    <p className="text-muted-foreground">
                      Exact invoice amount matches paid invoice #AT-8812
                      submitted 14 days prior.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full text-xs"
                  >
                    Reject Invoice
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                  >
                    Escalate
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
