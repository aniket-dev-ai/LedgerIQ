"use client";

import { GithubButton } from "@/components/auth/github-button";
import { GoogleButton } from "@/components/auth/google-button";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { useState } from "react"; 

type TabType = "login" | "signup";

export default function LoginPage() {
  const [tab, setTab] = useState<TabType>("login");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl hover:border-ring/60 hover:shadow-2xl">
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-left mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {tab === "login" && "Welcome back"}
            {tab === "signup" && "Create an account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {tab === "login" &&
              "Enter your credentials below or continue with social providers."}
            {tab === "signup" &&
              "Sign up with your credentials or use social sign-in."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-muted/50 border border-border rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`py-2 text-xs font-semibold rounded-lg cursor-pointer ${
              tab === "login"
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`py-2 text-xs font-semibold rounded-lg cursor-pointer ${
              tab === "signup"
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            Sign up
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <GithubButton />
          <GoogleButton />
        </div>
        {/* Active Tab View */}
        {tab === "login" && <LoginForm />}
        {tab === "signup" && <SignupForm />}
      </div>
    </div>
  );
}
