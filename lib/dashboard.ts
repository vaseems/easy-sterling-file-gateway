/**
 * Dashboard Designer — types, default config, SQL suggestions, and
 * localStorage persistence for the configurable dashboard page.
 */

import type { LucideIcon } from "lucide-react";
import {
  Handshake,
  Inbox,
  Users,
  GitBranch,
  BarChart3,
  BarChart2,
  TrendingUp,
  TrendingDown,
  PieChart,
  ShieldCheck,
  KeyRound,
  Route,
  ClipboardList,
  AlertCircle,
  Database,
  Settings2,
  Cable,
  Radio,
  Activity,
  Boxes,
} from "lucide-react";

// ─── Icon map for tile icons (key → LucideIcon component) ────────────────────
export const TILE_ICON_MAP: Record<string, LucideIcon> = {
  Handshake,
  Inbox,
  Users,
  GitBranch,
  BarChart3,
  BarChart2,
  TrendingUp,
  TrendingDown,
  PieChart,
  ShieldCheck,
  KeyRound,
  Route,
  ClipboardList,
  AlertCircle,
  Database,
  Settings2,
  Cable,
  Radio,
  Activity,
  Boxes,
};
export const TILE_ICON_KEYS = Object.keys(TILE_ICON_MAP);

export type TileType = "metric" | "bar" | "line" | "pie" | "table";
export type TileSize = "sm" | "md" | "lg"; // 1/3, 2/3, full width

export interface DashboardTile {
  id: string;
  type: TileType;
  title: string;
  subtitle?: string;
  /** Accent colour shown on the tile header/icon */
  color: string;
  /** Icon key — must be a key of TILE_ICON_MAP (e.g. "Handshake", "BarChart3") */
  icon: string;
  /** SQL SELECT query whose results populate this tile */
  query: string;
  /**
   * For bar / line / pie charts: the result column to use as the category
   * label (x-axis, pie segment name, etc.)
   */
  labelCol: string;
  /**
   * For bar / line / pie / metric tiles: the result column whose numeric
   * value is rendered.  For metric tiles, the first row's value is shown.
   */
  valueCol: string;
  /** Layout width:  sm=1 col, md=2 cols, lg=3 cols (full row) */
  size: TileSize;
}

export interface DashboardConfig {
  tiles: DashboardTile[];
  updatedAt: string;
}

// ─── Tile accent colour palette ───────────────────────────────────────────────
export const TILE_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#0ea5e9",
  "#84cc16",
  "#f97316",
];

// ─── Default empty dashboard ──────────────────────────────────────────────────
const EMPTY_CONFIG: DashboardConfig = {
  tiles: [],
  updatedAt: new Date().toISOString(),
};

// ─── localStorage persistence ─────────────────────────────────────────────────
const STORAGE_KEY = "sterling_dashboard_v1";

export function loadDashboard(): DashboardConfig {
  if (typeof window === "undefined") return EMPTY_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...EMPTY_CONFIG, ...JSON.parse(raw) };
  } catch {}
  return EMPTY_CONFIG;
}

export function saveDashboard(config: DashboardConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...config, updatedAt: new Date().toISOString() }),
    );
  } catch {}
}

