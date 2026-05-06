"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { ArrowLeft, FileText, Search, X } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import StarryBackground from "@/components/StarryBackground";
import { AuthGate } from "@/components/auth-gate";
import { ProfileMenu } from "@/components/profile-menu";

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function PastBriefings() {
  const router = useRouter();
  const briefings = useQuery(api.briefings.list);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!briefings) return [];
    const q = search.trim().toLowerCase();
    if (!q) return briefings;
    return briefings.filter((b) => {
      const haystack = [
        b.title,
        b.classification,
        b.author,
        b.conclusion,
        b.finalRecommendation,
        ...b.recommendations,
        ...b.sections.map((s) => s.content),
        ...(b.treatyReferences ?? []).flatMap((r) => [r.title, r.relevance]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [briefings, search]);

  return (
    <div className="bg-dark-bg text-dark-text min-h-screen flex flex-col relative overflow-hidden">
      <StarryBackground />

      <header className="relative z-10 border-b border-dark-border/60 bg-dark-card/40 backdrop-blur-md">
        <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between w-full gap-4">
            <Link
              href="/"
              aria-label="Return to simulator"
              className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden glow-blue relative group-hover:scale-105 transition-transform">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-light-reflection rounded-lg pointer-events-none"></div>
                <Image
                  src="/fogreport.png"
                  alt="FogReport Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain relative z-0"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-dark-text group-hover:text-flame transition-colors">
                  Fog<span className="text-flame">Report</span>
                </h1>
                <p className="text-xs sm:text-sm text-dark-muted">
                  Past Intelligence Briefings
                </p>
              </div>
            </Link>
            <ProfileMenu />
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-3 sm:px-6 py-4 sm:py-8 flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-flame" />
              <h2 className="text-2xl font-bold text-dark-text">Past Briefings</h2>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="border-flame text-flame hover:bg-flame hover:text-white bg-transparent transition-all duration-200 hover:scale-[1.02] hover:glow-flame"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Simulator
              </Button>
            </Link>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, classification, author, or any briefing text..."
              className="bg-dark-card/60 backdrop-blur-md border-dark-border/60 text-dark-text pl-10 pr-10 h-11"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-flame transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results summary */}
          {briefings !== undefined && (
            <p className="text-sm text-dark-muted">
              {search ? (
                <>
                  Showing <span className="text-dark-text font-semibold">{filtered.length}</span> of {briefings.length} briefings
                </>
              ) : (
                <>{briefings.length} briefing{briefings.length === 1 ? "" : "s"} on file</>
              )}
            </p>
          )}

          {/* List */}
          {briefings === undefined ? (
            <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl">
              <CardContent className="p-12 text-center">
                <p className="text-dark-muted">Loading...</p>
              </CardContent>
            </Card>
          ) : briefings.length === 0 ? (
            <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl">
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-dark-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-dark-text mb-2">
                  No briefings yet
                </h3>
                <p className="text-dark-muted mb-6">
                  Generate your first intelligence briefing to see it appear here.
                </p>
                <Link href="/">
                  <Button className="bg-flame hover:bg-flame/90 text-white glow-flame hover-glow-flame transition-all duration-200 hover:scale-[1.02]">
                    Start a simulation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : filtered.length === 0 ? (
            <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl">
              <CardContent className="p-12 text-center">
                <p className="text-dark-muted">
                  No briefings match &quot;<span className="text-dark-text">{search}</span>&quot;.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map((briefing) => (
                <button
                  key={briefing._id}
                  type="button"
                  onClick={() => router.push(`/?briefing=${briefing._id}`)}
                  className="w-full text-left p-5 rounded-xl bg-dark-card/60 backdrop-blur-md border border-dark-border/60 hover:border-flame/50 hover:bg-dark-card/80 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="text-base font-semibold text-dark-text">
                      {briefing.title}
                    </h4>
                    <Badge variant="outline" className="border-flame/40 text-flame whitespace-nowrap font-mono text-xs">
                      {briefing.classification}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-dark-muted gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <span>{formatDate(briefing._creationTime)}</span>
                      <span className="text-dark-border">·</span>
                      <span>{briefing.author}</span>
                    </div>
                    {briefing.treatiesAnalyzed && briefing.treatiesAnalyzed > 0 ? (
                      <span className="text-flame">
                        {briefing.treatiesAnalyzed} treaty article
                        {briefing.treatiesAnalyzed === 1 ? "" : "s"} analyzed
                      </span>
                    ) : null}
                  </div>
                  {briefing.recommendations.length > 0 && (
                    <p className="text-sm text-dark-muted mt-3 line-clamp-2">
                      {briefing.recommendations[0]}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <AuthGate>
      <PastBriefings />
    </AuthGate>
  );
}
