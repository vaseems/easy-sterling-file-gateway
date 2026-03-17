import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./resources";

export interface ApiConfig {
  baseUrl?: string;
  username?: string;
  password?: string;
}

let apiConfig: ApiConfig = {
  baseUrl: BASE_URL,
  username: "",
  password: "",
};

export function setApiConfig(config: ApiConfig) {
  apiConfig = { ...apiConfig, ...config };
  if (typeof window !== "undefined") {
    localStorage.setItem("sterling_api_config", JSON.stringify(apiConfig));
  }
}

export function getApiConfig(): ApiConfig {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("sterling_api_config");
    if (stored) {
      try {
        apiConfig = JSON.parse(stored);
      } catch {}
    }
  }
  return apiConfig;
}

function createClient(): AxiosInstance {
  const config = getApiConfig();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (config.username && config.password) {
    const encoded = btoa(`${config.username}:${config.password}`);
    headers["Authorization"] = `Basic ${encoded}`;
  }

  return axios.create({
    baseURL: config.baseUrl || BASE_URL,
    headers,
    timeout: 30000,
  });
}

export async function apiGet<T = unknown>(
  path: string,
  params?: Record<string, string | number | boolean>,
): Promise<T> {
  const client = createClient();
  const res = await client.get<T>(path, { params });
  return res.data;
}

export async function apiPost<T = unknown>(
  path: string,
  data?: unknown,
): Promise<T> {
  const client = createClient();
  const res = await client.post<T>(path, data);
  return res.data;
}

export async function apiPut<T = unknown>(
  path: string,
  data?: unknown,
): Promise<T> {
  const client = createClient();
  const res = await client.put<T>(path, data);
  return res.data;
}

export async function apiDelete<T = unknown>(
  path: string,
  data?: unknown,
): Promise<T> {
  const client = createClient();
  const config: AxiosRequestConfig = data ? { data } : {};
  const res = await client.delete<T>(path, config);
  return res.data;
}

// Format a value for display in tables
export function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "✓" : "✗";
  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    if ("display" in obj) return String(obj.display);
    if ("title" in obj) return String(obj.title);
    if ("code" in obj) return String(obj.code);
    return JSON.stringify(value).slice(0, 60);
  }
  return String(value);
}

// Get the top-level keys of the first item to use as table columns
export function inferColumns(items: Record<string, unknown>[]): string[] {
  if (!items.length) return [];
  const allKeys = new Set<string>();
  items.slice(0, 5).forEach((item) => {
    Object.keys(item).forEach((k) => allKeys.add(k));
  });
  // Prioritize useful display fields
  const priority = [
    "id",
    "name",
    "profileName",
    "certName",
    "codeListName",
    "identityName",
    "vendorName",
    "userName",
    "groupName",
    "mailboxPath",
    "nodeName",
    "description",
  ];
  const sorted: string[] = [];
  for (const p of priority) {
    if (allKeys.has(p)) {
      sorted.push(p);
      allKeys.delete(p);
    }
  }
  // Add remaining non-object fields
  for (const k of allKeys) {
    sorted.push(k);
    if (sorted.length >= 8) break;
  }
  return sorted;
}
