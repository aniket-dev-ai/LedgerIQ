export interface InvoiceItem {
  id: string;
  vendor: string;
  invoiceNo: string;
  amount: string;
  date: string;
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High";
  flagReason?: string;
  status: "Passed" | "Flagged" | "Reviewing";
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface MetricCardItem {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface ImpactCardItem {
  metric: string;
  subtext: string;
  title: string;
  description: string;
  highlights: string[];
}