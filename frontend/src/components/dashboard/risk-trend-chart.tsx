"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { RiskTrendData } from "./mock-dashboard-data";

interface RiskTrendChartProps {
  data: RiskTrendData[];
}

// Custom aesthetic tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border/60 bg-card/95 p-3 shadow-xl backdrop-blur-md">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {label}
        </p>
        <div className="flex flex-col gap-1.5">
          {payload.map((entry: any, index: number) => (
            <div
              key={`item-${index}`}
              className="flex items-center gap-2 text-xs"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium text-muted-foreground">
                {entry.name}:
              </span>
              <span className="font-semibold text-foreground">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function RiskTrendChart({ data }: RiskTrendChartProps) {
  return (
    <Card className="rounded-xl border border-border/60 bg-card shadow-sm text-card-foreground">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-2">
        <div>
          <CardTitle className="text-base font-semibold text-foreground">
            Fraud Risk Trend
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Average risk score vs. total flagged invoices (Last 7 Days)
          </CardDescription>
        </div>

        {/* Modern Inline Legend Badges */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span className="text-muted-foreground font-medium">Avg Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-muted-foreground font-medium">Flagged</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4 pt-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              {/* Soft Gradient Definitions */}
              <defs>
                <linearGradient id="riskScoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--destructive)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--destructive)"
                    stopOpacity={0.0}
                  />
                </linearGradient>
                <linearGradient id="flaggedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0.0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="var(--border)"
                opacity={0.5}
              />

              <XAxis
                dataKey="day"
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={5}
              />

              <YAxis
                yAxisId="left"
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="avgRiskScore"
                name="Avg Risk Score"
                stroke="var(--destructive)"
                fill="url(#riskScoreGrad)"
                strokeWidth={2.5}
                connectNulls={true}
                dot={{ fill: "var(--destructive)", r: 3, strokeWidth: 0 }}
                activeDot={{
                  r: 6,
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
              />

              <Area
                yAxisId="right"
                type="monotone"
                dataKey="flaggedCount"
                name="Flagged Invoices"
                stroke="var(--primary)"
                fill="url(#flaggedGrad)"
                strokeWidth={2.5}
                connectNulls={true}
                dot={{ fill: "var(--primary)", r: 3, strokeWidth: 0 }}
                activeDot={{
                  r: 6,
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
              />
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.5}
              />

              <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={5}
              />

              {/* Left Y-Axis for Risk Score */}
              <YAxis
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                hide={true}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="avgRiskScore"
                name="Avg Risk Score"
                stroke="hsl(var(--destructive))"
                fill="url(#riskScoreGrad)"
                strokeWidth={2.5}
                connectNulls={true}
                dot={{ fill: "hsl(var(--destructive))", r: 3, strokeWidth: 0 }}
                activeDot={{
                  r: 6,
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />

              <Area
                yAxisId="right"
                type="monotone"
                dataKey="flaggedCount"
                name="Flagged Invoices"
                stroke="hsl(var(--primary))"
                fill="url(#flaggedGrad)"
                strokeWidth={2.5}
                connectNulls={true}
                dot={{ fill: "hsl(var(--primary))", r: 3, strokeWidth: 0 }}
                activeDot={{
                  r: 6,
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
