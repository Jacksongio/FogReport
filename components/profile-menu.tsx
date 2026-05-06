"use client";

import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { FileText, LogOut, User } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type LoadedBriefing = {
  date: string;
  title: string;
  sections: { point: string; content: string }[];
  recommendations: string[];
  conclusion: string;
  finalRecommendation: string;
  classification: string;
  author: string;
  treatyReferences?: { title: string; relevance: string }[];
  disclaimer?: string;
};

export function ProfileMenu() {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const viewer = useQuery(api.users.viewer);

  const initial = (viewer?.email ?? viewer?.name ?? "?")
    .charAt(0)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-10 h-10 bg-dark-card/60 backdrop-blur-md border border-dark-border/60 hover:bg-flame/20 hover:border-flame/50 hover:text-flame transition-all"
          aria-label="Open profile menu"
        >
          <span className="text-sm font-semibold">{initial}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-dark-card/95 backdrop-blur-md border-dark-border rounded-xl"
      >
        <DropdownMenuLabel className="text-dark-text">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-flame" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate max-w-[160px]">
                {viewer?.email ?? viewer?.name ?? "Signed in"}
              </span>
              <span className="text-xs text-dark-muted">FogReport account</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-dark-border" />
        <DropdownMenuItem
          className="text-dark-text focus:bg-flame/20 focus:text-flame cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            router.push("/briefings");
          }}
        >
          <FileText className="w-4 h-4 mr-2" />
          Past Briefings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-dark-border" />
        <DropdownMenuItem
          className="text-dark-text focus:bg-flame/20 focus:text-flame cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            void signOut();
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
