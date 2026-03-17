import Link from "next/link";
import {
  RESOURCES,
  RESOURCE_CATEGORIES,
  getResourcesByCategory,
} from "@/lib/resources";
import { LiquidBackground } from "@/components/LiquidBackground";
import {
  Database,
  ArrowRight,
  Settings,
  Workflow,
  Users2,
  User,
  Boxes,
  FilePen,
  BookOpen,
  LayoutGrid,
} from "lucide-react";

export default function Home() {
  const resourcesByCategory = getResourcesByCategory();
  const totalResources = RESOURCES.length;
  const crudResources = RESOURCES.filter(
    (r) => r.operations.length >= 4,
  ).length;
  const readOnlyResources = RESOURCES.filter(
    (r) => r.operations.length === 1,
  ).length;

  const stats = [
    {
      label: "Total Resources",
      value: totalResources,
      Icon: Boxes,
      color: "#667eea",
    },
    {
      label: "Full CRUD",
      value: crudResources,
      Icon: FilePen,
      color: "#10b981",
    },
    {
      label: "Read-Only",
      value: readOnlyResources,
      Icon: BookOpen,
      color: "#06b6d4",
    },
    {
      label: "Categories",
      value: Object.keys(RESOURCE_CATEGORIES).length,
      Icon: LayoutGrid,
      color: "#f59e0b",
    },
  ];

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", padding: "32px 28px" }}
    >
      <LiquidBackground color1="#667eea" color2="#764ba2" color3="#06b6d4" />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
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
              }}
            >
              <Database size={22} color="white" />
            </div>
            <div>
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Overview
              </h1>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                System resource overview and quick access
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-card"
              style={{
                padding: "20px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${s.color}20`,
                  border: `1px solid ${s.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <s.Icon size={22} color={s.color} strokeWidth={1.75} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          <Link href="/settings" style={{ textDecoration: "none" }}>
            <button className="btn-primary">
              <Settings size={14} /> Manage Settings
            </button>
          </Link>
          <Link href="/flow" style={{ textDecoration: "none" }}>
            <button
              className="btn-primary"
              style={{ background: "linear-gradient(135deg,#7c3aed,#6366f1)" }}
            >
              <Workflow size={14} /> Flow Designer
            </button>
          </Link>
          <Link
            href={`/resources/TradingPartner`}
            style={{ textDecoration: "none" }}
          >
            <button className="btn-ghost">
              <Users2 size={14} /> Trading Partners <ArrowRight size={12} />
            </button>
          </Link>
          <Link
            href={`/resources/UserAccount`}
            style={{ textDecoration: "none" }}
          >
            <button className="btn-ghost">
              <User size={14} /> User Accounts <ArrowRight size={12} />
            </button>
          </Link>
        </div>

        {/* Resource Categories */}
        <div style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#94a3b8",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Resource Categories
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 14,
            }}
          >
            {Object.entries(resourcesByCategory).map(([catKey, resources]) => {
              const cat = RESOURCE_CATEGORIES[catKey];
              const CatIcon = cat.icon;
              return (
                <div
                  key={catKey}
                  className="glass-card"
                  style={{
                    padding: 20,
                    borderTop: `3px solid ${cat.color}`,
                    transition: "all 0.25s",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <CatIcon size={18} color={cat.color} strokeWidth={1.75} />
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {cat.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        background: `${cat.color}20`,
                        color: cat.color,
                        border: `1px solid ${cat.color}40`,
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontWeight: 700,
                      }}
                    >
                      {resources.length}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {resources.slice(0, 6).map((r) => (
                      <Link
                        key={r.tag}
                        href={`/resources/${r.tag}`}
                        style={{
                          textDecoration: "none",
                          fontSize: 11,
                          padding: "3px 10px",
                          borderRadius: 6,
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          color: "#475569",
                          display: "inline-block",
                        }}
                      >
                        {r.label}
                      </Link>
                    ))}
                    {resources.length > 6 && (
                      <span
                        style={{
                          fontSize: 11,
                          padding: "3px 10px",
                          borderRadius: 6,
                          background: "#f1f5f9",
                          color: "#94a3b8",
                          display: "inline-block",
                        }}
                      >
                        +{resources.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* API Info Footer */}
        <div
          className="glass-card"
          style={{
            padding: "16px 20px",
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
              background: "#34d399",
              boxShadow: "0 0 8px #34d399",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 12, color: "#475569" }}>
            <strong style={{ color: "#0f172a" }}>API Base:</strong>{" "}
            https://b2birestapi-mrc-sfg-qa.apps.sfglowerqa.openshift.mrcooper.io/B2BAPIs/svc
          </span>
          <Link
            href="/settings"
            style={{ textDecoration: "none", marginLeft: "auto" }}
          >
            <span style={{ fontSize: 11, color: "#667eea", cursor: "pointer" }}>
              Configure →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
