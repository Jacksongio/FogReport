"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { COUNTRIES } from "./seedData/countries";
import { TREATIES } from "./seedData/treaties";
import { SIGNATORIES } from "./seedData/signatories";
import { BASES } from "./seedData/bases";
import { CHOKEPOINTS } from "./seedData/chokepoints";
import { WEAPONS } from "./seedData/weapons";
import { DEFENSE_INDUSTRIES } from "./seedData/defenseIndustries";
import { INTEL_AGENCIES } from "./seedData/intelAgencies";
import { SOF_UNITS } from "./seedData/sofUnits";
import { HISTORICAL_INCIDENTS } from "./seedData/historicalIncidents";
import { SUB_STATE_ACTORS } from "./seedData/subStateActors";

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBED_BATCH_SIZE = 50;

async function embedBatch(inputs: string[]): Promise<number[][]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured in Convex");

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: inputs }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI embedding error ${response.status}: ${text}`);
  }

  const json = await response.json();
  return json.data.map((d: { embedding: number[] }) => d.embedding);
}

export const seedCountries = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (ctx, { purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(internal.seedMutations.purgeCountryProfiles, {});
    }

    let inserted = 0;
    for (const profile of COUNTRIES) {
      await ctx.runMutation(internal.seedMutations.insertCountryProfile, profile);
      inserted += 1;
    }
    console.log(`Seeded ${inserted} country profiles`);
    return { inserted };
  },
});

export const seedTreaties = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (ctx, { purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(internal.seedMutations.purgeTreatyData, {});
    }

    type PendingArticle = {
      treatyId: Id<"treaties">;
      treatySlug: string;
      treatyTitle: string;
      treatyShortName?: string;
      category: string;
      articleNumber: string;
      articleTitle?: string;
      content: string;
      embedText: string;
    };

    const pending: PendingArticle[] = [];

    let treatyCount = 0;
    for (const treaty of TREATIES) {
      const treatyId: Id<"treaties"> = await ctx.runMutation(
        internal.seedMutations.insertTreaty,
        {
          slug: treaty.slug,
          title: treaty.title,
          shortName: treaty.shortName,
          category: treaty.category,
          adoptionDate: treaty.adoptionDate,
          entryIntoForce: treaty.entryIntoForce,
          depositary: treaty.depositary,
          summary: treaty.summary,
          fullTextUrl: treaty.fullTextUrl,
        },
      );
      treatyCount += 1;

      for (const article of treaty.articles) {
        const embedText = [
          treaty.shortName ?? treaty.title,
          `Article ${article.number}`,
          article.title ?? "",
          article.content,
        ]
          .filter(Boolean)
          .join(". ");

        pending.push({
          treatyId,
          treatySlug: treaty.slug,
          treatyTitle: treaty.title,
          treatyShortName: treaty.shortName,
          category: treaty.category,
          articleNumber: article.number,
          articleTitle: article.title,
          content: article.content,
          embedText,
        });
      }
    }

    let articleCount = 0;
    for (let i = 0; i < pending.length; i += EMBED_BATCH_SIZE) {
      const batch = pending.slice(i, i + EMBED_BATCH_SIZE);
      const embeddings = await embedBatch(batch.map((p) => p.embedText));
      for (let j = 0; j < batch.length; j += 1) {
        const p = batch[j];
        await ctx.runMutation(internal.seedMutations.insertTreatyArticle, {
          treatyId: p.treatyId,
          treatySlug: p.treatySlug,
          treatyTitle: p.treatyTitle,
          treatyShortName: p.treatyShortName,
          category: p.category,
          articleNumber: p.articleNumber,
          articleTitle: p.articleTitle,
          content: p.content,
          embedding: embeddings[j],
        });
        articleCount += 1;
      }
      console.log(
        `Embedded ${Math.min(i + EMBED_BATCH_SIZE, pending.length)}/${pending.length} articles`,
      );
    }

    let sigCount = 0;
    for (const sig of SIGNATORIES) {
      const treatyId = await ctx.runQuery(
        internal.seedMutations.lookupTreatyIdBySlug,
        { slug: sig.treatySlug },
      );
      if (treatyId === null) {
        console.warn(
          `Treaty slug not found while seeding signatories: ${sig.treatySlug}`,
        );
        continue;
      }
      await ctx.runMutation(internal.seedMutations.insertTreatySignatory, {
        treatyId,
        treatySlug: sig.treatySlug,
        countryCode: sig.countryCode,
        status: sig.status,
        date: sig.date,
      });
      sigCount += 1;
    }

    return { treatyCount, articleCount, sigCount };
  },
});

export const seedBases = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (ctx, { purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(internal.seedMutations.purgeMilitaryBases, {});
    }
    let inserted = 0;
    for (const base of BASES) {
      await ctx.runMutation(internal.seedMutations.insertMilitaryBase, base);
      inserted += 1;
    }
    console.log(`Seeded ${inserted} military bases`);
    return { inserted };
  },
});

export const seedChokepoints = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (ctx, { purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(internal.seedMutations.purgeChokepoints, {});
    }
    let inserted = 0;
    for (const cp of CHOKEPOINTS) {
      await ctx.runMutation(internal.seedMutations.insertChokepoint, cp);
      inserted += 1;
    }
    console.log(`Seeded ${inserted} strategic chokepoints`);
    return { inserted };
  },
});

export const seedWeapons = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (ctx, { purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(internal.seedMutations.purgeWeaponSystems, {});
    }
    let inserted = 0;
    for (const w of WEAPONS) {
      await ctx.runMutation(internal.seedMutations.insertWeaponSystem, w);
      inserted += 1;
    }
    console.log(`Seeded ${inserted} weapon systems`);
    return { inserted };
  },
});

export const seedDefenseIndustries = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (ctx, { purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(internal.seedMutations.purgeDefenseIndustries, {});
    }
    let inserted = 0;
    for (const di of DEFENSE_INDUSTRIES) {
      await ctx.runMutation(internal.seedMutations.insertDefenseIndustry, di);
      inserted += 1;
    }
    console.log(`Seeded ${inserted} defense industries`);
    return { inserted };
  },
});

export const seedIntelAgencies = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (ctx, { purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(internal.seedMutations.purgeIntelAgencies, {});
    }
    let inserted = 0;
    for (const a of INTEL_AGENCIES) {
      await ctx.runMutation(internal.seedMutations.insertIntelAgency, a);
      inserted += 1;
    }
    console.log(`Seeded ${inserted} intelligence agencies`);
    return { inserted };
  },
});

export const seedSofUnits = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (ctx, { purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(internal.seedMutations.purgeSofUnits, {});
    }
    let inserted = 0;
    for (const u of SOF_UNITS) {
      await ctx.runMutation(internal.seedMutations.insertSofUnit, u);
      inserted += 1;
    }
    console.log(`Seeded ${inserted} SOF units`);
    return { inserted };
  },
});

export const seedHistoricalIncidents = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (ctx, { purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(
        internal.seedMutations.purgeHistoricalIncidents,
        {},
      );
    }
    let inserted = 0;
    for (const h of HISTORICAL_INCIDENTS) {
      await ctx.runMutation(
        internal.seedMutations.insertHistoricalIncident,
        h,
      );
      inserted += 1;
    }
    console.log(`Seeded ${inserted} historical incidents`);
    return { inserted };
  },
});

export const seedSubStateActors = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (ctx, { purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(internal.seedMutations.purgeSubStateActors, {});
    }
    let inserted = 0;
    for (const actor of SUB_STATE_ACTORS) {
      await ctx.runMutation(internal.seedMutations.insertSubStateActor, actor);
      inserted += 1;
    }
    console.log(`Seeded ${inserted} sub-state actors`);
    return { inserted };
  },
});

export const seedAll = internalAction({
  args: { purgeFirst: v.optional(v.boolean()) },
  handler: async (
    ctx,
    { purgeFirst },
  ): Promise<{
    countries: { inserted: number };
    treaties: { treatyCount: number; articleCount: number; sigCount: number };
    bases: { inserted: number };
    chokepoints: { inserted: number };
    weapons: { inserted: number };
    defenseIndustries: { inserted: number };
    intelAgencies: { inserted: number };
    sofUnits: { inserted: number };
    historicalIncidents: { inserted: number };
    subStateActors: { inserted: number };
  }> => {
    const countries: { inserted: number } = await ctx.runAction(
      internal.seedActions.seedCountries,
      { purgeFirst },
    );
    const treaties: {
      treatyCount: number;
      articleCount: number;
      sigCount: number;
    } = await ctx.runAction(internal.seedActions.seedTreaties, { purgeFirst });
    const bases: { inserted: number } = await ctx.runAction(
      internal.seedActions.seedBases,
      { purgeFirst },
    );
    const chokepoints: { inserted: number } = await ctx.runAction(
      internal.seedActions.seedChokepoints,
      { purgeFirst },
    );
    const weapons: { inserted: number } = await ctx.runAction(
      internal.seedActions.seedWeapons,
      { purgeFirst },
    );
    const defenseIndustries: { inserted: number } = await ctx.runAction(
      internal.seedActions.seedDefenseIndustries,
      { purgeFirst },
    );
    const intelAgencies: { inserted: number } = await ctx.runAction(
      internal.seedActions.seedIntelAgencies,
      { purgeFirst },
    );
    const sofUnits: { inserted: number } = await ctx.runAction(
      internal.seedActions.seedSofUnits,
      { purgeFirst },
    );
    const historicalIncidents: { inserted: number } = await ctx.runAction(
      internal.seedActions.seedHistoricalIncidents,
      { purgeFirst },
    );
    const subStateActors: { inserted: number } = await ctx.runAction(
      internal.seedActions.seedSubStateActors,
      { purgeFirst },
    );
    return {
      countries,
      treaties,
      bases,
      chokepoints,
      weapons,
      defenseIndustries,
      intelAgencies,
      sofUnits,
      historicalIncidents,
      subStateActors,
    };
  },
});
