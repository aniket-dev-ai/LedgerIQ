"use client";

import { ForgetPassword } from "@/components/auth/forget-password";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { useState } from "react"; 
type TabType = "login" | "signup" | "forgot";

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
            {tab === "forgot" && "Reset password"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {tab === "login" &&
              "Enter your credentials below or continue with social providers."}
            {tab === "signup" &&
              "Sign up with your credentials or use social sign-in."}
            {tab === "forgot" && "Recover access to your account securely."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-muted/50 border border-border rounded-xl mb-6">
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
          <button
            type="button"
            onClick={() => setTab("forgot")}
            className={`py-2 text-xs font-semibold rounded-lg cursor-pointer ${
              tab === "forgot"
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            Reset
          </button>
        </div>

        {/* Active Tab View */}
        {tab === "login" && <LoginForm />}
        {tab === "signup" && <SignupForm />}
        {tab === "forgot" && <ForgetPassword />}
      </div>
    </div>
  );
}
