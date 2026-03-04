"use client";

import { AgentCard } from "@/components/agent-card";
import { Scorecard } from "@/components/scorecard";
import type { PipelineStatus } from "@/lib/api";

interface PipelineFlowProps {
  status: PipelineStatus | null;
}

const AGENTS = [
  { key: "ingestion", name: "Ingestion", description: "Cleaning raw input", icon: "📥" },
  { key: "extraction", name: "Extraction", description: "Mining themes & angles", icon: "🔍" },
  { key: "synthesis", name: "Synthesis", description: "Drafting authority piece", icon: "✍️" },
  { key: "critique", name: "Critique", description: "Quality scoring", icon: "⚖️" },
  { key: "cascade", name: "Cascade", description: "Multi-platform assets", icon: "📤" },
];

export function PipelineFlow({ status }: PipelineFlowProps) {
  const critiqueAgent = status?.agents?.critique;
  const showScorecard = critiqueAgent && (critiqueAgent.status === "complete" || critiqueAgent.passed !== undefined);

  return (
    <div className="space-y-6">
      {/* Agent Cards — horizontal scroll on mobile, flex on desktop */}
      <div className="flex items-start gap-3 overflow-x-auto pb-4">
        {AGENTS.map((agent, i) => (
          <div key={agent.key} className="flex items-center gap-3">
            <AgentCard
              name={agent.name}
              description={agent.description}
              icon={agent.icon}
              status={status?.agents?.[agent.key] || null}
              isActive={status?.agents?.[agent.key]?.status === "processing"}
            />
            {/* Arrow between cards (not after last) */}
            {i < AGENTS.length - 1 && (
              <div className="text-draper-muted text-lg flex-shrink-0">→</div>
            )}
          </div>
        ))}
      </div>

      {/* Scorecard — appears below when critique agent completes */}
      {showScorecard && critiqueAgent?.scores && (
        <Scorecard
          scores={critiqueAgent.scores}
          passed={critiqueAgent.passed || false}
          revisionCount={critiqueAgent.revision_count || 0}
        />
      )}
    </div>
  );
}