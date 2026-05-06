"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const { signOut } = useAuthActions();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => void signOut()}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </Button>
  );
}
