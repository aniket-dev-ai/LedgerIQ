export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-1 pb-2">
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Dashboard
      </h1>
      <p className="text-sm text-muted-foreground">
        Monitor invoice fraud, vendor anomalies and processing activity.
      </p>
    </div>
  );
}
