"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/home/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../theme-change-icon";
import { useUser } from "@/components/providers/user-provider";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/supabase/auth";
import { SignInDialog } from "./SignInDialog";

export const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();

      // Refresh Server Components so auth state updates
      router.refresh();

      // Optional: redirect to home
      router.push("/");
    } catch (err) {
      console.error(err);
    }
    console.log("Logged out successfully");
  };

  const handleRedirect = () => {
    router.push("/login");
  };
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    route: string,
  ) => {
    e.preventDefault();

    if (!user) {
      setOpen(true);
      return;
    }

    router.push(route);
  };
  const user = useUser();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 ease-out group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
            LedgerIQ
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-12 text-sm font-medium">
          <a
            href="#how-it-works"
            onClick={(e) => handleNavClick(e, "/upload")}
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Upload
          </a>
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, "/invoice")}
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Invoice
          </a>

          <a
            href="#dashboard-preview"
            onClick={(e) => handleNavClick(e, "/review")}
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Review
          </a>

          <a
            href="#why-ledgeriq"
            onClick={(e) => handleNavClick(e, "/dashboard")}
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Dashboard
          </a>
        </nav>
        <SignInDialog open={open} onOpenChange={setOpen} />

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          {!user?.user_metadata?.avatar_url ? (
            <Button
              variant="ghost"
              className="hidden sm:inline-flex"
              onClick={handleRedirect}
            >
              Sign In
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background cursor-pointer">
                <Image
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.full_name ?? "Profile"}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover hover:opacity-90 transition-opacity"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                {/* Wrap inside DropdownMenuGroup */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-popover-foreground">
                        {user.user_metadata.full_name ?? "Account"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
