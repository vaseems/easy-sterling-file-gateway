"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle size={16} color="#34d399" />,
    error: <AlertCircle size={16} color="#f87171" />,
    info: <Info size={16} color="#60a5fa" />,
    warning: <AlertTriangle size={16} color="#fbbf24" />,
  };

  const colors: Record<ToastType, string> = {
    success: "rgba(52,211,153,0.15)",
    error: "rgba(248,113,113,0.15)",
    info: "rgba(96,165,250,0.15)",
    warning: "rgba(251,191,36,0.15)",
  };

  const borders: Record<ToastType, string> = {
    success: "rgba(52,211,153,0.3)",
    error: "rgba(248,113,113,0.3)",
    info: "rgba(96,165,250,0.3)",
    warning: "rgba(251,191,36,0.3)",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 380,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-slide-up"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "12px 16px",
              borderRadius: 12,
              background: colors[t.type],
              border: `1px solid ${borders[t.type]}`,
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <span style={{ marginTop: 1 }}>{icons[t.type]}</span>
            <span
              style={{
                flex: 1,
                fontSize: 13,
                color: "#0f172a",
                lineHeight: 1.5,
              }}
            >
              {t.message}
            </span>
            <button
              onClick={() => remove(t.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: 0,
                display: "flex",
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
