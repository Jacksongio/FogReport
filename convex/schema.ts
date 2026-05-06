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

  countryProfiles: defineTable({
    code: v.string(),
    name: v.string(),
    region: v.string(),
    nuclearStatus: v.string(),
    militaryBudgetUsdBillions: v.optional(v.number()),
    activeMilitaryPersonnel: v.optional(v.number()),
    doctrine: v.optional(v.string()),
    aircraft: v.array(v.string()),
    missiles: v.array(v.string()),
    naval: v.array(v.string()),
    groundForces: v.array(v.string()),
    bases: v.array(v.string()),
    alliances: v.array(v.string()),
    notableCapabilities: v.array(v.string()),
  })
    .index("by_code", ["code"])
    .index("by_name", ["name"]),

  treaties: defineTable({
    slug: v.string(),
    title: v.string(),
    shortName: v.optional(v.string()),
    category: v.string(),
    adoptionDate: v.optional(v.string()),
    entryIntoForce: v.optional(v.string()),
    depositary: v.optional(v.string()),
    summary: v.string(),
    fullTextUrl: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  treatyArticles: defineTable({
    treatyId: v.id("treaties"),
    treatySlug: v.string(),
    treatyTitle: v.string(),
    treatyShortName: v.optional(v.string()),
    category: v.string(),
    articleNumber: v.string(),
    articleTitle: v.optional(v.string()),
    content: v.string(),
    embedding: v.array(v.float64()),
  })
    .index("by_treaty", ["treatyId"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["category"],
    }),

  treatySignatories: defineTable({
    treatyId: v.id("treaties"),
    treatySlug: v.string(),
    countryCode: v.string(),
    status: v.string(),
    date: v.optional(v.string()),
  })
    .index("by_treaty", ["treatyId"])
    .index("by_country", ["countryCode"])
    .index("by_treaty_country", ["treatyId", "countryCode"])
    .index("by_slug_country", ["treatySlug", "countryCode"]),

  militaryBases: defineTable({
    slug: v.string(),
    name: v.string(),
    hostCountryCode: v.string(),
    region: v.string(),
    location: v.string(),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    type: v.string(),
    primaryServiceBranch: v.optional(v.string()),
    tenantCountryCodes: v.array(v.string()),
    hostedUnits: v.array(v.string()),
    hostedSystems: v.array(v.string()),
    role: v.string(),
    notes: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_host", ["hostCountryCode"])
    .index("by_region", ["region"]),

  strategicChokepoints: defineTable({
    slug: v.string(),
    name: v.string(),
    region: v.string(),
    type: v.string(),
    widthKm: v.optional(v.number()),
    annualTraffic: v.optional(v.string()),
    bordersCountryCodes: v.array(v.string()),
    controllingPowers: v.array(v.string()),
    alternativeRoutes: v.array(v.string()),
    significance: v.string(),
    historicalIncidents: v.optional(v.array(v.string())),
  })
    .index("by_slug", ["slug"])
    .index("by_region", ["region"]),

  weaponSystems: defineTable({
    slug: v.string(),
    name: v.string(),
    category: v.string(),
    originCountryCode: v.string(),
    yearIntroduced: v.optional(v.number()),
    rangeKm: v.optional(v.number()),
    speedMach: v.optional(v.number()),
    payload: v.optional(v.string()),
    operators: v.array(v.string()),
    notableFeatures: v.optional(v.string()),
    description: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_origin", ["originCountryCode"])
    .index("by_name", ["name"]),

  defenseIndustries: defineTable({
    slug: v.string(),
    name: v.string(),
    countryCode: v.string(),
    headquarters: v.string(),
    ownership: v.string(),
    revenueUsdBillions: v.optional(v.number()),
    keyProducts: v.array(v.string()),
    majorCustomers: v.array(v.string()),
    notes: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_country", ["countryCode"]),

  intelligenceAgencies: defineTable({
    slug: v.string(),
    name: v.string(),
    countryCode: v.string(),
    type: v.string(),
    foundedYear: v.optional(v.number()),
    estimatedPersonnel: v.optional(v.number()),
    headquarters: v.optional(v.string()),
    mission: v.string(),
    notableCapabilities: v.array(v.string()),
    notableOperations: v.optional(v.array(v.string())),
  })
    .index("by_slug", ["slug"])
    .index("by_country", ["countryCode"])
    .index("by_type", ["type"]),

  sofUnits: defineTable({
    slug: v.string(),
    name: v.string(),
    countryCode: v.string(),
    parentService: v.string(),
    type: v.string(),
    foundedYear: v.optional(v.number()),
    estimatedStrength: v.optional(v.number()),
    homeBase: v.optional(v.string()),
    role: v.string(),
    notableOperations: v.optional(v.array(v.string())),
  })
    .index("by_slug", ["slug"])
    .index("by_country", ["countryCode"])
    .index("by_type", ["type"]),

  historicalIncidents: defineTable({
    slug: v.string(),
    name: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    region: v.string(),
    type: v.string(),
    primaryParties: v.array(v.string()),
    summary: v.string(),
    keyEvents: v.array(v.string()),
    outcome: v.string(),
    lessons: v.array(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_region", ["region"])
    .index("by_type", ["type"]),

  subStateActors: defineTable({
    slug: v.string(),
    name: v.string(),
    aliases: v.array(v.string()),
    type: v.string(),
    region: v.string(),
    areaOfOperations: v.array(v.string()),
    foundedYear: v.optional(v.number()),
    estimatedStrength: v.optional(v.number()),
    primarySponsorCountryCode: v.optional(v.string()),
    ideology: v.optional(v.string()),
    keyLeaders: v.optional(v.array(v.string())),
    arsenal: v.array(v.string()),
    notableOperations: v.optional(v.array(v.string())),
    description: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_type", ["type"])
    .index("by_region", ["region"])
    .index("by_sponsor", ["primarySponsorCountryCode"]),
});
