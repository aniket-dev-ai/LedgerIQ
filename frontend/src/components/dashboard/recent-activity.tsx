import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUp, AlertTriangle, Building2, CheckCircle2 } from "lucide-react";
import { ActivityData } from "./mock-dashboard-data";

interface RecentActivityProps {
  activities: ActivityData[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: ActivityData["type"]) => {
    switch (type) {
      case "fraud":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "vendor":
        return <Building2 className="h-4 w-4 text-muted-foreground" />;
      case "upload":
        return <FileUp className="h-4 w-4 text-muted-foreground" />;
      case "approval":
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      default:
        return <FileUp className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="rounded-xl border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          Recent Activity
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          System events and automated anomaly audit log
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4 pl-2">
          {activities.map((act) => (
            <div key={act.id} className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full border border-border bg-muted p-1.5">
                {getActivityIcon(act.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {act.title}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {act.timestamp}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
