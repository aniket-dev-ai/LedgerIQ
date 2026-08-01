export interface UploadItem {
  id: string;
  filename: string;
  size: string;
  uploadedAt: string;
  status: "Completed" | "Processing" | "Failed";
  risk: "High" | "Medium" | "Low";
}

export const mockUploads: UploadItem[] = [
  {
    id: "INV-2026-001",
    filename: "Acme_Corp_January_Invoice.pdf",
    size: "2.4 MB",
    uploadedAt: "2026-08-01 14:32",
    status: "Completed",
    risk: "Low",
  },
  {
    id: "INV-2026-002",
    filename: "Logistics_Freight_Receipt.png",
    size: "4.1 MB",
    uploadedAt: "2026-08-01 13:15",
    status: "Completed",
    risk: "High",
  },
  {
    id: "INV-2026-003",
    filename: "Cloud_Services_Subscription.pdf",
    size: "1.8 MB",
    uploadedAt: "2026-08-01 11:45",
    status: "Processing",
    risk: "Medium",
  },
  {
    id: "INV-2026-004",
    filename: "Office_Supplies_Vendor.jpg",
    size: "5.6 MB",
    uploadedAt: "2026-07-31 17:20",
    status: "Failed",
    risk: "High",
  },
  {
    id: "INV-2026-005",
    filename: "Legal_Consulting_Retainer.pdf",
    size: "890 KB",
    uploadedAt: "2026-07-31 16:05",
    status: "Completed",
    risk: "Low",
  },
  {
    id: "INV-2026-006",
    filename: "Utility_Electric_Bill_Q2.jpeg",
    size: "3.2 MB",
    uploadedAt: "2026-07-30 09:12",
    status: "Completed",
    risk: "Low",
  },
  {
    id: "INV-2026-007",
    filename: "Software_Licenses_Enterprise.pdf",
    size: "6.7 MB",
    uploadedAt: "2026-07-29 18:40",
    status: "Completed",
    risk: "Medium",
  },
  {
    id: "INV-2026-008",
    filename: "Hardware_Server_Maintenance.pdf",
    size: "1.1 MB",
    uploadedAt: "2026-07-29 10:00",
    status: "Completed",
    risk: "Low",
  },
];