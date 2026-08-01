import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-200 focus:outline-none";

  const variants = {
    default:
      "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "text-foreground border-border",
    destructive:
      "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20",
    success: "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20",
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}
