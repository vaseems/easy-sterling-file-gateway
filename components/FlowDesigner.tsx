"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  Panel,
  type Connection,
  type NodeTypes,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Save,
  Play,
  Trash2,
  Plus,
  ChevronDown,
  ChevronRight,
  Workflow,
  X,
} from "lucide-react";

import {
  type Flow,
  type FlowNode,
  type FlowEdge as FlowEdgeType,
  OPERATION_LABELS,
  OPERATION_BADGE_CLASS,
  loadFlows,
  saveFlow,
  deleteFlow,
  newId,
  DEFAULT_SFTP_FLOW,
} from "@/lib/flows";
import {
  RESOURCES,
  RESOURCE_CATEGORIES,
  type ResourceConfig,
} from "@/lib/resources";

// ─── Custom node ──────────────────────────────────────────────────────────────

function ApiNodeComponent({ data, selected }: NodeProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = data as any;
  const fn: FlowNode = d.flowNode;
  const op = fn.operation;
  return (
    <div
      className={`flow-node${selected ? " selected" : ""}`}
      style={{ borderTopColor: fn.color, borderTopWidth: 3 }}
    >
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: "10px 12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <span className={`badge ${OPERATION_BADGE_CLASS[op]}`}>
            {OPERATION_LABELS[op]}
          </span>
          <button
            onClick={() => d.onDelete(fn.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ef4444",
              padding: 0,
              opacity: 0.7,
              display: "flex",
            }}
          >
            <X size={12} />
          </button>
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 12,
            color: "#0f172a",
            lineHeight: 1.3,
          }}
        >
          {fn.operationLabel}
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
          {fn.resourceLabel}
        </div>
        {fn.description && (
          <div
            style={{
              fontSize: 10,
              color: "#cbd5e1",
              marginTop: 4,
              lineHeight: 1.3,
            }}
          >
            {fn.description}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const nodeTypes: NodeTypes = { apiNode: ApiNodeComponent };

// ─── API tile ────────────────────────────────────────────────────────────────

function ApiTile({
  resource,
  operation,
}: {
  resource: ResourceConfig;
  operation: string;
}) {
  const op = operation as FlowNode["operation"];
  return (
    <div
      className="api-tile"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({
            resourceTag: resource.tag,
            resourceLabel: resource.label,
            operation: op,
            operationLabel: `${op.charAt(0).toUpperCase() + op.slice(1)} ${resource.label}`,
            color: resource.color,
          }),
        );
        e.dataTransfer.effectAllowed = "copy";
      }}
    >
      <span
        className={`badge ${OPERATION_BADGE_CLASS[op]}`}
        style={{ fontSize: 9, minWidth: 34 }}
      >
        {OPERATION_LABELS[op]}
      </span>
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {resource.label}
      </span>
    </div>
  );
}

// ─── Saved flow card ─────────────────────────────────────────────────────────

