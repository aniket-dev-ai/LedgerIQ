import { KPIGrid } from "./kpi-grid";
import { RiskTrendChart } from "./risk-trend-chart";
import { InvoiceStatusChart } from "./invoice-status-chart";
import { RecentInvoicesTable } from "./recent-invoices-table";
import { VendorLeaderboard } from "./vendor-leaderboard";
import { RecentActivity } from "./recent-activity";

import {
  dashboardStats,
  riskTrend,
  invoiceStatus,
  recentInvoices,
  vendors,
  activities,
} from "./mock-dashboard-data";

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <KPIGrid stats={dashboardStats} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RiskTrendChart data={riskTrend} />
        </div>
        <div className="lg:col-span-1">
          <InvoiceStatusChart data={invoiceStatus} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentInvoicesTable invoices={recentInvoices} />
        </div>
        <div className="lg:col-span-1">
          <VendorLeaderboard vendors={vendors} />
        </div>
      </div>

      <RecentActivity activities={activities} />
    </div>
  );
}
