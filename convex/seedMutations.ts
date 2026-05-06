import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { internalMutation, internalQuery } from "./_generated/server";

// Country profile mutations

export const purgeCountryProfiles = internalMutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("countryProfiles").take(2000);
    for (const doc of docs) await ctx.db.delete(doc._id);
  },
});

export const insertCountryProfile = internalMutation({
  args: {
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
  },
  handler: async (ctx, args): Promise<Id<"countryProfiles">> => {
    return await ctx.db.insert("countryProfiles", args);
  },
});

// Treaty + article + signatory mutations

export const purgeTreatyData = internalMutation({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db.query("treatyArticles").take(5000);
    for (const a of articles) await ctx.db.delete(a._id);
    const sigs = await ctx.db.query("treatySignatories").take(5000);
    for (const s of sigs) await ctx.db.delete(s._id);
    const treaties = await ctx.db.query("treaties").take(2000);
    for (const t of treaties) await ctx.db.delete(t._id);
  },
});

export const insertTreaty = internalMutation({
  args: {
    slug: v.string(),
    title: v.string(),
    shortName: v.optional(v.string()),
    category: v.string(),
    adoptionDate: v.optional(v.string()),
    entryIntoForce: v.optional(v.string()),
    depositary: v.optional(v.string()),
    summary: v.string(),
    fullTextUrl: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<Id<"treaties">> => {
    return await ctx.db.insert("treaties", args);
  },
});

export const insertTreatyArticle = internalMutation({
  args: {
    treatyId: v.id("treaties"),
    treatySlug: v.string(),
    treatyTitle: v.string(),
    treatyShortName: v.optional(v.string()),
    category: v.string(),
    articleNumber: v.string(),
    articleTitle: v.optional(v.string()),
    content: v.string(),
    embedding: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("treatyArticles", args);
  },
});

export const insertTreatySignatory = internalMutation({
  args: {
    treatyId: v.id("treaties"),
    treatySlug: v.string(),
    countryCode: v.string(),
    status: v.string(),
    date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("treatySignatories", args);
  },
});

// Lookup helpers

export const lookupTreatyIdBySlug = internalQuery({
  args: { slug: v.string() },
  handler: async (ctx, { slug }): Promise<Id<"treaties"> | null> => {
    const doc = await ctx.db
      .query("treaties")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    return doc?._id ?? null;
  },
});

export const fetchSignatoriesForTreaty = internalQuery({
  args: { treatyId: v.id("treaties") },
  handler: async (ctx, { treatyId }): Promise<Doc<"treatySignatories">[]> => {
    return await ctx.db
      .query("treatySignatories")
      .withIndex("by_treaty", (q) => q.eq("treatyId", treatyId))
      .take(500);
  },
});

export const fetchCountrySignatories = internalQuery({
  args: { countryCode: v.string() },
  handler: async (
    ctx,
    { countryCode },
  ): Promise<Doc<"treatySignatories">[]> => {
    return await ctx.db
      .query("treatySignatories")
      .withIndex("by_country", (q) => q.eq("countryCode", countryCode))
      .take(500);
  },
});

// ============ Military bases ============

export const purgeMilitaryBases = internalMutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("militaryBases").take(2000);
    for (const doc of docs) await ctx.db.delete(doc._id);
  },
});

export const insertMilitaryBase = internalMutation({
  args: {
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
  },
  handler: async (ctx, args): Promise<Id<"militaryBases">> => {
    return await ctx.db.insert("militaryBases", args);
  },
});

export const fetchBasesForCountry = internalQuery({
  args: { countryCode: v.string() },
  handler: async (ctx, { countryCode }): Promise<Doc<"militaryBases">[]> => {
    const hosted = await ctx.db
      .query("militaryBases")
      .withIndex("by_host", (q) => q.eq("hostCountryCode", countryCode))
      .take(200);
    const tenant = (await ctx.db.query("militaryBases").take(1000)).filter(
      (b) =>
        b.tenantCountryCodes.includes(countryCode) &&
        b.hostCountryCode !== countryCode,
    );
    return [...hosted, ...tenant];
  },
});

export const fetchBasesByRegion = internalQuery({
  args: { region: v.string() },
  handler: async (ctx, { region }): Promise<Doc<"militaryBases">[]> => {
    return await ctx.db
      .query("militaryBases")
      .withIndex("by_region", (q) => q.eq("region", region))
      .take(200);
  },
});

// ============ Strategic chokepoints ============

export const purgeChokepoints = internalMutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("strategicChokepoints").take(500);
    for (const doc of docs) await ctx.db.delete(doc._id);
  },
});

export const insertChokepoint = internalMutation({
  args: {
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
  },
  handler: async (ctx, args): Promise<Id<"strategicChokepoints">> => {
    return await ctx.db.insert("strategicChokepoints", args);
  },
});

export const fetchAllChokepoints = internalQuery({
  args: {},
  handler: async (ctx): Promise<Doc<"strategicChokepoints">[]> => {
    return await ctx.db.query("strategicChokepoints").take(100);
  },
});

// ============ Weapon systems ============

export const purgeWeaponSystems = internalMutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("weaponSystems").take(2000);
    for (const doc of docs) await ctx.db.delete(doc._id);
  },
});

