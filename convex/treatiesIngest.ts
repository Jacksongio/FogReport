"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBED_BATCH_SIZE = 50;

type ParsedTreaty = {
  section: string;
  treatyType: string;
  title: string;
  adoptionDate?: string;
  entryIntoForce?: string;
  parties?: string;
  description?: string;
  fullText: string;
};

function classifyTreatyType(section: string): string {
  const s = section.toLowerCase();
  if (s.includes("historical")) return "historical";
  if (s.includes("united nations") || s.includes(" un ")) return "un";
  if (s.includes("us treaties") || s.includes("bilateral")) return "bilateral";
  if (s.includes("environmental")) return "environmental";
  if (s.includes("trade")) return "trade";
  return "multilateral";
}

function parseTreatiesText(text: string): ParsedTreaty[] {
  const lines = text.split("\n");
  const treaties: ParsedTreaty[] = [];
  let currentSection = "Unknown Section";

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("Section ")) {
      currentSection = line;
      continue;
    }
    if (line.startsWith("Chapter ")) continue;
    if (line.startsWith("Bilateral:") || line.startsWith("Multilateral:")) continue;

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const title = line.slice(0, colonIdx).trim();
    const description = line.slice(colonIdx + 1).trim();
    if (!title || !description) continue;

    const yearMatch =
      line.match(/\((\d{4}|c\. \d{4}|\d{4} BCE)\)/) ?? line.match(/(\d{4}):/);
    const partiesMatch = line.match(/\(([^)]+)\)\s*$/);

    treaties.push({
      section: currentSection,
      treatyType: classifyTreatyType(currentSection),
      title,
      adoptionDate: yearMatch?.[1],
      parties: partiesMatch?.[1],
      description,
      fullText: line,
    });
  }

  return treaties;
}

function chunkTreatyContent(treaty: ParsedTreaty): string[] {
  const target = 800;
  const text = treaty.fullText;
  if (text.length <= target) return [text];

  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if ((current + " " + sentence).length > target && current) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

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

export const ingestFromText = internalAction({
  args: {
    rawText: v.string(),
    purgeFirst: v.optional(v.boolean()),
  },
  handler: async (ctx, { rawText, purgeFirst }) => {
    if (purgeFirst) {
      await ctx.runMutation(internal.treaties.purgeAll, {});
    }

    const parsed = parseTreatiesText(rawText);
    console.log(`Parsed ${parsed.length} treaties from input text`);

    let treatyCount = 0;
    let chunkCount = 0;

    type PendingChunk = {
      treatyId: Id<"treaties">;
      section: string;
      treatyType: string;
      title: string;
      parties?: string;
      chunkIndex: number;
      totalChunks: number;
      content: string;
    };

    const pending: PendingChunk[] = [];

    for (const treaty of parsed) {
      const treatyId: Id<"treaties"> = await ctx.runMutation(
        internal.treaties.insertTreaty,
        {
          section: treaty.section,
          treatyType: treaty.treatyType,
          title: treaty.title,
          adoptionDate: treaty.adoptionDate,
          entryIntoForce: treaty.entryIntoForce,
          parties: treaty.parties,
          description: treaty.description,
          fullText: treaty.fullText,
        },
      );
      treatyCount += 1;

      const chunks = chunkTreatyContent(treaty);
      chunks.forEach((content, idx) => {
        pending.push({
          treatyId,
          section: treaty.section,
          treatyType: treaty.treatyType,
          title: treaty.title,
          parties: treaty.parties,
          chunkIndex: idx,
          totalChunks: chunks.length,
          content,
        });
      });
    }

    for (let i = 0; i < pending.length; i += EMBED_BATCH_SIZE) {
      const batch = pending.slice(i, i + EMBED_BATCH_SIZE);
      const embeddings = await embedBatch(batch.map((p) => p.content));
      for (let j = 0; j < batch.length; j += 1) {
        const p = batch[j];
        await ctx.runMutation(internal.treaties.insertChunk, {
          treatyId: p.treatyId,
          section: p.section,
          treatyType: p.treatyType,
          title: p.title,
          parties: p.parties,
          chunkIndex: p.chunkIndex,
          totalChunks: p.totalChunks,
          content: p.content,
          embedding: embeddings[j],
        });
        chunkCount += 1;
      }
      console.log(
        `Embedded ${Math.min(i + EMBED_BATCH_SIZE, pending.length)}/${pending.length} chunks`,
      );
    }

    return { treatyCount, chunkCount };
  },
});
