import type { BriefingData } from "@/components/political-advisor/types";

export const fallbackSimulationResult = {
  diplomaticResponse: 75,
  militaryReadiness: 65,
  economicImpact: -10,
  publicSupport: 60,
  allianceStrength: 70,
  recommendations: [
    "Engage in diplomatic negotiations to de-escalate tensions",
    "Strengthen economic partnerships with allied nations",
    "Enhance intelligence sharing capabilities",
    "Prepare contingency plans for various scenarios",
    "Monitor public sentiment and maintain transparency",
  ],
  summary:
    "**SCENARIO CONTEXT:** This analysis represents a fallback assessment due to temporary AI service limitations. The specific military conflict scenario requires detailed intelligence analysis that considers multiple strategic factors.\n\n**STRATEGIC IMPLICATIONS:** Without access to real-time geopolitical data, this assessment provides general strategic guidance. The conflict situation demands careful evaluation of regional power dynamics and international response mechanisms.\n\n**RISK ASSESSMENT:** Military conflicts of this nature typically involve escalation risks, economic disruption, and diplomatic challenges. Success depends on multilateral coordination and strategic resource allocation.\n\n**TACTICAL CONSIDERATIONS:** Military preparedness, alliance coordination, and diplomatic engagement remain critical factors. Intelligence gathering and strategic communication are essential for favorable outcomes.\n\n**RECOMMENDATIONS:** The provided recommendations represent established geopolitical best practices. For mission-critical decisions, consult with specialized military and diplomatic advisors familiar with current regional conditions.",
};

export function buildFallbackBriefing(
  scenarioDetails: string,
  selectedCountryName: string,
): BriefingData {
  const fallbackDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    date: fallbackDate,
    title: `Intelligence Assessment - ${scenarioDetails.slice(0, 50)}${
      scenarioDetails.length > 50 ? "..." : ""
    }`,
    sections: [
      {
        point: "(a)",
        content: `Current threat assessment indicates elevated risk factors in the specified regional conflict zone affecting ${selectedCountryName} strategic interests.`,
      },
      {
        point: "(b)",
        content:
          "Intelligence reports suggest significant military and political developments requiring immediate attention from national security apparatus.",
      },
      {
        point: "(c)",
        content:
          "Analysis indicates that standard diplomatic protocols may be insufficient to address the scope of the current crisis without enhanced strategic coordination.",
      },
      {
        point: "(d)",
        content:
          "Strategic recommendations require implementation of enhanced security measures and coalition building initiatives to maintain regional stability.",
      },
    ],
    recommendations: [
      "Deploy enhanced intelligence assets to monitor regional developments and threat indicators with immediate effect.",
      "Coordinate with allied nations to establish unified response protocols and information sharing agreements.",
      "Implement economic and diplomatic pressure through appropriate international channels and multilateral organizations.",
      "Prepare contingency plans for escalation scenarios while maintaining deterrent capabilities and diplomatic engagement.",
    ],
    conclusion:
      "Based on the current intelligence assessment, immediate action is recommended to address the evolving security situation and prevent further destabilization of the regional balance of power.",
    classification: "CONFIDENTIAL",
    author: "Intelligence Analysis Team",
  };
}
