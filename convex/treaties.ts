import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import {
  action,
  internalAction,
  internalQuery,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";

const EMBEDDING_MODEL = "text-embedding-3-small";

type ScenarioContext = {
  selectedCountry?: string;
  selectedCountryCode?: string;
  conflictScenario?: string;
  offensiveCountry?: string;
  offensiveCountryCode?: string;
  defensiveCountry?: string;
  defensiveCountryCode?: string;
  scenarioDetails?: string;
  severityLevel?: string;
  timeFrame?: string;
};

export type RankedArticle = {
  _id: Id<"treatyArticles">;
  treatyId: Id<"treaties">;
  treatySlug: string;
  treatyTitle: string;
  treatyShortName?: string;
  category: string;
  articleNumber: string;
  articleTitle?: string;
  content: string;
  similarity: number;
  relevanceScore: number;
  selectedSignatory?: string;
  offensiveSignatory?: string;
  defensiveSignatory?: string;
  bothPartiesBound: boolean;
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
    terms.push("nuclear non-proliferation disarmament weapons");
  if (conflict.includes("territorial"))
    terms.push("territorial integrity occupation armed conflict use of force");
  if (conflict.includes("proxy"))
    terms.push("indirect aggression military assistance proxy support");
  if (conflict.includes("conventional"))
    terms.push("conventional warfare laws of war means and methods");
  if (conflict.includes("naval"))
    terms.push("naval law of the sea blockade maritime");
  if (conflict.includes("air"))
    terms.push("airspace aerial bombardment civilian protection");

  terms.push(
    "self defence",
    "use of force",
    "civilian protection",
    "distinction proportionality",
    "alliance collective defence",
    "Security Council authorization",
  );

  if (scenario.scenarioDetails) terms.push(scenario.scenarioDetails);
  return terms.join(". ");
}

export const fetchArticles = internalQuery({
  args: { ids: v.array(v.id("treatyArticles")) },
  handler: async (ctx, { ids }): Promise<Doc<"treatyArticles">[]> => {
    const articles = await Promise.all(ids.map((id) => ctx.db.get(id)));
    return articles.filter((c): c is Doc<"treatyArticles"> => c !== null);
  },
});

export const signatoryStatusFor = internalQuery({
  args: {
    treatyIds: v.array(v.id("treaties")),
    countryCodes: v.array(v.string()),
  },
  handler: async (
    ctx,
    { treatyIds, countryCodes },
  ): Promise<Record<string, Record<string, string>>> => {
    const result: Record<string, Record<string, string>> = {};
    for (const treatyId of treatyIds) {
      const map: Record<string, string> = {};
      for (const code of countryCodes) {
        const sig = await ctx.db
          .query("treatySignatories")
          .withIndex("by_treaty_country", (q) =>
            q.eq("treatyId", treatyId).eq("countryCode", code),
          )
          .unique();
        map[code] = sig?.status ?? "non_party";
      }
      result[treatyId] = map;
    }
    return result;
  },
});

export const statistics = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db.query("treatyArticles").take(2000);
    const treaties = await ctx.db.query("treaties").take(500);
    const byCategory: Record<string, number> = {};
    for (const t of treaties) {
      byCategory[t.category] = (byCategory[t.category] ?? 0) + 1;
    }
    return {
      totalTreaties: treaties.length,
      totalArticles: articles.length,
      byCategory,
    };
  },
});