function SavedFlowCard({
  flow,
  onLoad,
  onRun,
  onDelete,
}: {
  flow: Flow;
  onLoad: (f: Flow) => void;
  onRun: (f: Flow) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="card"
      style={{ padding: "12px 14px", marginBottom: 8, cursor: "pointer" }}
      onClick={() => onLoad(flow)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 3,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: flow.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: 12,
                color: "#0f172a",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {flow.name}
            </span>
          </div>
          {flow.description && (
            <p
              style={{
                fontSize: 11,
                color: "#94a3b8",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {flow.description}
            </p>
          )}
          <div style={{ fontSize: 10, color: "#cbd5e1", marginTop: 4 }}>
            {flow.nodes.length} steps · {flow.edges.length} connections
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRun(flow);
            }}
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "none",
              borderRadius: 6,
              padding: "4px 8px",
              cursor: "pointer",
              color: "#6366f1",
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            <Play size={10} /> Run
          </button>
          {flow.id !== DEFAULT_SFTP_FLOW.id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(flow.id);
              }}
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "none",
                borderRadius: 6,
                padding: "4px 6px",
                cursor: "pointer",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Trash2 size={11} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Inner component (inside ReactFlowProvider) ───────────────────────────────

interface FlowDesignerProps {
  onRunFlow: (flow: Flow) => void;
}

function FlowDesignerInner({ onRunFlow }: FlowDesignerProps) {
  const { screenToFlowPosition, fitView } = useReactFlow();
  const canvasRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);

  const [flowName, setFlowName] = useState("My Flow");
  const [flowDesc, setFlowDesc] = useState("");
  const [currentFlowId, setCurrentFlowId] = useState<string>(newId());
  const [savedFlows, setSavedFlows] = useState<Flow[]>([]);
  const [leftSearch, setLeftSearch] = useState("");
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [savedPanelOpen, setSavedPanelOpen] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    setSavedFlows(loadFlows());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const makeNodes = (
    flowNodes: FlowNode[],
    onDel: (id: string) => void,
  ): any[] =>
    flowNodes.map((fn) => ({
      id: fn.id,
      type: "apiNode",
      position: fn.position,
      data: { flowNode: fn, onDelete: onDel },
    }));

  const makeDeleter = useCallback(
    () => (id: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setNodes((nds: any[]) => nds.filter((n) => n.id !== id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setEdges((eds: any[]) =>
        eds.filter((e) => e.source !== id && e.target !== id),
      );
      setIsDirty(true);
    },
    [setNodes, setEdges],
  );

  const loadFlowIntoCanvas = useCallback(
    (flow: Flow) => {
      const del = makeDeleter();
      setNodes(makeNodes(flow.nodes, del));
      setEdges(
        flow.edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          animated: true,
        })),
      );
      setFlowName(flow.name);
      setFlowDesc(flow.description ?? "");
      setCurrentFlowId(flow.id);
      setIsDirty(false);
      setTimeout(() => fitView({ padding: 0.15 }), 100);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [makeDeleter, fitView],
  );

  useEffect(() => {
    loadFlowIntoCanvas(DEFAULT_SFTP_FLOW);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onConnect = useCallback(
    (c: Connection) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setEdges((eds: any[]) => addEdge({ ...c, animated: true }, eds));
      setIsDirty(true);
    },
    [setEdges],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData("application/json");
      if (!raw || !canvasRef.current) return;
      const d = JSON.parse(raw) as {
        resourceTag: string;
        resourceLabel: string;
        operation: FlowNode["operation"];
        operationLabel: string;
        color: string;
      };
      const bounds = canvasRef.current.getBoundingClientRect();
      const pos = screenToFlowPosition({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });
      const id = newId();
      const fn: FlowNode = { id, ...d, position: pos };
      const del = makeDeleter();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setNodes((nds: any[]) => [
        ...nds,
        {
          id,
          type: "apiNode",
          position: pos,
          data: { flowNode: fn, onDelete: del },
        },
      ]);
      setIsDirty(true);
    },
    [screenToFlowPosition, makeDeleter, setNodes],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractFlowNodes = (nds: any[]): FlowNode[] =>
    nds.map((n) => ({ ...n.data.flowNode, position: n.position }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractFlowEdges = (eds: any[]): FlowEdgeType[] =>
    eds.map((e) => ({ id: e.id, source: e.source, target: e.target }));

  const handleSave = useCallback(() => {
    const flow: Flow = {
      id: currentFlowId,
      name: flowName || "Untitled Flow",
      description: flowDesc,
      color: "#6366f1",
      nodes: extractFlowNodes(nodes),
      edges: extractFlowEdges(edges),
      createdAt:
        savedFlows.find((f) => f.id === currentFlowId)?.createdAt ??
        new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSavedFlows(saveFlow(flow));
    setIsDirty(false);
    setSaveMsg("Saved ✓");
    setTimeout(() => setSaveMsg(""), 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges, currentFlowId, flowName, flowDesc, savedFlows]);

  const handleNewFlow = () => {
    setNodes([]);
    setEdges([]);
    setFlowName("New Flow");
    setFlowDesc("");
    setCurrentFlowId(newId());
    setIsDirty(false);
  };

  const handleDeleteSaved = (id: string) => {
    setSavedFlows(deleteFlow(id));
    if (currentFlowId === id) handleNewFlow();
  };

  const handleRunCurrent = () =>
    onRunFlow({
      id: currentFlowId,
      name: flowName,
      description: flowDesc,
      color: "#6366f1",
      nodes: extractFlowNodes(nodes),
      edges: extractFlowEdges(edges),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

  const filteredCats = Object.entries(RESOURCE_CATEGORIES)
    .map(([catKey, cat]) => ({
      catKey,
      cat,
      resources: RESOURCES.filter(
        (r) =>
          r.category === catKey &&
          (!leftSearch.trim() ||
            r.label.toLowerCase().includes(leftSearch.toLowerCase())),
      ),
    }))
    .filter(({ resources }) => resources.length > 0);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        overflow: "hidden",
        background: "#f8fafc",
      }}
    >
      {/* Left: API Tiles */}
      <div
        style={{
          width: leftCollapsed ? 42 : 260,
          minWidth: leftCollapsed ? 42 : 260,
          background: "#fff",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 10px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          {!leftCollapsed && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              API Operations
            </span>
          )}
          <button
            onClick={() => setLeftCollapsed((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94a3b8",
              display: "flex",
              marginLeft: "auto",
            }}
          >
            {leftCollapsed ? (
              <ChevronRight size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>
        </div>
        {!leftCollapsed && (
          <>
            <div style={{ padding: "8px 8px 4px" }}>
              <input
                className="input-glass"
                placeholder="🔍 Search..."
                value={leftSearch}
                onChange={(e) => setLeftSearch(e.target.value)}
                style={{ fontSize: 11, padding: "5px 10px" }}
              />
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "4px 8px 12px" }}>
              {filteredCats.map(({ catKey, cat, resources }) => {
                const open = openCats[catKey] !== false;
                const CatIcon = cat.icon;
                return (
                  <div key={catKey} style={{ marginBottom: 4 }}>
                    <button
                      onClick={() =>
                        setOpenCats((p) => ({ ...p, [catKey]: !p[catKey] }))
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px 4px",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#64748b",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ display: "flex", color: cat.color }}>
                        <CatIcon size={13} strokeWidth={1.75} />
                      </span>
                      <span style={{ flex: 1 }}>{cat.label}</span>
                      {open ? (
                        <ChevronDown size={10} />
                      ) : (
                        <ChevronRight size={10} />
                      )}
                    </button>
                    {open && (
                      <div
                        style={{
                          paddingLeft: 4,
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        {resources.flatMap((r) =>
                          r.operations.map((op) => (
                            <ApiTile
                              key={`${r.tag}-${op}`}
                              resource={r}
                              operation={op}
                            />
                          )),
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Center: Canvas */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 16px",
            background: "#fff",
            borderBottom: "1px solid #e2e8f0",
            flexWrap: "wrap",
          }}
        >
          <Workflow size={18} color="#6366f1" />
          <input
            value={flowName}
            onChange={(e) => {
              setFlowName(e.target.value);
              setIsDirty(true);
            }}
            placeholder="Flow name..."
            style={{
              border: "none",
              background: "transparent",
              fontSize: 14,
              fontWeight: 700,
              color: "#0f172a",
              outline: "none",
              minWidth: 0,
              flex: 1,
              maxWidth: 220,
            }}
          />
          <input
            value={flowDesc}
            onChange={(e) => {
              setFlowDesc(e.target.value);
              setIsDirty(true);
            }}
            placeholder="Description..."
            style={{
              border: "none",
              background: "transparent",
              fontSize: 12,
              color: "#94a3b8",
              outline: "none",
              minWidth: 0,
              flex: 2,
              maxWidth: 320,
            }}
          />
          <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
            <button
              className="btn-ghost"
              onClick={handleNewFlow}
              style={{ fontSize: 12 }}
            >
              <Plus size={13} /> New
            </button>
            <button
              className="btn-ghost"
              onClick={handleSave}
              style={{
                fontSize: 12,
                ...(isDirty
                  ? { borderColor: "#6366f1", color: "#6366f1" }
                  : {}),
              }}
            >
              <Save size={13} />
              {saveMsg || (isDirty ? "Save*" : "Save")}
            </button>
            <button
              className="btn-primary"
              onClick={handleRunCurrent}
              disabled={nodes.length === 0}
              style={{ fontSize: 12 }}
            >
              <Play size={13} /> Execute Flow
            </button>
          </div>
        </div>

        {/* ReactFlow */}
        <div
          ref={canvasRef}
          style={{ flex: 1, position: "relative" }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onNodesChange={(c: any) => {
              onNodesChange(c);
              setIsDirty(true);
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onEdgesChange={(c: any) => {
              onEdgesChange(c);
              setIsDirty(true);
            }}
            onConnect={onConnect}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            deleteKeyCode="Delete"
            proOptions={{ hideAttribution: true }}
            style={{ background: "#f8fafc" }}
          >
            <Controls />
            <MiniMap
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              nodeColor={(n: any) =>
                (n.data as any)?.flowNode?.color ?? "#6366f1"
              }
              maskColor="rgba(248,250,252,0.75)"
            />
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1.2}
              color="#e2e8f0"
            />
            <Panel position="top-left" style={{ margin: 0 }}>
              <div
                style={{
                  background: "rgba(248,250,252,0.9)",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: 11,
                  color: "#94a3b8",
                }}
              >
                Drag tiles from the left · Connect node ports to link steps ·
                Del key removes selected
              </div>
            </Panel>
            {nodes.length === 0 && (
              <Panel position="top-center">
                <div style={{ textAlign: "center", marginTop: 80 }}>
                  <Workflow size={40} color="#e2e8f0" />
                  <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 8 }}>
                    Drag API operations from the left panel to start building
                    your flow
                  </div>
                </div>
              </Panel>
            )}
          </ReactFlow>
        </div>
      </div>

      {/* Right: Saved Flows */}
      <div
        style={{
          width: savedPanelOpen ? 240 : 42,
          minWidth: savedPanelOpen ? 240 : 42,
          background: "#fff",
          borderLeft: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 10px",
            borderBottom: "1px solid #e2e8f0",
            cursor: "pointer",
          }}
          onClick={() => setSavedPanelOpen((v) => !v)}
        >
          {savedPanelOpen && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Saved Flows
            </span>
          )}
          <span
            style={{
              color: "#94a3b8",
              display: "flex",
              marginLeft: savedPanelOpen ? 0 : "auto",
            }}
          >
            {savedPanelOpen ? (
              <ChevronRight size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </span>
        </div>
        {savedPanelOpen && (
          <div style={{ flex: 1, overflow: "auto", padding: "10px 8px" }}>
            {savedFlows.length === 0 ? (
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                No saved flows yet
              </div>
            ) : (
              savedFlows.map((f) => (
                <SavedFlowCard
                  key={f.id}
                  flow={f}
                  onLoad={loadFlowIntoCanvas}
                  onRun={onRunFlow}
                  onDelete={handleDeleteSaved}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export function FlowDesigner(props: FlowDesignerProps) {
  return (
    <ReactFlowProvider>
      <FlowDesignerInner {...props} />
    </ReactFlowProvider>
  );
}
