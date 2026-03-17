"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSettings } from "@/lib/settings";
import { LiquidBackground } from "@/components/LiquidBackground";
import {
  DashboardTile,
  DashboardConfig,
  SQL_SUGGESTIONS,
  SqlSuggestion,
  TILE_COLORS,
  TILE_ICON_MAP,
  TILE_ICON_KEYS,
  TileType,
  TileSize,
  loadDashboard,
  newTileId,
  saveDashboard,
} from "@/lib/dashboard";
import {
  BarChart2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Edit3,
  Lightbulb,
  Loader2,
  PieChart as PieIcon,
  Play,
  Plus,
  RefreshCw,
  Settings,
  Table,
  TrendingUp,
  Trash2,
  X,
  Check,
  LayoutDashboard,
  AlertCircle,
} from "lucide-react";

// ─── tiny SVG chart primitives ────────────────────────────────────────────────

function SvgBarChart({
  rows,
  labelCol,
  valueCol,
  color,
}: {
  rows: Record<string, unknown>[];
  labelCol: string;
  valueCol: string;
  color: string;
}) {
  const data = rows.map((r) => ({
    label: String(r[labelCol] ?? ""),
    value: Number(r[valueCol] ?? 0),
  }));
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 400;
  const H = 180;
  const pad = { top: 12, right: 8, bottom: 36, left: 8 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const bw = innerW / Math.max(data.length, 1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {/* grid line at top */}
      <line
        x1={pad.left}
        y1={pad.top}
        x2={W - pad.right}
        y2={pad.top}
        stroke="#f1f5f9"
        strokeWidth={1}
      />
      <line
        x1={pad.left}
        y1={pad.top + innerH / 2}
        x2={W - pad.right}
        y2={pad.top + innerH / 2}
        stroke="#f1f5f9"
        strokeWidth={1}
      />
      {/* baseline */}
      <line
        x1={pad.left}
        y1={pad.top + innerH}
        x2={W - pad.right}
        y2={pad.top + innerH}
        stroke="#e2e8f0"
        strokeWidth={1}
      />
      {data.map((d, i) => {
        const barH = (d.value / max) * innerH;
        const x = pad.left + i * bw + bw * 0.12;
        const w = bw * 0.76;
        const y = pad.top + innerH - barH;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={w}
              height={barH}
              fill={color}
              rx={3}
              opacity={0.82}
            />
            {barH > 14 && (
              <text
                x={x + w / 2}
                y={y + Math.min(barH - 4, 13)}
                textAnchor="middle"
                fontSize={9}
                fill="white"
                fontWeight={600}
              >
                {d.value}
              </text>
            )}
            <text
              x={x + w / 2}
              y={pad.top + innerH + 14}
              textAnchor="middle"
              fontSize={8.5}
              fill="#94a3b8"
            >
              {d.label.length > 10 ? d.label.slice(0, 9) + "…" : d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function SvgLineChart({
  rows,
  labelCol,
  valueCol,
  color,
}: {
  rows: Record<string, unknown>[];
  labelCol: string;
  valueCol: string;
  color: string;
}) {
  const data = rows.map((r) => ({
    label: String(r[labelCol] ?? ""),
    value: Number(r[valueCol] ?? 0),
  }));
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 400;
  const H = 180;
  const pad = { top: 12, right: 8, bottom: 36, left: 8 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const pts = data.map((d, i) => {
    const x = pad.left + (i / Math.max(data.length - 1, 1)) * innerW;
    const y = pad.top + innerH - (d.value / max) * innerH;
    return { x, y, ...d };
  });

  const fillPts = [
    `${pad.left},${pad.top + innerH}`,
    ...pts.map((p) => `${p.x},${p.y}`),
    `${pad.left + innerW},${pad.top + innerH}`,
  ].join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={pad.left}
          y1={pad.top + innerH * (1 - t)}
          x2={W - pad.right}
          y2={pad.top + innerH * (1 - t)}
          stroke="#f1f5f9"
          strokeWidth={1}
        />
      ))}
      <polygon points={fillPts} fill={color} opacity={0.12} />
      <polyline
        points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={color} />
      ))}
      {pts
        .filter(
          (_, i) => data.length <= 12 || i % Math.ceil(data.length / 10) === 0,
        )
        .map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={pad.top + innerH + 14}
            textAnchor="middle"
            fontSize={8.5}
            fill="#94a3b8"
          >
            {p.label.length > 8 ? p.label.slice(0, 7) + "…" : p.label}
          </text>
        ))}
    </svg>
  );
}

