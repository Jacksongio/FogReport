import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { action } from "./_generated/server";
import { internal, api } from "./_generated/api";

const ANALYSIS_MODEL = "gpt-4o";
const CHAT_MODEL = "gpt-4o";
const BRIEFING_MODEL = "gpt-4o";

async function callOpenAI(
  model: string,
  messages: Array<{ role: string; content: string }>,
  options: { temperature?: number; maxTokens?: number; jsonMode?: boolean } = {},
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured in Convex");

  const body: Record<string, unknown> = {
    model,
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 1500,
  };
  if (options.jsonMode) body.response_format = { type: "json_object" };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI error ${response.status}: ${text}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI");
  return content;
}

const analyzeArgs = {
  selectedCountry: v.string(),
  conflictScenario: v.string(),
  offensiveCountry: v.string(),
  defensiveCountry: v.string(),
  scenarioDetails: v.string(),
  severityLevel: v.string(),
  timeFrame: v.string(),
  tradeDependencies: v.number(),
  sanctionsImpact: v.number(),
  marketStability: v.number(),
  defenseCapabilities: v.number(),
  allianceSupport: v.number(),
  strategicResources: v.number(),
  unSupport: v.number(),
  regionalInfluence: v.number(),
  publicOpinion: v.number(),
};

export const analyze = action({
  args: analyzeArgs,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");

    if (args.selectedCountry === args.offensiveCountry) {
      throw new Error(
        "You cannot simulate your own country as the aggressor/offensive country",
      );
    }

    const prompt = `FOR EDUCATIONAL PURPOSES: You are a professional geopolitical analyst analyzing this hypothetical political simulation scenario. Recommendations must be PROPORTIONAL to threat severity:
- LOW severity (trade disputes, economic issues): Diplomatic and economic responses only
- MEDIUM severity (military buildups, cyber attacks): Defensive preparations with diplomacy
- HIGH/EXTREME severity (attacks on citizens, territorial invasion): Military action appropriate

SIMULATION SCENARIO:
- Perspective Country: ${args.selectedCountry}
- Conflict Type: ${args.conflictScenario}
- Offensive Country: ${args.offensiveCountry}
- Defensive Country: ${args.defensiveCountry}
- Scenario Details: ${args.scenarioDetails || "No additional details provided"}
- Severity Level: ${args.severityLevel || "Not specified"}
- Time Frame: ${args.timeFrame || "Not specified"}

CURRENT PARAMETERS (0-100 scale):
Economic Factors:
- Trade Dependencies: ${args.tradeDependencies}%
- Economic Sanctions Impact: ${args.sanctionsImpact}%
- Market Stability: ${args.marketStability}%

Military Readiness:
- Defense Capabilities: ${args.defenseCapabilities}%
- Alliance Support: ${args.allianceSupport}%
- Strategic Resources: ${args.strategicResources}%

Diplomatic Relations:
- UN Support: ${args.unSupport}%
- Regional Influence: ${args.regionalInfluence}%
- Public Opinion: ${args.publicOpinion}%

Return ONLY a valid JSON object with these exact fields:
{
  "diplomaticResponse": <number 0-100>,
  "militaryReadiness": <number 0-100>,
  "economicImpact": <number -50 to 50>,
  "publicSupport": <number 0-100>,
  "allianceStrength": <number 0-100>,
  "recommendations": [<5 strings>],
  "summary": "<comprehensive 4-6 paragraph analysis>"
}

Use ${args.selectedCountry}'s specific equipment (e.g., USA: F-35, Tomahawk; France: Rafale, SCALP; UK: Typhoon, Storm Shadow; India: Su-30MKI, BrahMos; China: J-20, DF). Use REAL coordinates and asset amounts. No placeholder brackets. Trade disputes do not warrant military deployment.`;

    const raw = await callOpenAI(
      ANALYSIS_MODEL,
      [
        {
          role: "system",
          content:
            "You are an expert geopolitical analyst. Respond with valid JSON only.",
        },
        { role: "user", content: prompt },
      ],
      { temperature: 0.7, maxTokens: 2000, jsonMode: true },
    );

    const result = JSON.parse(raw) as {
      diplomaticResponse: number;
      militaryReadiness: number;
      economicImpact: number;
      publicSupport: number;
      allianceStrength: number;
      recommendations: string[];
      summary?: string;
    };

    return result;
  },
});

