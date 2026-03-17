"use client";

import React, { useState } from "react";
import { Workflow } from "lucide-react";
import { FlowDesigner } from "@/components/FlowDesigner";
import { FlowWizard } from "@/components/FlowWizard";
import { useSettings } from "@/lib/settings";
import { type Flow } from "@/lib/flows";

export default function FlowPage() {
  const { settings } = useSettings();
  const [activeFlow, setActiveFlow] = useState<Flow | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Page header */}
      <div
        style={{
          padding: "14px 24px",
          background: "white",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 3px 10px rgba(99,102,241,0.3)",
          }}
        >
          <Workflow size={18} color="white" />
        </div>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Flow Designer
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
            Build multi-step API flows with drag &amp; drop. Connect operations
            and execute them as a guided wizard.
          </p>
        </div>
      </div>

      {/* Designer canvas — fills remaining height */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <FlowDesigner onRunFlow={(flow) => setActiveFlow(flow)} />
      </div>

      {/* Wizard modal */}
      {activeFlow && (
        <FlowWizard
          flow={activeFlow}
          apiBase={settings.apiBaseUrl}
          onClose={() => setActiveFlow(null)}
        />
      )}
    </div>
  );
}
