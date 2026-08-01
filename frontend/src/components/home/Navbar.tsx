"use client";

import React from "react";
import { ShieldCheck, ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/home/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../theme-change-icon";

export const Navbar: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    // You can add extra logic here before redirecting (e.g., analytics, form validation)
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between  sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 ease-out group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
            LedgerIQ
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-12 text-sm font-medium">
          <a
            href="#how-it-works"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Upload
          </a>
          <a
            href="#features"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            invoice
          </a>
          <a
            href="#dashboard-preview"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Review
          </a>
          <a
            href="#why-ledgeriq"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Dashboard
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button
            variant="ghost"
            className="hidden sm:inline-flex"
            onClick={handleRedirect}
          >
            Sign In
          </Button>
          <Button className="group gap-2">
            <span>Book Demo</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </Button>

          {/* Mobile Menu Trigger Placeholder */}
          <Button variant="ghost" size="sm" className="md:hidden p-2">
            <Menu className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
};
