#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { VERSION } from "./version.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tool_handler, list_of_tools } from "./tool-handler.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { TogglClient } from "./toggl-client.js";

async function main() {
  const apiToken = process.env.TOGGL_API_TOKEN;

  if (!apiToken) {
    console.error("Please set TOGGL_API_TOKEN environment variable");
    process.exit(1);
  }

  console.error("Starting Toggl Track MCP Server...");
  const server = new Server(
    {
      name: "Toggl Track MCP Server",
      version: VERSION,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  const toggl = new TogglClient(apiToken);

  server.setRequestHandler(CallToolRequestSchema, tool_handler(toggl));

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.error("Received ListToolsRequest");
    return {
      tools: list_of_tools,
    };
  });

  const transport = new StdioServerTransport();
  console.error("Connecting server to transport...");
  await server.connect(transport);

  console.error("Toggl Track MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
