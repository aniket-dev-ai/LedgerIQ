import { signup } from "@/lib/supabase/auth";

export function SignupForm() {
  return (
    <div className="space-y-6">
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Or continue with
        </span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      <form className="space-y-4">
        <div className="space-y-1.5">
          <label
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block"
            htmlFor="signup-name"
          >
            Full Name
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            className="w-full px-3.5 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none hover:border-ring hover:bg-accent/40 focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block"
            htmlFor="signup-phone"
          >
            Phone Number
          </label>
          <input
            id="signup-phone"
            name="phone"
            type="tel"
            required
            placeholder="+1 (555) 000-0000"
            className="w-full px-3.5 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none hover:border-ring hover:bg-accent/40 focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block"
            htmlFor="signup-email"
          >
            Email Address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            className="w-full px-3.5 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none hover:border-ring hover:bg-accent/40 focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block"
            htmlFor="signup-password"
          >
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none hover:border-ring hover:bg-accent/40 focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </div>

        <button
          formAction={signup}
          className="w-full py-2.5 px-4 bg-primary border border-primary rounded-xl text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:shadow-lg cursor-pointer mt-2"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
