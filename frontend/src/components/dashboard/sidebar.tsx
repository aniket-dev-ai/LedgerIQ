"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Upload,
  ClipboardList,
  Users,
  BarChart3,
  Settings, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Upload Invoice", icon: Upload, active: false },
  { name: "Review Queue", icon: ClipboardList, active: false },
  { name: "Vendor Analytics", icon: Users, active: false },
  { name: "Model Metrics", icon: BarChart3, active: false },
  { name: "Settings", icon: Settings, active: false },
];

export function Sidebar({ className = "" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-0 h-screen flex-col border-r border-border bg-card py-6 text-card-foreground transition-all duration-300 ${
        isCollapsed ? "w-16 px-2" : "w-64 px-4"
      } ${className}`}
    >
      {/* Header with Logo and Toggle Button */}
      <div className="flex items-center justify-between pb-6 px-2">
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              title={isCollapsed ? item.name : undefined}
              className={`flex w-full items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                isCollapsed ? "justify-center px-0" : "px-3"
              } ${
                item.active
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-border pt-4 px-2">
        {isCollapsed ? (
          <div
            className="text-center text-[10px] font-mono text-muted-foreground"
            title="v2.4-risk-ai"
          >
            v2.4
          </div>
        ) : (
          <p className="text-xs text-muted-foreground truncate">
            Engine:{" "}
            <span className="font-mono text-foreground">v2.4-risk-ai</span>
          </p>
        )}
      </div>
    </aside>
  );
}
