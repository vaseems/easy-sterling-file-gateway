"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  X,
  Play,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Loader2,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Link2,
} from "lucide-react";
import {
  type Flow,
  type FlowNode,
  topologicalSort,
  resolveVariables,
  flattenObject,
  OPERATION_LABELS,
  OPERATION_BADGE_CLASS,
  OPERATION_COLORS,
} from "@/lib/flows";
import { RESOURCES } from "@/lib/resources";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";
import {
  getSchemaFields,
  coerceFieldValue,
  type SchemaField,
} from "@/lib/schema-map";

// ─── Types ────────────────────────────────────────────────────────────────────

type StepStatus = "pending" | "running" | "success" | "error" | "skipped";

interface StepResult {
  status: StepStatus;
  response?: unknown;
  error?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildApiPath(basePath: string): string {
  return basePath.startsWith("/") ? basePath : `/${basePath}`;
}

function StatusIcon({ status }: { status: StepStatus }) {
  if (status === "success") return <CheckCircle2 size={14} color="#10b981" />;
  if (status === "error") return <XCircle size={14} color="#ef4444" />;
  if (status === "running")
    return <Loader2 size={14} color="#6366f1" className="animate-spin-sm" />;
  return null;
}

function StatusDot({ status }: { status: StepStatus }) {
  const colors: Record<StepStatus, string> = {
    pending: "#e2e8f0",
    running: "#6366f1",
    success: "#10b981",
    error: "#ef4444",
    skipped: "#94a3b8",
  };
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: colors[status],
        flexShrink: 0,
        boxShadow:
          status === "running" ? "0 0 0 3px rgba(99,102,241,0.25)" : undefined,
      }}
    />
  );
}

/** A variable-aware input: free text + "🔗 Map variable" picker */
function SmartInput({
  value,
  onChange,
  placeholder,
  fieldName,
  previousSteps,
  stepResults,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  fieldName: string;
  previousSteps: FlowNode[];
  stepResults: Record<string, unknown>;
}) {
  const [showPicker, setShowPicker] = useState(false);

  const availableVars = previousSteps.flatMap((step) => {
    const res = stepResults[step.id];
    if (!res || typeof res !== "object") return [];
    return flattenObject(res).map(({ key, value: v }) => ({
      label: `${step.operationLabel} → ${key}`,
      template: `{{${step.id}.${key}}}`,
      preview: String(v).slice(0, 40),
      stepId: step.id,
    }));
  });

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: 4 }}>
        <input
          className="input-glass"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? fieldName}
          style={{
            flex: 1,
            fontFamily: value.includes("{{") ? "monospace" : undefined,
            fontSize: 12,
          }}
        />
        {previousSteps.length > 0 && (
          <button
            onClick={() => setShowPicker((v) => !v)}
            title="Map from previous step"
            style={{
              background: showPicker
                ? "rgba(99,102,241,0.12)"
                : "var(--surface-2)",
              border: "1.5px solid",
              borderColor: showPicker ? "#6366f1" : "var(--border)",
              borderRadius: 9,
              padding: "0 9px",
              cursor: "pointer",
              color: showPicker ? "#6366f1" : "#94a3b8",
              fontSize: 11,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexShrink: 0,
            }}
          >
            <Link2 size={11} />
          </button>
        )}
      </div>

      {showPicker && availableVars.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 100,
            background: "white",
            border: "1.5px solid #e2e8f0",
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            maxHeight: 220,
            overflow: "auto",
            padding: 6,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#94a3b8",
              padding: "2px 6px 4px",
              textTransform: "uppercase",
            }}
          >
            Available values from previous steps
          </div>
          {availableVars.map((v, i) => (
            <button
              key={i}
              onClick={() => {
                onChange(v.template);
                setShowPicker(false);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "5px 8px",
                cursor: "pointer",
                borderRadius: 7,
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f1f5f9")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: "#0f172a" }}>
                {v.label}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#94a3b8",
                  fontFamily: "monospace",
                }}
              >
                {v.template} = &quot;{v.preview}&quot;
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Field Input ─────────────────────────────────────────────────────────────

/** Renders the right input widget based on field type */
function FieldInput({
  field,
  value,
  onChange,
  previousSteps,
  stepResults,
}: {
  field: FormField;
  value: string;
  onChange: (v: string) => void;
  previousSteps: FlowNode[];
  stepResults: Record<string, unknown>;
}) {
  // Enum select
  if (field.type === "enum" && field.options) {
    return (
      <select
        className="input-glass"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ fontSize: 13, cursor: "pointer" }}
      >
        <option value="">— Select —</option>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  // Boolean select
  if (field.type === "boolean") {
    return (
      <select
        className="input-glass"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ fontSize: 13, cursor: "pointer" }}
      >
        <option value="">— Not set —</option>
        <option value="true">Yes / True</option>
        <option value="false">No / False</option>
      </select>
    );
  }

  // Array / textarea
  if (field.type === "array") {
    return (
      <div>
        <textarea
          className="input-glass"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            field.placeholder ??
            'JSON array, e.g. ["item1","item2"] or comma-separated'
          }
          rows={3}
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            resize: "vertical",
            width: "100%",
          }}
        />
        <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
          Enter a JSON array or comma-separated values
        </div>
      </div>
    );
  }

  // Number input
  if (field.type === "number") {
    return (
      <SmartInput
        value={value}
        onChange={onChange}
        placeholder={field.placeholder ?? `Enter ${field.label}…`}
        fieldName={field.label}
        previousSteps={previousSteps}
        stepResults={stepResults}
      />
    );
  }

  // Default: text / SmartInput (supports variable mapping)
  return (
    <SmartInput
      value={value}
      onChange={onChange}
      placeholder={field.placeholder ?? `Enter ${field.label}…`}
      fieldName={field.label}
      previousSteps={previousSteps}
      stepResults={stepResults}
    />
  );
}

