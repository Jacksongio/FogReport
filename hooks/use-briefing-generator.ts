"use client";

import { useRef, useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type {
  BriefingData,
  Country,
  RagMetadata,
} from "@/components/political-advisor/types";
import { detectConflictType } from "@/lib/conflict-detection";
import {
  buildFallbackBriefing,
  fallbackSimulationResult,
} from "@/lib/briefing-fallbacks";
import { useToast } from "@/hooks/use-toast";

interface UseBriefingGeneratorOptions {
  countries: Country[];
  selectedCountry: string;
  offensiveCountry: string;
  defensiveCountry: string;
  scenarioDetails: string;
  severityLevel: string;
  timeFrame: string;
  conflictScenario: string;
  setConflictScenario: (v: string) => void;
  sliders: {
    tradeDependencies: number;
    sanctionsImpact: number;
    marketStability: number;
    defenseCapabilities: number;
    allianceSupport: number;
    strategicResources: number;
    unSupport: number;
    regionalInfluence: number;
    publicOpinion: number;
  };
  onTabChange: (tab: string) => void;
}

const PROGRESS_STEP_DURATIONS = [1500, 2500, 4000, 3500, 5000];

export function useBriefingGenerator(opts: UseBriefingGeneratorOptions) {
  const { toast } = useToast();
  const saveAnalysis = useMutation(api.analyses.save);
  const runAiAnalysis = useAction(api.ai.analyze);
  const generateBriefingAction = useAction(api.ai.generateBriefing);

  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [briefingData, setBriefingData] = useState<BriefingData | null>(null);
  const [ragMetadata, setRagMetadata] = useState<RagMetadata | null>(null);
  const [isGeneratingBriefing, setIsGeneratingBriefing] = useState(false);
  const [currentProgressStep, setCurrentProgressStep] = useState(0);
  const progressTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearProgressTimeouts = () => {
    progressTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    progressTimeoutsRef.current = [];
  };

  const resetBriefingState = () => {
    setSimulationResults(null);
    setBriefingData(null);
    setRagMetadata(null);
    setCurrentProgressStep(0);
    clearProgressTimeouts();
  };

  const lookupName = (code: string) =>
    opts.countries.find((c) => c.code === code)?.name || code;

  const runSimulation = async (skipRedirect = false) => {
    const currentConflictScenario =
      opts.conflictScenario || detectConflictType(opts.scenarioDetails);
    if (!opts.conflictScenario && currentConflictScenario) {
      opts.setConflictScenario(currentConflictScenario);
    }

    const selectedCountryName = lookupName(opts.selectedCountry);
    const offensiveCountryName = lookupName(opts.offensiveCountry);
    const defensiveCountryName = lookupName(opts.defensiveCountry);
    const s = opts.sliders;

    try {
      await saveAnalysis({
        selectedCountry: selectedCountryName,
        conflictScenario: currentConflictScenario,
        offensiveCountry: offensiveCountryName,
        defensiveCountry: defensiveCountryName,
        scenarioDetails: opts.scenarioDetails,
        severityLevel: opts.severityLevel,
        timeFrame: opts.timeFrame,
        economicFactors: {
          tradeDependencies: s.tradeDependencies,
          sanctionsImpact: s.sanctionsImpact,
          marketStability: s.marketStability,
        },
        militaryReadiness: {
          defenseCapabilities: s.defenseCapabilities,
          allianceSupport: s.allianceSupport,
          strategicResources: s.strategicResources,
        },
        diplomaticRelations: {
          unSupport: s.unSupport,
          regionalInfluence: s.regionalInfluence,
          publicOpinion: s.publicOpinion,
        },
      });
    } catch (error) {
      console.error("Error saving analysis:", error);
      toast({
        title: "Warning",
        description:
          "Failed to save analysis parameters, but simulation will continue.",
        variant: "destructive",
      });
    }

    try {
      const aiResult = await runAiAnalysis({
        selectedCountry: selectedCountryName,
        conflictScenario: currentConflictScenario,
        offensiveCountry: offensiveCountryName,
        defensiveCountry: defensiveCountryName,
        scenarioDetails: opts.scenarioDetails,
        severityLevel: opts.severityLevel,
        timeFrame: opts.timeFrame,
        ...s,
      });

      setSimulationResults(aiResult);

      if (!skipRedirect) {
        toast({
          title: "AI Analysis Complete",
          description:
            "Your simulation has been analyzed. Redirecting to results page.",
        });
        opts.onTabChange("results");
      }

      return aiResult;
    } catch (error) {
      console.error("AI analysis error:", error);

      setSimulationResults(fallbackSimulationResult);

      if (!skipRedirect) {
        toast({
          title: "Analysis Warning",
          description:
            "AI analysis unavailable. Showing basic recommendations. Redirecting to results...",
          variant: "destructive",
        });
        opts.onTabChange("results");
      }

      return fallbackSimulationResult;
    }
  };

  const generateBriefing = async () => {
    if (!opts.selectedCountry || !opts.scenarioDetails) {
      toast({
        title: "Cannot Generate Briefing",
        description:
          "Please fill in all required fields before generating a briefing.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingBriefing(true);
    setCurrentProgressStep(0);
    opts.onTabChange("results");

    const simulationPromise = !simulationResults
      ? runSimulation(true).catch((error) => {
          console.error("Failed to run simulation:", error);
          toast({
            title: "Analysis Warning",
            description:
              "Unable to generate fresh analysis. AI will work with basic parameters.",
            variant: "destructive",
          });
          return null;
        })
      : Promise.resolve(simulationResults);

    clearProgressTimeouts();

    let cumulativeTime = 0;
    PROGRESS_STEP_DURATIONS.forEach((duration, index) => {
      cumulativeTime += duration;
      const timeout = setTimeout(() => {
        setCurrentProgressStep(index + 1);
      }, cumulativeTime);
      progressTimeoutsRef.current.push(timeout);
    });

    try {
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const completedSimulation = await simulationPromise;

      if (completedSimulation && completedSimulation !== simulationResults) {
        setSimulationResults(completedSimulation);
      }

      const effectiveResults = completedSimulation || simulationResults;
      if (!effectiveResults) {
        throw new Error("No simulation results available for briefing");
      }

      const { briefingId, treatiesAnalyzed, briefing, qa, sources } =
        await generateBriefingAction({
          date: currentDate,
          scenario: opts.scenarioDetails,
          simulationResults: {
            diplomaticResponse: effectiveResults.diplomaticResponse,
            militaryReadiness: effectiveResults.militaryReadiness,
            economicImpact: effectiveResults.economicImpact,
            publicSupport: effectiveResults.publicSupport,
            allianceStrength: effectiveResults.allianceStrength,
            recommendations: effectiveResults.recommendations ?? [],
          },
          selectedCountry: lookupName(opts.selectedCountry),
          selectedCountryCode: opts.selectedCountry,
          offensiveCountry: lookupName(opts.offensiveCountry),
          offensiveCountryCode: opts.offensiveCountry,
          defensiveCountry: lookupName(opts.defensiveCountry),
          defensiveCountryCode: opts.defensiveCountry,
          severityLevel: opts.severityLevel,
          timeFrame: opts.timeFrame,
        });

      setCurrentProgressStep(5);
      setBriefingData(briefing);
      setRagMetadata({
        ragGenerated: treatiesAnalyzed > 0,
        treatiesAnalyzed,
        briefingId,
        qa,
        sources,
      });

      const score = qa?.critique?.score;
      const issuesCount = qa?.critique?.issues?.length ?? 0;
      const description =
        treatiesAnalyzed > 0
          ? `Analyzed ${treatiesAnalyzed} treaties${
              score !== undefined
                ? ` · QA score ${score}/100${
                    issuesCount
                      ? ` (${issuesCount} issue${issuesCount === 1 ? "" : "s"} flagged)`
                      : ""
                  }`
                : ""
            }.`
          : "Briefing generated without treaty grounding (treaties not yet ingested).";
      toast({
        title:
          treatiesAnalyzed > 0
            ? "✅ Intelligence Briefing Complete"
            : "⚠️ Briefing Generated (no treaties)",
        description,
        variant: treatiesAnalyzed > 0 ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Briefing generation error:", error);

      setBriefingData(
        buildFallbackBriefing(
          opts.scenarioDetails,
          lookupName(opts.selectedCountry),
        ),
      );

      toast({
        title: "Briefing Generation Failed",
        description:
          error instanceof Error
            ? error.message
            : "Unknown error generating briefing.",
        variant: "destructive",
      });
    }

    setIsGeneratingBriefing(false);
    setCurrentProgressStep(0);
    clearProgressTimeouts();
  };

  return {
    simulationResults,
    setSimulationResults,
    briefingData,
    setBriefingData,
    ragMetadata,
    setRagMetadata,
    isGeneratingBriefing,
    currentProgressStep,
    runSimulation,
    generateBriefing,
    resetBriefingState,
  };
}
