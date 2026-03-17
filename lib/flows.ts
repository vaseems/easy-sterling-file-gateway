/**
 * Flow Designer — types, default flows, and localStorage persistence.
 * A "flow" is an ordered set of API operations (nodes) connected by edges,
 * forming a reusable multi-step automation.
 */

// ---------- Types ----------

export type FlowOperation = "read" | "create" | "update" | "delete" | "action";

/** A single step (node) in a flow */
export interface FlowNode {
  id: string;
  resourceTag: string; // matches ResourceConfig.tag
  resourceLabel: string; // human-readable name
  operation: FlowOperation;
  operationLabel: string; // e.g. "Create Mailbox"
  color: string; // node accent colour
  /** Optional description shown under the title */
  description?: string;
  /** Canvas position */
  position: { x: number; y: number };
  /** Static + dynamic field values set in the wizard */
  fieldValues?: Record<string, string>; // fieldName -> literal or "{{stepId.path}}"
}

/** A directed edge between two nodes */
export interface FlowEdge {
  id: string;
  source: string; // FlowNode.id
  target: string; // FlowNode.id
}

/** A saved / named flow */
export interface Flow {
  id: string;
  name: string;
  description?: string;
  color: string; // used on the saved-flow card
  nodes: FlowNode[];
  edges: FlowEdge[];
  createdAt: string;
  updatedAt: string;
}

// ---------- Operation metadata ----------

export const OPERATION_COLORS: Record<FlowOperation, string> = {
  read: "#10b981",
  create: "#6366f1",
  update: "#f59e0b",
  delete: "#ef4444",
  action: "#8b5cf6",
};

export const OPERATION_LABELS: Record<FlowOperation, string> = {
  read: "GET",
  create: "POST",
  update: "PUT",
  delete: "DELETE",
  action: "ACTION",
};

export const OPERATION_BADGE_CLASS: Record<FlowOperation, string> = {
  read: "badge-get",
  create: "badge-post",
  update: "badge-put",
  delete: "badge-delete",
  action: "badge-action",
};

// ---------- Default SFTP flow template ----------

export const DEFAULT_SFTP_FLOW: Flow = {
  id: "default-sftp-setup",
  name: "SFTP Folder Setup",
  description:
    "Complete SFTP onboarding: Create a mailbox, a user group, external & internal users with permissions, and a routing channel.",
  color: "#6366f1",
  nodes: [
    {
      id: "n1",
      resourceTag: "Mailbox",
      resourceLabel: "Mailbox",
      operation: "create",
      operationLabel: "Create Mailbox",
      color: "#8b5cf6",
      description: "Creates the SFTP mailbox folder.",
      position: { x: 60, y: 180 },
    },
    {
      id: "n2",
      resourceTag: "UserGroup",
      resourceLabel: "User Group",
      operation: "create",
      operationLabel: "Create User Group",
      color: "#14b8a6",
      description: "Creates the group that owns the mailbox.",
      position: { x: 320, y: 180 },
    },
    {
      id: "n3",
      resourceTag: "ExternalUser",
      resourceLabel: "External User",
      operation: "create",
      operationLabel: "Create External User",
      color: "#06b6d4",
      description: "Creates the external (SFTP) user account.",
      position: { x: 580, y: 80 },
    },
    {
      id: "n4",
      resourceTag: "Permission",
      resourceLabel: "Permission",
      operation: "create",
      operationLabel: "Assign External User Permissions",
      color: "#f59e0b",
      description: "Grants the external user access to the mailbox.",
      position: { x: 840, y: 80 },
    },
    {
      id: "n5",
      resourceTag: "UserAccount",
      resourceLabel: "Internal User",
      operation: "create",
      operationLabel: "Create Internal User",
      color: "#10b981",
      description: "Creates the internal Sterling B2B user account.",
      position: { x: 580, y: 280 },
    },
    {
      id: "n6",
      resourceTag: "Permission",
      resourceLabel: "Permission",
      operation: "create",
      operationLabel: "Assign Internal User Permissions",
      color: "#f59e0b",
      description: "Grants the internal user access to the mailbox.",
      position: { x: 840, y: 280 },
    },
    {
      id: "n7",
      resourceTag: "RoutingChannel",
      resourceLabel: "Routing Channel",
      operation: "create",
      operationLabel: "Create Routing Channel",
      color: "#0ea5e9",
      description: "Sets up the routing channel for file delivery.",
      position: { x: 1100, y: 180 },
    },
  ],
  edges: [
    { id: "e1-2", source: "n1", target: "n2" },
    { id: "e2-3", source: "n2", target: "n3" },
    { id: "e2-5", source: "n2", target: "n5" },
    { id: "e3-4", source: "n3", target: "n4" },
    { id: "e5-6", source: "n5", target: "n6" },
    { id: "e4-7", source: "n4", target: "n7" },
    { id: "e6-7", source: "n6", target: "n7" },
  ],
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
};

