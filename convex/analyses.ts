import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { mutation, query, QueryCtx } from "./_generated/server";

async function requireUserId(ctx: QueryCtx): Promise<Id<"users">> {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("Not authenticated");
  }
  return userId;
}

const economicFactorsValidator = v.object({
  tradeDependencies: v.number(),
  sanctionsImpact: v.number(),
  marketStability: v.number(),
});

const militaryReadinessValidator = v.object({
  defenseCapabilities: v.number(),
  allianceSupport: v.number(),
  strategicResources: v.number(),
});

const diplomaticRelationsValidator = v.object({
  unSupport: v.number(),
  regionalInfluence: v.number(),
  publicOpinion: v.number(),
});

const simulationResultsValidator = v.object({
  diplomaticResponse: v.number(),
  militaryReadiness: v.number(),
  economicImpact: v.number(),
  publicSupport: v.number(),
  allianceStrength: v.number(),
  recommendations: v.array(v.string()),
  summary: v.optional(v.string()),
});

export const list = query({
  args: {},
  handler: async (ctx): Promise<Doc<"analyses">[]> => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return await ctx.db
      .query("analyses")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);
  },
});

export const latest = query({
  args: {},
  handler: async (ctx): Promise<Doc<"analyses"> | null> => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    return await ctx.db
      .query("analyses")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .first();
  },
});

export const get = query({
  args: { id: v.id("analyses") },
  handler: async (ctx, { id }): Promise<Doc<"analyses"> | null> => {
    const userId = await requireUserId(ctx);
    const doc = await ctx.db.get(id);
    if (!doc || doc.userId !== userId) return null;
    return doc;
  },
});

export const save = mutation({
  args: {
    selectedCountry: v.string(),
    conflictScenario: v.string(),
    offensiveCountry: v.string(),
    defensiveCountry: v.string(),
    scenarioDetails: v.string(),
    severityLevel: v.string(),
    timeFrame: v.string(),
    economicFactors: economicFactorsValidator,
    militaryReadiness: militaryReadinessValidator,
    diplomaticRelations: diplomaticRelationsValidator,
  },
  handler: async (ctx, args): Promise<Id<"analyses">> => {
    const userId = await requireUserId(ctx);

    if (args.selectedCountry === args.offensiveCountry) {
      throw new Error(
        "You cannot simulate your own country as the aggressor/offensive country",
      );
    }

    return await ctx.db.insert("analyses", {
      userId,
      ...args,
    });
  },
});

export const setResults = mutation({
  args: {
    id: v.id("analyses"),
    results: simulationResultsValidator,
  },
  handler: async (ctx, { id, results }) => {
    const userId = await requireUserId(ctx);
    const doc = await ctx.db.get(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Analysis not found");
    }
    await ctx.db.patch(id, { results });
  },
});

export const remove = mutation({
  args: { id: v.id("analyses") },
  handler: async (ctx, { id }) => {
    const userId = await requireUserId(ctx);
    const doc = await ctx.db.get(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Analysis not found");
    }
    await ctx.db.delete(id);
  },
});