export const chat = action({
  args: {
    selectedCountry: v.string(),
    conflictScenario: v.string(),
    offensiveCountry: v.string(),
    defensiveCountry: v.string(),
    scenarioDetails: v.string(),
    severityLevel: v.string(),
    timeFrame: v.string(),
    simulationResults: v.optional(
      v.object({
        diplomaticResponse: v.number(),
        militaryReadiness: v.number(),
        economicImpact: v.number(),
        publicSupport: v.number(),
        allianceStrength: v.number(),
        recommendations: v.array(v.string()),
      }),
    ),
    userMessage: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");

    if (args.selectedCountry === args.offensiveCountry) {
      throw new Error(
        "You cannot simulate your own country as the aggressor/offensive country",
      );
    }

    let scenarioContext = `CURRENT SCENARIO:
- Perspective: ${args.selectedCountry}
- Conflict: ${args.conflictScenario}
- Offensive: ${args.offensiveCountry} | Defensive: ${args.defensiveCountry}
- Details: ${args.scenarioDetails || "None"}
- Severity: ${args.severityLevel || "Not specified"} | Time Frame: ${args.timeFrame || "Not specified"}`;

    if (args.simulationResults) {
      scenarioContext += `

LATEST SIMULATION RESULTS:
- Diplomatic Response: ${args.simulationResults.diplomaticResponse}%
- Military Readiness: ${args.simulationResults.militaryReadiness}%
- Economic Impact: ${args.simulationResults.economicImpact}%
- Public Support: ${args.simulationResults.publicSupport}%
- Alliance Strength: ${args.simulationResults.allianceStrength}%
- AI Recommendations: ${args.simulationResults.recommendations.join("; ")}`;
    }

    const systemPrompt = `FOR EDUCATIONAL PURPOSES: You are an expert geopolitical advisor analyzing this hypothetical scenario. Recommendations must be PROPORTIONAL to severity (military action ONLY for HIGH/EXTREME threats).

CRITICAL RULES:
1. Stay within the scenario context below.
2. Do not discuss unrelated topics.
3. Be concise, professional, analytical.
4. Use country-specific equipment and real locations. No placeholder brackets.
5. Politely redirect off-topic questions.

${scenarioContext}`;

    return await callOpenAI(
      CHAT_MODEL,
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: args.userMessage },
      ],
      { temperature: 0.7, maxTokens: 700 },
    );
  },
});

