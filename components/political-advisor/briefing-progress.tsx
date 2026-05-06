"use client";

import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
  "Classifying threat scope and severity",
  "Loading country profiles, bases, and force posture",
  "Retrieving treaty articles and signatory status",
  "Cross-referencing sub-state actors and historical precedents",
  "Synthesizing intelligence briefing",
  "Validating citations and quality assurance",
];

interface BriefingProgressProps {
  currentStep: number;
}

export function BriefingProgress({ currentStep }: BriefingProgressProps) {
  return (
    <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl max-w-5xl mx-auto">
      <CardContent className="p-12 text-center">
        <div className="space-y-6">
          <div className="w-24 h-24 bg-flame/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-flame"></div>
          </div>

          <h3 className="text-2xl font-bold text-dark-text mb-4">
            Generating RAG Intelligence Briefing
          </h3>

          <div className="space-y-4 max-w-2xl mx-auto">
            {STEPS.map((stepName, index) => {
              const isCompleted = currentStep > index;
              const isActive = currentStep === index;

              return (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-lg transition-all duration-500 ${
                    isActive
                      ? "bg-flame/20 border border-flame/30"
                      : isCompleted
                        ? "bg-green-500/20 border border-green-500/30"
                        : "bg-dark-bg border border-dark-border"
                  }`}
                >
                  <span
                    className={`font-medium transition-all duration-500 ${
                      isActive
                        ? "text-flame"
                        : isCompleted
                          ? "text-green-400"
                          : "text-dark-muted"
                    }`}
                  >
                    {stepName}
                  </span>
                  {isActive && (
                    <div className="ml-auto flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-flame border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-flame text-xs font-medium">
                        Processing...
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full bg-dark-border rounded-full h-2 mt-8">
            <div
              className="bg-flame h-2 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.min(((currentStep + 1) / 6) * 100, 100)}%`,
              }}
            ></div>
          </div>

          <div className="text-center mt-2">
            <span className="text-flame font-medium text-sm">
              Step {currentStep + 1} of 6
            </span>
          </div>

          <p className="text-dark-muted text-sm mt-4">
            Estimated processing time: 30-60 seconds
          </p>
          <p className="text-dark-muted text-xs">
            Please remain on this page while the AI analyzes international
            treaties
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
