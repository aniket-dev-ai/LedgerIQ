export function ForgetPassword() {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5 text-left">
        <p className="text-sm text-muted-foreground">
          Enter your registered email address and we will send you a secure link
          to reset your password.
        </p>
      </div>

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
    </div>
  );
}
