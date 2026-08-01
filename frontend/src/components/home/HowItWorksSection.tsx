import React from "react";
import {
  Upload,
  ScanText,
  BrainCircuit,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/home/card";
import { StepItem } from "@/types";

const steps: StepItem[] = [
  {
    step: "01",
    title: "Upload Invoice",
    description:
      "Ingest PDFs, scans, XMLs, or automatically sync via email & ERP integrations.",
    iconName: "Upload",
  },
  {
    step: "02",
    title: "OCR Extraction",
    description:
      "High-precision computer vision extracts metadata, line items, and tax info.",
    iconName: "ScanText",
  },
  {
    step: "03",
    title: "AI Risk Analysis",
    description:
      "Deep neural models cross-reference historical data for duplicate & fraud flags.",
    iconName: "BrainCircuit",
  },
  {
    step: "04",
    title: "Review Dashboard",
    description:
      "Inspect flagged high-risk items with human-readable AI rationale in seconds.",
    iconName: "LayoutDashboard",
  },
];

const renderIcon = (name: string) => {
  const props = {
    className:
      "h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-200",
  };
  switch (name) {
    case "Upload":
      return <Upload {...props} />;
    case "ScanText":
      return <ScanText {...props} />;
    case "BrainCircuit":
      return <BrainCircuit {...props} />;
    case "LayoutDashboard":
      return <LayoutDashboard {...props} />;
    default:
      return null;
  }
};

export const HowItWorksSection: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 border-t border-border/60 bg-muted/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Seamless Workflow
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            How LedgerIQ Audits Invoices in Seconds
          </p>
          <p className="text-muted-foreground text-base sm:text-lg">
            From raw document ingestion to automated decisioning without manual
            data entry.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div key={item.step} className="relative group">
              <Card className="h-full border-border/80 bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-border hover:shadow-lg">
                <CardHeader className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-colors duration-200 group-hover:bg-primary/20">
                      {renderIcon(item.iconName)}
                    </div>
                    <span className="text-2xl font-mono font-bold text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-200">
                      {item.step}
                    </span>
                  </div>

                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Arrow Indicator for Desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-muted-foreground/40">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
