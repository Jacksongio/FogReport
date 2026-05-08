"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FileText, Lock, Settings, Target } from "lucide-react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import StarryBackground from "@/components/StarryBackground";
import { AuthGate } from "@/components/auth-gate";
import { PoliticalAdvisorHeader } from "@/components/political-advisor/header";
import { SetupTab } from "@/components/political-advisor/setup-tab";
import { BriefingTab } from "@/components/political-advisor/briefing-tab";
import { IntelligenceSourcesTab } from "@/components/political-advisor/intelligence-sources-tab";
import type { Country } from "@/components/political-advisor/types";
import { detectConflictType } from "@/lib/conflict-detection";
import type { ExampleScenario } from "@/lib/example-scenarios";
import { useBriefingGenerator } from "@/hooks/use-briefing-generator";
import { describeError } from "@/lib/error-messages";

function PoliticalAdvisor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const briefingIdParam = searchParams.get("briefing");
  const requestedBriefing = useQuery(
    api.briefings.get,
    briefingIdParam ? { id: briefingIdParam as Id<"briefings"> } : "skip",
  );
  const searchTreaties = useAction(api.treaties.searchByScenario);
  const treatyStats = useQuery(api.treaties.statistics);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [conflictScenario, setConflictScenario] = useState("");
  const [offensiveCountry, setOffensiveCountry] = useState("");
  const [defensiveCountry, setDefensiveCountry] = useState("");
  const [scenarioDetails, setScenarioDetails] = useState("");
  const [severityLevel, setSeverityLevel] = useState("");
  const [timeFrame, setTimeFrame] = useState("");

  const [, setTreatyStatistics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("setup");

  const [selectedCountryOpen, setSelectedCountryOpen] = useState(false);
  const [offensiveCountryOpen, setOffensiveCountryOpen] = useState(false);
  const [defensiveCountryOpen, setDefensiveCountryOpen] = useState(false);

  const [tradeDependencies, setTradeDependencies] = useState([50]);
  const [sanctionsImpact, setSanctionsImpact] = useState([50]);
  const [marketStability, setMarketStability] = useState([50]);
  const [defenseCapabilities, setDefenseCapabilities] = useState([50]);
  const [allianceSupport, setAllianceSupport] = useState([50]);
  const [strategicResources, setStrategicResources] = useState([50]);
  const [unSupport, setUnSupport] = useState([50]);
  const [regionalInfluence, setRegionalInfluence] = useState([50]);
  const [publicOpinion, setPublicOpinion] = useState([50]);

  const [countries, setCountries] = useState<Country[]>([]);

  const briefing = useBriefingGenerator({
    countries,
    selectedCountry,
    offensiveCountry,
    defensiveCountry,
    scenarioDetails,
    severityLevel,
    timeFrame,
    conflictScenario,
    setConflictScenario,
    sliders: {
      tradeDependencies: tradeDependencies[0],
      sanctionsImpact: sanctionsImpact[0],
      marketStability: marketStability[0],
      defenseCapabilities: defenseCapabilities[0],
      allianceSupport: allianceSupport[0],
      strategicResources: strategicResources[0],
      unSupport: unSupport[0],
      regionalInfluence: regionalInfluence[0],
      publicOpinion: publicOpinion[0],
    },
    onTabChange: setActiveTab,
  });

  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch("/api/countries");
        if (!res.ok) {
          throw new Error(`Failed to fetch countries (${res.status})`);
        }
        const data: Country[] = await res.json();
        data.sort((a, b) => b.power - a.power);
        setCountries(data);
      } catch (err) {
        console.error(err);
        const friendly = describeError("countries.load", err);
        toast({
          title: friendly.title,
          description: friendly.description,
          variant: "destructive",
        });
      }
    }
    loadCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!briefingIdParam) return;
    if (requestedBriefing === undefined) return;
    if (requestedBriefing === null) {
      router.replace("/");
      return;
    }
    briefing.setBriefingData({
      date: requestedBriefing.date,
      title: requestedBriefing.title,
      sections: requestedBriefing.sections,
      recommendations: requestedBriefing.recommendations,
      conclusion: requestedBriefing.conclusion,
      finalRecommendation: requestedBriefing.finalRecommendation,
      classification: requestedBriefing.classification,
      author: requestedBriefing.author,
      treatyReferences: requestedBriefing.treatyReferences,
      disclaimer: requestedBriefing.disclaimer,
    });
    setActiveTab("results");
    router.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [briefingIdParam, requestedBriefing, router]);

  useEffect(() => {
    if (treatyStats) {
      setTreatyStatistics((prev: any) => prev ?? treatyStats);
    }
  }, [treatyStats]);

  useEffect(() => {
    if (scenarioDetails.trim()) {
      const detectedType = detectConflictType(scenarioDetails);
      if (detectedType && detectedType !== conflictScenario) {
        setConflictScenario(detectedType);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioDetails]);

  useEffect(() => {
    if (activeTab !== "chat") return;
    if (!conflictScenario || !offensiveCountry || !defensiveCountry) return;

    const lookup = (code: string) =>
      countries.find((c) => c.code === code)?.name || code;

    searchTreaties({
      scenario: {
        selectedCountry: lookup(selectedCountry),
        conflictScenario,
        offensiveCountry: lookup(offensiveCountry),
        defensiveCountry: lookup(defensiveCountry),
        scenarioDetails,
        severityLevel,
        timeFrame,
      },
      limit: 10,
    }).catch((error) => {
      console.error("Treaty loading error:", error);
      const friendly = describeError("treaties.search", error);
      toast({
        title: friendly.title,
        description: friendly.description,
        variant: "destructive",
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeTab,
    selectedCountry,
    conflictScenario,
    offensiveCountry,
    defensiveCountry,
    scenarioDetails,
    severityLevel,
    timeFrame,
  ]);

  const applyExampleQuestion = (example: ExampleScenario) => {
    setSelectedCountry(example.selectedCountry);
    setOffensiveCountry(example.offensiveCountry);
    setDefensiveCountry(example.defensiveCountry);
    setConflictScenario(example.conflictScenario);
    setScenarioDetails(example.scenarioDetails);
    setSeverityLevel(example.severityLevel);
    setTimeFrame(example.timeFrame);
    setTradeDependencies([example.tradeDependencies]);
    setSanctionsImpact([example.sanctionsImpact]);
    setMarketStability([example.marketStability]);
    setDefenseCapabilities([example.defenseCapabilities]);
    setAllianceSupport([example.allianceSupport]);
    setStrategicResources([example.strategicResources]);

    toast({
      title: "Example Applied!",
      description: `"${example.title}" scenario has been loaded into all fields.`,
    });
  };

  const clearForm = () => {
    setSelectedCountry("");
    setConflictScenario("");
    setOffensiveCountry("");
    setDefensiveCountry("");
    setScenarioDetails("");
    setSeverityLevel("");
    setTimeFrame("");
    setTradeDependencies([50]);
    setSanctionsImpact([50]);
    setMarketStability([50]);
    setDefenseCapabilities([50]);
    setAllianceSupport([50]);
    setStrategicResources([50]);
    setUnSupport([50]);
    setRegionalInfluence([50]);
    setPublicOpinion([50]);
    briefing.resetBriefingState();
    setActiveTab("setup");

    toast({
      title: "Form Cleared",
      description:
        "All simulation setup, analysis parameters, briefing data, and treaty search have been reset.",
    });
  };

  const handleTabChange = (value: string) => {
    if ((value === "results" || value === "chat") && !briefing.briefingData) {
      toast({
        title: "Briefing Required",
        description: "Please generate a briefing first to access this tab.",
        variant: "destructive",
      });
      return;
    }
    setActiveTab(value);
  };

  const handleSelectedCountryChange = (code: string) => {
    if (code === offensiveCountry) setOffensiveCountry("");
    setSelectedCountry(code);
  };

  const handleOffensiveCountryChange = (code: string) => {
    if (code !== defensiveCountry && code !== selectedCountry) {
      setOffensiveCountry(code);
    }
  };

  const handleDefensiveCountryChange = (code: string) => {
    if (code !== offensiveCountry) setDefensiveCountry(code);
  };

  return (
    <div className="bg-dark-bg text-dark-text h-dvh flex flex-col relative overflow-hidden">
      <StarryBackground />

      <PoliticalAdvisorHeader />

      <div className="relative z-10 container mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-8 sm:pb-12 lg:pb-96 flex-1 overflow-y-auto">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-3 bg-dark-card/50 backdrop-blur-md border border-dark-border/60 rounded-xl h-10 sm:h-12 p-1">
            <TabsTrigger
              value="setup"
              className="data-[state=active]:bg-flame data-[state=active]:text-white data-[state=active]:shadow-[0_0_18px_rgba(207,92,54,0.45)] text-dark-text text-xs sm:text-base px-1 sm:px-3 rounded-lg transition-all"
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xxs:inline xs:hidden">Setup</span>
                <span className="hidden xs:inline sm:hidden">Setup</span>
                <span className="hidden sm:inline">Setup Simulation</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="results"
              disabled={!briefing.briefingData}
              className="group relative data-[state=active]:bg-flame data-[state=active]:text-white data-[state=active]:shadow-[0_0_18px_rgba(207,92,54,0.45)] text-dark-text text-xs sm:text-base disabled:opacity-50 disabled:cursor-not-allowed px-1 sm:px-3 rounded-lg transition-all"
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2 transition-opacity group-disabled:group-hover:opacity-0">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline sm:hidden">Briefing</span>
                <span className="hidden sm:inline">Intelligence Briefing</span>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1 sm:gap-2 opacity-0 transition-opacity group-disabled:group-hover:opacity-100">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">
                  Generate briefing first
                </span>
                <span className="sm:hidden">Locked</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              disabled={!briefing.briefingData}
              className="group relative data-[state=active]:bg-flame data-[state=active]:text-white data-[state=active]:shadow-[0_0_18px_rgba(207,92,54,0.45)] text-dark-text text-xs sm:text-base disabled:opacity-50 disabled:cursor-not-allowed px-1 sm:px-3 rounded-lg transition-all"
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2 transition-opacity group-disabled:group-hover:opacity-0">
                <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline sm:hidden">Sources</span>
                <span className="hidden sm:inline">Intelligence Sources</span>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1 sm:gap-2 opacity-0 transition-opacity group-disabled:group-hover:opacity-100">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">
                  Generate briefing first
                </span>
                <span className="sm:hidden">Locked</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <SetupTab
            countries={countries}
            selectedCountry={selectedCountry}
            offensiveCountry={offensiveCountry}
            defensiveCountry={defensiveCountry}
            selectedCountryOpen={selectedCountryOpen}
            offensiveCountryOpen={offensiveCountryOpen}
            defensiveCountryOpen={defensiveCountryOpen}
            setSelectedCountryOpen={setSelectedCountryOpen}
            setOffensiveCountryOpen={setOffensiveCountryOpen}
            setDefensiveCountryOpen={setDefensiveCountryOpen}
            onSelectedCountryChange={handleSelectedCountryChange}
            onOffensiveCountryChange={handleOffensiveCountryChange}
            onDefensiveCountryChange={handleDefensiveCountryChange}
            conflictScenario={conflictScenario}
            scenarioDetails={scenarioDetails}
            setScenarioDetails={setScenarioDetails}
            severityLevel={severityLevel}
            setSeverityLevel={setSeverityLevel}
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
            isMobile={isMobile}
            isGeneratingBriefing={briefing.isGeneratingBriefing}
            onApplyExample={applyExampleQuestion}
            onClear={clearForm}
            onGenerate={briefing.generateBriefing}
          />

          <IntelligenceSourcesTab
            ragMetadata={briefing.ragMetadata}
            onReturnToSetup={() => setActiveTab("setup")}
          />

          <BriefingTab
            isGeneratingBriefing={briefing.isGeneratingBriefing}
            currentProgressStep={briefing.currentProgressStep}
            briefingData={briefing.briefingData}
            simulationResults={briefing.simulationResults}
            onGenerateBriefing={briefing.generateBriefing}
          />
        </Tabs>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <AuthGate>
      <PoliticalAdvisor />
    </AuthGate>
  );
}
