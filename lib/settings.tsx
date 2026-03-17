"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { RESOURCE_CATEGORIES } from "./resources";

export interface FeatureSettings {
  enabledCategories: Record<string, boolean>;
  apiBaseUrl: string;
  apiUsername: string;
  apiPassword: string;
  itemsPerPage: number;
  theme: "dark" | "light";
  showJsonView: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  // Database connection
  dbDriver: "postgresql" | "mysql" | "mssql" | "db2" | "oracle";
  dbHost: string;
  dbPort: string;
  dbName: string;
  dbSchema: string;
  dbUsername: string;
  dbPassword: string;
  // SFTP health check
  sftpHost: string;
  sftpPort: string;
  sftpUsername: string;
  sftpPassword: string;
  sftpTestPath: string;
}

const DEFAULT_SETTINGS: FeatureSettings = {
  enabledCategories: Object.fromEntries(
    Object.keys(RESOURCE_CATEGORIES).map((k) => [k, true]),
  ),
  apiBaseUrl:
    "https://b2birestapi-mrc-sfg-qa.apps.sfglowerqa.openshift.mrcooper.io/B2BAPIs/svc",
  apiUsername: "",
  apiPassword: "",
  itemsPerPage: 20,
  theme: "dark",
  showJsonView: false,
  autoRefresh: false,
  refreshInterval: 30,
  // Database
  dbDriver: "db2",
  dbHost: "",
  dbPort: "50000",
  dbName: "",
  dbSchema: "",
  dbUsername: "",
  dbPassword: "",
  // SFTP health check
  sftpHost: "",
  sftpPort: "22",
  sftpUsername: "",
  sftpPassword: "",
  sftpTestPath: "/upload",
};

const STORAGE_KEY = "sterling_settings";

interface SettingsContextValue {
  settings: FeatureSettings;
  updateSettings: (partial: Partial<FeatureSettings>) => void;
  isCategoryEnabled: (category: string) => boolean;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
  isCategoryEnabled: () => true,
  resetSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<FeatureSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch {}
  }, []);

  const updateSettings = (partial: Partial<FeatureSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isCategoryEnabled = (category: string) =>
    settings.enabledCategories[category] !== false;

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, isCategoryEnabled, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