// ---------- localStorage persistence ----------

const STORAGE_KEY = "sterling_flows";

export function loadFlows(): Flow[] {
  if (typeof window === "undefined") return [DEFAULT_SFTP_FLOW];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved: Flow[] = raw ? JSON.parse(raw) : [];
    // Always include the default (immutable) flow first
    const hasDefault = saved.some((f) => f.id === DEFAULT_SFTP_FLOW.id);
    return hasDefault ? saved : [DEFAULT_SFTP_FLOW, ...saved];
  } catch {
    return [DEFAULT_SFTP_FLOW];
  }
}

export function saveFlows(flows: Flow[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flows));
  } catch {
    /* ignore quota errors */
  }
}

export function saveFlow(flow: Flow): Flow[] {
  const flows = loadFlows();
  const idx = flows.findIndex((f) => f.id === flow.id);
  const updated = { ...flow, updatedAt: new Date().toISOString() };
  if (idx >= 0) {
    flows[idx] = updated;
  } else {
    flows.push(updated);
  }
  saveFlows(flows);
  return flows;
}

export function deleteFlow(id: string): Flow[] {
  const flows = loadFlows().filter((f) => f.id !== id);
  saveFlows(flows);
  return flows;
}

// ---------- Topological sort (for wizard step order) ----------

export function topologicalSort(
  nodes: FlowNode[],
  edges: FlowEdge[],
): FlowNode[] {
  const inDegree: Record<string, number> = {};
  const adj: Record<string, string[]> = {};
  const nodeMap: Record<string, FlowNode> = {};

  for (const n of nodes) {
    inDegree[n.id] = 0;
    adj[n.id] = [];
    nodeMap[n.id] = n;
  }
  for (const e of edges) {
    adj[e.source].push(e.target);
    inDegree[e.target] = (inDegree[e.target] || 0) + 1;
  }

  const queue: string[] = Object.keys(inDegree).filter(
    (id) => inDegree[id] === 0,
  );
  const sorted: FlowNode[] = [];

  while (queue.length > 0) {
    const id = queue.shift()!;
    sorted.push(nodeMap[id]);
    for (const next of adj[id]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return sorted;
}

// ---------- Variable substitution ----------

/** Resolves "{{stepId.field.nested}}" references using stepResults context */
export function resolveVariables(
  template: string,
  stepResults: Record<string, unknown>,
): string {
  return template.replace(/\{\{(\w+)\.([^}]+)\}\}/g, (match, stepId, path) => {
    const result = stepResults[stepId];
    if (result == null) return match;
    const value = getNestedValue(result as Record<string, unknown>, path);
    return value != null ? String(value) : match;
  });
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/** Collect all "{{stepId.field}}" variable references in a string */
export function extractVariableRefs(
  template: string,
): Array<{ stepId: string; field: string }> {
  const refs: Array<{ stepId: string; field: string }> = [];
  const regex = /\{\{(\w+)\.([^}]+)\}\}/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(template)) !== null) {
    refs.push({ stepId: m[1], field: m[2] });
  }
  return refs;
}

/** Flatten an API response object into dot-notation keys e.g. "result.id" */
export function flattenObject(
  obj: unknown,
  prefix = "",
  maxDepth = 3,
): Array<{ key: string; value: string }> {
  if (maxDepth <= 0 || obj == null || typeof obj !== "object") return [];
  const result: Array<{ key: string; value: string }> = [];
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v != null && typeof v === "object" && !Array.isArray(v)) {
      result.push(...flattenObject(v, fullKey, maxDepth - 1));
    } else if (!Array.isArray(v)) {
      result.push({ key: fullKey, value: String(v ?? "") });
    }
  }
  return result;
}

// ---------- ID factory ----------
export const newId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
