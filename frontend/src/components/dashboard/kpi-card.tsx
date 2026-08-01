import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShieldAlert, Activity, DollarSign } from "lucide-react";
import { KPIData } from "./mock-dashboard-data";

interface KPICardProps {
  data: KPIData;
}

export function KPICard({ data }: KPICardProps) {
  const getIcon = () => {
    switch (data.iconName) {
      case "FileText":
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      case "ShieldAlert":
        return <ShieldAlert className="h-4 w-4 text-destructive" />;
      case "Activity":
        return <Activity className="h-4 w-4 text-muted-foreground" />;
      case "DollarSign":
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="rounded-xl border-border bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {data.title}
        </CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight text-foreground">
          {data.value}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{data.comparison}</p>
      </CardContent>
    </Card>
  );
}