function SvgPieChart({
  rows,
  labelCol,
  valueCol,
  color,
}: {
  rows: Record<string, unknown>[];
  labelCol: string;
  valueCol: string;
  color: string;
}) {
  const palette = [
    color,
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#0ea5e9",
  ];
  const data = rows.map((r) => ({
    label: String(r[labelCol] ?? ""),
    value: Number(r[valueCol] ?? 0),
  }));
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const SIZE = 160;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const r = SIZE * 0.36;
  let angle = -Math.PI / 2;

  return (
    <div
      style={{ display: "flex", gap: 16, alignItems: "center", height: "100%" }}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ width: SIZE, height: SIZE, flexShrink: 0 }}
      >
        {data.map((d, i) => {
          if (d.value <= 0) return null;
          const sweep = (d.value / total) * 2 * Math.PI;
          const x1 = cx + r * Math.cos(angle);
          const y1 = cy + r * Math.sin(angle);
          angle += sweep;
          const x2 = cx + r * Math.cos(angle);
          const y2 = cy + r * Math.sin(angle);
          const large = sweep > Math.PI ? 1 : 0;
          return (
            <path
              key={i}
              d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
              fill={palette[i % palette.length]}
              opacity={0.88}
              stroke="white"
              strokeWidth={1}
            />
          );
        })}
        {/* donut hole */}
        <circle cx={cx} cy={cy} r={r * 0.48} fill="white" />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fill="#0f172a"
        >
          {total.toLocaleString()}
        </text>
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          overflow: "hidden",
        }}
      >
        {data.slice(0, 6).map((d, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: palette[i % palette.length],
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "#475569",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {d.label}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#0f172a",
                marginLeft: "auto",
                paddingLeft: 6,
              }}
            >
              {d.value.toLocaleString()}
            </span>
          </div>
        ))}
        {data.length > 6 && (
          <span style={{ fontSize: 10, color: "#94a3b8" }}>
            +{data.length - 6} more
          </span>
        )}
      </div>
    </div>
  );
}

