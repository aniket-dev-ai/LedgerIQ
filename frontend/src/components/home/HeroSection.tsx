import React from "react";
import {
  ArrowRight,
  ShieldAlert,
  Sparkles,
  FileCheck2,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/home/button";
import { Badge } from "@/components/ui/home/badge";
import { Card } from "@/components/ui/home/card";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Headline Block */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-secondary">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>LedgerIQ v2.0 is Live</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">
              Autonomous Financial Audit
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-[1.1]">
            Autonomous Invoice Risk &amp; Financial Audit Engine
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Eliminate invoice fraud, duplicate payouts, and compliance anomalies
            in real time with enterprise-grade OCR and explainable AI risk
            scoring.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 group text-base"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 text-base"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span>Request Live Demo</span>
            </Button>
          </div>

          {/* Micro Trust Markers */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>SOC2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Zero Retention Privacy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Integrates with SAP, NetSuite &amp; QuickBooks</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Dashboard Preview Mockup */}
        <div className="mt-12 md:mt-16">
          <Card className="relative overflow-hidden border-border/80 bg-card p-4 sm:p-6 shadow-2xl hover:border-border transition-all duration-200">
            {/* Top Bar Mockup */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-secondary-foreground/20" />
                <div className="h-3 w-3 rounded-full bg-primary/40" />
                <span className="text-xs font-mono text-muted-foreground ml-2">
                  live-audit-stream // enterprise-node-01
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">
                  Active OCR Pipelines: 24/24
                </Badge>
                <Badge variant="success" className="font-mono text-xs">
                  Engine: Optimal
                </Badge>
              </div>
            </div>

            {/* Quick Metrics Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 transition-all duration-200 hover:bg-muted/50 hover:border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Scanned Today</span>
                  <FileCheck2 className="h-4 w-4 text-primary" />
                </div>
                <div className="text-xl font-bold text-foreground">
                  1,842 Invoices
                </div>
                <div className="text-xs text-primary mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> +14% vs yesterday
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 transition-all duration-200 hover:bg-muted/50 hover:border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>High Risk Intercepted</span>
                  <ShieldAlert className="h-4 w-4 text-destructive" />
                </div>
                <div className="text-xl font-bold text-foreground">
                  $142,850
                </div>
                <div className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> 3 Critical duplicate
                  attempts
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 transition-all duration-200 hover:bg-muted/50 hover:border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Accuracy Rate</span>
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="text-xl font-bold text-foreground">99.94%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Based on 500k audit logs
                </div>
              </div>
            </div>

            {/* Mock Table Stream */}
            <div className="overflow-x-auto rounded-xl border border-border/60 bg-background">
              <table className="w-full text-left text-xs text-foreground">
                <thead className="border-b border-border bg-muted/40 font-mono text-muted-foreground">
                  <tr>
                    <th className="p-3">INV ID</th>
                    <th className="p-3">Vendor</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">AI Risk Score</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">AI Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-sans">
                  <tr className="hover:bg-muted/30 transition-colors duration-150">
                    <td className="p-3 font-mono font-medium">#INV-8821</td>
                    <td className="p-3 font-medium">Apex Global Logistics</td>
                    <td className="p-3 font-mono">$48,500.00</td>
                    <td className="p-3">
                      <Badge variant="destructive" className="font-mono">
                        94 / 100 High
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="destructive">Blocked</Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Bank account altered 2 days ago; velocity anomaly.
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors duration-150">
                    <td className="p-3 font-mono font-medium">#INV-8820</td>
                    <td className="p-3 font-medium">CloudScale Systems LLC</td>
                    <td className="p-3 font-mono">$12,300.00</td>
                    <td className="p-3">
                      <Badge variant="success" className="font-mono">
                        04 / 100 Low
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="success">Auto-Approved</Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Matches PO #9940 exact line items and vendor profile.
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors duration-150">
                    <td className="p-3 font-mono font-medium">#INV-8819</td>
                    <td className="p-3 font-medium">Nexus Office Supplies</td>
                    <td className="p-3 font-mono">$3,420.50</td>
                    <td className="p-3">
                      <Badge variant="secondary" className="font-mono">
                        42 / 100 Med
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">Reviewing</Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Potential line item rate variance (+12% vs contract).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
