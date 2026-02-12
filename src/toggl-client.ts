const TOGGL_API_BASE = "https://api.track.toggl.com/api/v9";
const TOGGL_REPORTS_BASE = "https://api.track.toggl.com/reports/api/v3";

export class TogglClient {
  private authHeader: string;

  constructor(apiToken: string) {
    this.authHeader =
      "Basic " + Buffer.from(`${apiToken}:api_token`).toString("base64");
  }

  private async request(
    url: string,
    options: RequestInit = {}
  ): Promise<any> {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: this.authHeader,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Toggl API error ${response.status}: ${body}`
      );
    }

    if (response.status === 204) return null;
    return response.json();
  }

  /** GET helper for the main Toggl API v9 */
  async get(path: string, params?: Record<string, string>): Promise<any> {
    let url = `${TOGGL_API_BASE}${path}`;
    if (params) {
      const qs = new URLSearchParams(params).toString();
      if (qs) url += `?${qs}`;
    }
    return this.request(url);
  }

  /** POST helper for the Reports API v3 */
  async postReport(path: string, body: Record<string, any>): Promise<any> {
    return this.request(`${TOGGL_REPORTS_BASE}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  // ── Workspaces ──────────────────────────────────────────────

  async listWorkspaces(): Promise<any[]> {
    return this.get("/me/workspaces");
  }

  // ── Projects (auto-paginated, 200 per page) ────────────────

  async listProjects(
    workspaceId: number,
    options?: { active?: boolean; client_ids?: number[] }
  ): Promise<any[]> {
    const allProjects: any[] = [];
    let page = 1;
    const perPage = 200;

    while (true) {
      const params: Record<string, string> = {
        per_page: String(perPage),
        page: String(page),
      };
      if (options?.active !== undefined) {
        params.active = String(options.active);
      }
      if (options?.client_ids?.length) {
        params.client_ids = options.client_ids.join(",");
      }

      const projects: any[] = await this.get(
        `/workspaces/${workspaceId}/projects`,
        params
      );

      allProjects.push(...projects);

      if (projects.length < perPage) break;
      page++;
    }

    return allProjects;
  }

  // ── Single Project ──────────────────────────────────────────

  async getProject(workspaceId: number, projectId: number): Promise<any> {
    return this.get(`/workspaces/${workspaceId}/projects/${projectId}`);
  }

  // ── Clients ─────────────────────────────────────────────────

  async listClients(workspaceId: number): Promise<any[]> {
    return this.get(`/workspaces/${workspaceId}/clients`);
  }

  // ── Users ───────────────────────────────────────────────────

  async listUsers(workspaceId: number): Promise<any[]> {
    return this.get(`/workspaces/${workspaceId}/users`);
  }

  // ── Tasks (project tasks) ──────────────────────────────────

  async listTasks(workspaceId: number, projectId: number): Promise<any[]> {
    return this.get(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks`
    );
  }

  // ── Reports: Search Time Entries (cursor-paginated) ────────

  async searchTimeEntries(
    workspaceId: number,
    body: Record<string, any>
  ): Promise<any[]> {
    const allEntries: any[] = [];
    let firstRowNumber = 1;
    const pageSize = 50;

    // Always enrich so we get user/project names
    const requestBody = {
      ...body,
      enrich_response: true,
      page_size: pageSize,
      first_row_number: firstRowNumber,
    };

    while (true) {
      requestBody.first_row_number = firstRowNumber;

      const result = await this.postReport(
        `/workspace/${workspaceId}/search/time_entries`,
        requestBody
      );

      if (result && Array.isArray(result)) {
        allEntries.push(...result);
        if (result.length < pageSize) break;
        firstRowNumber += result.length;
      } else {
        break;
      }
    }

    return allEntries;
  }

  // ── Reports: Saved Report ───────────────────────────────────

  async getSavedReport(reportToken: string): Promise<any> {
    return this.request(`${TOGGL_REPORTS_BASE}/shared/${reportToken}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  }

  // ── Reports: Summary Report ────────────────────────────────

  async getSummaryReport(
    workspaceId: number,
    body: Record<string, any>
  ): Promise<any> {
    return this.postReport(
      `/workspace/${workspaceId}/summary/time_entries`,
      body
    );
  }
}
