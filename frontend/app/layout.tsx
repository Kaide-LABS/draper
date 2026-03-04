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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
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
