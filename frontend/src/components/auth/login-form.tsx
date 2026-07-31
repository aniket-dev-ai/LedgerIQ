import { GoogleButton } from "./google-button";
import { GithubButton } from "./github-button";
import { login } from "@/lib/supabase/auth";

export function LoginForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <GithubButton />
        <GoogleButton />
      </div>

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
            htmlFor="login-email"
          >
            Email Address
          </label>
          <input
            id="login-email"
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
            htmlFor="login-password"
          >
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none hover:border-ring hover:bg-accent/40 focus:border-ring focus:ring-1 focus:ring-ring"
          />
        </div>

        <button
          formAction={login}
          className="w-full py-2.5 px-4 bg-primary border border-primary rounded-xl text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:shadow-lg cursor-pointer mt-2"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
