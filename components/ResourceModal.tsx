"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Plus } from "lucide-react";
import { ResourceConfig } from "@/lib/resources";

interface ResourceModalProps {
  open: boolean;
  resource: ResourceConfig;
  mode: "create" | "edit";
  initialData?: Record<string, unknown>;
  onClose: () => void;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
}

export function ResourceModal({
  open,
  resource,
  mode,
  initialData,
  onClose,
  onSubmit,
}: ResourceModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        const flat: Record<string, string> = {};
        Object.entries(initialData).forEach(([k, v]) => {
          if (v !== null && v !== undefined) {
            flat[k] = typeof v === "object" ? JSON.stringify(v) : String(v);
          }
        });
        setFormData(flat);
        setJsonText(JSON.stringify(initialData, null, 2));
      } else {
        setFormData({});
        setJsonText("{}");
      }
      setJsonError("");
    }
  }, [open, mode, initialData]);

  if (!open) return null;

  const handleField = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data: Record<string, unknown>;
      if (jsonMode) {
        try {
          data = JSON.parse(jsonText);
        } catch {
          setJsonError("Invalid JSON");
          setLoading(false);
          return;
        }
      } else {
        data = { ...formData };
      }
      await onSubmit(data);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  // Infer form fields from initialData keys or common patterns
  const fields =
    mode === "edit" && initialData
      ? Object.keys(initialData).filter((k) => {
          const v = initialData[k];
          return typeof v !== "object" || v === null;
        })
      : ["name", "description"];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up"
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 20,
          width: "100%",
          maxWidth: 600,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(15,23,42,0.14)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px 16px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: resource.color,
                  boxShadow: `0 0 8px ${resource.color}`,
                }}
              />
              <span style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                {mode === "create" ? "Create" : "Edit"} {resource.label}
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
              {mode === "create"
                ? `POST ${resource.basePath}/`
                : `PUT ${resource.basePath}/{id}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setJsonMode(!jsonMode)}
              className="btn-ghost"
              style={{ fontSize: 11, padding: "5px 10px" }}
            >
              {jsonMode ? "Form View" : "JSON View"}
            </button>
            <button
              onClick={onClose}
              className="btn-icon"
              style={{ color: "#64748b" }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
          {jsonMode ? (
            <div>
              <label
                className="label-glass"
                style={{
                  color: "#475569",
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 8,
                  display: "block",
                }}
              >
                Request Body (JSON)
              </label>
              <textarea
                value={jsonText}
                onChange={(e) => {
                  setJsonText(e.target.value);
                  setJsonError("");
                }}
                className="input-glass"
                rows={18}
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  resize: "vertical",
                  lineHeight: 1.6,
                  color: "#0f172a",
                }}
                spellCheck={false}
              />
              {jsonError && (
                <p style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>
                  {jsonError}
                </p>
              )}
              <p style={{ color: "#475569", fontSize: 11, marginTop: 8 }}>
                💡 Enter the full request body as JSON. Refer to the API
                documentation for required fields.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {fields.map((key) => (
                <div key={key}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: 6,
                    }}
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input
                    className="input-glass"
                    value={formData[key] || ""}
                    onChange={(e) => handleField(key, e.target.value)}
                    placeholder={`Enter ${key}...`}
                  />
                </div>
              ))}
              {mode === "create" && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <div
                    style={{
                      padding: 12,
                      borderRadius: 10,
                    background: "rgba(99,102,241,0.06)",
                    border: "1px solid rgba(99,102,241,0.18)",
                    }}
                  >
                    <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>
                      💡 Switch to <strong>JSON View</strong> to provide the
                      complete request payload with all required fields for this
                      resource.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
          }}
        >
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              "Saving..."
            ) : mode === "create" ? (
              <>
                <Plus size={14} /> Create
              </>
            ) : (
              <>
                <Save size={14} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
