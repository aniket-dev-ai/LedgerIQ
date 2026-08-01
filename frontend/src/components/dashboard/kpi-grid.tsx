import { KPICard } from "./kpi-card";
import { KPIData } from "./mock-dashboard-data";

interface KPIGridProps {
  stats: KPIData[];
}

export function KPIGrid({ stats }: KPIGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <KPICard key={stat.id} data={stat} />
      ))}
    </div>
  );
}
