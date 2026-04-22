#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { searchDoffin, scoreTender, type ScoreProfile } from "./doffin.js";

const PROFILE: ScoreProfile = {
  keywords: [
    "app",
    "mobil",
    "flutter",
    "react native",
    "frontend",
    "backend",
    "fullstack",
    "utvikling",
    "programvare",
    "digital",
    "integrasjon",
    "ai",
    "llm",
  ],
  cpvCodes: ["72000000", "72200000", "72260000", "72262000", "48000000"],
  preferredLocations: ["NO043", "NO0A3"],
};

const server = new Server(
  { name: "doffin-mcp", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

const SearchSchema = z.object({
  query: z.string().optional(),
  cpv: z.array(z.string()).optional(),
  location: z.string().optional(),
  limit: z.number().optional(),
  minScore: z.number().optional(),
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_tenders",
      description:
        "Search Doffin for active tenders. Returns tenders scored against Asbjørn's consulting profile (Flutter/RN/Go/.NET, Rogaland-preferred). Higher score = better fit.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Free-text keywords" },
          cpv: {
            type: "array",
            items: { type: "string" },
            description: "CPV codes to filter by",
          },
          location: {
            type: "string",
            description: "NUTS code, e.g. NO0A for Rogaland",
          },
          limit: { type: "number", default: 25 },
          minScore: {
            type: "number",
            description: "Filter out tenders scoring below this",
            default: 0,
          },
        },
      },
    },
    {
      name: "recommended_tenders",
      description:
        "Shortcut: fetch high-relevance tenders using the built-in consulting profile (software dev CPV codes + Rogaland + mobile/AI keywords).",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;

  if (name === "search_tenders") {
    const input = SearchSchema.parse(args ?? {});
    const tenders = await searchDoffin(input);
    const scored = tenders
      .map((t) => ({ ...t, score: scoreTender(t, PROFILE) }))
      .filter((t) => t.score >= (input.minScore ?? 0))
      .sort((a, b) => b.score - a.score);
    return {
      content: [{ type: "text", text: JSON.stringify(scored, null, 2) }],
    };
  }

  if (name === "recommended_tenders") {
    const tenders = await searchDoffin({
      cpv: PROFILE.cpvCodes,
      location: PROFILE.preferredLocations[0],
      limit: 50,
    });
    const scored = tenders
      .map((t) => ({ ...t, score: scoreTender(t, PROFILE) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
    return {
      content: [{ type: "text", text: JSON.stringify(scored, null, 2) }],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("doffin-mcp ready");
