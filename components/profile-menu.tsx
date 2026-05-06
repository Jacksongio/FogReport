"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { FileText, LogOut, User } from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BriefingDoc = Doc<"briefings">;

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

interface ProfileMenuProps {
  onLoadBriefing: (briefing: LoadedBriefing) => void;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ProfileMenu({ onLoadBriefing }: ProfileMenuProps) {
  const { signOut } = useAuthActions();
  const viewer = useQuery(api.users.viewer);
  const briefings = useQuery(api.briefings.list);
  const [briefingsOpen, setBriefingsOpen] = useState(false);

  const initial = (viewer?.email ?? viewer?.name ?? "?")
    .charAt(0)
    .toUpperCase();

  const handleSelect = (briefing: BriefingDoc) => {
    onLoadBriefing({
      date: briefing.date,
      title: briefing.title,
      sections: briefing.sections,
      recommendations: briefing.recommendations,
      conclusion: briefing.conclusion,
      finalRecommendation: briefing.finalRecommendation,
      classification: briefing.classification,
      author: briefing.author,
      treatyReferences: briefing.treatyReferences,
      disclaimer: briefing.disclaimer,
    });
    setBriefingsOpen(false);
  };

  return (
    <>
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
              setBriefingsOpen(true);
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

      <Dialog open={briefingsOpen} onOpenChange={setBriefingsOpen}>
        <DialogContent className="bg-dark-card/95 backdrop-blur-md border-dark-border rounded-2xl max-w-2xl text-dark-text">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-flame" />
              Past Briefings
            </DialogTitle>
            <DialogDescription className="text-dark-muted">
              Click a briefing to load it into the Intelligence Briefing tab.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-1">
            {briefings === undefined ? (
              <p className="text-sm text-dark-muted py-8 text-center">Loading...</p>
            ) : briefings.length === 0 ? (
              <p className="text-sm text-dark-muted py-8 text-center">
                You haven&apos;t generated any briefings yet.
              </p>
            ) : (
              briefings.map((briefing) => (
                <button
                  key={briefing._id}
                  type="button"
                  onClick={() => handleSelect(briefing)}
                  className="w-full text-left p-4 rounded-xl bg-dark-bg/50 border border-dark-border/60 hover:border-flame/50 hover:bg-dark-bg/80 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h4 className="text-sm font-semibold text-dark-text line-clamp-2">
                      {briefing.title}
                    </h4>
                    <span className="text-xs text-flame font-mono whitespace-nowrap">
                      {briefing.classification}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-dark-muted">
                    <span>{formatDate(briefing._creationTime)}</span>
                    {briefing.treatiesAnalyzed && briefing.treatiesAnalyzed > 0 ? (
                      <span>{briefing.treatiesAnalyzed} treaties analyzed</span>
                    ) : null}
                  </div>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
