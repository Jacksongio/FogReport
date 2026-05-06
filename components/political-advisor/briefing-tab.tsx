"use client";

import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { BriefingDocument } from "./briefing-document";
import { BriefingProgress } from "./briefing-progress";
import type { BriefingData } from "./types";

interface BriefingTabProps {
  isGeneratingBriefing: boolean;
  currentProgressStep: number;
  briefingData: BriefingData | null;
  simulationResults: unknown;
  onGenerateBriefing: () => void;
}

export function BriefingTab({
  isGeneratingBriefing,
  currentProgressStep,
  briefingData,
  simulationResults,
  onGenerateBriefing,
}: BriefingTabProps) {
  return (
    <TabsContent value="results" className="flex-1 min-h-0 mt-4">
      <div className="h-full overflow-y-auto">
        <div className="flex items-center space-x-3 mb-6">
          <File className="w-6 h-6 text-flame" />
          <h2 className="text-2xl font-bold text-dark-text">
            Intelligence Briefing
          </h2>
        </div>

        {isGeneratingBriefing ? (
          <BriefingProgress currentStep={currentProgressStep} />
        ) : briefingData ? (
          <BriefingDocument briefingData={briefingData} />
        ) : (
          <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-dark-border rounded-full flex items-center justify-center mx-auto mb-4">
                <File className="w-8 h-8 text-dark-muted" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-2">
                No Briefing Generated
              </h3>
              <p className="text-dark-muted mb-6">
                Complete a simulation and generate an intelligence briefing for
                formal documentation
              </p>
              <Button
                variant="outline"
                className="border-flame text-flame hover:bg-flame hover:text-white bg-transparent transition-all duration-200 hover:scale-[1.02] hover:glow-flame"
                onClick={onGenerateBriefing}
                disabled={!simulationResults}
              >
                Generate Briefing Document
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </TabsContent>
  );
}
