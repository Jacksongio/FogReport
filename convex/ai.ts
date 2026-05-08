import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { action } from "./_generated/server";
import { internal, api } from "./_generated/api";
import type { RankedArticle } from "./treaties";

const ANALYSIS_MODEL = "gpt-4o";
const CHAT_MODEL = "gpt-4o";
const BRIEFING_MODEL = "gpt-4o";
const CLASSIFIER_MODEL = "gpt-4o-mini";

async function callOpenAIWithJsonRepair<T>(
  model: string,
  messages: Array<{ role: string; content: string }>,
  options: { temperature?: number; maxTokens?: number },
): Promise<{ parsed: T; raw: string; repaired: boolean }> {
  const first = await callOpenAI(model, messages, {
    ...options,
    jsonMode: true,
  });
  try {
    return { parsed: JSON.parse(first) as T, raw: first, repaired: false };
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    const repairMessages: Array<{ role: string; content: string }> = [
      ...messages,
      { role: "assistant", content: first },
      {
        role: "user",
        content: `Your previous response could not be parsed as JSON (${errMessage}). Return only the same content as strictly valid JSON matching the requested schema. No prose outside the JSON object.`,
      },
    ];
    const repaired = await callOpenAI(model, repairMessages, {
      ...options,
      jsonMode: true,
    });
    return {
      parsed: JSON.parse(repaired) as T,
      raw: repaired,
      repaired: true,
    };
  }
}

