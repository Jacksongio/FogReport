"use client";

import { Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import type { RagMetadata } from "./types";

interface IntelligenceSourcesTabProps {
  ragMetadata: RagMetadata | null;
  onReturnToSetup: () => void;
}

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold text-dark-text">{label}</h3>
      <span className="text-xs text-dark-muted font-mono">{count} cited</span>
    </div>
  );
}

function SourceCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-dark-bg/50 border border-dark-border/60">
      {children}
    </div>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl">
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}

export function IntelligenceSourcesTab({
  ragMetadata,
  onReturnToSetup,
}: IntelligenceSourcesTabProps) {
  return (
    <TabsContent value="chat" className="flex-1 min-h-0 mt-4">
      <div className="h-full overflow-y-auto">
        <div className="flex items-center space-x-3 mb-6">
          <Target className="w-6 h-6 text-flame" />
          <h2 className="text-2xl font-bold text-dark-text">
            Intelligence Sources
          </h2>
        </div>

        {ragMetadata?.sources ? (
          <SourcesContent sources={ragMetadata.sources} />
        ) : (
          <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-dark-border rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-dark-muted" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-2">
                No Intelligence Sources Available
              </h3>
              <p className="text-dark-muted mb-6">
                Generate a briefing to view the structured sources used to
                ground the analysis.
              </p>
              <Button
                variant="outline"
                className="border-flame text-flame hover:bg-flame hover:text-white bg-transparent transition-all duration-200 hover:scale-[1.02] hover:glow-flame"
                onClick={onReturnToSetup}
              >
                Return to Setup
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </TabsContent>
  );
}

function SourcesContent({
  sources,
}: {
  sources: NonNullable<RagMetadata["sources"]>;
}) {
  const sectionCount =
    (sources.bases?.length ?? 0) +
    (sources.weapons?.length ?? 0) +
    (sources.treatyArticles?.length ?? 0) +
    (sources.chokepoints?.length ?? 0) +
    (sources.intelAgencies?.length ?? 0) +
    (sources.sofUnits?.length ?? 0) +
    (sources.defenseIndustries?.length ?? 0) +
    (sources.subStateActors?.length ?? 0) +
    (sources.historicalIncidents?.length ?? 0);

  if (sectionCount === 0) {
    return (
      <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl">
        <CardContent className="p-12 text-center">
          <p className="text-dark-muted">
            Briefing was generated but no structured sources were retrieved. Run{" "}
            <code className="text-flame">
              npx convex run seedActions:seedAll
            </code>{" "}
            to load the dataset.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-dark-muted">
        These are the structured records the briefing was grounded against.
        Citations in recommendations should map to entries below.
      </p>

      {sources.treatyArticles && sources.treatyArticles.length > 0 && (
        <SectionCard>
          <SectionHeader
            label="Treaty articles"
            count={sources.treatyArticles.length}
          />
          <div className="space-y-3">
            {sources.treatyArticles.map((a: any, i: number) => (
              <SourceCard key={i}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-semibold text-dark-text text-sm">
                    {a.treatyShortName ?? a.treatyTitle} — Article{" "}
                    {a.articleNumber}
                    {a.articleTitle ? (
                      <span className="text-dark-muted font-normal">
                        {" "}
                        · {a.articleTitle}
                      </span>
                    ) : null}
                  </h4>
                  {(a.offensiveSignatory || a.defensiveSignatory) && (
                    <Badge
                      variant="outline"
                      className="border-flame/40 text-flame text-xs whitespace-nowrap"
                    >
                      offensive: {a.offensiveSignatory ?? "n/a"} · defensive:{" "}
                      {a.defensiveSignatory ?? "n/a"}
                    </Badge>
                  )}
                </div>
                <p className="text-dark-muted text-xs leading-relaxed">
                  {a.content}
                </p>
              </SourceCard>
            ))}
          </div>
        </SectionCard>
      )}

      {sources.bases && sources.bases.length > 0 && (
        <SectionCard>
          <SectionHeader label="Military bases" count={sources.bases.length} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {sources.bases.map((b: any, i: number) => (
              <SourceCard key={i}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-dark-text text-sm">
                    {b.name}
                  </h4>
                  <span className="text-xs text-flame font-mono whitespace-nowrap">
                    {b.type}
                  </span>
                </div>
                <p className="text-dark-muted text-xs mb-2">
                  {b.location} · {b.region}
                </p>
                <p className="text-dark-muted text-xs leading-relaxed mb-2">
                  {b.role}
                </p>
                {b.hostedSystems?.length > 0 && (
                  <p className="text-xs text-dark-muted">
                    <span className="font-medium text-dark-text">Hosted:</span>{" "}
                    {b.hostedSystems.slice(0, 4).join(" · ")}
                  </p>
                )}
              </SourceCard>
            ))}
          </div>
        </SectionCard>
      )}

      {sources.weapons && sources.weapons.length > 0 && (
        <SectionCard>
          <SectionHeader
            label="Weapon systems"
            count={sources.weapons.length}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {sources.weapons.map((w: any, i: number) => (
              <SourceCard key={i}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-dark-text text-sm">
                    {w.name}
                  </h4>
                  <span className="text-xs text-flame font-mono whitespace-nowrap">
                    {w.category}
                  </span>
                </div>
                <p className="text-dark-muted text-xs mb-2">
                  Origin: {w.originCountryCode}
                  {w.rangeKm ? ` · range ${w.rangeKm} km` : ""}
                </p>
                {w.payload && (
                  <p className="text-xs text-dark-muted mb-1">
                    <span className="font-medium text-dark-text">Payload:</span>{" "}
                    {w.payload}
                  </p>
                )}
                <p className="text-dark-muted text-xs leading-relaxed">
                  {w.description}
                </p>
              </SourceCard>
            ))}
          </div>
        </SectionCard>
      )}

      {sources.subStateActors && sources.subStateActors.length > 0 && (
        <SectionCard>
          <SectionHeader
            label="Sub-state actors"
            count={sources.subStateActors.length}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {sources.subStateActors.map((a: any, i: number) => (
              <SourceCard key={i}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-dark-text text-sm">
                    {a.name}
                  </h4>
                  <span className="text-xs text-flame font-mono whitespace-nowrap">
                    {a.type}
                  </span>
                </div>
                <p className="text-dark-muted text-xs mb-2">
                  {a.region}
                  {a.primarySponsorCountryCode
                    ? ` · sponsor: ${a.primarySponsorCountryCode}`
                    : ""}
                </p>
                <p className="text-dark-muted text-xs leading-relaxed mb-2">
                  {a.description}
                </p>
                {a.arsenal?.length > 0 && (
                  <p className="text-xs text-dark-muted">
                    <span className="font-medium text-dark-text">Arsenal:</span>{" "}
                    {a.arsenal.slice(0, 3).join(" · ")}
                  </p>
                )}
              </SourceCard>
            ))}
          </div>
        </SectionCard>
      )}

      {sources.chokepoints && sources.chokepoints.length > 0 && (
        <SectionCard>
          <SectionHeader
            label="Strategic chokepoints"
            count={sources.chokepoints.length}
          />
          <div className="space-y-3">
            {sources.chokepoints.map((c: any, i: number) => (
              <SourceCard key={i}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-dark-text text-sm">
                    {c.name}
                  </h4>
                  <span className="text-xs text-flame font-mono whitespace-nowrap">
                    {c.type}
                  </span>
                </div>
                <p className="text-dark-muted text-xs mb-2">
                  {c.region} · borders {c.bordersCountryCodes.join(", ")}
                </p>
                <p className="text-dark-muted text-xs leading-relaxed">
                  {c.significance}
                </p>
              </SourceCard>
            ))}
          </div>
        </SectionCard>
      )}

      {sources.intelAgencies && sources.intelAgencies.length > 0 && (
        <SectionCard>
          <SectionHeader
            label="Intelligence agencies"
            count={sources.intelAgencies.length}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {sources.intelAgencies.map((a: any, i: number) => (
              <SourceCard key={i}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-dark-text text-sm">
                    {a.name}
                  </h4>
                  <span className="text-xs text-flame font-mono whitespace-nowrap">
                    {a.countryCode} · {a.type}
                  </span>
                </div>
                <p className="text-dark-muted text-xs leading-relaxed">
                  {a.mission}
                </p>
              </SourceCard>
            ))}
          </div>
        </SectionCard>
      )}

      {sources.sofUnits && sources.sofUnits.length > 0 && (
        <SectionCard>
          <SectionHeader
            label="Special operations units"
            count={sources.sofUnits.length}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {sources.sofUnits.map((u: any, i: number) => (
              <SourceCard key={i}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-dark-text text-sm">
                    {u.name}
                  </h4>
                  <span className="text-xs text-flame font-mono whitespace-nowrap">
                    {u.countryCode}
                  </span>
                </div>
                <p className="text-dark-muted text-xs mb-1">
                  {u.parentService}
                </p>
                <p className="text-dark-muted text-xs leading-relaxed">
                  {u.role}
                </p>
              </SourceCard>
            ))}
          </div>
        </SectionCard>
      )}

      {sources.defenseIndustries && sources.defenseIndustries.length > 0 && (
        <SectionCard>
          <SectionHeader
            label="Defense industries"
            count={sources.defenseIndustries.length}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {sources.defenseIndustries.map((d: any, i: number) => (
              <SourceCard key={i}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-dark-text text-sm">
                    {d.name}
                  </h4>
                  <span className="text-xs text-flame font-mono whitespace-nowrap">
                    {d.countryCode}
                  </span>
                </div>
                <p className="text-dark-muted text-xs leading-relaxed mb-2">
                  {d.notes}
                </p>
                {d.keyProducts?.length > 0 && (
                  <p className="text-xs text-dark-muted">
                    <span className="font-medium text-dark-text">
                      Products:
                    </span>{" "}
                    {d.keyProducts.slice(0, 4).join(" · ")}
                  </p>
                )}
              </SourceCard>
            ))}
          </div>
        </SectionCard>
      )}

      {sources.historicalIncidents &&
        sources.historicalIncidents.length > 0 && (
          <SectionCard>
            <SectionHeader
              label="Historical analogies"
              count={sources.historicalIncidents.length}
            />
            <div className="space-y-3">
              {sources.historicalIncidents.map((h: any, i: number) => (
                <SourceCard key={i}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-dark-text text-sm">
                      {h.name}
                    </h4>
                    <span className="text-xs text-flame font-mono whitespace-nowrap">
                      {h.startDate}
                      {h.endDate ? `–${h.endDate}` : ""}
                    </span>
                  </div>
                  <p className="text-dark-muted text-xs mb-2">
                    {h.region} · {h.type}
                  </p>
                  <p className="text-dark-muted text-xs leading-relaxed mb-2">
                    {h.summary}
                  </p>
                  {h.lessons?.length > 0 && (
                    <p className="text-xs text-dark-muted">
                      <span className="font-medium text-dark-text">
                        Lessons:
                      </span>{" "}
                      {h.lessons.slice(0, 2).join(" · ")}
                    </p>
                  )}
                </SourceCard>
              ))}
            </div>
          </SectionCard>
        )}
    </div>
  );
}
