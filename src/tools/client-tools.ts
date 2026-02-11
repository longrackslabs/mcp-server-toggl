import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const listClientsTool: Tool = {
  name: "toggl_list_clients",
  description: "List all clients in a workspace.",
  inputSchema: {
    type: "object",
    properties: {
      workspace_id: {
        type: "number",
        description: "The workspace ID",
      },
    },
    required: ["workspace_id"],
  },
};
