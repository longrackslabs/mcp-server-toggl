import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const listProjectsTool: Tool = {
  name: "toggl_list_projects",
  description:
    "List all projects in a workspace. Auto-paginates through all results. Can filter by active status and client IDs.",
  inputSchema: {
    type: "object",
    properties: {
      workspace_id: {
        type: "number",
        description: "The workspace ID",
      },
      active: {
        type: "boolean",
        description: "Filter by active status. Omit to get all projects.",
      },
      client_ids: {
        type: "array",
        items: { type: "number" },
        description: "Filter by client IDs",
      },
    },
    required: ["workspace_id"],
  },
};

export const getProjectTool: Tool = {
  name: "toggl_get_project",
  description: "Get details for a single project by its ID.",
  inputSchema: {
    type: "object",
    properties: {
      workspace_id: {
        type: "number",
        description: "The workspace ID",
      },
      project_id: {
        type: "number",
        description: "The project ID",
      },
    },
    required: ["workspace_id", "project_id"],
  },
};
