import {
  Tool,
  CallToolRequest,
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";
import { TogglClient } from "./toggl-client.js";

import { listWorkspacesTool } from "./tools/workspace-tools.js";
import {
  listProjectsTool,
  getProjectTool,
} from "./tools/project-tools.js";
import { listClientsTool } from "./tools/client-tools.js";
import { listUsersTool } from "./tools/user-tools.js";
import { listTasksTool } from "./tools/task-tools.js";
import {
  getSavedReportTool,
  searchTimeEntriesTool,
  getSummaryReportTool,
} from "./tools/report-tools.js";

export const list_of_tools: Tool[] = [
  listWorkspacesTool,
  listProjectsTool,
  getProjectTool,
  listClientsTool,
  listUsersTool,
  listTasksTool,
  getSavedReportTool,
  searchTimeEntriesTool,
  getSummaryReportTool,
];

export function tool_handler(
  toggl: TogglClient
): (request: CallToolRequest) => Promise<CallToolResult> {
  return async (request: CallToolRequest) => {
    console.error("Received CallToolRequest:", request.params.name);
    try {
      const args = (request.params.arguments ?? {}) as any;

      switch (request.params.name) {
        case "toggl_list_workspaces": {
          const result = await toggl.listWorkspaces();
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        }

        case "toggl_list_projects": {
          const { workspace_id, active, client_ids } = args;
          const result = await toggl.listProjects(workspace_id, {
            active,
            client_ids,
          });
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        }

        case "toggl_get_project": {
          const { workspace_id, project_id } = args;
          const result = await toggl.getProject(workspace_id, project_id);
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        }

        case "toggl_list_clients": {
          const { workspace_id } = args;
          const result = await toggl.listClients(workspace_id);
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        }

        case "toggl_list_users": {
          const { workspace_id } = args;
          const result = await toggl.listUsers(workspace_id);
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        }

        case "toggl_list_tasks": {
          const { workspace_id, project_id } = args;
          const result = await toggl.listTasks(workspace_id, project_id);
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        }

        case "toggl_get_saved_report": {
          const { report_token } = args;
          const result = await toggl.getSavedReport(report_token);
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        }

        case "toggl_search_time_entries": {
          const {
            workspace_id,
            start_date,
            end_date,
            project_ids,
            client_ids,
            user_ids,
            task_ids,
            description,
          } = args;

          const body: Record<string, any> = {
            start_date,
            end_date,
          };
          if (project_ids) body.project_ids = project_ids;
          if (client_ids) body.client_ids = client_ids;
          if (user_ids) body.user_ids = user_ids;
          if (task_ids) body.task_ids = task_ids;
          if (description) body.description = description;

          const result = await toggl.searchTimeEntries(
            workspace_id,
            body
          );
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        }

        case "toggl_get_summary_report": {
          const {
            workspace_id,
            start_date,
            end_date,
            grouping,
            sub_grouping,
            project_ids,
            client_ids,
            user_ids,
            task_ids,
          } = args;

          const body: Record<string, any> = {
            start_date,
            end_date,
          };
          if (grouping) body.grouping = grouping;
          if (sub_grouping) body.sub_grouping = sub_grouping;
          if (project_ids) body.project_ids = project_ids;
          if (client_ids) body.client_ids = client_ids;
          if (user_ids) body.user_ids = user_ids;
          if (task_ids) body.task_ids = task_ids;

          const result = await toggl.getSummaryReport(
            workspace_id,
            body
          );
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        }

        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    } catch (error) {
      console.error("Error executing tool:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error instanceof Error ? error.message : String(error),
            }),
          },
        ],
      };
    }
  };
}
