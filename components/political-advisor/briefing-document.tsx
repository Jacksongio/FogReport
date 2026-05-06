"use client";

import { Copy, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { buildBriefingText, printBriefing } from "@/lib/briefing-export";
import type { BriefingData } from "./types";

interface BriefingDocumentProps {
  briefingData: BriefingData;
}

export function BriefingDocument({ briefingData }: BriefingDocumentProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(buildBriefingText(briefingData));
    toast({
      title: "Briefing Copied",
      description: "The briefing text has been copied to your clipboard.",
      variant: "default",
    });
  };

  return (
    <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl max-w-5xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center mb-8 border-b border-dark-border pb-6">
          <div className="flex justify-between items-start mb-4">
            <Badge
              variant="outline"
              className="border-flame text-flame bg-transparent text-xs font-mono"
            >
              {briefingData.classification}
            </Badge>
            <div className="text-right text-dark-muted text-sm font-mono">
              <p>{briefingData.date}</p>
              <p>{briefingData.author}</p>
            </div>
          </div>
          <h3 className="text-lg font-bold text-dark-text mb-2 text-left font-mono">
            {briefingData.title}
          </h3>
        </div>

        <div className="mb-6 font-mono text-sm">
          <p className="text-dark-text leading-relaxed text-justify">
            The following intelligence assessment identifies four critical
            factors (a-d) requiring immediate policy consideration regarding the
            current crisis situation:
          </p>
        </div>

        <div className="mb-4 font-mono">
          <h4 className="text-md font-bold text-dark-text underline">
            INTELLIGENCE ASSESSMENT
          </h4>
        </div>

        <div className="space-y-6 mb-8 font-mono text-sm">
          <div className="text-dark-text leading-relaxed">
            <div className="space-y-4 ml-6">
              {briefingData.sections.map((section, index) => (
                <div key={index} className="flex text-justify">
                  <span className="font-bold mr-3 min-w-[30px] flex-shrink-0">
                    {section.point}
                  </span>
                  <p className="leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-dark-border">
            <div className="mb-4 font-mono">
              <h4 className="text-md font-bold text-dark-text underline">
                STRATEGIC ASSESSMENT
              </h4>
            </div>
            <p className="text-dark-text leading-relaxed text-justify mb-6">
              {briefingData.conclusion}
            </p>
          </div>

          <div className="mt-6">
            <div className="mb-4 font-mono">
              <h4 className="text-md font-bold text-dark-text underline">
                RECOMMENDED ACTIONS
              </h4>
            </div>
            <div className="space-y-4">
              {briefingData.recommendations.map((rec, index) => (
                <div key={index} className="flex text-justify">
                  <span className="font-bold mr-3 min-w-[30px] flex-shrink-0">
                    ({index + 1})
                  </span>
                  <p className="text-dark-text leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {briefingData.finalRecommendation && (
            <div className="mt-8 pt-6 border-t border-dark-border">
              <div className="mb-4 font-mono">
                <h4 className="text-md font-bold text-dark-text underline">
                  PRIORITY RECOMMENDATION
                </h4>
              </div>
              <p className="text-dark-text leading-relaxed text-justify font-medium">
                {briefingData.finalRecommendation}
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-dark-border">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-400 text-sm leading-relaxed font-medium">
                ⚠️ <strong>IMPORTANT DISCLAIMER:</strong> This briefing is
                AI-generated content created for educational and simulation
                purposes only. This analysis should NOT be used as the basis for
                any real-world military, diplomatic, or policy decisions. Any
                actual strategic planning or crisis response should involve
                consultation with qualified professionals, subject matter
                experts, and appropriate government authorities. The scenarios,
                recommendations, and assessments presented herein are
                hypothetical and do not reflect official government positions or
                classified intelligence.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-dark-border text-right font-mono">
          <p className="text-dark-muted text-sm">{briefingData.author}</p>
          <p className="text-dark-muted text-xs mt-1">
            Generated: {new Date().toLocaleTimeString()}
          </p>
        </div>

        <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-dark-border">
          <Button
            variant="outline"
            className="border-flame text-flame hover:bg-flame hover:text-white bg-transparent transition-all duration-200 hover:scale-[1.02] hover:glow-flame"
            onClick={() => printBriefing(briefingData)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Print Briefing
          </Button>
          <Button
            variant="outline"
            className="border-flame text-flame hover:bg-flame hover:text-white bg-transparent transition-all duration-200 hover:scale-[1.02] hover:glow-flame"
            onClick={handleCopy}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Text
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
