import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const listUsersTool: Tool = {
  name: "toggl_list_users",
  description:
    "List all users (team members) in a workspace. Requires admin access. Returns user IDs, names, and email addresses.",
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
