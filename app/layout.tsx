import type { Metadata } from "next";
import "./globals.css";
import { SettingsProvider } from "@/lib/settings";
import { Sidebar } from "@/components/Sidebar";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Sterling Easy Web — B2B Integrator",
  description: "Sterling B2B Integrator REST API Management UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ display: "flex", minHeight: "100vh", background: "#eef2f7" }}
      >
        <SettingsProvider>
          <ToastProvider>
            <Sidebar />
            <main style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
              {children}
            </main>
          </ToastProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
