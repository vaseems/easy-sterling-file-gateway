"use client";

import React, { useState } from "react";
import { useSettings } from "@/lib/settings";
import { RESOURCE_CATEGORIES, RESOURCES } from "@/lib/resources";
import { LiquidBackground } from "@/components/LiquidBackground";
import { useToast } from "@/components/Toast";
import {
  Settings,
  Save,
  RotateCcw,
  Server,
  Eye,
  EyeOff,
  ToggleRight,
  SlidersHorizontal,
  Wrench,
  Globe,
  Database,
  Wifi,
  CheckCircle2,
  XCircle,
  Loader2,
  HeartPulse,
} from "lucide-react";

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className={`toggle-track ${on ? "on" : ""}`}
      onClick={() => onChange(!on)}
    >
      <div className="toggle-thumb" />
    </div>
  );
}

export default function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showDbPassword, setShowDbPassword] = useState(false);
  const [showSftpPassword, setShowSftpPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "api" | "features" | "display" | "advanced" | "database" | "healthcheck"
  >("api");
  const [dbStatus, setDbStatus] = useState<"idle" | "testing" | "ok" | "error">(
    "idle",
  );
  const [dbMessage, setDbMessage] = useState("");
  const [sftpStatus, setSftpStatus] = useState<
    "idle" | "testing" | "ok" | "error"
  >("idle");
  const [sftpMessage, setSftpMessage] = useState("");

  const tabs: { id: typeof activeTab; label: string; icon: React.ReactNode }[] =
    [
      { id: "api", label: "API Connection", icon: <Server size={14} /> },
      {
        id: "features",
        label: "Feature Flags",
        icon: <ToggleRight size={14} />,
      },
      {
        id: "display",
        label: "Display",
        icon: <SlidersHorizontal size={14} />,
      },
      { id: "advanced", label: "Advanced", icon: <Wrench size={14} /> },
      { id: "database", label: "Database", icon: <Database size={14} /> },
      {
        id: "healthcheck",
        label: "Health Check",
        icon: <HeartPulse size={14} />,
      },
    ];

  const handleTestDb = async () => {
    setDbStatus("testing");
    setDbMessage("");
    const testQuery =
      settings.dbDriver === "db2"
        ? "VALUES 1"
        : settings.dbDriver === "oracle"
          ? "SELECT 1 FROM DUAL"
          : "SELECT 1";
    try {
      const resp = await fetch("/api/db-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            driver: settings.dbDriver,
            host: settings.dbHost,
            port: settings.dbPort,
            name: settings.dbName,
            schema: settings.dbSchema,
            username: settings.dbUsername,
            password: settings.dbPassword,
          },
          query: testQuery,
        }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setDbStatus("ok");
        setDbMessage("Connection successful! Database is reachable.");
      } else {
        setDbStatus("error");
        setDbMessage(data.error ?? "Connection failed");
      }
    } catch (e) {
      setDbStatus("error");
      setDbMessage(String(e));
    }
  };

  const handleTestSftp = async () => {
    setSftpStatus("testing");
    setSftpMessage("");
    try {
      const resp = await fetch("/api/sftp-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: settings.sftpHost,
          port: settings.sftpPort,
          username: settings.sftpUsername,
          password: settings.sftpPassword,
          testPath: settings.sftpTestPath,
        }),
      });
      const data = await resp.json();
      if (resp.ok && data.status === "connected") {
        setSftpStatus("ok");
        setSftpMessage(data.message ?? "SFTP connection successful!");
      } else {
        setSftpStatus("error");
        setSftpMessage(data.message ?? data.error ?? "SFTP connection failed");
      }
    } catch (e) {
      setSftpStatus("error");
      setSftpMessage(String(e));
    }
  };

  const handleSave = () => {
    toast("Settings saved successfully!", "success");
  };

  const handleReset = () => {
    resetSettings();
    toast("Settings reset to defaults", "info");
  };

  const toggleCategory = (cat: string, val: boolean) => {
    updateSettings({
      enabledCategories: {
        ...settings.enabledCategories,
        [cat]: val,
      },
    });
  };

  const toggleAllCategories = (val: boolean) => {
    const all = Object.fromEntries(
      Object.keys(RESOURCE_CATEGORIES).map((k) => [k, val]),
    );
    updateSettings({ enabledCategories: all });
  };

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", padding: "28px 24px" }}
    >
      <LiquidBackground color1="#667eea" color2="#0f172a" color3="#764ba2" />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
              }}
            >
              <Settings size={20} color="white" />
            </div>
            <div>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Settings
              </h1>
              <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>
                Configure API connection, features & display
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleReset} className="btn-ghost">
              <RotateCcw size={14} /> Reset
            </button>
            <button onClick={handleSave} className="btn-primary">
              <Save size={14} /> Save Settings
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            marginBottom: 20,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: 4,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "7px 14px",
                borderRadius: 9,
                fontSize: 12,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                background:
                  activeTab === tab.id
                    ? "linear-gradient(135deg,#667eea,#764ba2)"
                    : "transparent",
                color: activeTab === tab.id ? "white" : "#64748b",
                boxShadow:
                  activeTab === tab.id
                    ? "0 4px 12px rgba(102,126,234,0.35)"
                    : "none",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* API Connection Tab */}
        {activeTab === "api" && (
          <div className="animate-slide-up">
            <div
              className="glass-card"
              style={{ padding: 24, marginBottom: 16 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                <Globe size={16} color="#667eea" />
                <span
                  style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
                >
                  API Server Configuration
                </span>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
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
                    Base URL
                  </label>
                  <input
                    className="input-glass"
                    value={settings.apiBaseUrl}
                    onChange={(e) =>
                      updateSettings({ apiBaseUrl: e.target.value })
                    }
                    placeholder="https://your-server.com/B2BAPIs/svc"
                  />
                  <p style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>
                    The base URL of the Sterling B2B Integrator REST API server.
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
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
                      Username
                    </label>
                    <input
                      className="input-glass"
                      value={settings.apiUsername}
                      onChange={(e) =>
                        updateSettings({ apiUsername: e.target.value })
                      }
                      placeholder="API username"
                      autoComplete="username"
                    />
                  </div>
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
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        className="input-glass"
                        type={showPassword ? "text" : "password"}
                        value={settings.apiPassword}
                        onChange={(e) =>
                          updateSettings({ apiPassword: e.target.value })
                        }
                        placeholder="API password"
                        autoComplete="current-password"
                        style={{ paddingRight: 40 }}
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: 10,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "transparent",
                          border: "none",
                          color: "#475569",
                          cursor: "pointer",
                          display: "flex",
                        }}
                      >
                        {showPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection test placeholder */}
            <div
              className="glass-card"
              style={{
                padding: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: settings.apiUsername ? "#34d399" : "#f59e0b",
                  boxShadow: settings.apiUsername
                    ? "0 0 8px #34d399"
                    : "0 0 8px #f59e0b",
                  flexShrink: 0,
                }}
              />
              <div>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>
                  {settings.apiUsername
                    ? `Configured as: ${settings.apiUsername}@${new URL(settings.apiBaseUrl).hostname}`
                    : "No credentials configured – set username and password above"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Feature Flags Tab */}
        {activeTab === "features" && (
          <div className="animate-slide-up">
            <div
              className="glass-card"
              style={{ padding: 20, marginBottom: 16 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
                  >
                    Resource Category Visibility
                  </div>
                  <p style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>
                    Toggle entire resource categories on or off. Disabled
                    categories will be hidden from the sidebar and navigation.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => toggleAllCategories(true)}
                    className="btn-ghost"
                    style={{ fontSize: 11, padding: "5px 10px" }}
                  >
                    Enable All
                  </button>
                  <button
                    onClick={() => toggleAllCategories(false)}
                    className="btn-ghost"
                    style={{ fontSize: 11, padding: "5px 10px" }}
                  >
                    Disable All
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: 10,
                }}
              >
                {Object.entries(RESOURCE_CATEGORIES).map(([catKey, cat]) => {
                  const enabled = settings.enabledCategories[catKey] !== false;
                  const count = RESOURCES.filter(
                    (r) => r.category === catKey,
                  ).length;
                  const CatIcon = cat.icon;

                  return (
                    <div
                      key={catKey}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        borderRadius: 12,
                        background: enabled ? "#f8fafc" : "#f1f5f9",
                        border: `1px solid ${enabled ? "#e2e8f0" : "#f8fafc"}`,
                        transition: "all 0.2s",
                        opacity: enabled ? 1 : 0.5,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: `${cat.color}15`,
                          border: `1px solid ${cat.color}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <CatIcon
                          size={16}
                          color={cat.color}
                          strokeWidth={1.75}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#0f172a",
                          }}
                        >
                          {cat.label}
                        </div>
                        <div style={{ fontSize: 11, color: "#475569" }}>
                          {count} resource{count !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <Toggle
                        on={enabled}
                        onChange={(v) => toggleCategory(catKey, v)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Display Tab */}
        {activeTab === "display" && (
          <div className="animate-slide-up">
            <div className="glass-card" style={{ padding: 24 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 20,
                }}
              >
                Display Preferences
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                {/* Items per page */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      Items Per Page
                    </div>
                    <div style={{ fontSize: 12, color: "#475569" }}>
                      Number of records shown per page
                    </div>
                  </div>
                  <select
                    className="input-glass"
                    value={settings.itemsPerPage}
                    onChange={(e) =>
                      updateSettings({ itemsPerPage: Number(e.target.value) })
                    }
                    style={{ width: 100, cursor: "pointer" }}
                  >
                    {[10, 20, 50, 100].map((n) => (
                      <option
                        key={n}
                        value={n}
                        style={{ background: "#ffffff" }}
                      >
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Show JSON view */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      JSON View in Tables
                    </div>
                    <div style={{ fontSize: 12, color: "#475569" }}>
                      Show JSON viewer button next to each row by default
                    </div>
                  </div>
                  <Toggle
                    on={settings.showJsonView}
                    onChange={(v) => updateSettings({ showJsonView: v })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === "advanced" && (
          <div className="animate-slide-up">
            <div
              className="glass-card"
              style={{ padding: 24, marginBottom: 16 }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 20,
                }}
              >
                Auto Refresh
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      Enable Auto Refresh
                    </div>
                    <div style={{ fontSize: 12, color: "#475569" }}>
                      Automatically refresh resource data at set interval
                    </div>
                  </div>
                  <Toggle
                    on={settings.autoRefresh}
                    onChange={(v) => updateSettings({ autoRefresh: v })}
                  />
                </div>

                {settings.autoRefresh && (
                  <div
                    className="animate-slide-up"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#0f172a",
                        }}
                      >
                        Refresh Interval (seconds)
                      </div>
                    </div>
                    <input
                      className="input-glass"
                      type="number"
                      min={10}
                      max={300}
                      value={settings.refreshInterval}
                      onChange={(e) =>
                        updateSettings({
                          refreshInterval: Number(e.target.value),
                        })
                      }
                      style={{ width: 100, textAlign: "right" }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Danger Zone */}
            <div
              className="glass-card"
              style={{
                padding: 24,
                border: "1px solid rgba(248,113,113,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#f87171",
                  marginBottom: 8,
                }}
              >
                Danger Zone
              </div>
              <p style={{ fontSize: 13, color: "#475569", marginBottom: 16 }}>
                Reset all settings to their default values. This cannot be
                undone.
              </p>
              <button onClick={handleReset} className="btn-danger">
                <RotateCcw size={14} /> Reset All Settings
              </button>
            </div>
          </div>
        )}

        {/* ── Database Tab ───────────────────────────────────────────────────── */}
        {activeTab === "database" && (
          <div className="animate-slide-up">
            <div
              className="glass-card"
              style={{ padding: 24, marginBottom: 16 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <Database size={16} color="#667eea" />
                <span
                  style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
                >
                  Database Connection
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#475569", marginBottom: 20 }}>
                Connect to the SFG database to power the configurable Dashboard
                page with live data. All credentials are stored locally in your
                browser.
              </p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {/* Driver */}
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
                    Database Driver
                  </label>
                  <select
                    className="input-glass"
                    value={settings.dbDriver}
                    onChange={(e) =>
                      updateSettings({
                        dbDriver: e.target.value as
                          | "postgresql"
                          | "mysql"
                          | "mssql"
                          | "db2"
                          | "oracle",
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <option value="db2">IBM DB2</option>
                    <option value="oracle">Oracle</option>
                    <option value="mssql">Microsoft SQL Server</option>
                    <option value="postgresql">PostgreSQL</option>
                    <option value="mysql">MySQL / MariaDB</option>
                  </select>
                  <p style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>
                    {settings.dbDriver === "db2" &&
                      "Server package: ibm_db  — requires IBM Data Server Client"}
                    {settings.dbDriver === "oracle" &&
                      "Server package: oracledb  — requires Oracle Instant Client"}
                    {settings.dbDriver === "mssql" && "Server package: mssql"}
                    {settings.dbDriver === "postgresql" && "Server package: pg"}
                    {settings.dbDriver === "mysql" && "Server package: mysql2"}
                  </p>
                </div>

                {/* Host + Port */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 120px",
                    gap: 14,
                  }}
                >
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
                      Host
                    </label>
                    <input
                      className="input-glass"
                      value={settings.dbHost}
                      onChange={(e) =>
                        updateSettings({ dbHost: e.target.value })
                      }
                      placeholder="db.example.com"
                    />
                  </div>
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
                      Port
                    </label>
                    <input
                      className="input-glass"
                      value={settings.dbPort}
                      onChange={(e) =>
                        updateSettings({ dbPort: e.target.value })
                      }
                      placeholder="50000"
                    />
                  </div>
                </div>

                {/* DB Name + Schema */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
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
                      Database / Service Name
                    </label>
                    <input
                      className="input-glass"
                      value={settings.dbName}
                      onChange={(e) =>
                        updateSettings({ dbName: e.target.value })
                      }
                      placeholder="SAMPLEDB"
                    />
                  </div>
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
                      Schema / Owner
                    </label>
                    <input
                      className="input-glass"
                      value={settings.dbSchema}
                      onChange={(e) =>
                        updateSettings({ dbSchema: e.target.value })
                      }
                      placeholder="SFG_OWNER"
                    />
                  </div>
                </div>

                {/* Username + Password */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
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
                      Username
                    </label>
                    <input
                      className="input-glass"
                      value={settings.dbUsername}
                      onChange={(e) =>
                        updateSettings({ dbUsername: e.target.value })
                      }
                      placeholder="sfg_user"
                      autoComplete="username"
                    />
                  </div>
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
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        className="input-glass"
                        type={showDbPassword ? "text" : "password"}
                        value={settings.dbPassword}
                        onChange={(e) =>
                          updateSettings({ dbPassword: e.target.value })
                        }
                        placeholder="database password"
                        autoComplete="current-password"
                        style={{ paddingRight: 40 }}
                      />
                      <button
                        onClick={() => setShowDbPassword(!showDbPassword)}
                        style={{
                          position: "absolute",
                          right: 10,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "transparent",
                          border: "none",
                          color: "#475569",
                          cursor: "pointer",
                          display: "flex",
                        }}
                      >
                        {showDbPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Test DB Connection */}
            <div
              className="glass-card"
              style={{
                padding: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {dbStatus === "testing" && (
                <Loader2
                  size={16}
                  color="#667eea"
                  style={{ animation: "spin 1s linear infinite" }}
                />
              )}
              {dbStatus === "ok" && <CheckCircle2 size={16} color="#10b981" />}
              {dbStatus === "error" && <XCircle size={16} color="#ef4444" />}
              {dbStatus === "idle" && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#cbd5e1",
                    flexShrink: 0,
                  }}
                />
              )}
              <span
                style={{
                  flex: 1,
                  fontSize: 13,
                  color:
                    dbStatus === "ok"
                      ? "#10b981"
                      : dbStatus === "error"
                        ? "#ef4444"
                        : "#94a3b8",
                }}
              >
                {dbStatus === "idle" &&
                  "Click 'Test Connection' to verify the database settings."}
                {dbStatus === "testing" && "Connecting to database…"}
                {dbStatus === "ok" && dbMessage}
                {dbStatus === "error" && dbMessage}
              </span>
              <button
                onClick={handleTestDb}
                className="btn-primary"
                disabled={!settings.dbHost || dbStatus === "testing"}
              >
                {dbStatus === "testing" ? "Testing…" : "Test Connection"}
              </button>
            </div>
          </div>
        )}

        {/* ── Health Check Tab ───────────────────────────────────────────────── */}
        {activeTab === "healthcheck" && (
          <div className="animate-slide-up">
            <div
              className="glass-card"
              style={{ padding: 24, marginBottom: 16 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <Wifi size={16} color="#667eea" />
                <span
                  style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
                >
                  SFTP Health Check
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#475569", marginBottom: 20 }}>
                Verify connectivity to the SFG SFTP server by uploading a tiny
                test file and then deleting it. The server needs the{" "}
                <strong>ssh2</strong> npm package installed (
                <code
                  style={{
                    fontSize: 11,
                    background: "#f1f5f9",
                    padding: "1px 4px",
                    borderRadius: 4,
                  }}
                >
                  npm install ssh2
                </code>
                ).
              </p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {/* Host + Port */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 120px",
                    gap: 14,
                  }}
                >
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
                      SFTP Host
                    </label>
                    <input
                      className="input-glass"
                      value={settings.sftpHost}
                      onChange={(e) =>
                        updateSettings({ sftpHost: e.target.value })
                      }
                      placeholder="sftp.example.com"
                    />
                  </div>
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
                      Port
                    </label>
                    <input
                      className="input-glass"
                      value={settings.sftpPort}
                      onChange={(e) =>
                        updateSettings({ sftpPort: e.target.value })
                      }
                      placeholder="22"
                    />
                  </div>
                </div>

                {/* Username + Password */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
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
                      Username
                    </label>
                    <input
                      className="input-glass"
                      value={settings.sftpUsername}
                      onChange={(e) =>
                        updateSettings({ sftpUsername: e.target.value })
                      }
                      placeholder="sftp_user"
                      autoComplete="username"
                    />
                  </div>
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
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        className="input-glass"
                        type={showSftpPassword ? "text" : "password"}
                        value={settings.sftpPassword}
                        onChange={(e) =>
                          updateSettings({ sftpPassword: e.target.value })
                        }
                        placeholder="sftp password"
                        autoComplete="current-password"
                        style={{ paddingRight: 40 }}
                      />
                      <button
                        onClick={() => setShowSftpPassword(!showSftpPassword)}
                        style={{
                          position: "absolute",
                          right: 10,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "transparent",
                          border: "none",
                          color: "#475569",
                          cursor: "pointer",
                          display: "flex",
                        }}
                      >
                        {showSftpPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Test Path */}
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
                    Upload Test Path
                  </label>
                  <input
                    className="input-glass"
                    value={settings.sftpTestPath}
                    onChange={(e) =>
                      updateSettings({ sftpTestPath: e.target.value })
                    }
                    placeholder="/upload"
                  />
                  <p style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>
                    A writable directory on the SFTP server where a temporary
                    test file will be created and immediately deleted.
                  </p>
                </div>
              </div>
            </div>

            {/* SFTP Test Result */}
            <div
              className="glass-card"
              style={{
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 14,
                border:
                  sftpStatus === "ok"
                    ? "1px solid rgba(52,211,153,0.35)"
                    : sftpStatus === "error"
                      ? "1px solid rgba(248,113,113,0.35)"
                      : "1px solid #e2e8f0",
              }}
            >
              {sftpStatus === "testing" && (
                <Loader2
                  size={20}
                  color="#667eea"
                  style={{
                    animation: "spin 1s linear infinite",
                    flexShrink: 0,
                  }}
                />
              )}
              {sftpStatus === "ok" && (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "#d1fae5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={20} color="#10b981" />
                </div>
              )}
              {sftpStatus === "error" && (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "#fee2e2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <XCircle size={20} color="#ef4444" />
                </div>
              )}
              {sftpStatus === "idle" && (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Wifi size={20} color="#94a3b8" />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color:
                      sftpStatus === "ok"
                        ? "#10b981"
                        : sftpStatus === "error"
                          ? "#ef4444"
                          : "#0f172a",
                    marginBottom: 2,
                  }}
                >
                  {sftpStatus === "idle" && "Not tested"}
                  {sftpStatus === "testing" && "Testing SFTP connection…"}
                  {sftpStatus === "ok" && "Connected"}
                  {sftpStatus === "error" && "Connection Failed"}
                </div>
                <div style={{ fontSize: 12, color: "#475569" }}>
                  {sftpStatus === "idle" &&
                    "Enter your SFTP credentials above and click the button to test."}
                  {sftpStatus === "testing" &&
                    "Connecting and uploading test file…"}
                  {(sftpStatus === "ok" || sftpStatus === "error") &&
                    sftpMessage}
                </div>
              </div>
              <button
                onClick={handleTestSftp}
                className="btn-primary"
                disabled={!settings.sftpHost || sftpStatus === "testing"}
              >
                {sftpStatus === "testing" ? "Testing…" : "Test SFTP Connection"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