export const insertWeaponSystem = internalMutation({
  args: {
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
  },
  handler: async (ctx, args): Promise<Id<"weaponSystems">> => {
    return await ctx.db.insert("weaponSystems", args);
  },
});

export const fetchWeaponSystemsByOperator = internalQuery({
  args: { countryCode: v.string() },
  handler: async (ctx, { countryCode }): Promise<Doc<"weaponSystems">[]> => {
    const all = await ctx.db.query("weaponSystems").take(1000);
    return all.filter((w) => w.operators.includes(countryCode));
  },
});

export const fetchWeaponSystemsByName = internalQuery({
  args: { names: v.array(v.string()) },
  handler: async (ctx, { names }): Promise<Doc<"weaponSystems">[]> => {
    const result: Doc<"weaponSystems">[] = [];
    for (const name of names) {
      const doc = await ctx.db
        .query("weaponSystems")
        .withIndex("by_name", (q) => q.eq("name", name))
        .unique();
      if (doc) result.push(doc);
    }
    return result;
  },
});

// ============ Defense industries ============

export const purgeDefenseIndustries = internalMutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("defenseIndustries").take(500);
    for (const doc of docs) await ctx.db.delete(doc._id);
  },
});

export const insertDefenseIndustry = internalMutation({
  args: {
    slug: v.string(),
    name: v.string(),
    countryCode: v.string(),
    headquarters: v.string(),
    ownership: v.string(),
    revenueUsdBillions: v.optional(v.number()),
    keyProducts: v.array(v.string()),
    majorCustomers: v.array(v.string()),
    notes: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"defenseIndustries">> => {
    return await ctx.db.insert("defenseIndustries", args);
  },
});

export const fetchDefenseIndustriesByCountry = internalQuery({
  args: { countryCode: v.string() },
  handler: async (
    ctx,
    { countryCode },
  ): Promise<Doc<"defenseIndustries">[]> => {
    return await ctx.db
      .query("defenseIndustries")
      .withIndex("by_country", (q) => q.eq("countryCode", countryCode))
      .take(50);
  },
});

// ============ Intelligence agencies ============

export const purgeIntelAgencies = internalMutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("intelligenceAgencies").take(500);
    for (const doc of docs) await ctx.db.delete(doc._id);
  },
});

export const insertIntelAgency = internalMutation({
  args: {
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
  },
  handler: async (ctx, args): Promise<Id<"intelligenceAgencies">> => {
    return await ctx.db.insert("intelligenceAgencies", args);
  },
});

export const fetchIntelAgenciesByCountry = internalQuery({
  args: { countryCode: v.string() },
  handler: async (
    ctx,
    { countryCode },
  ): Promise<Doc<"intelligenceAgencies">[]> => {
    return await ctx.db
      .query("intelligenceAgencies")
      .withIndex("by_country", (q) => q.eq("countryCode", countryCode))
      .take(20);
  },
});

// ============ SOF units ============

export const purgeSofUnits = internalMutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("sofUnits").take(500);
    for (const doc of docs) await ctx.db.delete(doc._id);
  },
});

export const insertSofUnit = internalMutation({
  args: {
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
  },
  handler: async (ctx, args): Promise<Id<"sofUnits">> => {
    return await ctx.db.insert("sofUnits", args);
  },
});

export const fetchSofUnitsByCountry = internalQuery({
  args: { countryCode: v.string() },
  handler: async (ctx, { countryCode }): Promise<Doc<"sofUnits">[]> => {
    return await ctx.db
      .query("sofUnits")
      .withIndex("by_country", (q) => q.eq("countryCode", countryCode))
      .take(20);
  },
});

// ============ Historical incidents ============

export const purgeHistoricalIncidents = internalMutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("historicalIncidents").take(500);
    for (const doc of docs) await ctx.db.delete(doc._id);
  },
});

export const insertHistoricalIncident = internalMutation({
  args: {
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
  },
  handler: async (ctx, args): Promise<Id<"historicalIncidents">> => {
    return await ctx.db.insert("historicalIncidents", args);
  },
});

export const fetchHistoricalIncidents = internalQuery({
  args: { region: v.optional(v.string()) },
  handler: async (ctx, { region }): Promise<Doc<"historicalIncidents">[]> => {
    if (region) {
      return await ctx.db
        .query("historicalIncidents")
        .withIndex("by_region", (q) => q.eq("region", region))
        .take(50);
    }
    return await ctx.db.query("historicalIncidents").take(100);
  },
});

// ============ Sub-state actors ============

export const purgeSubStateActors = internalMutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("subStateActors").take(500);
    for (const doc of docs) await ctx.db.delete(doc._id);
  },
});

export const insertSubStateActor = internalMutation({
  args: {
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
  },
  handler: async (ctx, args): Promise<Id<"subStateActors">> => {
    return await ctx.db.insert("subStateActors", args);
  },
});

export const fetchAllSubStateActors = internalQuery({
  args: {},
  handler: async (ctx): Promise<Doc<"subStateActors">[]> => {
    return await ctx.db.query("subStateActors").take(200);
  },
});
