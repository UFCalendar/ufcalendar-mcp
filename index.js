#!/usr/bin/env node
// UFCalendar over stdio, for MCP clients that launch a local process instead of
// connecting to a URL. It relays tools/list and tools/call to the hosted server
// at https://api.ufcalendar.com/mcp with your key; nothing is computed locally.
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const VERSION = "1.6.0";
const API_KEY = process.env.UFCALENDAR_API_KEY;
const URL_ = process.env.UFCALENDAR_MCP_URL || "https://api.ufcalendar.com/mcp";
if (!API_KEY) {
  // Without a key only the discovery tools answer; say so once, then carry on.
  console.error("UFCALENDAR_API_KEY is not set: only get_plans, list_orgs and how_to_connect will work. Free key (1,000 requests/month, no card): https://www.ufcalendar.com/account/api");
}
const headers = API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {};

const client = new Client({ name: "ufcalendar-stdio", version: VERSION });
try {
  await client.connect(new StreamableHTTPClientTransport(new URL(URL_), { requestInit: { headers } }));
} catch (err) {
  console.error(`Could not connect to UFCalendar at ${URL_}: ${String(err?.message ?? err)}`);
  process.exit(1);
}

const server = new Server({ name: "ufcalendar", version: VERSION }, { capabilities: { tools: {} } });
server.setRequestHandler(ListToolsRequestSchema, async (req) => client.listTools(req.params));
server.setRequestHandler(CallToolRequestSchema, async (req) =>
  client.callTool({ name: req.params.name, arguments: req.params.arguments }),
);
await server.connect(new StdioServerTransport());
