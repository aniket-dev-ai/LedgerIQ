import React from "react";
import { Navbar } from "@/components/home/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { DashboardPreviewSection } from "@/components/home/DashboardPreviewSection";
import { WhyLedgerIQSection } from "@/components/home/WhyLedgerIQSection";
import { CtaFooterSection } from "@/components/home/CtaFooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <DashboardPreviewSection />
        <WhyLedgerIQSection />
        <CtaFooterSection />
      </main>
    </div>
  );
}
