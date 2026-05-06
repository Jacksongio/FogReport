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

export const list = query({
  args: {},
  handler: async (ctx): Promise<Doc<"simulations">[]> => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return await ctx.db
      .query("simulations")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);
  },
});

export const latest = query({
  args: {},
  handler: async (ctx): Promise<Doc<"simulations"> | null> => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    return await ctx.db
      .query("simulations")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .first();
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
  },
  handler: async (ctx, args): Promise<Id<"simulations">> => {
    const userId = await requireUserId(ctx);

    if (args.selectedCountry === args.offensiveCountry) {
      throw new Error(
        "You cannot simulate your own country as the aggressor/offensive country",
      );
    }

    return await ctx.db.insert("simulations", {
      userId,
      ...args,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("simulations") },
  handler: async (ctx, { id }) => {
    const userId = await requireUserId(ctx);
    const doc = await ctx.db.get(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Simulation not found");
    }
    await ctx.db.delete(id);
  },
});
