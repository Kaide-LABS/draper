"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PipelineResult } from "@/lib/api";

export default function ReviewPage() {
  const router = useRouter();
  const [results, setResults] = useState<PipelineResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("pipeline_results");
    if (!stored) {
      router.push("/");
      return;
    }
    setResults(JSON.parse(stored));
  }, [router]);

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-draper-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-draper-muted">Loading review...</p>
        </div>
      </div>
    );
  }

  // Phase 3 placeholder — Phase 4 replaces with full review dashboard
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Review Dashboard</h1>
        <p className="text-draper-muted text-sm">
          Generated in {(results.metadata.total_duration_ms / 1000).toFixed(1)}s | Quality: {results.critique_scorecard.overall}/100
        </p>
      </div>

      <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 text-sm text-draper-muted">
        Full review dashboard coming in Phase 4. Results are loaded and ready.
        <pre className="mt-4 text-xs overflow-auto max-h-[400px]">
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  );
}
