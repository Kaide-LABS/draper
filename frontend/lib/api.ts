const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface PipelineRequest {
  input_type: "text" | "audio";
  content: string;
  voice_profile: string;
  founder_name: string;
}

export interface PipelineStartResponse {
  pipeline_id: string;
  status: string;
}

export interface CritiqueScore {
  ai_detection_risk: number;
  readability: number;
  contrarian_strength: number;
  voice_authenticity: number;
  hook_power: number;
  actionable_density: number;
  overall: number;
  passed: boolean;
  revision_notes: string;
}

export interface CascadeOutput {
  linkedin_post: string;
  x_thread: string[];
  newsletter_blurb: string;
  quote_card_text: string;
}

export interface PipelineResult {
  pipeline_id: string;
  long_form_draft: string;
  critique_scorecard: CritiqueScore;
  assets: CascadeOutput;
  metadata: {
    total_duration_ms: number;
    estimated_cost_usd: number;
    revision_loops: number;
    input_word_count: number;
    output_word_count: number;
  };
}

export interface AgentStatus {
  status: "waiting" | "processing" | "complete" | "failed" | "revising";
  duration_ms: number | null;
  output_preview: string | null;
  // Only present on critique agent:
  scores?: {
    ai_detection_risk: number;
    readability: number;
    contrarian_strength: number;
    voice_authenticity: number;
    hook_power: number;
    actionable_density: number;
    overall: number;
  };
  passed?: boolean;
  revision_count?: number;
}

export interface PipelineStatus {
  pipeline_id: string;
  status: "processing" | "complete" | "failed";
  agents: Record<string, AgentStatus>;
  error: string | null;
}

export async function startPipeline(
  request: PipelineRequest
): Promise<PipelineStartResponse> {
  const res = await fetch(`${API_BASE}/api/pipeline/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `Pipeline failed: ${res.status}`);
  }

  return res.json();
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data:audio/...;base64, prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function getPipelineStatus(
  pipelineId: string
): Promise<PipelineStatus> {
  const res = await fetch(`${API_BASE}/api/pipeline/${pipelineId}/status`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `Failed to get status: ${res.status}`);
  }

  return res.json();
}

export async function getPipelineResults(
  pipelineId: string
): Promise<PipelineResult> {
  const res = await fetch(`${API_BASE}/api/pipeline/${pipelineId}/results`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `Failed to get results: ${res.status}`);
  }

  return res.json();
}