// ─── Step Form ────────────────────────────────────────────────────────────────

function StepForm({
  step,
  stepIndex,
  sortedSteps,
  fieldValues,
  onFieldChange,
  onExecute,
  status,
  result,
  stepResults,
}: {
  step: FlowNode;
  stepIndex: number;
  sortedSteps: FlowNode[];
  fieldValues: Record<string, string>;
  onFieldChange: (field: string, value: string) => void;
  onExecute: () => void;
  status: StepStatus;
  result?: unknown;
  stepResults: Record<string, unknown>;
}) {
  const [showRaw, setShowRaw] = useState(false);
  const resource = RESOURCES.find((r) => r.tag === step.resourceTag);
  const previousSteps = sortedSteps.slice(0, stepIndex);
  const isReadOnly = step.operation === "read";

  // Generic fields for the operation
  const formFields = getFormFields(step, resource);

  return (
    <div style={{ padding: "20px 24px" }}>
      {/* Step header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: step.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 16 }}>{getStepIcon(step.operation)}</span>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>
            {step.operationLabel}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>
            {step.resourceLabel} ·{" "}
            <span className={`badge ${OPERATION_BADGE_CLASS[step.operation]}`}>
              {OPERATION_LABELS[step.operation]}
            </span>
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <StatusIcon status={status} />
        </div>
      </div>

      {step.description && (
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 12,
            color: "#64748b",
            marginBottom: 16,
            borderLeft: "3px solid #6366f1",
          }}
        >
          {step.description}
        </div>
      )}

      {/* Form fields */}
      {(status === "pending" || status === "error") &&
        formFields.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                marginBottom: 10,
              }}
            >
              {isReadOnly ? "Query Parameters" : "Request Fields"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {formFields.map((field) => (
                <div key={field.name}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: 4,
                    }}
                  >
                    {field.label}
                    {field.required && (
                      <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>
                    )}
                  </label>
                  <FieldInput
                    field={field}
                    value={fieldValues[field.name] ?? ""}
                    onChange={(v) => onFieldChange(field.name, v)}
                    previousSteps={previousSteps}
                    stepResults={stepResults}
                  />
                  {field.description && field.type !== "array" && (
                    <div
                      style={{
                        fontSize: 10,
                        color: "#94a3b8",
                        marginTop: 3,
                        lineHeight: 1.4,
                      }}
                    >
                      {field.description.length > 120
                        ? field.description.slice(0, 120) + "…"
                        : field.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Execute button */}
      {(status === "pending" || status === "error") && (
        <button
          className="btn-primary"
          onClick={onExecute}
          style={{ width: "100%" }}
        >
          {status === "error" ? <RefreshCw size={14} /> : <Play size={14} />}
          {status === "error" ? "Retry" : `Execute: ${step.operationLabel}`}
        </button>
      )}

      {status === "running" && (
        <div
          style={{ textAlign: "center", padding: "20px 0", color: "#6366f1" }}
        >
          <Loader2
            size={28}
            className="animate-spin-sm"
            style={{ margin: "0 auto 8px" }}
          />
          <div style={{ fontSize: 12 }}>Executing API call…</div>
        </div>
      )}

      {/* Response */}
      {status === "success" && result != null && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 700,
                color: "#10b981",
              }}
            >
              <CheckCircle2 size={14} /> Response received
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button
                onClick={() => setShowRaw((v) => !v)}
                className="btn-icon"
              >
                {showRaw ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(result, null, 2))
                }
                className="btn-icon"
              >
                <Copy size={13} />
              </button>
            </div>
          </div>
          {showRaw ? (
            <pre
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: 12,
                fontSize: 11,
                overflow: "auto",
                maxHeight: 300,
                color: "#0f172a",
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : (
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: 12,
                maxHeight: 300,
                overflow: "auto",
              }}
            >
              <ResultTable data={result} />
            </div>
          )}
        </div>
      )}

      {status === "error" && (
        <div
          style={{
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 12,
            color: "#dc2626",
            marginTop: 12,
          }}
        >
          {(result as { message?: string })?.message ??
            "An error occurred. Check your field values and try again."}
        </div>
      )}
    </div>
  );
}

