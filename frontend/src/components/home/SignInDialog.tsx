// components/auth/SignInDialog.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { loginWithGoogle, loginWithGithub } from "@/lib/supabase/auth";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>
            Please sign in to access LedgerIQ features.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={loginWithGoogle}>Continue with Google</Button>

          <Button variant="outline" onClick={loginWithGithub}>
            Continue with GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