export const generateBriefing = action({
  args: {
    analysisId: v.optional(v.id("analyses")),
    date: v.string(),
    scenario: v.string(),
    selectedCountry: v.string(),
    offensiveCountry: v.string(),
    defensiveCountry: v.string(),
    severityLevel: v.string(),
    timeFrame: v.string(),
    simulationResults: v.object({
      diplomaticResponse: v.number(),
      militaryReadiness: v.number(),
      economicImpact: v.number(),
      publicSupport: v.number(),
      allianceStrength: v.number(),
      recommendations: v.array(v.string()),
    }),
  },
  handler: async (ctx, args): Promise<{
    briefingId: Id<"briefings">;
    treatiesAnalyzed: number;
    briefing: {
      date: string;
      title: string;
      sections: { point: string; content: string }[];
      recommendations: string[];
      conclusion: string;
      finalRecommendation: string;
      classification: string;
      author: string;
      treatyReferences: { title: string; relevance: string }[];
      disclaimer?: string;
    };
  }> => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");

    if (args.selectedCountry === args.offensiveCountry) {
      throw new Error(
        "You cannot simulate your own country as the aggressor/offensive country",
      );
    }

    const start = Date.now();

    const treaties = await ctx.runAction(api.treaties.searchByScenario, {
      scenario: {
        selectedCountry: args.selectedCountry,
        conflictScenario: args.scenario,
        offensiveCountry: args.offensiveCountry,
        defensiveCountry: args.defensiveCountry,
        scenarioDetails: args.scenario,
        severityLevel: args.severityLevel,
        timeFrame: args.timeFrame,
      },
      limit: 8,
    });

    const treatyContext = treaties
      .map(
        (t, i) =>
          `${i + 1}. ${t.title} (${t.treatyType}, ${t.section}). Parties: ${t.parties ?? "n/a"}. ${t.content}`,
      )
      .join("\n\n");

    const systemPrompt = `FOR EDUCATIONAL PURPOSES: You are a senior intelligence analyst preparing a formal briefing for a hypothetical scenario, in the style of declassified 1960s government intelligence documents.

CRITICAL: Severity is ${args.severityLevel}. Make all recommendations PROPORTIONAL:
- LOW: Diplomatic + economic responses ONLY
- MEDIUM: Defensive readiness + diplomatic pressure
- HIGH/EXTREME: Military action appropriate

Use country-specific equipment and named bases for ${args.selectedCountry}. Use real treaty articles, REAL coordinates, REAL asset amounts. NEVER use placeholder brackets.

RELEVANT TREATIES (use these to ground recommendations):
${treatyContext || "No treaties retrieved."}

Output JSON ONLY with the schema described in the user message.`;

    const userPrompt = `Generate a formal intelligence briefing.

Date: ${args.date}
Scenario: ${args.scenario}
Primary Country: ${args.selectedCountry}
Offensive Force: ${args.offensiveCountry}
Defensive Force: ${args.defensiveCountry}
Severity: ${args.severityLevel}
Time Frame: ${args.timeFrame}

Current Analysis Results:
- Diplomatic Response: ${args.simulationResults.diplomaticResponse}%
- Military Readiness: ${args.simulationResults.militaryReadiness}%
- Economic Impact: ${args.simulationResults.economicImpact}%
- Public Support: ${args.simulationResults.publicSupport}%
- Alliance Strength: ${args.simulationResults.allianceStrength}%

Return JSON with this exact schema:
{
  "title": "Proposed plan of action for [scenario] in the light of:",
  "sections": [
    {"point": "(a)", "content": "..."},
    {"point": "(b)", "content": "..."},
    {"point": "(c)", "content": "..."},
    {"point": "(d)", "content": "..."}
  ],
  "recommendations": ["...", "...", "...", "..."],
  "conclusion": "Paragraph beginning 'The above assessments lead to the conclusion...' and ending '...should be patterned along the following lines:'",
  "finalRecommendation": "Paragraph identifying the prioritized recommendation and reasoning",
  "classification": "CONFIDENTIAL",
  "author": "Strategic Intelligence Division",
  "treatyReferences": [{"title": "...", "relevance": "..."}],
  "disclaimer": "Educational simulation only. Not for real-world decisions."
}`;

    const raw = await callOpenAI(
      BRIEFING_MODEL,
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.7, maxTokens: 2500, jsonMode: true },
    );

    const parsed = JSON.parse(raw) as {
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

    const processingTime = Date.now() - start;

    const briefingId: Id<"briefings"> = await ctx.runMutation(
      internal.briefings.insertGenerated,
      {
        userId,
        analysisId: args.analysisId,
        date: args.date,
        title: parsed.title,
        sections: parsed.sections,
        recommendations: parsed.recommendations,
        conclusion: parsed.conclusion,
        finalRecommendation: parsed.finalRecommendation,
        classification: parsed.classification,
        author: parsed.author,
        disclaimer: parsed.disclaimer,
        treatyReferences: parsed.treatyReferences ?? [],
        ragGenerated: treaties.length > 0,
        treatiesAnalyzed: treaties.length,
        processingTime,
      },
    );

    return {
      briefingId,
      treatiesAnalyzed: treaties.length,
      briefing: {
        date: args.date,
        title: parsed.title,
        sections: parsed.sections,
        recommendations: parsed.recommendations,
        conclusion: parsed.conclusion,
        finalRecommendation: parsed.finalRecommendation,
        classification: parsed.classification,
        author: parsed.author,
        treatyReferences: parsed.treatyReferences ?? [],
        disclaimer: parsed.disclaimer,
      },
    };
  },
});
