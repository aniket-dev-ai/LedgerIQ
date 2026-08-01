import { Search, Bell, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card px-6">
      <div className="relative w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search invoices, vendors..."
          className="pl-9 bg-background border-border text-xs focus-visible:ring-ring"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-border text-foreground hover:bg-accent"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-border text-foreground hover:bg-accent"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Avatar className="h-8 w-8 border border-border">
          <AvatarImage src="/avatar.jpg" alt="User Avatar" />
          <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
