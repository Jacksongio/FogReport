import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";

async function requireUserId(ctx: QueryCtx): Promise<Id<"users">> {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("Not authenticated");
  }
  return userId;
}

export const list = query({
  args: {},
  handler: async (ctx): Promise<Doc<"briefings">[]> => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return await ctx.db
      .query("briefings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);
  },
});

export const latest = query({
  args: {},
  handler: async (ctx): Promise<Doc<"briefings"> | null> => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    return await ctx.db
      .query("briefings")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .first();
  },
});

export const get = query({
  args: { id: v.id("briefings") },
  handler: async (ctx, { id }): Promise<Doc<"briefings"> | null> => {
    const userId = await requireUserId(ctx);
    const doc = await ctx.db.get(id);
    if (!doc || doc.userId !== userId) return null;
    return doc;
  },
});

export const remove = mutation({
  args: { id: v.id("briefings") },
  handler: async (ctx, { id }) => {
    const userId = await requireUserId(ctx);
    const doc = await ctx.db.get(id);
    if (!doc || doc.userId !== userId) {
      throw new Error("Briefing not found");
    }
    await ctx.db.delete(id);
  },
});

export const insertGenerated = internalMutation({
  args: {
    userId: v.id("users"),
    analysisId: v.optional(v.id("analyses")),
    date: v.string(),
    title: v.string(),
    sections: v.array(
      v.object({
        point: v.string(),
        content: v.string(),
      }),
    ),
    recommendations: v.array(v.string()),
    conclusion: v.string(),
    finalRecommendation: v.string(),
    classification: v.string(),
    author: v.string(),
    disclaimer: v.optional(v.string()),
    treatyReferences: v.array(
      v.object({
        title: v.string(),
        relevance: v.string(),
      }),
    ),
    ragGenerated: v.boolean(),
    treatiesAnalyzed: v.optional(v.number()),
    processingTime: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<Id<"briefings">> => {
    return await ctx.db.insert("briefings", args);
  },
});
