"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  title = "Confirm Delete",
  message,
  onConfirm,
  onCancel,
  loading,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 16,
          padding: 24,
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 20px 48px rgba(15,23,42,0.14)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(248,113,113,0.15)",
                border: "1px solid rgba(248,113,113,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle size={18} color="#f87171" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
              {title}
            </span>
          </div>
          <button
            onClick={onCancel}
            className="btn-icon"
            style={{ color: "#64748b" }}
          >
            <X size={16} />
          </button>
        </div>

        <p
          style={{
            fontSize: 14,
            color: "#475569",
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="btn-ghost">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger" disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