export function newTileId(): string {
  return `tile_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

// ─── SQL view suggestions for IBM Sterling B2B Integrator ─────────────────────
// Note: table/column names follow the standard SFG schema.
// Adjust to your installed version (SFG 6.x uses similar names).
export interface SqlSuggestion {
  title: string;
  description: string;
  tileType: TileType;
  /** Icon key — must be a key of TILE_ICON_MAP */
  icon: string;
  color: string;
  query: string;
  labelCol: string;
  valueCol: string;
  viewDDL?: string; // optional CREATE VIEW statement
}

export const SQL_SUGGESTIONS: SqlSuggestion[] = [
  {
    title: "Total Trading Partners",
    description: "Count of all active trading partners in the system.",
    tileType: "metric",
    icon: "Handshake",
    color: "#10b981",
    query: `SELECT COUNT(*) AS value FROM COMM_TP WHERE DELETED_IND = 'N'`,
    labelCol: "",
    valueCol: "value",
    viewDDL: `CREATE VIEW V_ACTIVE_PARTNERS AS
  SELECT COUNT(*) AS PARTNER_COUNT FROM COMM_TP WHERE DELETED_IND = 'N';`,
  },
  {
    title: "Total Mailboxes",
    description: "Count of all non-deleted mailboxes.",
    tileType: "metric",
    icon: "Inbox",
    color: "#8b5cf6",
    query: `SELECT COUNT(*) AS value FROM MAILBOX WHERE DELETED_IND = 'N'`,
    labelCol: "",
    valueCol: "value",
  },
  {
    title: "Active User Accounts",
    description: "Users with an enabled / active state.",
    tileType: "metric",
    icon: "Users",
    color: "#06b6d4",
    query: `SELECT COUNT(*) AS value FROM LOCAL_ENTITY WHERE STATE = 'ENABLED'`,
    labelCol: "",
    valueCol: "value",
  },
  {
    title: "Failed Workflows (24 h)",
    description: "Interrupted workflow instances in the last 24 hours.",
    tileType: "metric",
    icon: "AlertCircle",
    color: "#ef4444",
    query: `SELECT COUNT(*) AS value FROM WORKFLOW_CONTEXT
WHERE BASIC_STATUS = 'INTERRUPTED'
  AND MODIFIED_DATE >= CURRENT_TIMESTAMP - 1 DAY`,
    labelCol: "",
    valueCol: "value",
  },
  {
    title: "Documents by Status",
    description:
      "Bar chart of business documents grouped by their status code.",
    tileType: "bar",
    icon: "BarChart3",
    color: "#6366f1",
    query: `SELECT STATUS_CODE AS label, COUNT(*) AS value
FROM BIZDOC
GROUP BY STATUS_CODE
ORDER BY value DESC`,
    labelCol: "label",
    valueCol: "value",
    viewDDL: `CREATE VIEW V_DOCS_BY_STATUS AS
  SELECT STATUS_CODE, COUNT(*) AS DOC_COUNT
  FROM BIZDOC
  GROUP BY STATUS_CODE;`,
  },
  {
    title: "Top Partners by Volume (7 d)",
    description:
      "Bar chart showing the top 10 trading partners by document count.",
    tileType: "bar",
    icon: "TrendingUp",
    color: "#0ea5e9",
    query: `SELECT SRC_IDENTITY_KEY AS label, COUNT(*) AS value
FROM BIZDOC
WHERE START_TIME >= CURRENT_TIMESTAMP - 7 DAYS
GROUP BY SRC_IDENTITY_KEY
ORDER BY value DESC
FETCH FIRST 10 ROWS ONLY`,
    labelCol: "label",
    valueCol: "value",
    viewDDL: `CREATE VIEW V_TOP_PARTNERS_7D AS
  SELECT SRC_IDENTITY_KEY, COUNT(*) AS DOC_COUNT
  FROM BIZDOC
  WHERE START_TIME >= CURRENT_TIMESTAMP - 7 DAYS
  GROUP BY SRC_IDENTITY_KEY
  ORDER BY DOC_COUNT DESC;`,
  },
  {
    title: "Daily Document Volume (30 d)",
    description:
      "Line chart showing daily document counts for the last 30 days.",
    tileType: "line",
    icon: "TrendingDown",
    color: "#f59e0b",
    query: `SELECT DATE(START_TIME) AS label, COUNT(*) AS value
FROM BIZDOC
WHERE START_TIME >= CURRENT_TIMESTAMP - 30 DAYS
GROUP BY DATE(START_TIME)
ORDER BY label`,
    labelCol: "label",
    valueCol: "value",
    viewDDL: `CREATE VIEW V_DAILY_DOC_VOLUME AS
  SELECT DATE(START_TIME) AS DOC_DATE, COUNT(*) AS DOC_COUNT
  FROM BIZDOC
  GROUP BY DATE(START_TIME)
  ORDER BY DOC_DATE;`,
  },
  {
    title: "Workflow State Distribution",
    description: "Pie chart of all workflow instances by their current state.",
    tileType: "pie",
    icon: "PieChart",
    color: "#ec4899",
    query: `SELECT BASIC_STATUS AS label, COUNT(*) AS value
FROM WORKFLOW_CONTEXT
GROUP BY BASIC_STATUS`,
    labelCol: "label",
    valueCol: "value",
    viewDDL: `CREATE VIEW V_WORKFLOW_STATES AS
  SELECT BASIC_STATUS, COUNT(*) AS WF_COUNT
  FROM WORKFLOW_CONTEXT
  GROUP BY BASIC_STATUS;`,
  },
  {
    title: "SSH Key Types",
    description: "Pie chart showing distribution of SSH key types.",
    tileType: "pie",
    icon: "KeyRound",
    color: "#84cc16",
    query: `SELECT KEY_TYPE AS label, COUNT(*) AS value
FROM SSH_KEY_ENTITY
GROUP BY KEY_TYPE`,
    labelCol: "label",
    valueCol: "value",
  },
  {
    title: "Recent Failed Documents",
    description: "Table of the 20 most recent interrupted/failed documents.",
    tileType: "table",
    icon: "ClipboardList",
    color: "#f97316",
    query: `SELECT DOC_ID, DOC_TYPE, STATUS_CODE, START_TIME, SRC_IDENTITY_KEY
FROM BIZDOC
WHERE STATUS_CODE IN ('INPROCESS','INTERRUPTED')
ORDER BY START_TIME DESC
FETCH FIRST 20 ROWS ONLY`,
    labelCol: "",
    valueCol: "",
    viewDDL: `CREATE VIEW V_FAILED_DOCS AS
  SELECT DOC_ID, DOC_TYPE, STATUS_CODE, START_TIME, SRC_IDENTITY_KEY
  FROM BIZDOC
  WHERE STATUS_CODE IN ('INPROCESS','INTERRUPTED')
  ORDER BY START_TIME DESC;`,
  },
  {
    title: "Routing Channel Status",
    description: "Bar chart of routing channels by status.",
    tileType: "bar",
    icon: "Route",
    color: "#0ea5e9",
    query: `SELECT STATUS AS label, COUNT(*) AS value
FROM ROUTING_CHANNEL
GROUP BY STATUS`,
    labelCol: "label",
    valueCol: "value",
  },
  {
    title: "Certificate Expiry (90 d)",
    description: "Table of certificates expiring within 90 days.",
    tileType: "table",
    icon: "ShieldCheck",
    color: "#ef4444",
    query: `SELECT CERT_NAME, SUBJECT_DN, NOT_AFTER
FROM DIGITAL_CERT
WHERE NOT_AFTER <= CURRENT_TIMESTAMP + 90 DAYS
  AND NOT_AFTER >= CURRENT_TIMESTAMP
ORDER BY NOT_AFTER`,
    labelCol: "",
    valueCol: "",
  },
];
