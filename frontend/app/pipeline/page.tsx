"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PipelineFlow } from "@/components/pipeline-flow";
import { getPipelineStatus, getPipelineResults, PipelineStatus, PipelineResult } from "@/lib/api";

export default function PipelinePage() {
  const router = useRouter();
  const [status, setStatus] = useState<PipelineStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pipelineId = typeof window !== "undefined"
    ? sessionStorage.getItem("pipeline_id")
    : null;

  const pollStatus = useCallback(async () => {
    if (!pipelineId) return;

    try {
      const currentStatus = await getPipelineStatus(pipelineId);
      setStatus(currentStatus);

      if (currentStatus.status === "complete") {
        // Fetch full results and store for review page
        const results = await getPipelineResults(pipelineId);
        sessionStorage.setItem("pipeline_results", JSON.stringify(results));

        // Brief pause so user sees the final "complete" state, then redirect
        setTimeout(() => {
          router.push("/review");
        }, 2000);
      } else if (currentStatus.status === "failed") {
        setError(currentStatus.error || "Pipeline failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get status");
    }
  }, [pipelineId, router]);

  useEffect(() => {
    if (!pipelineId) {
      router.push("/");
      return;
    }

    // Poll every 1.5 seconds
    pollStatus(); // immediate first call
    const interval = setInterval(pollStatus, 1500);

    return () => clearInterval(interval);
  }, [pipelineId, pollStatus, router]);

  if (!pipelineId) {
    return null; // redirecting to home
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          {status?.status === "complete"
            ? "Pipeline Complete"
            : status?.status === "failed"
            ? "Pipeline Failed"
            : "Generating Authority Content"}
        </h1>
        <p className="text-draper-muted text-sm">
          {status?.status === "complete"
            ? "Redirecting to review..."
            : status?.status === "failed"
            ? "An error occurred during generation"
            : "Watch each agent process your content in real-time"}
        </p>
      </div>

      {/* Pipeline Flow Visualization */}
      <PipelineFlow status={status} />

      {/* Error */}
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}