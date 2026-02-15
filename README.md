# mcp-server-toggl

[![Listed on mcpservers.org](https://img.shields.io/badge/Listed%20on-mcpservers.org-blue)](https://mcpservers.org/servers/longrackslabs/mcp-server-toggl)

An MCP server for [Toggl Track](https://toggl.com/track/) that provides team-wide time tracking, reporting, and workspace management through the Model Context Protocol.

Built on Toggl's v9 API and Reports API v3, this server lets AI assistants query time entries, generate summary reports, and browse workspace data across your entire team — not just the authenticated user.

## Setup

### 1. Get a Toggl API Token

1. Log in to [Toggl Track](https://track.toggl.com/)
2. Go to your [Profile Settings](https://track.toggl.com/profile)
3. Scroll to the bottom and copy your API Token

### 2. Configure Claude Desktop

Add this to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "toggl": {
      "command": "npx",
      "args": ["-y", "mcp-server-toggl"],
      "env": {
        "TOGGL_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

### 3. Build from Source (optional)

```bash
git clone https://github.com/longrackslabs/mcp-server-toggl.git
cd mcp-server-toggl
npm install
npm run build
```

Then point your MCP client at the built server:

```json
{
  "mcpServers": {
    "toggl": {
      "command": "node",
      "args": ["/path/to/mcp-server-toggl/dist/index.js"],
      "env": {
        "TOGGL_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

## Tools

### Workspace & Organization

| Tool | Description |
|------|-------------|
| `toggl_list_workspaces` | List all accessible workspaces with IDs and premium status |
| `toggl_list_projects` | List projects in a workspace (auto-paginated, filterable by active status and client) |
| `toggl_get_project` | Get details for a single project |
| `toggl_list_clients` | List all clients in a workspace |
| `toggl_list_users` | List team members with IDs, names, and emails (requires admin access) |
| `toggl_list_tasks` | List tasks within a project (sub-categories like Vacation, Sick, Holiday) |

### Reporting

| Tool | Description |
|------|-------------|
| `toggl_search_time_entries` | Search time entries across all team members. Supports filtering by project, client, user, task, and description. Auto-paginates and enriches results with names. |
| `toggl_get_summary_report` | Get aggregated time totals grouped by users, projects, or clients. Supports sub-grouping for breakdowns like "each user's time by project." |

## Example Prompts

- "How many hours did each team member log last week?"
- "Show me all time entries for the Marketing project this month"
- "What's the PTO breakdown by person for Q1?"
- "List all active projects in workspace 12345"
- "How much time was logged against Client X in January?"

## Requirements

- Node.js 18+
- A Toggl Track account with an API token
- Admin access for `toggl_list_users` (other tools work with any role)

## License

MIT
