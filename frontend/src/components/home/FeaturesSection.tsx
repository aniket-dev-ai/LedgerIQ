import React from "react";
import {
  Scan,
  ShieldAlert,
  CopyX,
  Building2,
  FileSearch,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/home/card";
import { Badge } from "@/components/ui/home/badge";
import { FeatureItem } from "@/types";

const features: FeatureItem[] = [
  {
    title: "OCR Extraction",
    description:
      "Multilingual layout-aware parser extracts tables, header metadata, tax rules, and line items at 99.9% precision.",
    badge: "Computer Vision",
    iconName: "Scan",
  },
  {
    title: "Fraud Detection",
    description:
      "Detects modified PDF structures, altered bank routing details, suspicious dates, and phantom vendor profiles.",
    badge: "AI Security",
    iconName: "ShieldAlert",
  },
  {
    title: "Duplicate Detection",
    description:
      "Cross-checks entity databases to stop duplicate payments across multiple subsidiaries, formats, or currencies.",
    badge: "Cross-Entity",
    iconName: "CopyX",
  },
  {
    title: "Vendor Anomaly Detection",
    description:
      "Monitors historical vendor velocity, sudden price spikes, uncharacteristic volume, and off-contract pricing.",
    badge: "Behavioral AI",
    iconName: "Building2",
  },
  {
    title: "AI Risk Explanation",
    description:
      "Generates clear, natural language audit notes detailing exact policy breaches for human approval workflows.",
    badge: "Explainable AI",
    iconName: "FileSearch",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Real-time visibility into invoice volumes, risk distribution, financial leakage prevented, and AP velocity.",
    badge: "Executive BI",
    iconName: "BarChart3",
  },
];

const renderFeatureIcon = (name: string) => {
  const props = {
    className:
      "h-6 w-6 text-primary transition-transform duration-200 group-hover:scale-110",
  };
  switch (name) {
    case "Scan":
      return <Scan {...props} />;
    case "ShieldAlert":
      return <ShieldAlert {...props} />;
    case "CopyX":
      return <CopyX {...props} />;
    case "Building2":
      return <Building2 {...props} />;
    case "FileSearch":
      return <FileSearch {...props} />;
    case "BarChart3":
      return <BarChart3 {...props} />;
    default:
      return null;
  }
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Enterprise Architecture
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Everything Required for Autonomous Financial Auditing
          </p>
          <p className="text-muted-foreground text-base sm:text-lg">
            Purpose-built machine intelligence designed specifically for modern
            finance and accounts payable teams.
          </p>
        </div>

        {/* Responsive 2x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => (
            <Card
              key={item.title}
              className="group border-border/80 bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-border hover:shadow-xl"
            >
              <CardHeader className="p-0 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-colors duration-200 group-hover:bg-primary/20">
                    {renderFeatureIcon(item.iconName)}
                  </div>
                  <Badge variant="outline" className="text-xs font-mono">
                    {item.badge}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