function SvgTableChart({
  rows,
  columns,
}: {
  rows: Record<string, unknown>[];
  columns: string[];
}) {
  return (
    <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: 220 }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}
      >
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                style={{
                  padding: "6px 8px",
                  textAlign: "left",
                  background: "#f8fafc",
                  fontWeight: 700,
                  color: "#475569",
                  borderBottom: "1px solid #e2e8f0",
                  whiteSpace: "nowrap",
                  position: "sticky",
                  top: 0,
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{ background: ri % 2 === 0 ? "#fff" : "#f8fafc" }}
            >
              {columns.map((c) => (
                <td
                  key={c}
                  style={{
                    padding: "5px 8px",
                    color: "#0f172a",
                    borderBottom: "1px solid #f1f5f9",
                    whiteSpace: "nowrap",
                  }}
                >
                  {String(row[c] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tile Result type ─────────────────────────────────────────────────────────
interface TileResult {
  rows: Record<string, unknown>[];
  columns: string[];
  error?: string;
  loading?: boolean;
}

// ─── Tile Card ────────────────────────────────────────────────────────────────
function TileCard({
  tile,
  result,
  editMode,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onRefresh,
  isFirst,
  isLast,
}: {
  tile: DashboardTile;
  result?: TileResult;
  editMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRefresh: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const spanMap: Record<TileSize, number> = { sm: 1, md: 2, lg: 3 };
  const span = spanMap[tile.size];
  const metricValue = result?.rows?.[0]?.[tile.valueCol];

  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        background: "#fff",
        borderRadius: 16,
        border: editMode ? `2px dashed ${tile.color}50` : "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        position: "relative",
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          borderBottom: "1px solid #f1f5f9",
          background: `linear-gradient(135deg,${tile.color}12,${tile.color}06)`,
        }}
      >
        {tile.icon &&
          TILE_ICON_MAP[tile.icon] &&
          (() => {
            const TileIcon = TILE_ICON_MAP[tile.icon];
            return (
              <TileIcon
                size={18}
                strokeWidth={1.75}
                color={tile.color}
                style={{ flexShrink: 0 }}
              />
            );
          })()}
        <span
          style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", flex: 1 }}
        >
          {tile.title}
        </span>
        {tile.subtitle && !editMode && (
          <span style={{ fontSize: 11, color: "#94a3b8" }}>
            {tile.subtitle}
          </span>
        )}
        {/* edit-mode controls */}
        {editMode && (
          <div style={{ display: "flex", gap: 2 }}>
            <button
              onClick={onMoveUp}
              disabled={isFirst}
              title="Move up"
              style={{
                padding: "3px 5px",
                background: "transparent",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                cursor: isFirst ? "default" : "pointer",
                color: isFirst ? "#cbd5e1" : "#475569",
                display: "flex",
              }}
            >
              <ChevronUp size={13} />
            </button>
            <button
              onClick={onMoveDown}
              disabled={isLast}
              title="Move down"
              style={{
                padding: "3px 5px",
                background: "transparent",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                cursor: isLast ? "default" : "pointer",
                color: isLast ? "#cbd5e1" : "#475569",
                display: "flex",
              }}
            >
              <ChevronDown size={13} />
            </button>
            <button
              onClick={onEdit}
              title="Edit tile"
              style={{
                padding: "3px 5px",
                background: "transparent",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                cursor: "pointer",
                color: "#6366f1",
                display: "flex",
              }}
            >
              <Edit3 size={13} />
            </button>
            <button
              onClick={onDelete}
              title="Delete tile"
              style={{
                padding: "3px 5px",
                background: "transparent",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                cursor: "pointer",
                color: "#ef4444",
                display: "flex",
              }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
        {!editMode && (
          <button
            onClick={onRefresh}
            title="Refresh"
            style={{
              padding: "3px 5px",
              background: "transparent",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              color: "#94a3b8",
              display: "flex",
              opacity: 0.7,
            }}
          >
            <RefreshCw size={12} />
          </button>
        )}
      </div>

      {/* Card body */}
      <div
        style={{
          flex: 1,
          padding: tile.type === "metric" ? "20px 20px" : "14px 16px",
          minHeight: tile.type === "metric" ? 80 : 160,
        }}
      >
        {editMode ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#94a3b8",
              fontSize: 12,
              fontStyle: "italic",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: 20,
                fontSize: 10,
                fontWeight: 700,
                background: `${tile.color}18`,
                color: tile.color,
                textTransform: "uppercase",
                fontStyle: "normal",
              }}
            >
              {tile.type}
            </span>
            <code
              style={{
                fontSize: 10,
                background: "#f8fafc",
                padding: "2px 6px",
                borderRadius: 4,
                color: "#64748b",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {tile.query.slice(0, 80)}
              {tile.query.length > 80 ? "…" : ""}
            </code>
          </div>
        ) : result?.loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 8,
              color: "#94a3b8",
            }}
          >
            <Loader2
              size={18}
              style={{ animation: "spin 1s linear infinite" }}
            />
            <span style={{ fontSize: 12 }}>Running query…</span>
          </div>
        ) : result?.error ? (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              color: "#ef4444",
              fontSize: 12,
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontFamily: "monospace", wordBreak: "break-word" }}>
              {result.error}
            </span>
          </div>
        ) : !result ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#cbd5e1",
              fontSize: 12,
              gap: 6,
            }}
          >
            <RefreshCw size={14} />
            No data yet
          </div>
        ) : tile.type === "metric" ? (
          <div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 800,
                color: tile.color,
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {metricValue !== undefined
                ? Number(metricValue).toLocaleString()
                : "—"}
            </div>
            {result.rows.length > 0 &&
              result.columns.filter((c) => c !== tile.valueCol).length > 0 && (
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>
                  {result.columns
                    .filter((c) => c !== tile.valueCol)
                    .map((c) => `${c}: ${result.rows[0][c]}`)
                    .join(" · ")}
                </div>
              )}
          </div>
        ) : tile.type === "bar" ? (
          <div style={{ height: 180 }}>
            {result.rows.length > 0 ? (
              <SvgBarChart
                rows={result.rows}
                labelCol={tile.labelCol}
                valueCol={tile.valueCol}
                color={tile.color}
              />
            ) : (
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 12,
                  textAlign: "center",
                  paddingTop: 60,
                }}
              >
                No rows returned
              </div>
            )}
          </div>
        ) : tile.type === "line" ? (
          <div style={{ height: 180 }}>
            {result.rows.length > 0 ? (
              <SvgLineChart
                rows={result.rows}
                labelCol={tile.labelCol}
                valueCol={tile.valueCol}
                color={tile.color}
              />
            ) : (
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 12,
                  textAlign: "center",
                  paddingTop: 60,
                }}
              >
                No rows returned
              </div>
            )}
          </div>
        ) : tile.type === "pie" ? (
          <div style={{ height: 180, display: "flex", alignItems: "center" }}>
            {result.rows.length > 0 ? (
              <SvgPieChart
                rows={result.rows}
                labelCol={tile.labelCol}
                valueCol={tile.valueCol}
                color={tile.color}
              />
            ) : (
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 12,
                  textAlign: "center",
                  width: "100%",
                  paddingTop: 60,
                }}
              >
                No rows returned
              </div>
            )}
          </div>
        ) : tile.type === "table" ? (
          result.rows.length > 0 ? (
            <SvgTableChart rows={result.rows} columns={result.columns} />
          ) : (
            <div
              style={{
                color: "#94a3b8",
                fontSize: 12,
                textAlign: "center",
                paddingTop: 30,
              }}
            >
              No rows returned
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

// ─── Tile Editor Modal ────────────────────────────────────────────────────────
const TILE_TYPES: { value: TileType; label: string; icon: React.ReactNode }[] =
  [
    { value: "metric", label: "Metric", icon: <TrendingUp size={13} /> },
    { value: "bar", label: "Bar Chart", icon: <BarChart2 size={13} /> },
    { value: "line", label: "Line Chart", icon: <TrendingUp size={13} /> },
    { value: "pie", label: "Pie Chart", icon: <PieIcon size={13} /> },
    { value: "table", label: "Table", icon: <Table size={13} /> },
  ];

const TILE_SIZES: { value: TileSize; label: string }[] = [
  { value: "sm", label: "Small (1/3)" },
  { value: "md", label: "Medium (2/3)" },
  { value: "lg", label: "Large (Full width)" },
];

function TileEditorModal({
  tile,
  onSave,
  onClose,
  dbConfig,
}: {
  tile: Partial<DashboardTile>;
  onSave: (t: DashboardTile) => void;
  onClose: () => void;
  dbConfig: {
    driver: string;
    host: string;
    port: string;
    name: string;
    schema: string;
    username: string;
    password: string;
  };
}) {
  const [form, setForm] = useState<DashboardTile>({
    id: tile.id ?? newTileId(),
    type: tile.type ?? "metric",
    title: tile.title ?? "",
    subtitle: tile.subtitle ?? "",
    color: tile.color ?? TILE_COLORS[0],
    icon: tile.icon ?? "BarChart3",
    query: tile.query ?? "",
    labelCol: tile.labelCol ?? "label",
    valueCol: tile.valueCol ?? "value",
    size: tile.size ?? "sm",
  });

  const [testResult, setTestResult] = useState<TileResult | null>(null);
  const [testing, setTesting] = useState(false);

  const set = (k: keyof DashboardTile, v: unknown) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const resp = await fetch("/api/db-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: dbConfig, query: form.query }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setTestResult({ rows: data.rows ?? [], columns: data.columns ?? [] });
      } else {
        setTestResult({
          rows: [],
          columns: [],
          error: data.error ?? "Query failed",
        });
      }
    } catch (e) {
      setTestResult({ rows: [], columns: [], error: String(e) });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 620,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 60px rgba(15,23,42,0.25)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: `${form.color}18`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LayoutDashboard size={16} color={form.color} />
          </div>
          <h3
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "#0f172a",
              margin: 0,
              flex: 1,
            }}
          >
            {tile.id ? "Edit Tile" : "New Tile"}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
              display: "flex",
              padding: 4,
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ overflow: "auto", flex: 1, padding: "20px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Title + Icon */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 90px",
                gap: 12,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#94a3b8",
                    marginBottom: 5,
                  }}
                >
                  Title
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 9,
                    fontSize: 13,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Active Trading Partners"
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#94a3b8",
                    marginBottom: 5,
                  }}
                >
                  Icon
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  {TILE_ICON_KEYS.map((key) => {
                    const Icon = TILE_ICON_MAP[key];
                    const selected = form.icon === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        title={key}
                        onClick={() => set("icon", key)}
                        style={{
                          width: 34,
                          height: 34,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: selected
                            ? `2px solid ${form.color}`
                            : "1.5px solid #e2e8f0",
                          borderRadius: 8,
                          background: selected ? `${form.color}18` : "#f8fafc",
                          cursor: "pointer",
                          transition: "all .15s",
                          padding: 0,
                        }}
                      >
                        <Icon
                          size={16}
                          strokeWidth={1.75}
                          color={selected ? form.color : "#64748b"}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Type + Size */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#94a3b8",
                    marginBottom: 5,
                  }}
                >
                  Type
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 9,
                    fontSize: 13,
                    outline: "none",
                    background: "#fff",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                  value={form.type}
                  onChange={(e) => set("type", e.target.value as TileType)}
                >
                  {TILE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#94a3b8",
                    marginBottom: 5,
                  }}
                >
                  Size
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 9,
                    fontSize: 13,
                    outline: "none",
                    background: "#fff",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                  value={form.size}
                  onChange={(e) => set("size", e.target.value as TileSize)}
                >
                  {TILE_SIZES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Colour picker */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginBottom: 5,
                }}
              >
                Accent Colour
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {TILE_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => set("color", c)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: c,
                      border:
                        form.color === c
                          ? "3px solid #0f172a"
                          : "3px solid transparent",
                      cursor: "pointer",
                      boxShadow:
                        form.color === c
                          ? `0 0 0 2px white, 0 0 0 4px ${c}`
                          : "none",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Column mappings (not needed for metric when a single value) */}
            {form.type !== "metric" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      marginBottom: 5,
                    }}
                  >
                    Label Column
                  </label>
                  <input
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 9,
                      fontSize: 12,
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "monospace",
                    }}
                    value={form.labelCol}
                    onChange={(e) => set("labelCol", e.target.value)}
                    placeholder="label"
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      marginBottom: 5,
                    }}
                  >
                    Value Column
                  </label>
                  <input
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 9,
                      fontSize: 12,
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "monospace",
                    }}
                    value={form.valueCol}
                    onChange={(e) => set("valueCol", e.target.value)}
                    placeholder="value"
                  />
                </div>
              </div>
            )}

            {form.type === "metric" && (
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#94a3b8",
                    marginBottom: 5,
                  }}
                >
                  Value Column
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 9,
                    fontSize: 12,
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "monospace",
                  }}
                  value={form.valueCol}
                  onChange={(e) => set("valueCol", e.target.value)}
                  placeholder="value"
                />
                <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>
                  The first row&apos;s value from this column will be shown as
                  the big number.
                </p>
              </div>
            )}

            {/* SQL Query */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <label
                  style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8" }}
                >
                  SQL Query
                </label>
                <button
                  onClick={handleTest}
                  disabled={testing || !form.query.trim()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 10px",
                    background: "linear-gradient(135deg,#667eea,#764ba2)",
                    color: "white",
                    border: "none",
                    borderRadius: 7,
                    cursor:
                      testing || !form.query.trim() ? "default" : "pointer",
                    opacity: testing || !form.query.trim() ? 0.55 : 1,
                  }}
                >
                  {testing ? (
                    <Loader2
                      size={11}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                  ) : (
                    <Play size={11} />
                  )}
                  {testing ? "Running…" : "Test Query"}
                </button>
              </div>
              <textarea
                value={form.query}
                onChange={(e) => set("query", e.target.value)}
                placeholder={"SELECT COUNT(*) AS value FROM MY_TABLE"}
                style={{
                  width: "100%",
                  minHeight: 100,
                  padding: "10px 12px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 9,
                  fontSize: 12,
                  fontFamily: "monospace",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  lineHeight: 1.5,
                }}
              />
            </div>

            {/* Test result preview */}
            {testResult && (
              <div
                style={{
                  background: testResult.error ? "#fef2f2" : "#f0fdf4",
                  border: `1px solid ${testResult.error ? "#fecaca" : "#bbf7d0"}`,
                  borderRadius: 10,
                  padding: 12,
                }}
              >
                {testResult.error ? (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: 12,
                      display: "flex",
                      gap: 6,
                      alignItems: "flex-start",
                    }}
                  >
                    <AlertCircle
                      size={14}
                      style={{ flexShrink: 0, marginTop: 1 }}
                    />
                    <span style={{ fontFamily: "monospace" }}>
                      {testResult.error}
                    </span>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#16a34a",
                        marginBottom: 8,
                      }}
                    >
                      <Check
                        size={12}
                        style={{ display: "inline", marginRight: 4 }}
                      />
                      {testResult.rows.length} row
                      {testResult.rows.length !== 1 ? "s" : ""} returned ·
                      columns: {testResult.columns.join(", ")}
                    </div>
                    {testResult.rows.slice(0, 3).map((row, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: 11,
                          fontFamily: "monospace",
                          color: "#374151",
                          padding: "3px 0",
                          borderTop: i > 0 ? "1px solid #d1fae5" : "none",
                        }}
                      >
                        {testResult.columns
                          .map((c) => `${c}: ${row[c]}`)
                          .join(" | ")}
                      </div>
                    ))}
                    {testResult.rows.length > 3 && (
                      <div
                        style={{ fontSize: 10, color: "#6b7280", marginTop: 4 }}
                      >
                        …and {testResult.rows.length - 3} more rows
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 18px",
              background: "transparent",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              color: "#64748b",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!form.title.trim() || !form.query.trim()}
            style={{
              padding: "8px 18px",
              background:
                !form.title.trim() || !form.query.trim()
                  ? "#e2e8f0"
                  : "linear-gradient(135deg,#667eea,#764ba2)",
              border: "none",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              color:
                !form.title.trim() || !form.query.trim() ? "#94a3b8" : "white",
              cursor:
                !form.title.trim() || !form.query.trim()
                  ? "default"
                  : "pointer",
            }}
          >
            Save Tile
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SQL Suggestions Panel ────────────────────────────────────────────────────
function SuggestionsPanel({
  onUse,
  onClose,
}: {
  onUse: (s: SqlSuggestion) => void;
  onClose: () => void;
}) {
  const [showDDL, setShowDDL] = useState<string | null>(null);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 760,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 60px rgba(15,23,42,0.25)",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "#fef3c710",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lightbulb size={16} color="#f59e0b" />
          </div>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#0f172a",
                margin: 0,
              }}
            >
              SQL Suggestions
            </h3>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>
              Pre-built queries for common Sterling B2B Integrator metrics
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
              display: "flex",
              padding: 4,
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            overflow: "auto",
            flex: 1,
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#94a3b8",
              background: "#fef3c720",
              border: "1px solid #fde68a",
              borderRadius: 8,
              padding: "8px 12px",
              marginBottom: 4,
            }}
          >
            ⚠️ Table and column names are based on the standard SFG schema.
            Adjust for your installed version or use the optional CREATE VIEW
            DDL provided.
          </div>
          {SQL_SUGGESTIONS.map((s, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>
                  {TILE_ICON_MAP[s.icon] &&
                    (() => {
                      const SIcon = TILE_ICON_MAP[s.icon];
                      return (
                        <SIcon size={22} strokeWidth={1.75} color={s.color} />
                      );
                    })()}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        padding: "1px 7px",
                        borderRadius: 20,
                        fontWeight: 700,
                        background: `${s.color}15`,
                        color: s.color,
                        textTransform: "uppercase",
                      }}
                    >
                      {s.tileType}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>
                    {s.description}
                  </p>
                  <code
                    style={{
                      display: "block",
                      marginTop: 8,
                      fontSize: 10.5,
                      fontFamily: "monospace",
                      background: "#f1f5f9",
                      padding: "6px 10px",
                      borderRadius: 6,
                      color: "#475569",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {s.query}
                  </code>
                  {s.viewDDL && (
                    <button
                      onClick={() =>
                        setShowDDL(showDDL === s.title ? null : s.title)
                      }
                      style={{
                        marginTop: 6,
                        fontSize: 10,
                        color: "#6366f1",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      {showDDL === s.title ? (
                        <ChevronUp size={10} />
                      ) : (
                        <ChevronDown size={10} />
                      )}
                      {showDDL === s.title ? "Hide" : "Show"} CREATE VIEW DDL
                    </button>
                  )}
                  {showDDL === s.title && s.viewDDL && (
                    <code
                      style={{
                        display: "block",
                        marginTop: 4,
                        fontSize: 10,
                        fontFamily: "monospace",
                        background: "#ede9fe",
                        padding: "6px 10px",
                        borderRadius: 6,
                        color: "#4c1d95",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {s.viewDDL}
                    </code>
                  )}
                </div>
                <button
                  onClick={() => onUse(s)}
                  style={{
                    padding: "6px 14px",
                    background: "linear-gradient(135deg,#667eea,#764ba2)",
                    border: "none",
                    borderRadius: 8,
                    color: "white",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Use
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const { settings } = useSettings();
  const [config, setConfig] = useState<DashboardConfig>({
    tiles: [],
    updatedAt: "",
  });
  const [results, setResults] = useState<Record<string, TileResult>>({});
  const [editMode, setEditMode] = useState(false);
  const [editingTile, setEditingTile] = useState<Partial<DashboardTile> | null>(
    null,
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fetchedRef = useRef<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    setConfig(loadDashboard());
  }, []);

  const dbConfig = {
    driver: settings.dbDriver,
    host: settings.dbHost,
    port: settings.dbPort,
    name: settings.dbName,
    schema: settings.dbSchema,
    username: settings.dbUsername,
    password: settings.dbPassword,
  };

  const dbConfigured = !!(dbConfig.host && dbConfig.username);

  const fetchTile = useCallback(
    async (tile: DashboardTile) => {
      setResults((prev) => ({
        ...prev,
        [tile.id]: { rows: [], columns: [], loading: true },
      }));
      try {
        const resp = await fetch("/api/db-query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ config: dbConfig, query: tile.query }),
        });
        const data = await resp.json();
        if (resp.ok) {
          setResults((prev) => ({
            ...prev,
            [tile.id]: { rows: data.rows ?? [], columns: data.columns ?? [] },
          }));
        } else {
          setResults((prev) => ({
            ...prev,
            [tile.id]: {
              rows: [],
              columns: [],
              error: data.error ?? "Query failed",
            },
          }));
        }
      } catch (e) {
        setResults((prev) => ({
          ...prev,
          [tile.id]: { rows: [], columns: [], error: String(e) },
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      settings.dbDriver,
      settings.dbHost,
      settings.dbPort,
      settings.dbName,
      settings.dbUsername,
      settings.dbPassword,
    ],
  );

  // Auto-fetch all tiles on mount / when not in edit mode
  useEffect(() => {
    if (editMode || !dbConfigured) return;
    config.tiles.forEach((tile) => {
      if (!fetchedRef.current.has(tile.id)) {
        fetchedRef.current.add(tile.id);
        fetchTile(tile);
      }
    });
  }, [config.tiles, editMode, dbConfigured, fetchTile]);

  const refreshAll = () => {
    fetchedRef.current.clear();
    config.tiles.forEach((tile) => fetchTile(tile));
  };

  const saveConfig = (next: DashboardConfig) => {
    setConfig(next);
    saveDashboard(next);
  };

  const handleSaveTile = (tile: DashboardTile) => {
    const existing = config.tiles.find((t) => t.id === tile.id);
    const nextTiles = existing
      ? config.tiles.map((t) => (t.id === tile.id ? tile : t))
      : [...config.tiles, tile];
    saveConfig({ ...config, tiles: nextTiles });
    setEditingTile(null);
    fetchedRef.current.delete(tile.id);
    fetchTile(tile);
  };

  const handleDeleteTile = (id: string) => {
    saveConfig({ ...config, tiles: config.tiles.filter((t) => t.id !== id) });
    setResults((prev) => {
      const n = { ...prev };
      delete n[id];
      return n;
    });
  };

  const handleMove = (id: string, dir: "up" | "down") => {
    const idx = config.tiles.findIndex((t) => t.id === id);
    if (idx < 0) return;
    const next = [...config.tiles];
    const swap = dir === "up" ? idx - 1 : idx + 1;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    saveConfig({ ...config, tiles: next });
  };

  const handleUseSuggestion = (s: SqlSuggestion) => {
    setShowSuggestions(false);
    setEditMode(true);
    setEditingTile({
      type: s.tileType,
      title: s.title,
      icon: s.icon,
      color: s.color,
      query: s.query,
      labelCol: s.labelCol,
      valueCol: s.valueCol,
      size:
        s.tileType === "table"
          ? "lg"
          : s.tileType === "pie" || s.tileType === "line"
            ? "md"
            : "sm",
    });
  };

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", padding: "28px 24px" }}
    >
      <LiquidBackground color1="#667eea" color2="#764ba2" color3="#06b6d4" />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Page header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: "linear-gradient(135deg,#667eea,#764ba2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(102,126,234,0.4)",
                flexShrink: 0,
              }}
            >
              <LayoutDashboard size={20} color="white" />
            </div>
            <div>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Dashboard
              </h1>
              <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>
                {config.tiles.length} tile{config.tiles.length !== 1 ? "s" : ""}
                {config.updatedAt
                  ? ` · saved ${new Date(config.updatedAt).toLocaleDateString()}`
                  : ""}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {!editMode && (
              <button
                onClick={() => setShowSuggestions(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#64748b",
                  cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
                }}
              >
                <Lightbulb size={14} color="#f59e0b" /> SQL Suggestions
              </button>
            )}
            {!editMode && config.tiles.length > 0 && (
              <button
                onClick={refreshAll}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#64748b",
                  cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
                }}
              >
                <RefreshCw size={13} /> Refresh All
              </button>
            )}
            {editMode && (
              <>
                <button
                  onClick={() => setShowSuggestions(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#64748b",
                    cursor: "pointer",
                  }}
                >
                  <Lightbulb size={14} color="#f59e0b" /> Suggestions
                </button>
                <button
                  onClick={() => {
                    setEditingTile({});
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    background: "linear-gradient(135deg,#10b981,#06b6d4)",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "white",
                    cursor: "pointer",
                    boxShadow: "0 3px 10px rgba(16,185,129,0.3)",
                  }}
                >
                  <Plus size={14} /> Add Tile
                </button>
              </>
            )}
            <button
              onClick={() => {
                setEditMode((v) => !v);
                if (editMode) {
                  // exiting edit mode — refresh all
                  fetchedRef.current.clear();
                  config.tiles.forEach((t) => fetchTile(t));
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                background: editMode
                  ? "linear-gradient(135deg,#667eea,#764ba2)"
                  : "#fff",
                border: editMode ? "none" : "1px solid #e2e8f0",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                color: editMode ? "white" : "#0f172a",
                cursor: "pointer",
                boxShadow: editMode
                  ? "0 3px 10px rgba(102,126,234,0.35)"
                  : "0 1px 4px rgba(15,23,42,0.06)",
              }}
            >
              {editMode ? (
                <>
                  <Check size={14} /> Done Editing
                </>
              ) : (
                <>
                  <Edit3 size={14} /> Edit Dashboard
                </>
              )}
            </button>
          </div>
        </div>

        {/* DB not configured warning */}
        {!dbConfigured && !editMode && config.tiles.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 12,
              marginBottom: 20,
              fontSize: 13,
              color: "#92400e",
            }}
          >
            <AlertCircle size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
            <span>
              Database not configured — tile data cannot be fetched.{" "}
              <Link
                href="/settings"
                style={{
                  color: "#667eea",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Open Settings → Database
              </Link>{" "}
              to configure your DB connection.
            </span>
          </div>
        )}

        {/* Empty state */}
        {config.tiles.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 40px",
              background: "#fff",
              borderRadius: 20,
              border: "2px dashed #e2e8f0",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Your dashboard is empty
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#64748b",
                marginBottom: 24,
                maxWidth: 400,
              }}
            >
              Add metric tiles and charts powered by your SFG database. Use the
              SQL Suggestions for ready-made queries, or write your own.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => {
                  setEditMode(true);
                  setShowSuggestions(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 20px",
                  background: "#fff7ed",
                  border: "1px solid #fed7aa",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#c2410c",
                  cursor: "pointer",
                }}
              >
                <Lightbulb size={14} color="#f59e0b" /> Browse SQL Suggestions
              </button>
              <button
                onClick={() => {
                  setEditMode(true);
                  setEditingTile({});
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 20px",
                  background: "linear-gradient(135deg,#667eea,#764ba2)",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <Plus size={14} /> Add Tile
              </button>
            </div>
          </div>
        )}

        {/* Tiles grid */}
        {config.tiles.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {config.tiles.map((tile, idx) => (
              <TileCard
                key={tile.id}
                tile={tile}
                result={results[tile.id]}
                editMode={editMode}
                onEdit={() => setEditingTile(tile)}
                onDelete={() => handleDeleteTile(tile.id)}
                onMoveUp={() => handleMove(tile.id, "up")}
                onMoveDown={() => handleMove(tile.id, "down")}
                onRefresh={() => {
                  fetchedRef.current.delete(tile.id);
                  fetchTile(tile);
                }}
                isFirst={idx === 0}
                isLast={idx === config.tiles.length - 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {editingTile !== null && (
        <TileEditorModal
          tile={editingTile}
          onSave={handleSaveTile}
          onClose={() => setEditingTile(null)}
          dbConfig={dbConfig}
        />
      )}
      {showSuggestions && (
        <SuggestionsPanel
          onUse={handleUseSuggestion}
          onClose={() => setShowSuggestions(false)}
        />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
