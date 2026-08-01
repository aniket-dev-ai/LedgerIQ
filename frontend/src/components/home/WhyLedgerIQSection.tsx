import React from "react";
import {Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/home/card"; 
import { ImpactCardItem } from "@/types";

const impactCards: ImpactCardItem[] = [
  {
    metric: "10x",
    subtext: "Faster Reviews",
    title: "Instant Verification Cycles",
    description:
      "Replace tedious manual 3-way matching with instant AI verification workflows.",
    highlights: [
      "Sub-second document parsing",
      "Automated PO line matching",
      "Zero manual keystrokes",
    ],
  },
  {
    metric: "100%",
    subtext: "Leakage Prevention",
    title: "Zero Fraud & Duplicate Payouts",
    description:
      "Catch complex duplicate submissions across subsidiaries before funds leave your account.",
    highlights: [
      "Bank detail modification alerts",
      "Cross-entity duplicate checks",
      "Phantom vendor detection",
    ],
  },
  {
    metric: "99.9%",
    subtext: "Explainable AI",
    title: "Audit-Grade Decisions",
    description:
      "Every risk score is paired with plain-English audit trails ready for external auditors.",
    highlights: [
      "SOC2 compliant logging",
      "Deterministic policy rules",
      "Human-in-the-loop overrides",
    ],
  },
];

export const WhyLedgerIQSection: React.FC = () => {
  return (
    <section id="why-ledgeriq" className="py-20 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Proven Business Impact
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Why Enterprise Finance Teams Choose LedgerIQ
          </p>
          <p className="text-muted-foreground text-base sm:text-lg">
            Measurable operational improvements built for enterprise
            controllers, CFOs, and AP managers.
          </p>
        </div>

        {/* 3 Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactCards.map((item) => (
            <Card
              key={item.title}
              className="group border-border/80 bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-border hover:shadow-xl flex flex-col justify-between"
            >
              <CardHeader className="p-0 space-y-4">
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold text-primary font-mono">
                    {item.metric}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {item.subtext}
                  </div>
                </div>

                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardHeader>

              <CardContent className="p-0 pt-6 border-t border-border/60 mt-6 space-y-2">
                {item.highlights.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2 text-xs text-foreground"
                  >
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
