"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/lib/settings";
import {
  RESOURCES,
  RESOURCE_CATEGORIES,
  getResourcesByCategory,
} from "@/lib/resources";
import {
  Settings,
  ChevronDown,
  ChevronRight,
  Database,
  Home,
  Menu,
  X,
  Workflow,
  LayoutDashboard,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { isCategoryEnabled } = useSettings();
  const [collapsed, setCollapsed] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {},
  );
  const [search, setSearch] = useState("");
  const resourcesByCategory = getResourcesByCategory();

  const toggleCategory = (cat: string) =>
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const filteredResources = search.trim()
    ? RESOURCES.filter(
        (r) =>
          r.label.toLowerCase().includes(search.toLowerCase()) ||
          r.tag.toLowerCase().includes(search.toLowerCase()),
      )
    : null;

  const w = collapsed ? 58 : 268;

  return (
    <div
      style={{
        width: w,
        minWidth: w,
        maxWidth: w,
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRight: "1px solid #e2e8f0",
        transition: "width 0.28s cubic-bezier(0.16,1,0.3,1)",
        overflow: "hidden",
        zIndex: 40,
        boxShadow: "2px 0 8px rgba(15,23,42,0.04)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 12px",
          borderBottom: "1px solid #e2e8f0",
          minHeight: 60,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            flexShrink: 0,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 3px 10px rgba(99,102,241,0.35)",
          }}
        >
          <Database size={17} color="white" />
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#0f172a",
                whiteSpace: "nowrap",
              }}
            >
              Sterling B2B
            </div>
            <div
              style={{ fontSize: 10, color: "#94a3b8", whiteSpace: "nowrap" }}
            >
              Easy Web Manager
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          style={{
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            padding: 4,
            borderRadius: 6,
            flexShrink: 0,
            display: "flex",
          }}
        >
          {collapsed ? <Menu size={15} /> : <X size={15} />}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div style={{ padding: "10px 10px 6px" }}>
          <input
            className="input-glass"
            placeholder="🔍  Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: 12, padding: "6px 11px" }}
          />
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, overflow: "auto", padding: "4px 8px" }}>
        <NavItem
          href="/"
          icon={<Home size={15} />}
          label="Overview"
          active={pathname === "/"}
          collapsed={collapsed}
        />
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard size={15} />}
          label="Dashboard"
          active={pathname?.startsWith("/dashboard")}
          collapsed={collapsed}
        />
        <NavItem
          href="/flow"
          icon={<Workflow size={15} />}
          label="Flow Designer"
          active={pathname?.startsWith("/flow")}
          collapsed={collapsed}
          accent
        />

        {!collapsed && (
          <div
            style={{
              margin: "10px 2px 4px",
              fontSize: 10,
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Resources
          </div>
        )}
        {collapsed && (
          <div style={{ margin: "4px 0", borderTop: "1px solid #e2e8f0" }} />
        )}

        {/* Search results */}
        {filteredResources
          ? filteredResources.map((r) => (
              <Link
                key={r.tag}
                href={`/resources/${r.tag}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className={`sidebar-item ${pathname === `/resources/${r.tag}` ? "sidebar-item-active" : ""}`}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: r.color,
                      flexShrink: 0,
                    }}
                  />
                  {!collapsed && (
                    <span
                      style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {r.label}
                    </span>
                  )}
                </div>
              </Link>
            ))
          : Object.entries(resourcesByCategory).map(([catKey, resources]) => {
              const cat = RESOURCE_CATEGORIES[catKey];
              const enabled = isCategoryEnabled(catKey);
              const open = openCategories[catKey] !== false;
              const CatIcon = cat.icon;
              return (
                <div key={catKey} style={{ marginBottom: 1 }}>
                  <div
                    onClick={() => toggleCategory(catKey)}
                    className="sidebar-item"
                    style={{
                      opacity: enabled ? 1 : 0.35,
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          display: "flex",
                          color: cat.color,
                        }}
                      >
                        <CatIcon size={14} strokeWidth={1.75} />
                      </span>
                      {!collapsed && (
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: 12,
                            color: "#475569",
                          }}
                        >
                          {cat.label}
                        </span>
                      )}
                    </div>
                    {!collapsed && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            background: "#f1f5f9",
                            borderRadius: 4,
                            padding: "1px 5px",
                            color: "#94a3b8",
                          }}
                        >
                          {resources.length}
                        </span>
                        {open ? (
                          <ChevronDown size={11} />
                        ) : (
                          <ChevronRight size={11} />
                        )}
                      </div>
                    )}
                  </div>
                  {!collapsed &&
                    open &&
                    enabled &&
                    resources.map((r) => (
                      <Link
                        key={r.tag}
                        href={`/resources/${r.tag}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className={`sidebar-item ${pathname === `/resources/${r.tag}` ? "sidebar-item-active" : ""}`}
                          style={{ paddingLeft: 26, marginLeft: 4 }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: r.color,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {r.label}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              );
            })}
      </nav>

      {/* Settings */}
      <div style={{ padding: "8px 8px", borderTop: "1px solid #e2e8f0" }}>
        <Link href="/settings" style={{ textDecoration: "none" }}>
          <div
            className={`sidebar-item ${pathname === "/settings" ? "sidebar-item-active" : ""}`}
          >
            <Settings size={15} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Settings</span>}
          </div>
        </Link>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
  collapsed,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  accent?: boolean;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div
        className={`sidebar-item ${active ? "sidebar-item-active" : ""}`}
        style={accent && !active ? { color: "#7c3aed", fontWeight: 600 } : {}}
      >
        <span
          style={{
            flexShrink: 0,
            color: accent && !active ? "#7c3aed" : undefined,
          }}
        >
          {icon}
        </span>
        {!collapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
