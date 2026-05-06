import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const economicFactors = v.object({
  tradeDependencies: v.number(),
  sanctionsImpact: v.number(),
  marketStability: v.number(),
});

const militaryReadiness = v.object({
  defenseCapabilities: v.number(),
  allianceSupport: v.number(),
  strategicResources: v.number(),
});

const diplomaticRelations = v.object({
  unSupport: v.number(),
  regionalInfluence: v.number(),
  publicOpinion: v.number(),
});

const simulationResults = v.object({
  diplomaticResponse: v.number(),
  militaryReadiness: v.number(),
  economicImpact: v.number(),
  publicSupport: v.number(),
  allianceStrength: v.number(),
  recommendations: v.array(v.string()),
  summary: v.optional(v.string()),
});

export default defineSchema({
  ...authTables,

  analyses: defineTable({
    userId: v.id("users"),
    selectedCountry: v.string(),
    conflictScenario: v.string(),
    offensiveCountry: v.string(),
    defensiveCountry: v.string(),
    scenarioDetails: v.string(),
    severityLevel: v.string(),
    timeFrame: v.string(),
    economicFactors,
    militaryReadiness,
    diplomaticRelations,
    results: v.optional(simulationResults),
  }).index("by_user", ["userId"]),

  simulations: defineTable({
    userId: v.id("users"),
    selectedCountry: v.string(),
    conflictScenario: v.string(),
    offensiveCountry: v.string(),
    defensiveCountry: v.string(),
    scenarioDetails: v.string(),
    severityLevel: v.string(),
    timeFrame: v.string(),
  }).index("by_user", ["userId"]),

  briefings: defineTable({
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
    treatyReferences: v.optional(
      v.array(
        v.object({
          title: v.string(),
          relevance: v.string(),
        }),
      ),
    ),
    ragGenerated: v.boolean(),
    treatiesAnalyzed: v.optional(v.number()),
    processingTime: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_analysis", ["analysisId"]),

  treaties: defineTable({
    section: v.string(),
    treatyType: v.string(),
    title: v.string(),
    adoptionDate: v.optional(v.string()),
    entryIntoForce: v.optional(v.string()),
    parties: v.optional(v.string()),
    description: v.optional(v.string()),
    fullText: v.string(),
  }).index("by_type", ["treatyType"]),

  treatyChunks: defineTable({
    treatyId: v.id("treaties"),
    section: v.string(),
    treatyType: v.string(),
    title: v.string(),
    parties: v.optional(v.string()),
    chunkIndex: v.number(),
    totalChunks: v.number(),
    content: v.string(),
    embedding: v.array(v.float64()),
  })
    .index("by_treaty", ["treatyId"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["treatyType"],
    }),
});
