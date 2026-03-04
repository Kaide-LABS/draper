"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PipelineResult } from "@/lib/api";

export default function PipelinePage() {
  const router = useRouter();
  const [results, setResults] = useState<PipelineResult | null>(null);

  useEffect(() => {
    // Read results from sessionStorage (set by home page after pipeline completes)
    const stored = sessionStorage.getItem("pipeline_results");
    if (!stored) {
      // No results — redirect back to home
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
          <p className="text-draper-muted">Loading results...</p>
        </div>
      </div>
    );
  }

  // Phase 2: Simple raw output display (Phase 3 replaces with real visualization)
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Pipeline Complete</h1>
        <p className="text-draper-muted text-sm">
          Generated in {(results.metadata.total_duration_ms / 1000).toFixed(1)}s
          {" | "}
          {results.metadata.revision_loops} revision
          {results.metadata.revision_loops !== 1 ? "s" : ""}
          {" | "}
          Quality: {results.critique_scorecard.overall}/100
        </p>
      </div>

      {/* Long-form draft */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-draper-gold">
          Long-Form Draft
        </h2>
        <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 whitespace-pre-wrap text-sm leading-relaxed">
          {results.long_form_draft}
        </div>
      </div>

      {/* Critique Scorecard */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-draper-gold">
          Quality Scorecard
        </h2>
        <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            AI Detection Risk:{" "}
            <span className="font-mono">{results.critique_scorecard.ai_detection_risk}%</span>
          </div>
          <div>
            Readability:{" "}
            <span className="font-mono">{results.critique_scorecard.readability}/100</span>
          </div>
          <div>
            Contrarian Strength:{" "}
            <span className="font-mono">{results.critique_scorecard.contrarian_strength}/10</span>
          </div>
          <div>
            Voice Authenticity:{" "}
            <span className="font-mono">{results.critique_scorecard.voice_authenticity}/10</span>
          </div>
          <div>
            Hook Power:{" "}
            <span className="font-mono">{results.critique_scorecard.hook_power}/10</span>
          </div>
          <div>
            Actionable Density:{" "}
            <span className="font-mono">{results.critique_scorecard.actionable_density}/10</span>
          </div>
        </div>
      </div>

      {/* Cascade Assets */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-draper-gold">
          Platform Assets
        </h2>
        <div className="grid gap-4">
          {/* LinkedIn */}
          <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 space-y-2">
            <h3 className="text-sm font-semibold text-draper-muted uppercase tracking-wider">
              LinkedIn Post
            </h3>
            <p className="whitespace-pre-wrap text-sm">
              {results.assets.linkedin_post}
            </p>
          </div>

          {/* X Thread */}
          <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 space-y-2">
            <h3 className="text-sm font-semibold text-draper-muted uppercase tracking-wider">
              X Thread ({results.assets.x_thread.length} tweets)
            </h3>
            <div className="space-y-3">
              {results.assets.x_thread.map((tweet, i) => (
                <div key={i} className="text-sm pl-4 border-l-2 border-draper-border">
                  <span className="text-draper-muted text-xs">
                    {i + 1}/{results.assets.x_thread.length}
                  </span>
                  <p>{tweet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 space-y-2">
            <h3 className="text-sm font-semibold text-draper-muted uppercase tracking-wider">
              Newsletter Blurb
            </h3>
            <p className="whitespace-pre-wrap text-sm">
              {results.assets.newsletter_blurb}
            </p>
          </div>

          {/* Quote Card */}
          <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 space-y-2">
            <h3 className="text-sm font-semibold text-draper-muted uppercase tracking-wider">
              Quote Card
            </h3>
            <blockquote className="text-xl font-serif italic text-draper-gold border-l-4 border-draper-gold pl-4">
              {results.assets.quote_card_text}
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}