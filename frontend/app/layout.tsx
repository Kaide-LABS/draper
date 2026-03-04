import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Draper AI Authority Engine",
  description: "Transform founder thinking into multi-platform authority content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen bg-draper-black">
          {/* Header */}
          <header className="border-b border-draper-border px-6 py-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-draper-gold rounded-md flex items-center justify-center">
                  <span className="text-draper-black font-bold text-sm">D</span>
                </div>
                <span className="text-lg font-semibold tracking-tight">
                  Draper AI Engine
                </span>
              </div>
              <span className="text-xs text-draper-muted">v0.1 Demo</span>
            </div>
          </header>

          {/* Main content */}
          <main className="max-w-5xl mx-auto px-6 py-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