function ResultTable({ data }: { data: unknown }) {
  const flat = flattenObject(data);
  if (flat.length === 0) {
    return (
      <div style={{ fontSize: 12, color: "#94a3b8" }}>No data returned.</div>
    );
  }
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <tbody>
        {flat.map(({ key, value }) => (
          <tr key={key}>
            <td
              style={{
                fontWeight: 600,
                color: "#475569",
                padding: "3px 8px 3px 0",
                whiteSpace: "nowrap",
                verticalAlign: "top",
              }}
            >
              {key}
            </td>
            <td
              style={{
                color: "#0f172a",
                padding: "3px 0",
                wordBreak: "break-all",
              }}
            >
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── Helper: derive form fields from resource config ─────────────────────────

interface FormField extends SchemaField {
  placeholder?: string;
}

function makeIdField(label: string, placeholder?: string): FormField {
  return {
    name: "id",
    label,
    description: "",
    type: "text",
    required: true,
    placeholder: placeholder ?? "Enter the ID…",
  };
}

function makeFallbackBodyField(label: string): FormField {
  return {
    name: "body",
    label,
    description: "Paste the full JSON request body.",
    type: "array", // renders as textarea
    required: true,
    placeholder: '{"key": "value"}',
  };
}

// Suppress unused variable warning — placeholder removed

function getFormFields(
  step: FlowNode,
  resource?: (typeof RESOURCES)[0],
): FormField[] {
  if (!resource) return [makeFallbackBodyField("Request Body (JSON)")];

  if (step.operation === "read") {
    return (resource.readParams ?? []).map((p) => ({
      name: p.name,
      label: p.label,
      description: "",
      type: "text" as const,
      required: false,
      placeholder: `Enter ${p.label}…`,
    }));
  }

  if (step.operation === "delete") {
    return [makeIdField("Record ID to delete")];
  }

  const schemaOp = step.operation === "update" ? "update" : "create";

  const schemaFields = getSchemaFields(resource.basePath, schemaOp);

  if (schemaFields.length > 0) {
    const fields: FormField[] = schemaFields.map((f) => ({
      ...f,
      placeholder: f.description
        ? f.description.slice(0, 60) + (f.description.length > 60 ? "…" : "")
        : undefined,
    }));
    if (step.operation === "update") {
      return [makeIdField("Record ID to update"), ...fields];
    }
    return fields;
  }

  // Fallback: single JSON textarea
  if (step.operation === "update") {
    return [
      makeIdField("Record ID to update"),
      makeFallbackBodyField("Updated Fields (JSON)"),
    ];
  }
  return [makeFallbackBodyField("Request Body (JSON)")];
}

function getStepIcon(op: FlowNode["operation"]) {
  const icons: Record<FlowNode["operation"], string> = {
    read: "🔍",
    create: "✨",
    update: "✏️",
    delete: "🗑️",
    action: "⚡",
  };
  return icons[op] ?? "📌";
}

// ─── Execute step ─────────────────────────────────────────────────────────────

async function executeStep(
  step: FlowNode,
  fieldValues: Record<string, string>,
  stepResults: Record<string, unknown>,
  apiBase: string,
): Promise<unknown> {
  const resource = RESOURCES.find((r) => r.tag === step.resourceTag);
  if (!resource) throw new Error(`Resource ${step.resourceTag} not found`);

  const basePath = resource.basePath;

  // Resolve variable references in all field values
  const resolved: Record<string, string> = {};
  for (const [k, v] of Object.entries(fieldValues)) {
    resolved[k] = resolveVariables(v, stepResults);
  }

  if (step.operation === "read") {
    const params: Record<string, string> = {};
    for (const [k, v] of Object.entries(resolved)) {
      if (v) params[k] = v;
    }
    return apiGet(basePath, params);
  }

  if (step.operation === "create" || step.operation === "action") {
    const schemaFields = getSchemaFields(resource.basePath, "create");
    let body: Record<string, unknown> = {};
    if (schemaFields.length > 0) {
      for (const field of schemaFields) {
        const value = resolved[field.name];
        if (value !== undefined && value !== "") {
          const coerced = coerceFieldValue(value, field);
          if (coerced !== undefined) body[field.name] = coerced;
        }
      }
    } else {
      try {
        body = resolved.body ? JSON.parse(resolved.body) : {};
      } catch {
        throw new Error("Invalid JSON in request body.");
      }
    }
    return apiPost(basePath, body);
  }

  if (step.operation === "update") {
    const id = resolved.id;
    if (!id) throw new Error("Record ID is required for update.");
    const schemaFields = getSchemaFields(resource.basePath, "update");
    let body: Record<string, unknown> = {};
    if (schemaFields.length > 0) {
      for (const field of schemaFields) {
        const value = resolved[field.name];
        if (value !== undefined && value !== "") {
          const coerced = coerceFieldValue(value, field);
          if (coerced !== undefined) body[field.name] = coerced;
        }
      }
    } else {
      try {
        body = resolved.body ? JSON.parse(resolved.body) : {};
      } catch {
        throw new Error("Invalid JSON in request body.");
      }
    }
    return apiPut(`${basePath}/${id}`, body);
  }

  if (step.operation === "delete") {
    const id = resolved.id;
    if (!id) throw new Error("Record ID is required for delete.");
    return apiDelete(`${basePath}/${id}`);
  }

  throw new Error(`Unknown operation: ${step.operation}`);
}

// ─── Main FlowWizard component ────────────────────────────────────────────────

interface FlowWizardProps {
  flow: Flow;
  apiBase: string;
  onClose: () => void;
}

export function FlowWizard({ flow, apiBase, onClose }: FlowWizardProps) {
  const sortedSteps = topologicalSort(flow.nodes, flow.edges);

  const [activeStep, setActiveStep] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, StepStatus>>(
    Object.fromEntries(sortedSteps.map((s) => [s.id, "pending"])),
  );
  const [results, setResults] = useState<Record<string, unknown>>({});
  const [fieldValues, setFieldValues] = useState<
    Record<string, Record<string, string>>
  >(Object.fromEntries(sortedSteps.map((s) => [s.id, s.fieldValues ?? {}])));

  const setStepStatus = (id: string, status: StepStatus) =>
    setStatuses((prev) => ({ ...prev, [id]: status }));

  const setStepResult = (id: string, result: unknown) =>
    setResults((prev) => ({ ...prev, [id]: result }));

  const handleFieldChange = (stepId: string, field: string, value: string) =>
    setFieldValues((prev) => ({
      ...prev,
      [stepId]: { ...(prev[stepId] ?? {}), [field]: value },
    }));

  const handleExecuteStep = useCallback(
    async (step: FlowNode) => {
      setStepStatus(step.id, "running");
      try {
        const result = await executeStep(
          step,
          fieldValues[step.id] ?? {},
          results,
          apiBase,
        );
        setStepResult(step.id, result);
        setStepStatus(step.id, "success");
        // Auto-advance to next step after 600ms
        const idx = sortedSteps.findIndex((s) => s.id === step.id);
        if (idx < sortedSteps.length - 1) {
          setTimeout(() => setActiveStep(idx + 1), 600);
        }
      } catch (err: unknown) {
        const errObj = err instanceof Error ? { message: err.message } : err;
        setStepResult(step.id, errObj);
        setStepStatus(step.id, "error");
      }
    },
    [apiBase, fieldValues, results, sortedSteps],
  );

  const completedCount = Object.values(statuses).filter(
    (s) => s === "success",
  ).length;
  const hasErrors = Object.values(statuses).some((s) => s === "error");
  const allDone = completedCount === sortedSteps.length;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          width: "100%",
          maxWidth: 900,
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 64px rgba(15,23,42,0.18)",
          overflow: "hidden",
          animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 24px",
            borderBottom: "1px solid #e2e8f0",
            background:
              "linear-gradient(135deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04))",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={18} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>
              {flow.name}
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>
              {completedCount}/{sortedSteps.length} steps completed
              {allDone && " · ✅ Flow complete!"}
              {hasErrors && " · ⚠ Some steps failed"}
            </div>
          </div>
          {/* Progress bar */}
          <div
            style={{
              flex: 1,
              height: 4,
              background: "#e2e8f0",
              borderRadius: 99,
              overflow: "hidden",
              margin: "0 16px",
            }}
          >
            <div
              style={{
                height: "100%",
                background: allDone
                  ? "#10b981"
                  : "linear-gradient(90deg,#6366f1,#8b5cf6)",
                borderRadius: 99,
                transition: "width 0.5s",
                width: `${(completedCount / sortedSteps.length) * 100}%`,
              }}
            />
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        {/* Body: step list + step content */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Step sidebar */}
          <div
            style={{
              width: 220,
              borderRight: "1px solid #e2e8f0",
              overflow: "auto",
              padding: "12px 8px",
            }}
          >
            {sortedSteps.map((step, idx) => {
              const status = statuses[step.id] ?? "pending";
              const isActive = idx === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "9px 10px",
                    borderRadius: 9,
                    border: "none",
                    background: isActive
                      ? "rgba(99,102,241,0.1)"
                      : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                    marginBottom: 2,
                  }}
                >
                  <StatusDot status={status} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#4f46e5" : "#0f172a",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {idx + 1}. {step.operationLabel}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "#94a3b8",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step.resourceLabel}
                    </div>
                  </div>
                  <StatusIcon status={status} />
                </button>
              );
            })}
          </div>

          {/* Step content */}
          <div style={{ flex: 1, overflow: "auto" }}>
            {sortedSteps[activeStep] && (
              <StepForm
                key={sortedSteps[activeStep].id}
                step={sortedSteps[activeStep]}
                stepIndex={activeStep}
                sortedSteps={sortedSteps}
                fieldValues={fieldValues[sortedSteps[activeStep].id] ?? {}}
                onFieldChange={(field, value) =>
                  handleFieldChange(sortedSteps[activeStep].id, field, value)
                }
                onExecute={() => handleExecuteStep(sortedSteps[activeStep])}
                status={statuses[sortedSteps[activeStep].id] ?? "pending"}
                result={results[sortedSteps[activeStep].id]}
                stepResults={results}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 24px",
            borderTop: "1px solid #e2e8f0",
            background: "#f8fafc",
          }}
        >
          <button
            className="btn-ghost"
            onClick={() => setActiveStep((v) => Math.max(0, v - 1))}
            disabled={activeStep === 0}
            style={{ fontSize: 12 }}
          >
            <ChevronLeft size={13} /> Back
          </button>

          <div style={{ fontSize: 12, color: "#94a3b8" }}>
            Step {activeStep + 1} of {sortedSteps.length}
          </div>

          {activeStep < sortedSteps.length - 1 ? (
            <button
              className="btn-primary"
              onClick={() =>
                setActiveStep((v) => Math.min(sortedSteps.length - 1, v + 1))
              }
              style={{ fontSize: 12 }}
            >
              Next <ChevronRight size={13} />
            </button>
          ) : (
            <button
              className="btn-success"
              onClick={onClose}
              style={{ fontSize: 12 }}
            >
              {allDone ? "Done ✓" : "Close"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
