"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { RESOURCES_BY_TAG, RESOURCE_CATEGORIES } from "@/lib/resources";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import { DataTable } from "@/components/DataTable";
import { ResourceModal } from "@/components/ResourceModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LiquidBackground } from "@/components/LiquidBackground";
import { useToast } from "@/components/Toast";
import { useSettings } from "@/lib/settings";
import {
  Plus,
  RefreshCw,
  Search,
  X,
  ChevronDown,
  Filter,
  AlertCircle,
  Lock,
} from "lucide-react";

// ─── Module-level cache (client-only, lives for the browser session) ──────────
// Keyed by resource tag so navigating back shows instant cached data.
const _resourceDataCache = new Map<string, Record<string, unknown>[]>();
// Tracks which resources have been auto-fetched so the effect only fires once
// per resource per session (prevents React Strict-Mode double-invocation and
// repeated calls on re-navigation).
const _autoFetchedSet = new Set<string>();

const resourceDataCache =
  typeof window !== "undefined" ? _resourceDataCache : null;
const autoFetchedSet = typeof window !== "undefined" ? _autoFetchedSet : null;

export default function ResourcePage() {
  const params = useParams();
  const resourceTag = params?.resource as string;
  const resource = RESOURCES_BY_TAG[resourceTag];

  const { toast } = useToast();
  const { settings, isCategoryEnabled } = useSettings();

  // Initialise from cache so re-navigating to this page is instant
  const [data, setData] = useState<Record<string, unknown>[]>(
    () => resourceDataCache?.get(resourceTag) ?? [],
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = settings.itemsPerPage;

  // Search / filter state
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  // Modal state
  const [modal, setModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    data?: Record<string, unknown>;
  }>({ open: false, mode: "create" });

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Ref to cancel stale in-flight responses after unmount / resource change
  const cancelRef = useRef<{ cancelled: boolean }>({ cancelled: false });

  const fetchData = useCallback(async () => {
    if (!resource) return;

    // Mark any previous request as stale and start a fresh scope
    cancelRef.current.cancelled = true;
    const scope = { cancelled: false };
    cancelRef.current = scope;

    setLoading(true);
    try {
      const qParams: Record<string, string | number> = {};
      Object.entries(searchValues).forEach(([k, v]) => {
        if (v.trim()) qParams[k] = v.trim();
      });
      const result = await apiGet<Record<string, unknown>[]>(
        `${resource.basePath}/`,
        qParams,
      );
      if (scope.cancelled) return;
      const resultArr = Array.isArray(result) ? result : [result];
      setData(resultArr);
      // Persist unfiltered results so re-navigation is instant
      const hasFilters = Object.values(searchValues).some((v) => v.trim());
      if (!hasFilters) {
        resourceDataCache?.set(resource.tag, resultArr);
        autoFetchedSet?.add(resource.tag);
      }
    } catch (err: unknown) {
      if (scope.cancelled) return;
      // On error allow another auto-fetch next time the user navigates here
      autoFetchedSet?.delete(resource.tag);
      const error = err as {
        response?: {
          status: number;
          data?: { errorCode?: string; errorDescription?: string };
        };
      };
      if (error?.response?.status === 401) {
        toast(
          "Unauthorized – please configure API credentials in Settings",
          "error",
        );
      } else if (error?.response?.status === 403) {
        toast("Forbidden – you do not have access to this resource", "error");
      } else {
        const msg =
          error?.response?.data?.errorDescription || "Failed to load data";
        toast(msg, "error");
      }
      setData([]);
    } finally {
      if (!scope.cancelled) setLoading(false);
    }
  }, [resource, searchValues, toast]);

  // Auto-fetch: only the FIRST time this resource is visited per session.
  // Subsequent visits show the cached data immediately without a round-trip.
  useEffect(() => {
    if (resource && !autoFetchedSet?.has(resource.tag)) {
      // Add to set immediately so React Strict-Mode's second mount skips this
      autoFetchedSet?.add(resource.tag);
      setData([]);
      setPage(1);
      fetchData();
    }
    return () => {
      // Cancel any in-flight request when the resource changes or unmounts
      cancelRef.current.cancelled = true;
    };
  }, [resource?.tag]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!resource) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          gap: 12,
          color: "#64748b",
        }}
      >
        <AlertCircle size={40} />
        <div style={{ fontSize: 16, fontWeight: 600 }}>Resource not found</div>
        <div style={{ fontSize: 13 }}>
          &ldquo;{resourceTag}&rdquo; does not match any known resource.
        </div>
      </div>
    );
  }

  const categoryEnabled = isCategoryEnabled(resource.category);
  const cat = RESOURCE_CATEGORIES[resource.category];

  if (!categoryEnabled) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          gap: 16,
          color: "#64748b",
        }}
      >
        <LiquidBackground
          color1={resource.color}
          color2="#1e293b"
          color3="#0f172a"
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Lock size={24} color="#475569" />
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#94a3b8",
              marginBottom: 8,
            }}
          >
            {cat?.label} is disabled
          </div>
          <div style={{ fontSize: 13, marginBottom: 20 }}>
            Enable this category in Settings to access{" "}
            <strong style={{ color: "#0f172a" }}>{resource.label}</strong>.
          </div>
          <a href="/settings" style={{ textDecoration: "none" }}>
            <button className="btn-primary">Go to Settings</button>
          </a>
        </div>
      </div>
    );
  }

  // Methods available
  const methods = [
    resource.operations.includes("read") && { method: "GET", color: "#34d399" },
    resource.operations.includes("create") && {
      method: "POST",
      color: "#60a5fa",
    },
    resource.operations.includes("update") && {
      method: "PUT",
      color: "#fbbf24",
    },
    resource.operations.includes("delete") && {
      method: "DELETE",
      color: "#f87171",
    },
  ].filter(Boolean) as { method: string; color: string }[];

  // Paginated slice
  const start = (page - 1) * pageSize;
  const paginatedData = data.slice(start, start + pageSize);

  // Handlers
  const handleCreate = async (formData: Record<string, unknown>) => {
    await apiPost(`${resource.basePath}/`, formData);
    toast(`${resource.label} created successfully`, "success");
    fetchData();
  };

  const handleUpdate = async (formData: Record<string, unknown>) => {
    const id =
      formData.id ?? formData._id ?? formData.systemCertId ?? formData.keyId;
    await apiPut(`${resource.basePath}/${id}`, formData);
    toast(`${resource.label} updated successfully`, "success");
    fetchData();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const id =
        deleteTarget.id ??
        deleteTarget._id ??
        deleteTarget.systemCertId ??
        deleteTarget.keyId;
      await apiDelete(`${resource.basePath}/${id}`, deleteTarget);
      toast(`${resource.label} deleted successfully`, "success");
      setDeleteTarget(null);
      fetchData();
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { errorDescription?: string } };
      };
      toast(
        error?.response?.data?.errorDescription || "Delete failed",
        "error",
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  // Clear search filters and reload unfiltered data.
  // We update the state and call fetchData directly (searchValues will be empty
  // on the next render, but fetchData closes over the current value — so we
  // pass an explicit empty-params GET instead of relying on the stale closure).
  const clearSearch = () => {
    setSearchValues({});
    setPage(1);
    // fetchData closes over the current searchValues, so invoke it directly
    // with empty params rather than going through the stale closure.
    if (!resource) return;
    cancelRef.current.cancelled = true;
    const scope = { cancelled: false };
    cancelRef.current = scope;
    setLoading(true);
    apiGet<Record<string, unknown>[]>(`${resource.basePath}/`, {})
      .then((result) => {
        if (scope.cancelled) return;
        const resultArr = Array.isArray(result) ? result : [result];
        setData(resultArr);
        resourceDataCache?.set(resource.tag, resultArr);
        autoFetchedSet?.add(resource.tag);
      })
      .catch((err: unknown) => {
        if (scope.cancelled) return;
        autoFetchedSet?.delete(resource.tag);
        const error = err as {
          response?: { data?: { errorDescription?: string } };
        };
        toast(
          error?.response?.data?.errorDescription || "Failed to load data",
          "error",
        );
        setData([]);
      })
      .finally(() => {
        if (!scope.cancelled) setLoading(false);
      });
  };

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", padding: "28px 24px" }}
    >
      <LiquidBackground
        color1={resource.color}
        color2="#1e293b"
        color3="#0f172a"
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 20,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: resource.color,
                  boxShadow: `0 0 10px ${resource.color}`,
                }}
              />
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {resource.label}
              </h1>
              {cat &&
                (() => {
                  const CatIcon = cat.icon;
                  return (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: `${cat.color}15`,
                        color: cat.color,
                        border: `1px solid ${cat.color}30`,
                        fontWeight: 600,
                      }}
                    >
                      <CatIcon size={11} strokeWidth={1.75} /> {cat.label}
                    </span>
                  );
                })()}
            </div>
            <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>
              {resource.basePath}/
            </p>
            {/* Method badges */}
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              {methods.map((m) => (
                <span
                  key={m.method}
                  className={`badge badge-${m.method.toLowerCase()}`}
                >
                  {m.method}
                </span>
              ))}
              {resource.extraActions?.map((a) => (
                <span
                  key={a.operationId}
                  className="badge"
                  style={{
                    background: "rgba(168,85,247,0.12)",
                    color: "#a855f7",
                    border: "1px solid rgba(168,85,247,0.25)",
                  }}
                >
                  {a.label}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-ghost"
              style={{ gap: 6 }}
            >
              <Filter size={14} />
              Filters
              <ChevronDown
                size={12}
                style={{
                  transform: showFilters ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            </button>
            <button onClick={() => fetchData()} className="btn-ghost">
              <RefreshCw size={14} />
              Refresh
            </button>
            {resource.operations.includes("create") && (
              <button
                onClick={() => setModal({ open: true, mode: "create" })}
                className="btn-primary"
              >
                <Plus size={14} />
                Create
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (resource.readParams || resource.searchParam) && (
          <div
            className="glass-card animate-slide-up"
            style={{ padding: 20, marginBottom: 16 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 12,
              }}
            >
              {/* Generic search param */}
              {resource.searchParam && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#94a3b8",
                      marginBottom: 6,
                    }}
                  >
                    Search (% wildcard)
                  </label>
                  <input
                    className="input-glass"
                    placeholder="e.g. %partner%"
                    value={searchValues[resource.searchParam] || ""}
                    onChange={(e) =>
                      setSearchValues((prev) => ({
                        ...prev,
                        [resource.searchParam!]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              )}
              {/* Specific read params */}
              {resource.readParams?.map((p) => (
                <div key={p.name}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#94a3b8",
                      marginBottom: 6,
                    }}
                  >
                    {p.label}
                  </label>
                  {p.type === "select" && p.options ? (
                    <select
                      className="input-glass"
                      value={searchValues[p.name] || ""}
                      onChange={(e) =>
                        setSearchValues((prev) => ({
                          ...prev,
                          [p.name]: e.target.value,
                        }))
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <option value="">All</option>
                      {p.options.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          style={{ background: "#ffffff" }}
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="input-glass"
                      type={p.type === "number" ? "number" : "text"}
                      placeholder={`Enter ${p.label}...`}
                      value={searchValues[p.name] || ""}
                      onChange={(e) =>
                        setSearchValues((prev) => ({
                          ...prev,
                          [p.name]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button
                onClick={handleSearch}
                className="btn-primary"
                style={{ padding: "7px 16px" }}
              >
                <Search size={13} /> Search
              </button>
              <button
                onClick={clearSearch}
                className="btn-ghost"
                style={{ padding: "7px 14px" }}
              >
                <X size={13} /> Clear
              </button>
            </div>
          </div>
        )}

        {/* Results summary */}
        {!loading && data.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "#64748b",
              }}
            >
              {data.length} record{data.length !== 1 ? "s" : ""} found
            </span>
          </div>
        )}

        {/* Data Table */}
        <div className="glass-card" style={{ overflow: "hidden" }}>
          <DataTable
            data={paginatedData}
            resource={resource}
            loading={loading}
            page={page}
            pageSize={pageSize}
            total={data.length}
            onPageChange={setPage}
            onEdit={(row) => setModal({ open: true, mode: "edit", data: row })}
            onDelete={(row) => setDeleteTarget(row)}
          />
        </div>

        {/* Extra Actions Panel */}
        {resource.extraActions && resource.extraActions.length > 0 && (
          <div className="glass-card" style={{ padding: 16, marginTop: 14 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 10,
              }}
            >
              Extra Actions
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {resource.extraActions.map((action) => (
                <button
                  key={action.operationId}
                  className="btn-ghost"
                  style={{ fontSize: 12 }}
                  onClick={() =>
                    toast(
                      `Action "${action.label}" requires selecting a record first`,
                      "info",
                    )
                  }
                >
                  <span className="badge badge-post" style={{ marginRight: 4 }}>
                    {action.method}
                  </span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ResourceModal
        open={modal.open}
        resource={resource}
        mode={modal.mode}
        initialData={modal.data}
        onClose={() => setModal({ open: false, mode: "create" })}
        onSubmit={modal.mode === "create" ? handleCreate : handleUpdate}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        message={`Are you sure you want to delete this ${resource.label} record? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
