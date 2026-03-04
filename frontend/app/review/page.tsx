"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PipelineResult } from "@/lib/api";
import { StatsBar } from "@/components/stats-bar";
import { DraftPanel } from "@/components/draft-panel";
import { LinkedInPreview } from "@/components/linkedin-preview";
import { TwitterPreview } from "@/components/twitter-preview";
import { NewsletterPreview } from "@/components/newsletter-preview";
import { QuoteCard } from "@/components/quote-card";

export default function ReviewPage() {
  const router = useRouter();
  const [results, setResults] = useState<PipelineResult | null>(null);
  const [founderName, setFounderName] = useState("Founder");

  useEffect(() => {
    const stored = sessionStorage.getItem("pipeline_results");
    if (!stored) {
      router.push("/");
      return;
    }
    setResults(JSON.parse(stored));

    // Try to get founder name from pipeline request (stored by home page)
    const storedName = sessionStorage.getItem("founder_name");
    if (storedName) {
      setFounderName(storedName);
    }
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold">Review Dashboard</h1>
        <p className="text-draper-muted text-sm">
          Review, edit, and approve your authority content
        </p>
      </div>

      {/* Stats Bar */}
      <StatsBar
        totalDurationMs={results.metadata.total_duration_ms}
        estimatedCostUsd={results.metadata.estimated_cost_usd}
        overallScore={results.critique_scorecard.overall}
        passed={results.critique_scorecard.passed}
        revisionLoops={results.metadata.revision_loops}
        inputWordCount={results.metadata.input_word_count}
        outputWordCount={results.metadata.output_word_count}
      />

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel — Draft + Scorecard */}
        <DraftPanel
          draft={results.long_form_draft}
          scorecard={results.critique_scorecard}
          revisionLoops={results.metadata.revision_loops}
          founderName={founderName}
        />

        {/* Right Panel — Platform Asset Previews */}
        <div className="space-y-4">
          <LinkedInPreview
            content={results.assets.linkedin_post}
            founderName={founderName}
          />

          <TwitterPreview
            thread={results.assets.x_thread}
            founderName={founderName}
          />

          <NewsletterPreview
            content={results.assets.newsletter_blurb}
            founderName={founderName}
          />

          <QuoteCard
            quote={results.assets.quote_card_text}
            founderName={founderName}
          />
        </div>
      </div>

      {/* Back to Home */}
      <div className="text-center pb-8">
        <button
          onClick={() => {
            sessionStorage.clear();
            router.push("/");
          }}
          className="px-6 py-2 text-sm bg-draper-dark text-draper-muted rounded-lg hover:text-draper-text border border-draper-border"
        >
          ← Start New Generation
        </button>
      </div>
    </div>
  );
}