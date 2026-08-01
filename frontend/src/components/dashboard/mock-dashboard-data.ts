export interface KPIData {
  id: string;
  title: string;
  value: string;
  comparison: string;
  iconName: "FileText" | "ShieldAlert" | "Activity" | "DollarSign";
}

export interface RiskTrendData {
  day: string;
  avgRiskScore: number;
  flaggedCount: number;
  totalInvoices: number;
}

export interface InvoiceStatusData {
  name: string;
  value: number;
  colorVar: string;
}

export interface RecentInvoice {
  id: string;
  vendor: string;
  amount: string;
  riskScore: number;
  status: "Processed" | "Pending" | "Flagged";
  date: string;
}

export interface VendorData {
  id: string;
  name: string;
  riskScore: number;
  invoiceCount: number;
  flaggedCount: number;
}

export interface ActivityData {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "upload" | "fraud" | "vendor" | "approval";
}

export const dashboardStats: KPIData[] = [
  {
    id: "processed",
    title: "Invoices Processed",
    value: "14,280",
    comparison: "+12% from last month",
    iconName: "FileText",
  },
  {
    id: "high-risk",
    title: "High Risk Invoices",
    value: "142",
    comparison: "-3.4% from last month",
    iconName: "ShieldAlert",
  },
  {
    id: "avg-score",
    title: "Average Risk Score",
    value: "18.4 / 100",
    comparison: "-1.2 pts improvement",
    iconName: "Activity",
  },
  {
    id: "flagged-amount",
    title: "Flagged Amount",
    value: "$284,500",
    comparison: "+8% vs previous period",
    iconName: "DollarSign",
  },
];

export const riskTrend: RiskTrendData[] = [
  { day: "Mon", avgRiskScore: 14, flaggedCount: 8, totalInvoices: 420 },
  { day: "Tue", avgRiskScore: 22, flaggedCount: 15, totalInvoices: 510 },
  { day: "Wed", avgRiskScore: 18, flaggedCount: 11, totalInvoices: 480 },
  { day: "Thu", avgRiskScore: 31, flaggedCount: 24, totalInvoices: 530 },
  { day: "Fri", avgRiskScore: 25, flaggedCount: 18, totalInvoices: 600 },
  { day: "Sat", avgRiskScore: 12, flaggedCount: 4, totalInvoices: 210 },
  { day: "Sun", avgRiskScore: 15, flaggedCount: 6, totalInvoices: 190 },
];

export const invoiceStatus: InvoiceStatusData[] = [
  { name: "Processed", value: 12850, colorVar: "hsl(var(--primary))" },
  { name: "Pending", value: 1288, colorVar: "hsl(var(--muted-foreground))" },
  { name: "Flagged", value: 142, colorVar: "hsl(var(--destructive))" },
];

export const recentInvoices: RecentInvoice[] = [
  {
    id: "INV-2026-0891",
    vendor: "Apex Logistics Ltd",
    amount: "$42,800.00",
    riskScore: 92,
    status: "Flagged",
    date: "10 mins ago",
  },
  {
    id: "INV-2026-0890",
    vendor: "Nexus Cloud Systems",
    amount: "$18,450.00",
    riskScore: 84,
    status: "Flagged",
    date: "25 mins ago",
  },
  {
    id: "INV-2026-0889",
    vendor: "Global Freight Corp",
    amount: "$125,000.00",
    riskScore: 78,
    status: "Flagged",
    date: "1 hour ago",
  },
  {
    id: "INV-2026-0888",
    vendor: "Vanguard Supplies",
    amount: "$6,230.00",
    riskScore: 45,
    status: "Pending",
    date: "2 hours ago",
  },
  {
    id: "INV-2026-0887",
    vendor: "Synergy Workspace",
    amount: "$3,100.00",
    riskScore: 12,
    status: "Processed",
    date: "3 hours ago",
  },
];

export const vendors: VendorData[] = [
  {
    id: "VND-001",
    name: "Apex Logistics Ltd",
    riskScore: 89,
    invoiceCount: 48,
    flaggedCount: 12,
  },
  {
    id: "VND-002",
    name: "Nexus Cloud Systems",
    riskScore: 81,
    invoiceCount: 32,
    flaggedCount: 7,
  },
  {
    id: "VND-003",
    name: "Global Freight Corp",
    riskScore: 76,
    invoiceCount: 95,
    flaggedCount: 11,
  },
  {
    id: "VND-004",
    name: "Quantum Tech Services",
    riskScore: 68,
    invoiceCount: 22,
    flaggedCount: 4,
  },
];

export const activities: ActivityData[] = [
  {
    id: "ACT-001",
    title: "Fraud Detected",
    description: "Duplicate bank details detected on INV-2026-0891 ($42,800)",
    timestamp: "10 mins ago",
    type: "fraud",
  },
  {
    id: "ACT-002",
    title: "Vendor Flagged",
    description: "Apex Logistics Ltd risk score elevated to 89 (High)",
    timestamp: "28 mins ago",
    type: "vendor",
  },
  {
    id: "ACT-003",
    title: "Invoice Uploaded",
    description: "Batch of 45 invoices ingested via ERP Integration",
    timestamp: "1 hour ago",
    type: "upload",
  },
  {
    id: "ACT-004",
    title: "Invoice Approved",
    description: "INV-2026-0880 manually verified and approved by Audit",
    timestamp: "2 hours ago",
    type: "approval",
  },
];