import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const listWorkspacesTool: Tool = {
  name: "toggl_list_workspaces",
  description:
    "List all Toggl workspaces accessible to the authenticated user. Returns workspace IDs, names, and premium status.",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
};
