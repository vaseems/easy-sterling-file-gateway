"use client";

import React, { useState } from "react";
import { formatValue, inferColumns } from "@/lib/api";
import { ResourceConfig } from "@/lib/resources";
import {
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  FolderSearch,
} from "lucide-react";

interface DataTableProps {
  data: Record<string, unknown>[];
  resource: ResourceConfig;
  onEdit?: (row: Record<string, unknown>) => void;
  onDelete?: (row: Record<string, unknown>) => void;
  loading?: boolean;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (p: number) => void;
}

export function DataTable({
  data,
  resource,
  onEdit,
  onDelete,
  loading,
  page,
  pageSize,
  total,
  onPageChange,
}: DataTableProps) {
  const [expanded, setExpanded] = useState<Record<string, unknown> | null>(
    null,
  );
  const columns = inferColumns(data);
  const totalPages = Math.ceil(total / pageSize);

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="skeleton"
            style={{ height: 44, marginBottom: 8 }}
          />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div
        style={{
          padding: 48,
          textAlign: "center",
          color: "#475569",
          fontSize: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 12,
            color: "#cbd5e1",
          }}
        >
          <FolderSearch size={48} strokeWidth={1.5} />
        </div>
        <div style={{ fontWeight: 600, marginBottom: 6, color: "#64748b" }}>
          No records found
        </div>
        <div>Use the search filters or create a new record to get started.</div>
      </div>
    );
  }

  const hasActions =
    resource.operations.includes("update") ||
    resource.operations.includes("delete");

  return (
    <div>
      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead className="tbl-header">
            <tr>
              {columns.map((col) => (
                <th key={col} style={{ textAlign: "left" }}>
                  {col.replace(/([A-Z])/g, " $1").trim()}
                </th>
              ))}
              <th
                style={{
                  textAlign: "right",
                  padding: "10px 16px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#64748b",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="tbl-row">
                {columns.map((col) => (
                  <td
                    key={col}
                    style={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatValue(row[col])}
                  </td>
                ))}
                <td
                  style={{
                    padding: "8px 12px",
                    textAlign: "right",
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 4,
                    }}
                  >
                    <button
                      className="btn-icon"
                      style={{ color: "#64748b" }}
                      onClick={() => setExpanded(expanded === row ? null : row)}
                      title="View JSON"
                    >
                      <Eye size={14} />
                    </button>
                    {onEdit && resource.operations.includes("update") && (
                      <button
                        className="btn-icon btn-icon-edit"
                        onClick={() => onEdit(row)}
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                    )}
                    {onDelete && resource.operations.includes("delete") && (
                      <button
                        className="btn-icon btn-icon-delete"
                        onClick={() => onDelete(row)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* JSON Expand Panel */}
      {expanded && (
        <div
          style={{
            margin: "0 16px 16px",
            borderRadius: 10,
            background: "rgba(0,0,0,0.4)",
            border: "1px solid #e2e8f0",
            padding: 16,
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase",
              }}
            >
              Raw JSON
            </span>
            <button
              onClick={() => setExpanded(null)}
              style={{
                background: "transparent",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Close
            </button>
          </div>
          <pre
            style={{
              fontSize: 11,
              color: "#94a3b8",
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {JSON.stringify(expanded, null, 2)}
          </pre>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Page {page} of {totalPages} · {total} total records
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="btn-ghost"
              style={{ padding: "6px 10px", opacity: page <= 1 ? 0.4 : 1 }}
            >
              <ChevronLeft size={14} />
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={page === p ? "btn-primary" : "btn-ghost"}
                  style={{ padding: "6px 12px", fontSize: 12 }}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="btn-ghost"
              style={{
                padding: "6px 10px",
                opacity: page >= totalPages ? 0.4 : 1,
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
