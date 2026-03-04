"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadPanel } from "@/components/upload-panel";
import { startPipeline, getPipelineResults } from "@/lib/api";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    content: string;
    voiceProfile: string;
    founderName: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Start the pipeline
      const { pipeline_id } = await startPipeline({
        input_type: "text",
        content: data.content,
        voice_profile: data.voiceProfile,
        founder_name: data.founderName,
      });

      // For Phase 2: pipeline runs synchronously, so results are ready immediately
      // Phase 3 will switch to async with polling
      const results = await getPipelineResults(pipeline_id);

      // Store results in sessionStorage for the pipeline/review pages to read
      sessionStorage.setItem("pipeline_results", JSON.stringify(results));
      sessionStorage.setItem("pipeline_id", pipeline_id);

      // Navigate to pipeline page
      router.push("/pipeline");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Authority Engine
        </h1>
        <p className="text-draper-muted max-w-xl mx-auto">
          Paste a founder&apos;s raw thinking. Get publication-ready content for
          LinkedIn, X, newsletter, and more — in seconds, not hours.
        </p>
      </div>

      {/* Upload Panel */}
      <UploadPanel onSubmit={handleSubmit} isLoading={isLoading} />

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
