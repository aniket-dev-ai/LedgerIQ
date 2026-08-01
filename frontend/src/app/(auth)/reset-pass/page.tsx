"use client";

import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl hover:border-ring/60 hover:shadow-2xl">
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-left mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Reset password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your registered email address and we will send you a secure
            link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block"
              htmlFor="reset-email"
            >
              Email Address
            </label>
            <input
              id="reset-email"
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none hover:border-ring hover:bg-accent/40 focus:border-ring focus:ring-1 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-primary border border-primary rounded-xl text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:shadow-lg cursor-pointer mt-2"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-xs font-medium text-muted-foreground hover:text-foreground hover:underline cursor-pointer"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
