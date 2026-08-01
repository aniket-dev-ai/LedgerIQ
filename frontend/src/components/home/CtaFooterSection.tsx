import React from "react";
import {
  ShieldCheck,
  ArrowRight, 
} from "lucide-react";
import { Button } from "@/components/ui/home/button";

export const CtaFooterSection: React.FC = () => {
  return (
    <footer className="border-t border-border/60 bg-muted/20 pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Large CTA Banner */}
        <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-12 md:p-16 text-center space-y-6 shadow-2xl transition-all duration-200 hover:border-border mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
            Ready to Automate Your Financial Auditing?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Join hundreds of enterprise finance teams securing their AP
            pipelines with LedgerIQ today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 group text-base"
            >
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base"
            >
              Talk to Sales
            </Button>
          </div>
        </div>

        {/* Minimal Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-border/60 text-sm">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-foreground">
                LedgerIQ
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Autonomous financial audit &amp; risk engine for enterprise
              accounts payable.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  OCR Engine
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Fraud Protection
                </a>
              </li>
              <li>
                <a
                  href="#dashboard-preview"
                  className="hover:text-foreground transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#why-ledgeriq"
                  className="hover:text-foreground transition-colors"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Docs & Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Security Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()} LedgerIQ Inc. All rights reserved.
          </div> 
        </div>
      </div>
    </footer>
  );
};