export const searchByScenario = action({
  args: {
    scenario: v.object({
      selectedCountry: v.optional(v.string()),
      selectedCountryCode: v.optional(v.string()),
      conflictScenario: v.optional(v.string()),
      offensiveCountry: v.optional(v.string()),
      offensiveCountryCode: v.optional(v.string()),
      defensiveCountry: v.optional(v.string()),
      defensiveCountryCode: v.optional(v.string()),
      scenarioDetails: v.optional(v.string()),
      severityLevel: v.optional(v.string()),
      timeFrame: v.optional(v.string()),
    }),
    limit: v.optional(v.number()),
    manualQuery: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { scenario, limit, manualQuery },
  ): Promise<RankedArticle[]> => {
    const queryText =
      manualQuery && manualQuery.trim().length > 0
        ? manualQuery
        : buildScenarioQuery(scenario);

    const queryEmbedding = await embedQuery(queryText);
    const k = Math.min(limit ?? 10, 30);

    const candidates = await ctx.vectorSearch(
      "treatyArticles",
      "by_embedding",
      {
        vector: queryEmbedding,
        limit: k * 3,
      },
    );

    const articles: Doc<"treatyArticles">[] = await ctx.runQuery(
      internal.treaties.fetchArticles,
      { ids: candidates.map((c) => c._id) },
    );

    const treatyIds = Array.from(
      new Set(articles.map((a) => a.treatyId.toString())),
    ).map((s) => s as unknown as Id<"treaties">);

    const codes = [
      scenario.selectedCountryCode,
      scenario.offensiveCountryCode,
      scenario.defensiveCountryCode,
    ].filter((c): c is string => !!c);

    const sigStatusMap: Record<string, Record<string, string>> = codes.length >
    0
      ? await ctx.runQuery(internal.treaties.signatoryStatusFor, {
          treatyIds: articles.map((a) => a.treatyId),
          countryCodes: codes,
        })
      : {};

    const ranked: RankedArticle[] = articles.map((article) => {
      const candidate = candidates.find((c) => c._id === article._id);
      const similarity = candidate?._score ?? 0;
      const sigMap = sigStatusMap[article.treatyId] ?? {};
      const selectedStatus = scenario.selectedCountryCode
        ? sigMap[scenario.selectedCountryCode]
        : undefined;
      const offensiveStatus = scenario.offensiveCountryCode
        ? sigMap[scenario.offensiveCountryCode]
        : undefined;
      const defensiveStatus = scenario.defensiveCountryCode
        ? sigMap[scenario.defensiveCountryCode]
        : undefined;

      const isBound = (s?: string) => s === "ratified" || s === "acceded";
      const bothPartiesBound =
        isBound(offensiveStatus) && isBound(defensiveStatus);

      let boost = 0;
      if (bothPartiesBound) boost += 0.6;
      else if (isBound(offensiveStatus) && !isBound(defensiveStatus))
        boost += 0.35;
      else if (!isBound(offensiveStatus) && isBound(defensiveStatus))
        boost += 0.35;
      if (isBound(selectedStatus)) boost += 0.2;

      const relevanceScore = similarity + boost;

      return {
        _id: article._id,
        treatyId: article.treatyId,
        treatySlug: article.treatySlug,
        treatyTitle: article.treatyTitle,
        treatyShortName: article.treatyShortName,
        category: article.category,
        articleNumber: article.articleNumber,
        articleTitle: article.articleTitle,
        content: article.content,
        similarity,
        relevanceScore,
        selectedSignatory: selectedStatus,
        offensiveSignatory: offensiveStatus,
        defensiveSignatory: defensiveStatus,
        bothPartiesBound,
      };
    });

    ranked.sort((a, b) => {
      if (a.bothPartiesBound !== b.bothPartiesBound) {
        return a.bothPartiesBound ? -1 : 1;
      }
      return b.relevanceScore - a.relevanceScore;
    });

    return ranked.slice(0, k);
  },
});

export const lookupCountryProfile = internalQuery({
  args: { code: v.string() },
  handler: async (ctx, { code }): Promise<Doc<"countryProfiles"> | null> => {
    return await ctx.db
      .query("countryProfiles")
      .withIndex("by_code", (q) => q.eq("code", code))
      .unique();
  },
});

export const lookupCountryProfileByName = internalQuery({
  args: { name: v.string() },
  handler: async (ctx, { name }): Promise<Doc<"countryProfiles"> | null> => {
    return await ctx.db
      .query("countryProfiles")
      .withIndex("by_name", (q) => q.eq("name", name))
      .unique();
  },
});

export const lookupCountryProfiles = internalQuery({
  args: {
    codes: v.array(v.string()),
    names: v.array(v.string()),
  },
  handler: async (
    ctx,
    { codes, names },
  ): Promise<Record<string, Doc<"countryProfiles">>> => {
    const result: Record<string, Doc<"countryProfiles">> = {};
    for (let i = 0; i < codes.length; i += 1) {
      const code = codes[i];
      const name = names[i];
      let doc: Doc<"countryProfiles"> | null = null;
      if (code) {
        doc = await ctx.db
          .query("countryProfiles")
          .withIndex("by_code", (q) => q.eq("code", code))
          .unique();
      }
      if (!doc && name) {
        doc = await ctx.db
          .query("countryProfiles")
          .withIndex("by_name", (q) => q.eq("name", name))
          .unique();
      }
      const key = code || name;
      if (doc && key) result[key] = doc;
    }
    return result;
  },
});

// Re-export internal action to keep external callers stable
export const _refresh = internalAction({
  args: {},
  handler: async () => null,
});
