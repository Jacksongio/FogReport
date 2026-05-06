import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import {
  action,
  internalMutation,
  internalQuery,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";

const EMBEDDING_MODEL = "text-embedding-3-small";

type ScenarioContext = {
  selectedCountry?: string;
  conflictScenario?: string;
  offensiveCountry?: string;
  defensiveCountry?: string;
  scenarioDetails?: string;
  severityLevel?: string;
  timeFrame?: string;
};

type RankedChunk = {
  _id: Id<"treatyChunks">;
  treatyId: Id<"treaties">;
  content: string;
  treatyType: string;
  section: string;
  title: string;
  parties?: string;
  relevanceScore: number;
  participation: ChunkParticipation;
};

type ChunkParticipation = {
  selectedCountrySigned: boolean;
  offensiveCountrySigned: boolean;
  defensiveCountrySigned: boolean;
  bothPartiesSigned: boolean;
  signingStatus:
    | "both_signed"
    | "aggressor_only"
    | "victim_only"
    | "neither_signed";
};

async function embedQuery(query: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured in Convex");

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: query }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI embedding error ${response.status}: ${text}`);
  }

  const json = await response.json();
  return json.data[0].embedding as number[];
}

function buildScenarioQuery(scenario: ScenarioContext): string {
  const conflict = (scenario.conflictScenario ?? "").toLowerCase();
  const terms: string[] = [];

  if (conflict.includes("nuclear"))
    terms.push("nuclear", "non-proliferation", "disarmament", "weapons");
  if (conflict.includes("territorial"))
    terms.push("territorial", "border", "military occupation", "armed conflict");
  if (conflict.includes("proxy"))
    terms.push("proxy war", "military assistance", "indirect warfare");
  if (conflict.includes("conventional"))
    terms.push("conventional warfare", "military operations", "armed forces");
  if (conflict.includes("naval"))
    terms.push("naval", "maritime", "sea warfare", "naval blockade");
  if (conflict.includes("air"))
    terms.push("air warfare", "aviation", "airspace", "aerial operations");

  terms.push(
    "united nations",
    "geneva conventions",
    "armed conflict",
    "defense",
    "security",
    "peace",
  );

  if (scenario.scenarioDetails) terms.push(scenario.scenarioDetails);
  return terms.join(" ");
}

function analyzeParticipation(
  content: string,
  scenario: ScenarioContext,
): ChunkParticipation {
  const lower = content.toLowerCase();
  const selected = scenario.selectedCountry?.toLowerCase();
  const offensive = scenario.offensiveCountry?.toLowerCase();
  const defensive = scenario.defensiveCountry?.toLowerCase();

  let selectedSigned = !!selected && lower.includes(selected);
  let offensiveSigned = !!offensive && lower.includes(offensive);
  let defensiveSigned = !!defensive && lower.includes(defensive);

  const universalMarkers = [
    "united nations",
    "geneva",
    "vienna convention",
    "nuclear non-proliferation",
    "chemical weapons",
    "world trade",
  ];
  if (universalMarkers.some((m) => lower.includes(m))) {
    selectedSigned = true;
    offensiveSigned = true;
    defensiveSigned = true;
  }

  const bothPartiesSigned = offensiveSigned && defensiveSigned;
  let signingStatus: ChunkParticipation["signingStatus"];
  if (bothPartiesSigned) signingStatus = "both_signed";
  else if (offensiveSigned && !defensiveSigned) signingStatus = "aggressor_only";
  else if (!offensiveSigned && defensiveSigned) signingStatus = "victim_only";
  else signingStatus = "neither_signed";

  return {
    selectedCountrySigned: selectedSigned,
    offensiveCountrySigned: offensiveSigned,
    defensiveCountrySigned: defensiveSigned,
    bothPartiesSigned,
    signingStatus,
  };
}

function applyScenarioBoost(
  baseSimilarity: number,
  content: string,
  scenario: ScenarioContext,
  participation: ChunkParticipation,
): number {
  const lower = content.toLowerCase();
  const conflict = (scenario.conflictScenario ?? "").toLowerCase();
  let boost = 0;

  if (conflict.includes("nuclear") && lower.includes("nuclear")) boost += 0.5;
  if (
    conflict.includes("territorial") &&
    (lower.includes("territorial") ||
      lower.includes("border") ||
      lower.includes("military") ||
      lower.includes("armed conflict"))
  )
    boost += 0.5;
  if (
    conflict.includes("proxy") &&
    (lower.includes("proxy") ||
      lower.includes("indirect") ||
      lower.includes("military assistance"))
  )
    boost += 0.5;
  if (
    conflict.includes("conventional") &&
    (lower.includes("conventional") ||
      lower.includes("warfare") ||
      lower.includes("military"))
  )
    boost += 0.5;
  if (
    conflict.includes("naval") &&
    (lower.includes("naval") ||
      lower.includes("maritime") ||
      lower.includes("sea"))
  )
    boost += 0.5;
  if (
    conflict.includes("air") &&
    (lower.includes("air") ||
      lower.includes("aviation") ||
      lower.includes("airspace"))
  )
    boost += 0.5;

  if (
    lower.includes("military") ||
    lower.includes("armed") ||
    lower.includes("war") ||
    lower.includes("conflict")
  )
    boost += 0.3;
  if (
    lower.includes("defense") ||
    lower.includes("security") ||
    lower.includes("alliance")
  )
    boost += 0.3;

  for (const country of [
    scenario.selectedCountry,
    scenario.offensiveCountry,
    scenario.defensiveCountry,
  ]) {
    if (country && lower.includes(country.toLowerCase())) boost += 0.2;
  }

  if (
    lower.includes("united nations") ||
    lower.includes("geneva") ||
    lower.includes("vienna convention")
  )
    boost += 0.2;

  if (participation.bothPartiesSigned) boost += 0.6;
  else if (participation.signingStatus === "aggressor_only") boost += 0.4;
  else if (participation.signingStatus === "victim_only") boost += 0.4;
  else if (
    participation.offensiveCountrySigned ||
    participation.defensiveCountrySigned
  )
    boost += 0.2;

  return baseSimilarity + boost;
}

export const fetchChunks = internalQuery({
  args: { ids: v.array(v.id("treatyChunks")) },
  handler: async (ctx, { ids }) => {
    const chunks = await Promise.all(ids.map((id) => ctx.db.get(id)));
    return chunks.filter((c): c is Doc<"treatyChunks"> => c !== null);
  },
});

export const allChunks = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("treatyChunks").take(2000);
  },
});

export const insertTreaty = internalMutation({
  args: {
    section: v.string(),
    treatyType: v.string(),
    title: v.string(),
    adoptionDate: v.optional(v.string()),
    entryIntoForce: v.optional(v.string()),
    parties: v.optional(v.string()),
    description: v.optional(v.string()),
    fullText: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("treaties", args);
  },
});

export const insertChunk = internalMutation({
  args: {
    treatyId: v.id("treaties"),
    section: v.string(),
    treatyType: v.string(),
    title: v.string(),
    parties: v.optional(v.string()),
    chunkIndex: v.number(),
    totalChunks: v.number(),
    content: v.string(),
    embedding: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("treatyChunks", args);
  },
});

export const purgeAll = internalMutation({
  args: {},
  handler: async (ctx) => {
    const chunks = await ctx.db.query("treatyChunks").take(2000);
    for (const c of chunks) await ctx.db.delete(c._id);
    const treaties = await ctx.db.query("treaties").take(2000);
    for (const t of treaties) await ctx.db.delete(t._id);
  },
});

export const statistics = query({
  args: {},
  handler: async (ctx) => {
    const chunks = await ctx.db.query("treatyChunks").take(2000);
    const byType: Record<string, number> = {};
    for (const c of chunks) {
      byType[c.treatyType] = (byType[c.treatyType] ?? 0) + 1;
    }
    return {
      totalChunks: chunks.length,
      byType,
    };
  },
});

export const searchByScenario = action({
  args: {
    scenario: v.object({
      selectedCountry: v.optional(v.string()),
      conflictScenario: v.optional(v.string()),
      offensiveCountry: v.optional(v.string()),
      defensiveCountry: v.optional(v.string()),
      scenarioDetails: v.optional(v.string()),
      severityLevel: v.optional(v.string()),
      timeFrame: v.optional(v.string()),
    }),
    limit: v.optional(v.number()),
    manualQuery: v.optional(v.string()),
  },
  handler: async (ctx, { scenario, limit, manualQuery }): Promise<RankedChunk[]> => {
    const query = manualQuery && manualQuery.trim().length > 0
      ? manualQuery
      : buildScenarioQuery(scenario);

    const queryEmbedding = await embedQuery(query);
    const k = Math.min(limit ?? 10, 30);

    const candidates = await ctx.vectorSearch("treatyChunks", "by_embedding", {
      vector: queryEmbedding,
      limit: k * 2,
    });

    const chunks: Doc<"treatyChunks">[] = await ctx.runQuery(
      internal.treaties.fetchChunks,
      { ids: candidates.map((c) => c._id) },
    );

    const ranked: RankedChunk[] = chunks.map((chunk) => {
      const candidate = candidates.find((c) => c._id === chunk._id);
      const baseSim = candidate?._score ?? 0;
      const participation = analyzeParticipation(chunk.content, scenario);
      const relevanceScore = applyScenarioBoost(
        baseSim,
        chunk.content,
        scenario,
        participation,
      );
      return {
        _id: chunk._id,
        treatyId: chunk.treatyId,
        content: chunk.content,
        treatyType: chunk.treatyType,
        section: chunk.section,
        title: chunk.title,
        parties: chunk.parties,
        relevanceScore,
        participation,
      };
    });

    ranked.sort((a, b) => {
      if (a.participation.bothPartiesSigned !== b.participation.bothPartiesSigned) {
        return a.participation.bothPartiesSigned ? -1 : 1;
      }
      return b.relevanceScore - a.relevanceScore;
    });

    return ranked.slice(0, k);
  },
});
