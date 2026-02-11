import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const searchTimeEntriesTool: Tool = {
  name: "toggl_search_time_entries",
  description:
    "Search time entries across ALL users in a workspace using the Reports API v3. This is the core reporting tool — returns detailed time entries for the whole team, not just the authenticated user. Auto-paginates and enriches results with user/project names.",
  inputSchema: {
    type: "object",
    properties: {
      workspace_id: {
        type: "number",
        description: "The workspace ID",
      },
      start_date: {
        type: "string",
        description: "Start date in YYYY-MM-DD format (inclusive)",
      },
      end_date: {
        type: "string",
        description: "End date in YYYY-MM-DD format (inclusive)",
      },
      project_ids: {
        type: "array",
        items: { type: "number" },
        description: "Filter by project IDs",
      },
      client_ids: {
        type: "array",
        items: { type: "number" },
        description: "Filter by client IDs",
      },
      user_ids: {
        type: "array",
        items: { type: "number" },
        description: "Filter by user IDs",
      },
      task_ids: {
        type: "array",
        items: { type: "number" },
        description: "Filter by task IDs",
      },
      description: {
        type: "string",
        description: "Filter by description (partial match)",
      },
    },
    required: ["workspace_id", "start_date", "end_date"],
  },
};

export const getSummaryReportTool: Tool = {
  name: "toggl_get_summary_report",
  description:
    "Get aggregated summary report of time entries across ALL users in a workspace. Returns totals grouped by the specified dimension (users, projects, or clients). Great for answering questions like 'How much PTO did each person log last week?'",
  inputSchema: {
    type: "object",
    properties: {
      workspace_id: {
        type: "number",
        description: "The workspace ID",
      },
      start_date: {
        type: "string",
        description: "Start date in YYYY-MM-DD format (inclusive)",
      },
      end_date: {
        type: "string",
        description: "End date in YYYY-MM-DD format (inclusive)",
      },
      grouping: {
        type: "string",
        enum: ["users", "projects", "clients"],
        description:
          "How to group the results. 'users' groups by team member, 'projects' by project, 'clients' by client.",
      },
      sub_grouping: {
        type: "string",
        enum: ["users", "projects", "clients", "time_entries"],
        description:
          "Secondary grouping within each group. e.g., grouping='users' + sub_grouping='projects' shows each user's time broken down by project.",
      },
      project_ids: {
        type: "array",
        items: { type: "number" },
        description: "Filter by project IDs",
      },
      client_ids: {
        type: "array",
        items: { type: "number" },
        description: "Filter by client IDs",
      },
      user_ids: {
        type: "array",
        items: { type: "number" },
        description: "Filter by user IDs",
      },
      task_ids: {
        type: "array",
        items: { type: "number" },
        description: "Filter by task IDs",
      },
    },
    required: ["workspace_id", "start_date", "end_date"],
  },
};
