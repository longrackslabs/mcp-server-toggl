import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const listTasksTool: Tool = {
  name: "toggl_list_tasks",
  description:
    "List all tasks within a specific project. Tasks are sub-categories of a project (e.g., PTO project might have tasks: Vacation, Sick, Holiday).",
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
