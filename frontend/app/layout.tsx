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
          {/* Header — matches draperhq.com nav */}
          <header className="border-b border-draper-border px-6 py-5">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <span className="text-xl font-serif font-bold tracking-tight">
                Draper
              </span>
              <div className="flex items-center gap-6">
                <span className="text-sm text-draper-muted hidden sm:inline">
                  AI Authority Engine
                </span>
                <span className="text-xs px-3 py-1 rounded-full border border-draper-border text-draper-muted">
                  Demo
                </span>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="max-w-6xl mx-auto px-6 py-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
