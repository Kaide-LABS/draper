"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadPanel } from "@/components/upload-panel";
import { startPipeline } from "@/lib/api";

// Pre-cached result for fallback when APIs are down/slow
const CACHED_RESULT_URL = "/api/cached-result";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    content: string;
    voiceProfile: string;
    founderName: string;
    inputType: "text" | "audio";
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const { pipeline_id } = await startPipeline({
        input_type: data.inputType,
        content: data.content,
        voice_profile: data.voiceProfile,
        founder_name: data.founderName,
      });

      sessionStorage.setItem("pipeline_id", pipeline_id);
      sessionStorage.setItem("founder_name", data.founderName);
      router.push("/pipeline");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  const handleFallback = async () => {
    try {
      const res = await fetch(CACHED_RESULT_URL);
      if (!res.ok) throw new Error("No cached results available");
      const cachedResult = await res.json();
      sessionStorage.setItem("pipeline_results", JSON.stringify(cachedResult));
      sessionStorage.setItem("founder_name", cachedResult.metadata?.founder_name || "Alex Chen");
      router.push("/review");
    } catch {
      setError("Fallback cache not available. Please try the live pipeline.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero — Draper editorial style */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
          The AI content strategist<br />
          <em className="text-draper-gold">with human taste.</em>
        </h1>
        <p className="text-draper-muted max-w-xl mx-auto text-base">
          Paste a founder&apos;s raw thinking. Get publication-ready content for
          LinkedIn, X, newsletter, and more — in seconds, not hours.
        </p>
      </div>

      {/* Upload Panel */}
      <UploadPanel onSubmit={handleSubmit} isLoading={isLoading} />

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400 text-sm">
          <p>{error}</p>
          <button
            onClick={handleFallback}
            className="mt-2 text-xs text-draper-gold hover:text-draper-gold-hover underline"
          >
            Use cached demo results instead →
          </button>
        </div>
      )}
    </div>
  );
}