async function callOpenAI(
  model: string,
  messages: Array<{ role: string; content: string }>,
  options: {
    temperature?: number;
    maxTokens?: number;
    jsonMode?: boolean;
  } = {},
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

    const prompt = `Educational geopolitical simulation. Provide a structured analytic assessment from ${args.selectedCountry}'s perspective.

CRITICAL: Recommendations must be PROPORTIONAL to threat severity:
- LOW (trade disputes, economic issues): diplomatic and economic responses only
- MEDIUM (military buildups, cyber): defensive preparations with diplomacy
- HIGH/EXTREME (territorial invasion, attacks on citizens): full-spectrum responses

SCENARIO:
- Perspective Country: ${args.selectedCountry}
- Conflict Type: ${args.conflictScenario}
- Offensive Country: ${args.offensiveCountry}
- Defensive Country: ${args.defensiveCountry}
- Scenario Details: ${args.scenarioDetails || "No additional details"}
- Severity: ${args.severityLevel || "Not specified"}
- Time Frame: ${args.timeFrame || "Not specified"}

PARAMETERS (0-100):
Economic — Trade Dependencies ${args.tradeDependencies}%, Sanctions Impact ${args.sanctionsImpact}%, Market Stability ${args.marketStability}%
Military — Defense Capabilities ${args.defenseCapabilities}%, Alliance Support ${args.allianceSupport}%, Strategic Resources ${args.strategicResources}%
Diplomatic — UN Support ${args.unSupport}%, Regional Influence ${args.regionalInfluence}%, Public Opinion ${args.publicOpinion}%

Return ONLY valid JSON:
{
  "diplomaticResponse": <0-100>,
  "militaryReadiness": <0-100>,
  "economicImpact": <-50 to 50>,
  "publicSupport": <0-100>,
  "allianceStrength": <0-100>,
  "recommendations": [<5 strings>],
  "summary": "<comprehensive 4-6 paragraph analysis>"
}

Use ${args.selectedCountry}'s actual equipment and alliance memberships. Reference real systems and frameworks. No placeholder brackets.`;

    const raw = await callOpenAI(
      ANALYSIS_MODEL,
      [
        {
          role: "system",
          content:
            "You are an expert geopolitical analyst preparing an educational simulation. Respond with valid JSON only.",
        },
        { role: "user", content: prompt },
      ],
      { temperature: 0.7, maxTokens: 2000, jsonMode: true },
    );

    return JSON.parse(raw) as {
      diplomaticResponse: number;
      militaryReadiness: number;
      economicImpact: number;
      publicSupport: number;
      allianceStrength: number;
      recommendations: string[];
      summary?: string;
    };
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

LATEST RESULTS:
- Diplomatic Response: ${args.simulationResults.diplomaticResponse}%
- Military Readiness: ${args.simulationResults.militaryReadiness}%
- Economic Impact: ${args.simulationResults.economicImpact}%
- Public Support: ${args.simulationResults.publicSupport}%
- Alliance Strength: ${args.simulationResults.allianceStrength}%
- Prior Recommendations: ${args.simulationResults.recommendations.join("; ")}`;
    }

    const systemPrompt = `Educational geopolitical simulation advisor. Stay strictly within the scenario below. Recommendations PROPORTIONAL to severity.

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

// Multi-step briefing pipeline

type ThreatClassification = {
  severity: "low" | "medium" | "high" | "extreme";
  scope: string;
  escalationRisk: string;
  weaponsDomains: string[];
  primaryConcern: string;
};

function baseToContextBlock(b: Doc<"militaryBases">): string {
  return [
    `[${b.name}] (${b.location}, ${b.region}) — ${b.type}`,
    b.tenantCountryCodes.length
      ? `Host: ${b.hostCountryCode}; Tenants: ${b.tenantCountryCodes.join(", ")}`
      : `Host: ${b.hostCountryCode}`,
    b.hostedSystems.length ? `Systems: ${b.hostedSystems.join("; ")}` : "",
    b.hostedUnits.length ? `Units: ${b.hostedUnits.join("; ")}` : "",
    `Role: ${b.role}`,
  ]
    .filter(Boolean)
    .join(" | ");
}

function chokepointToContextBlock(c: Doc<"strategicChokepoints">): string {
  return [
    `[${c.name}] ${c.region}, ${c.type}`,
    c.widthKm ? `width ~${c.widthKm} km` : "",
    c.annualTraffic ? `traffic: ${c.annualTraffic}` : "",
    `borders: ${c.bordersCountryCodes.join(", ")}`,
    `controlling powers: ${c.controllingPowers.join("; ")}`,
    c.alternativeRoutes.length
      ? `alternatives: ${c.alternativeRoutes.join("; ")}`
      : "",
    `significance: ${c.significance}`,
  ]
    .filter(Boolean)
    .join(" | ");
}

function weaponToContextBlock(w: Doc<"weaponSystems">): string {
  return [
    `[${w.name}] ${w.category}, origin ${w.originCountryCode}`,
    w.rangeKm ? `range ~${w.rangeKm} km` : "",
    w.speedMach ? `speed Mach ${w.speedMach}` : "",
    w.payload ? `payload: ${w.payload}` : "",
    w.notableFeatures ? `notes: ${w.notableFeatures}` : "",
  ]
    .filter(Boolean)
    .join(" | ");
}

function intelAgencyToContextBlock(a: Doc<"intelligenceAgencies">): string {
  return [
    `[${a.name}] (${a.countryCode}, ${a.type})`,
    a.estimatedPersonnel
      ? `~${a.estimatedPersonnel.toLocaleString()} personnel`
      : "",
    `Mission: ${a.mission}`,
    a.notableCapabilities.length
      ? `Capabilities: ${a.notableCapabilities.slice(0, 4).join("; ")}`
      : "",
  ]
    .filter(Boolean)
    .join(" | ");
}

function sofUnitToContextBlock(u: Doc<"sofUnits">): string {
  return [
    `[${u.name}] (${u.countryCode}, ${u.parentService}, ${u.type})`,
    u.estimatedStrength
      ? `~${u.estimatedStrength.toLocaleString()} personnel`
      : "",
    u.homeBase ? `home: ${u.homeBase}` : "",
    `Role: ${u.role}`,
  ]
    .filter(Boolean)
    .join(" | ");
}

function defenseIndustryToContextBlock(d: Doc<"defenseIndustries">): string {
  return [
    `[${d.name}] (${d.countryCode}, ${d.ownership})`,
    d.revenueUsdBillions ? `~$${d.revenueUsdBillions}B revenue` : "",
    d.keyProducts.length
      ? `Products: ${d.keyProducts.slice(0, 5).join("; ")}`
      : "",
    `Notes: ${d.notes}`,
  ]
    .filter(Boolean)
    .join(" | ");
}

function subStateActorToContextBlock(a: Doc<"subStateActors">): string {
  return [
    `[${a.name}] (${a.type}, ${a.region})`,
    a.aliases.length ? `aka ${a.aliases.slice(0, 3).join(", ")}` : "",
    a.estimatedStrength
      ? `~${a.estimatedStrength.toLocaleString()} personnel`
      : "",
    a.primarySponsorCountryCode
      ? `Sponsor: ${a.primarySponsorCountryCode}`
      : "",
    a.areaOfOperations.length
      ? `AOR: ${a.areaOfOperations.slice(0, 3).join("; ")}`
      : "",
    a.arsenal.length ? `Arsenal: ${a.arsenal.slice(0, 5).join("; ")}` : "",
    `Notes: ${a.description}`,
  ]
    .filter(Boolean)
    .join(" | ");
}

function historicalIncidentToContextBlock(
  h: Doc<"historicalIncidents">,
): string {
  return [
    `[${h.name}] ${h.startDate}${h.endDate ? `–${h.endDate}` : ""} (${h.region}, ${h.type})`,
    `Parties: ${h.primaryParties.join(", ")}`,
    `Summary: ${h.summary}`,
    h.lessons.length ? `Lessons: ${h.lessons.slice(0, 3).join("; ")}` : "",
  ]
    .filter(Boolean)
    .join(" | ");
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenMatches(haystack: string, needle: string): boolean {
  if (!needle) return false;
  if (needle.length < 4) {
    // Short tokens (country codes, etc.) need word boundaries
    return new RegExp(`\\b${escapeRegex(needle)}\\b`, "i").test(haystack);
  }
  // Longer terms can match as substrings safely
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function detectChokepointMatches(
  scenario: string,
  chokepoints: Doc<"strategicChokepoints">[],
  countryCodes: string[],
): Doc<"strategicChokepoints">[] {
  const codeSet = new Set(countryCodes.filter(Boolean));
  return chokepoints.filter((c) => {
    // Match if scenario explicitly names the chokepoint
    if (tokenMatches(scenario, c.name)) return true;
    if (tokenMatches(scenario, c.slug.replace(/-/g, " "))) return true;
    // Or if one of the three involved countries actually borders it
    return c.bordersCountryCodes.some((code) => codeSet.has(code));
  });
}

type DomainSet = Set<string>;

function profileToContextBlock(
  p: Doc<"countryProfiles">,
  domains: DomainSet,
): string {
  // Domain-aware filtering: if scenario weapons domains are known, prioritize matching equipment
  const wantsAir =
    domains.has("air") || domains.has("space") || domains.has("nuclear");
  const wantsSea = domains.has("sea") || domains.has("naval");
  const wantsLand =
    domains.has("land") || domains.has("territorial") || domains.size === 0;
  const wantsMissile =
    domains.has("nuclear") ||
    domains.has("air") ||
    domains.has("sea") ||
    domains.has("land");

  const blocks: string[] = [
    `=== ${p.name} (${p.code}) — ${p.region} ===`,
    p.doctrine ? `Doctrine: ${p.doctrine}` : "",
    p.nuclearStatus !== "none" ? `Nuclear status: ${p.nuclearStatus}` : "",
    p.activeMilitaryPersonnel
      ? `Active personnel: ${p.activeMilitaryPersonnel.toLocaleString()}`
      : "",
    p.militaryBudgetUsdBillions
      ? `Military budget: ~$${p.militaryBudgetUsdBillions}B`
      : "",
  ];
  if (wantsAir && p.aircraft.length)
    blocks.push(`Aircraft: ${p.aircraft.slice(0, 8).join(", ")}`);
  if (wantsMissile && p.missiles.length)
    blocks.push(`Missiles: ${p.missiles.slice(0, 8).join(", ")}`);
  if (wantsSea && p.naval.length)
    blocks.push(`Naval: ${p.naval.slice(0, 6).join(", ")}`);
  if (wantsLand && p.groundForces.length)
    blocks.push(`Ground forces: ${p.groundForces.slice(0, 6).join(", ")}`);
  if (p.bases.length)
    blocks.push(`Key bases: ${p.bases.slice(0, 6).join(", ")}`);
  if (p.alliances.length) blocks.push(`Alliances: ${p.alliances.join("; ")}`);
  if (p.notableCapabilities.length)
    blocks.push(`Notable: ${p.notableCapabilities.slice(0, 5).join("; ")}`);
  return blocks.filter(Boolean).join("\n");
}

function articleToContextBlock(a: RankedArticle): string {
  const parties = [
    a.offensiveSignatory
      ? `offensive country status: ${a.offensiveSignatory}`
      : "",
    a.defensiveSignatory
      ? `defensive country status: ${a.defensiveSignatory}`
      : "",
    a.selectedSignatory
      ? `perspective country status: ${a.selectedSignatory}`
      : "",
  ]
    .filter(Boolean)
    .join("; ");
  return `[${a.treatyShortName ?? a.treatyTitle}, Article ${a.articleNumber}${
    a.articleTitle ? ` — ${a.articleTitle}` : ""
  }] ${a.content}${parties ? ` (${parties})` : ""}`;
}

export const generateBriefing = action({
  args: {
    analysisId: v.optional(v.id("analyses")),
    date: v.string(),
    scenario: v.string(),
    selectedCountry: v.string(),
    selectedCountryCode: v.optional(v.string()),
    offensiveCountry: v.string(),
    offensiveCountryCode: v.optional(v.string()),
    defensiveCountry: v.string(),
    defensiveCountryCode: v.optional(v.string()),
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
  handler: async (
    ctx,
    args,
  ): Promise<{
    briefingId: Id<"briefings">;
    treatiesAnalyzed: number;
    qa: {
      jsonRepaired: boolean;
      citations: {
        treatiesCited: number;
        treatiesVerified: number;
        basesCited: number;
        basesVerified: number;
        weaponsCited: number;
        weaponsVerified: number;
        subStateActorsCited: number;
        subStateActorsVerified: number;
        unverifiedCitations: string[];
      };
      critique: {
        severityProportionality: "pass" | "fail";
        placeholderBrackets: "pass" | "fail";
        groundedInRetrievedContext: "pass" | "partial" | "fail";
        issues: string[];
        score: number;
      } | null;
    };
    sources: {
      bases: Array<{
        name: string;
        location: string;
        region: string;
        type: string;
        hostCountryCode: string;
        tenantCountryCodes: string[];
        hostedSystems: string[];
        role: string;
      }>;
      weapons: Array<{
        name: string;
        category: string;
        originCountryCode: string;
        rangeKm?: number;
        payload?: string;
        description: string;
      }>;
      treatyArticles: Array<{
        treatyShortName?: string;
        treatyTitle: string;
        articleNumber: string;
        articleTitle?: string;
        content: string;
        offensiveSignatory?: string;
        defensiveSignatory?: string;
        selectedSignatory?: string;
      }>;
      chokepoints: Array<{
        name: string;
        region: string;
        type: string;
        significance: string;
        bordersCountryCodes: string[];
      }>;
      intelAgencies: Array<{
        name: string;
        countryCode: string;
        type: string;
        mission: string;
      }>;
      sofUnits: Array<{
        name: string;
        countryCode: string;
        parentService: string;
        role: string;
      }>;
      defenseIndustries: Array<{
        name: string;
        countryCode: string;
        keyProducts: string[];
        notes: string;
      }>;
      subStateActors: Array<{
        name: string;
        type: string;
        region: string;
        primarySponsorCountryCode?: string;
        arsenal: string[];
        description: string;
      }>;
      historicalIncidents: Array<{
        name: string;
        startDate: string;
        endDate?: string;
        region: string;
        type: string;
        summary: string;
        lessons: string[];
      }>;
    };
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

    // ============ Step 1: Threat classification ============
    const classifierPrompt = `Classify this educational scenario for an analytic briefing. Return ONLY JSON.

Scenario: ${args.scenario}
Severity input: ${args.severityLevel}
Time frame: ${args.timeFrame}
Offensive party: ${args.offensiveCountry}
Defensive party: ${args.defensiveCountry}
Perspective country: ${args.selectedCountry}

Return JSON:
{
  "severity": "low" | "medium" | "high" | "extreme",
  "scope": "short description of geographic and political scope",
  "escalationRisk": "short description of escalation potential",
  "weaponsDomains": ["air", "sea", "land", "space", "cyber", "nuclear", "info", "economic" — pick relevant],
  "primaryConcern": "one-sentence summary of the dominant strategic concern"
}`;

    const classRaw = await callOpenAI(
      CLASSIFIER_MODEL,
      [
        {
          role: "system",
          content:
            "You are a precise threat classification assistant. Respond with valid JSON only.",
        },
        { role: "user", content: classifierPrompt },
      ],
      { temperature: 0.2, maxTokens: 400, jsonMode: true },
    );
    const classification = JSON.parse(classRaw) as ThreatClassification;

    // ============ Step 2: Country profile lookup ============
    const profileMap: Record<
      string,
      Doc<"countryProfiles">
    > = await ctx.runQuery(internal.treaties.lookupCountryProfiles, {
      codes: [
        args.selectedCountryCode ?? "",
        args.offensiveCountryCode ?? "",
        args.defensiveCountryCode ?? "",
      ],
      names: [
        args.selectedCountry,
        args.offensiveCountry,
        args.defensiveCountry,
      ],
    });

    const selectedProfile =
      profileMap[args.selectedCountryCode ?? ""] ??
      profileMap[args.selectedCountry];
    const offensiveProfile =
      profileMap[args.offensiveCountryCode ?? ""] ??
      profileMap[args.offensiveCountry];
    const defensiveProfile =
      profileMap[args.defensiveCountryCode ?? ""] ??
      profileMap[args.defensiveCountry];

    const domainSetForProfiles: DomainSet = new Set(
      classification.weaponsDomains.map((d) => d.toLowerCase()),
    );

    const profileBlocks = [
      selectedProfile
        ? `[Perspective] ${profileToContextBlock(selectedProfile, domainSetForProfiles)}`
        : `[Perspective] No structured profile available for ${args.selectedCountry}.`,
      offensiveProfile
        ? `[Offensive] ${profileToContextBlock(offensiveProfile, domainSetForProfiles)}`
        : `[Offensive] No structured profile available for ${args.offensiveCountry}.`,
      defensiveProfile
        ? `[Defensive] ${profileToContextBlock(defensiveProfile, domainSetForProfiles)}`
        : `[Defensive] No structured profile available for ${args.defensiveCountry}.`,
    ].join("\n\n");

    const codesInScenario: string[] = [
      args.selectedCountryCode,
      args.offensiveCountryCode,
      args.defensiveCountryCode,
    ].filter((c): c is string => !!c);

    // ============ Step 2b: Chokepoint match (computed first; bases use it) ============
    const allChokepoints: Doc<"strategicChokepoints">[] = await ctx.runQuery(
      internal.seedMutations.fetchAllChokepoints,
      {},
    );
    const scenarioBlob = `${args.scenario}. ${args.selectedCountry} ${args.offensiveCountry} ${args.defensiveCountry}`;
    const chokepointMatches = detectChokepointMatches(
      scenarioBlob,
      allChokepoints,
      codesInScenario,
    ).slice(0, 5);

    // ============ Step 2c: Bases relevant to scenario ============
    const baseLists: Doc<"militaryBases">[][] = await Promise.all(
      codesInScenario.map((code) =>
        ctx.runQuery(internal.seedMutations.fetchBasesForCountry, {
          countryCode: code,
        }),
      ),
    );
    const baseMap = new Map<string, Doc<"militaryBases">>();
    for (const list of baseLists) {
      for (const b of list) baseMap.set(b._id.toString(), b);
    }
    // Rank bases by relevance: matches the conflict region, weapons domain, or named adversary
    const baseDomainSet: DomainSet = new Set(
      classification.weaponsDomains.map((d) => d.toLowerCase()),
    );
    const scopeLower = (classification.scope ?? "").toLowerCase();
    const scoredBases = Array.from(baseMap.values()).map((b) => {
      let score = 0;
      const regionLower = b.region.toLowerCase();
      const typeLower = b.type.toLowerCase();
      // Region match against threat scope
      if (scopeLower && scopeLower.includes(regionLower)) score += 4;
      if (
        scopeLower &&
        regionLower.includes("indo-pacific") &&
        (scopeLower.includes("pacific") ||
          scopeLower.includes("east asia") ||
          scopeLower.includes("china") ||
          scopeLower.includes("taiwan"))
      )
        score += 4;
      // Domain match
      if (baseDomainSet.has("nuclear") && typeLower === "nuclear") score += 3;
      if (
        baseDomainSet.has("sea") &&
        (typeLower === "naval" || typeLower === "joint")
      )
        score += 2;
      if (
        baseDomainSet.has("air") &&
        (typeLower === "air" || typeLower === "joint")
      )
        score += 2;
      if (baseDomainSet.has("space") && typeLower === "space") score += 3;
      if (baseDomainSet.has("cyber") && typeLower === "intel") score += 2;
      if (
        baseDomainSet.has("land") &&
        (typeLower === "army" || typeLower === "joint")
      )
        score += 2;
      // Bases mentioned by name in the scenario
      if (tokenMatches(args.scenario, b.name)) score += 5;
      // Bases hosting equipment whose name appears in scenario
      if (
        b.hostedSystems.some((s) =>
          s.length >= 4
            ? args.scenario.toLowerCase().includes(s.toLowerCase())
            : false,
        )
      )
        score += 2;
      // Match if the base is in a chokepoint-bordering country
      if (
        chokepointMatches.some((c) =>
          c.bordersCountryCodes.includes(b.hostCountryCode),
        )
      )
        score += 1;
      return { b, score };
    });
    const relevantBases = scoredBases
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((s) => s.b);

    // ============ Step 2e: Weapons system specs for perspective country (domain-ranked) ============
    const perspectiveWeapons: Doc<"weaponSystems">[] = args.selectedCountryCode
      ? await ctx.runQuery(
          internal.seedMutations.fetchWeaponSystemsByOperator,
          {
            countryCode: args.selectedCountryCode,
          },
        )
      : [];
    const weaponDomainBoosts: Record<string, string[]> = {
      air: [
        "fighter_aircraft",
        "bomber",
        "cruise_missile",
        "uav",
        "air_defense",
      ],
      sea: ["carrier", "destroyer", "submarine", "anti_ship"],
      land: ["tank", "artillery", "anti_tank"],
      nuclear: ["icbm", "slbm", "ballistic_missile", "hypersonic"],
      cyber: ["uav"],
      space: ["icbm", "slbm", "hypersonic"],
    };
    const wantedCategories = new Set<string>();
    for (const d of classification.weaponsDomains) {
      const boosts = weaponDomainBoosts[d.toLowerCase()];
      if (boosts) for (const cat of boosts) wantedCategories.add(cat);
    }
    const scoredWeapons = perspectiveWeapons.map((w) => {
      let score = 0;
      if (wantedCategories.has(w.category)) score += 3;
      if (tokenMatches(args.scenario, w.name)) score += 5;
      return { w, score };
    });
    const topPerspectiveWeapons = scoredWeapons
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((s) => s.w);

    // ============ Step 2f: Intelligence agencies (top-3 per country) ============
    const intelLists: Doc<"intelligenceAgencies">[][] = await Promise.all(
      codesInScenario.map((code) =>
        ctx.runQuery(internal.seedMutations.fetchIntelAgenciesByCountry, {
          countryCode: code,
        }),
      ),
    );
    const relevantIntelAgencies: Doc<"intelligenceAgencies">[] = intelLists
      .flatMap((list) => list.slice(0, 3))
      .slice(0, 12);

    // ============ Step 2g: SOF units (top-2 per country) ============
    const sofLists: Doc<"sofUnits">[][] = await Promise.all(
      codesInScenario.map((code) =>
        ctx.runQuery(internal.seedMutations.fetchSofUnitsByCountry, {
          countryCode: code,
        }),
      ),
    );
    const relevantSofUnits: Doc<"sofUnits">[] = sofLists
      .flatMap((list) => list.slice(0, 2))
      .slice(0, 8);

    // ============ Step 2h: Defense industries for perspective country ============
    const perspectiveIndustries: Doc<"defenseIndustries">[] =
      args.selectedCountryCode
        ? await ctx.runQuery(
            internal.seedMutations.fetchDefenseIndustriesByCountry,
            { countryCode: args.selectedCountryCode },
          )
        : [];
    const topPerspectiveIndustries = perspectiveIndustries.slice(0, 6);

    // ============ Step 2i: Sub-state actors (matched by AOR / sponsor / name) ============
    const allSubStateActors: Doc<"subStateActors">[] = await ctx.runQuery(
      internal.seedMutations.fetchAllSubStateActors,
      {},
    );
    const codeSetForActors = new Set(codesInScenario);
    const involvedCountryNamesLower = [
      args.selectedCountry,
      args.offensiveCountry,
      args.defensiveCountry,
    ]
      .filter(Boolean)
      .map((n) => n.toLowerCase());
    const scoredActors = allSubStateActors.map((a) => {
      let score = 0;
      // Strong: name or alias appears in scenario
      if (tokenMatches(args.scenario, a.name)) score += 5;
      if (
        a.aliases.some((al) => al.length > 3 && tokenMatches(args.scenario, al))
      )
        score += 4;
      // AOR mentions involved country
      if (
        a.areaOfOperations.some((aor) => {
          const aorLower = aor.toLowerCase();
          return involvedCountryNamesLower.some(
            (n) => n && aorLower.includes(n),
          );
        })
      )
        score += 3;
      // Sponsor is involved
      if (
        a.primarySponsorCountryCode &&
        codeSetForActors.has(a.primarySponsorCountryCode)
      )
        score += 3;
      // Region match (weak)
      if (
        classification.scope &&
        classification.scope.toLowerCase().includes(a.region.toLowerCase())
      )
        score += 1;
      return { a, score };
    });
    const relevantSubStateActors: Doc<"subStateActors">[] = scoredActors
      .filter((s) => s.score >= 3)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((s) => s.a);

    // ============ Step 2j: Historical incidents (analogies) ============
    const allHistorical: Doc<"historicalIncidents">[] = await ctx.runQuery(
      internal.seedMutations.fetchHistoricalIncidents,
      {},
    );
    const codeSetForHistory = new Set(codesInScenario);
    const domainSet = new Set(
      classification.weaponsDomains.map((d) => d.toLowerCase()),
    );
    const scoredHistory: Array<{
      h: Doc<"historicalIncidents">;
      score: number;
    }> = allHistorical.map((h) => {
      let score = 0;
      // Country overlap is the strongest signal — adversary or perspective country in incident
      const partyCodes = h.primaryParties.filter((p) => p.length <= 3);
      if (partyCodes.some((p) => codeSetForHistory.has(p))) score += 3;
      // Domain match
      const incidentTypeLower = h.type.toLowerCase();
      if (
        domainSet.has("naval") &&
        (incidentTypeLower.includes("naval") ||
          incidentTypeLower.includes("blockade"))
      )
        score += 2;
      if (domainSet.has("air") && incidentTypeLower.includes("air")) score += 2;
      if (domainSet.has("nuclear") && incidentTypeLower.includes("nuclear"))
        score += 2;
      if (domainSet.has("cyber") && incidentTypeLower.includes("covert"))
        score += 1;
      // Region match (only if scenario explicitly references a region keyword)
      if (h.region && tokenMatches(args.scenario, h.region.split(/\s+/)[0]))
        score += 1;
      // Explicit name match in scenario
      if (tokenMatches(args.scenario, h.name)) score += 4;
      return { h, score };
    });
    const historicalAnalogies: Doc<"historicalIncidents">[] = scoredHistory
      .filter((s) => s.score >= 2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((s) => s.h);

    // ============ Step 3: Treaty article retrieval ============
    const articles: RankedArticle[] = await ctx.runAction(
      api.treaties.searchByScenario,
      {
        scenario: {
          selectedCountry: args.selectedCountry,
          selectedCountryCode: args.selectedCountryCode,
          conflictScenario: classification.weaponsDomains.join(" "),
          offensiveCountry: args.offensiveCountry,
          offensiveCountryCode: args.offensiveCountryCode,
          defensiveCountry: args.defensiveCountry,
          defensiveCountryCode: args.defensiveCountryCode,
          scenarioDetails: `${args.scenario}. ${classification.primaryConcern}`,
          severityLevel: classification.severity,
          timeFrame: args.timeFrame,
        },
        limit: 10,
      },
    );

    const treatyContext =
      articles.length > 0
        ? articles.map(articleToContextBlock).join("\n\n")
        : "No treaty articles retrieved (treaty database may be unseeded).";

    const basesContext =
      relevantBases.length > 0
        ? relevantBases.map(baseToContextBlock).join("\n")
        : "No structured bases retrieved.";

    const chokepointsContext =
      chokepointMatches.length > 0
        ? chokepointMatches.map(chokepointToContextBlock).join("\n")
        : "No specific chokepoints flagged for this scenario.";

    const weaponsContext =
      topPerspectiveWeapons.length > 0
        ? topPerspectiveWeapons.map(weaponToContextBlock).join("\n")
        : "No structured weapon specs retrieved.";

    const intelAgenciesContext =
      relevantIntelAgencies.length > 0
        ? relevantIntelAgencies.map(intelAgencyToContextBlock).join("\n")
        : "No relevant intelligence agencies retrieved.";

    const sofContext =
      relevantSofUnits.length > 0
        ? relevantSofUnits.map(sofUnitToContextBlock).join("\n")
        : "No SOF units retrieved.";

    const industriesContext =
      topPerspectiveIndustries.length > 0
        ? topPerspectiveIndustries.map(defenseIndustryToContextBlock).join("\n")
        : "No defense industries retrieved.";

    const historyContext =
      historicalAnalogies.length > 0
        ? historicalAnalogies.map(historicalIncidentToContextBlock).join("\n\n")
        : "No specific historical analogies surfaced.";

    const subStateActorsContext =
      relevantSubStateActors.length > 0
        ? relevantSubStateActors.map(subStateActorToContextBlock).join("\n")
        : "No sub-state actors flagged for this scenario.";

    // ============ Step 4: Briefing synthesis ============
    const synthesisSystem = `Educational simulation: senior intelligence analyst preparing a formal briefing in declassified 1960s style.

Severity: ${classification.severity}. Recommendations PROPORTIONAL:
- low: diplomatic + economic responses only
- medium: defensive readiness + diplomatic pressure
- high/extreme: full-spectrum responses appropriate

Use the provided country profiles and treaty articles to ground every recommendation. Reference specific equipment from the perspective country's profile. Cite specific treaty articles by name and number where they apply. NEVER use placeholder brackets.

THREAT CLASSIFICATION (step 1):
- Scope: ${classification.scope}
- Escalation risk: ${classification.escalationRisk}
- Weapons domains: ${classification.weaponsDomains.join(", ")}
- Primary concern: ${classification.primaryConcern}

COUNTRY PROFILES:
${profileBlocks}

RELEVANT BASES (cite by name when describing posture changes or strike options):
${basesContext}

STRATEGIC CHOKEPOINTS (reference if scenario crosses these geographies):
${chokepointsContext}

PERSPECTIVE COUNTRY WEAPON SYSTEM SPECS (use exact names + ranges/payloads in recommendations):
${weaponsContext}

RELEVANT INTELLIGENCE AGENCIES (cite by name when describing collection, attribution, or covert action):
${intelAgenciesContext}

RELEVANT SPECIAL OPERATIONS UNITS (cite by name when describing direct action, special reconnaissance, or hostage rescue):
${sofContext}

PERSPECTIVE COUNTRY DEFENSE INDUSTRIES (cite when discussing arms transfers, industrial mobilization, or sanctions effects):
${industriesContext}

RELEVANT SUB-STATE ACTORS (cite by name and arsenal where they could shape the scenario):
${subStateActorsContext}

HISTORICAL ANALOGIES (draw lessons learned where applicable):
${historyContext}

RELEVANT TREATY ARTICLES (cite by name + article number):
${treatyContext}

Output JSON ONLY per the schema in the user message.`;

    const userPrompt = `Generate a formal intelligence briefing.

Date: ${args.date}
Scenario: ${args.scenario}
Primary Country: ${args.selectedCountry}
Offensive Force: ${args.offensiveCountry}
Defensive Force: ${args.defensiveCountry}
Severity: ${classification.severity}
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
  "recommendations": ["<2-4 sentences each, 60-100 words>", "<...>", "<...>", "<...>"],
  "conclusion": "Paragraph beginning 'The above assessments lead to the conclusion...' and ending '...should be patterned along the following lines:'",
  "finalRecommendation": "Paragraph identifying the prioritized recommendation and reasoning for ${args.selectedCountry}",
  "classification": "CONFIDENTIAL",
  "author": "${args.selectedCountry} Strategic Intelligence Division",
  "treatyReferences": [{"title": "Treaty short name + Article number", "relevance": "one sentence on why it applies"}],
  "disclaimer": "Educational simulation only. Not for real-world decisions."
}

EVERY recommendation MUST be 2-4 sentences (60-100 words) and MUST cite at least THREE of the following specifics, drawn ONLY from the retrieved context above:

1. A named base or location (from RELEVANT BASES) — e.g., "Rovaniemi Air Base", "Kadena AB", "RAF Lakenheath"
2. A named equipment system with its actual employment role (from PERSPECTIVE COUNTRY WEAPON SYSTEM SPECS) — e.g., "F-35A from Tindal", "JASSM-ER deployed on F-35A", "NASAMS battery covering critical infrastructure"
3. A named ally with the specific commitment they'd be asked to make (from PERSPECTIVE COUNTRY ALLIANCES + COUNTRY PROFILES) — e.g., "Norway and Sweden under JEF for joint Arctic patrols", "US 7th Fleet from Yokosuka", "UK Typhoon detachment to Rovaniemi"
4. A treaty article by name + number (from RELEVANT TREATY ARTICLES) — e.g., "NATO Article 4 consultations", "UN Charter Article 51 self-defence"
5. A named sub-state actor where applicable (from RELEVANT SUB-STATE ACTORS)

Format each recommendation as a concrete operational sentence followed by the specific assets/treaty/allies that enable it, then the desired effect. Example shape:

"Forward-deploy a F-35A detachment from RAF Lakenheath to Rovaniemi Air Base, integrate with Finnish JAS 39E Gripen via NATO ACO command, and stand up a NASAMS battery covering Helsinki and Turku critical infrastructure. Coordinate with Norway (JEF lead) and Sweden under EU Article 42.7 for joint Arctic surveillance. This denies Russian Aerospace Forces freedom of action over the Gulf of Bothnia within the 14-day timeframe."

DO NOT write generic statements like "leverage alliance support" or "enhance air defense". ALWAYS substitute named specifics. If a needed specific is not in the retrieved context, omit that recommendation rather than invent one.`;

    type BriefingParsed = {
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
    const synthesisResult = await callOpenAIWithJsonRepair<BriefingParsed>(
      BRIEFING_MODEL,
      [
        { role: "system", content: synthesisSystem },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.7, maxTokens: 2500 },
    );
    const parsed = synthesisResult.parsed;

    // ============ Phase 2B: Citation verification ============
    const allBriefingText = [
      parsed.title,
      ...parsed.sections.map((s) => s.content),
      ...parsed.recommendations,
      parsed.conclusion,
      parsed.finalRecommendation,
      ...(parsed.treatyReferences ?? []).map(
        (r) => `${r.title}: ${r.relevance}`,
      ),
    ]
      .filter(Boolean)
      .join(" ");

    const verifiedCitations = {
      treatiesCited: 0,
      treatiesVerified: 0,
      basesCited: 0,
      basesVerified: 0,
      weaponsCited: 0,
      weaponsVerified: 0,
      subStateActorsCited: 0,
      subStateActorsVerified: 0,
      unverifiedCitations: [] as string[],
    };

    const retrievedTreatyKeys = new Set<string>();
    for (const a of articles) {
      const short = (a.treatyShortName ?? a.treatyTitle).toLowerCase();
      retrievedTreatyKeys.add(short);
      retrievedTreatyKeys.add(a.treatyTitle.toLowerCase());
    }
    // Match treaty references in the dedicated structured field
    for (const ref of parsed.treatyReferences ?? []) {
      if (!ref.title) continue;
      verifiedCitations.treatiesCited += 1;
      const txtLower = ref.title.toLowerCase();
      const found = Array.from(retrievedTreatyKeys).some((k) =>
        txtLower.includes(k),
      );
      if (found) verifiedCitations.treatiesVerified += 1;
      else verifiedCitations.unverifiedCitations.push(`treaty: ${ref.title}`);
    }

    // Count base mentions: any retrieved base name appearing in the briefing text
    for (const b of relevantBases) {
      if (allBriefingText.toLowerCase().includes(b.name.toLowerCase())) {
        verifiedCitations.basesVerified += 1;
        verifiedCitations.basesCited += 1;
      }
    }

    for (const w of topPerspectiveWeapons) {
      if (allBriefingText.toLowerCase().includes(w.name.toLowerCase())) {
        verifiedCitations.weaponsVerified += 1;
        verifiedCitations.weaponsCited += 1;
      }
    }

    for (const a of relevantSubStateActors) {
      const named =
        allBriefingText.toLowerCase().includes(a.name.toLowerCase()) ||
        a.aliases.some(
          (al) =>
            al.length > 3 &&
            allBriefingText.toLowerCase().includes(al.toLowerCase()),
        );
      if (named) {
        verifiedCitations.subStateActorsVerified += 1;
        verifiedCitations.subStateActorsCited += 1;
      }
    }

    // ============ Phase 2C: Self-critique pass ============
    type CritiqueResult = {
      severity_proportionality: "pass" | "fail";
      placeholder_brackets: "pass" | "fail";
      grounded_in_retrieved_context: "pass" | "partial" | "fail";
      issues: string[];
      score: number; // 0-100
    };
    const critiqueSystem = `You are a senior reviewer auditing an educational simulation briefing for accuracy. Be terse and critical. Evaluate the BRIEFING against the RETRIEVED CONTEXT it was meant to be grounded in. Return ONLY JSON.`;
    const critiqueUser = `Severity declared: ${classification.severity}.

RETRIEVED CONTEXT (the briefing should not invent facts beyond this and the perspective country's profile):
- Bases: ${relevantBases.map((b) => b.name).join("; ") || "none"}
- Weapons (perspective): ${topPerspectiveWeapons.map((w) => w.name).join("; ") || "none"}
- Treaty articles cited as available: ${
      articles
        .map(
          (a) => `${a.treatyShortName ?? a.treatyTitle} Art ${a.articleNumber}`,
        )
        .join("; ") || "none"
    }
- Sub-state actors flagged: ${relevantSubStateActors.map((a) => a.name).join("; ") || "none"}

BRIEFING (assess this):
Title: ${parsed.title}
Sections: ${parsed.sections.map((s) => `${s.point} ${s.content}`).join("\n")}
Recommendations: ${parsed.recommendations.join("\n- ")}
Conclusion: ${parsed.conclusion}
Final recommendation: ${parsed.finalRecommendation}
Treaty references: ${(parsed.treatyReferences ?? []).map((r) => `${r.title}: ${r.relevance}`).join("\n- ")}

Return JSON:
{
  "severity_proportionality": "pass" | "fail",
  "placeholder_brackets": "pass" | "fail",
  "grounded_in_retrieved_context": "pass" | "partial" | "fail",
  "issues": [<short bullet strings flagging specific problems; empty array if none>],
  "score": <0-100, holistic quality score>
}

Criteria:
- severity_proportionality: low → recommendations must be diplomatic/economic only. high/extreme → military responses appropriate. Fail if mismatched.
- placeholder_brackets: fail if the briefing contains any text like "[country]" or "[specific equipment]" that wasn't filled in.
- grounded_in_retrieved_context: pass if cited specifics (bases, weapons, treaty articles, sub-state actors) appear in the retrieved context above. Partial if some are uncited or hallucinated. Fail if widespread fabrication.
- score: weighted by accuracy, specificity, internal coherence, and proportionality.`;

    let critique: CritiqueResult | null = null;
    try {
      const critiqueRaw = await callOpenAI(
        CLASSIFIER_MODEL,
        [
          { role: "system", content: critiqueSystem },
          { role: "user", content: critiqueUser },
        ],
        { temperature: 0.1, maxTokens: 600, jsonMode: true },
      );
      critique = JSON.parse(critiqueRaw) as CritiqueResult;
    } catch (err) {
      console.warn("Self-critique failed:", err);
    }

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
        ragGenerated: articles.length > 0,
        treatiesAnalyzed: articles.length,
        processingTime,
      },
    );

    return {
      briefingId,
      treatiesAnalyzed: articles.length,
      qa: {
        jsonRepaired: synthesisResult.repaired,
        citations: verifiedCitations,
        critique: critique
          ? {
              severityProportionality: critique.severity_proportionality,
              placeholderBrackets: critique.placeholder_brackets,
              groundedInRetrievedContext:
                critique.grounded_in_retrieved_context,
              issues: critique.issues,
              score: critique.score,
            }
          : null,
      },
      sources: {
        bases: relevantBases.map((b) => ({
          name: b.name,
          location: b.location,
          region: b.region,
          type: b.type,
          hostCountryCode: b.hostCountryCode,
          tenantCountryCodes: b.tenantCountryCodes,
          hostedSystems: b.hostedSystems,
          role: b.role,
        })),
        weapons: topPerspectiveWeapons.map((w) => ({
          name: w.name,
          category: w.category,
          originCountryCode: w.originCountryCode,
          rangeKm: w.rangeKm,
          payload: w.payload,
          description: w.description,
        })),
        treatyArticles: articles.map((a) => ({
          treatyShortName: a.treatyShortName,
          treatyTitle: a.treatyTitle,
          articleNumber: a.articleNumber,
          articleTitle: a.articleTitle,
          content: a.content,
          offensiveSignatory: a.offensiveSignatory,
          defensiveSignatory: a.defensiveSignatory,
          selectedSignatory: a.selectedSignatory,
        })),
        chokepoints: chokepointMatches.map((c) => ({
          name: c.name,
          region: c.region,
          type: c.type,
          significance: c.significance,
          bordersCountryCodes: c.bordersCountryCodes,
        })),
        intelAgencies: relevantIntelAgencies.map((a) => ({
          name: a.name,
          countryCode: a.countryCode,
          type: a.type,
          mission: a.mission,
        })),
        sofUnits: relevantSofUnits.map((u) => ({
          name: u.name,
          countryCode: u.countryCode,
          parentService: u.parentService,
          role: u.role,
        })),
        defenseIndustries: topPerspectiveIndustries.map((d) => ({
          name: d.name,
          countryCode: d.countryCode,
          keyProducts: d.keyProducts,
          notes: d.notes,
        })),
        subStateActors: relevantSubStateActors.map((a) => ({
          name: a.name,
          type: a.type,
          region: a.region,
          primarySponsorCountryCode: a.primarySponsorCountryCode,
          arsenal: a.arsenal,
          description: a.description,
        })),
        historicalIncidents: historicalAnalogies.map((h) => ({
          name: h.name,
          startDate: h.startDate,
          endDate: h.endDate,
          region: h.region,
          type: h.type,
          summary: h.summary,
          lessons: h.lessons,
        })),
      },
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
