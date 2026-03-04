"use client";

import { useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const critiqueAgent = status?.agents?.critique;
  const showScorecard = critiqueAgent && (critiqueAgent.status === "complete" || critiqueAgent.passed !== undefined);

  // Auto-scroll to bottom as new items become active
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [status]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto" ref={containerRef}>
      {/* Agent Cards — vertical stack */}
      <div className="flex flex-col space-y-4">
        {AGENTS.map((agent, i) => {
          const agentStatus = status?.agents?.[agent.key];
          // Determine if we should show this card yet (only show if it's not waiting, or if it's the very next one to process)
          const isProcessingOrDone = agentStatus?.status && agentStatus.status !== "waiting";
          const previousIsComplete = i === 0 || status?.agents?.[AGENTS[i - 1].key]?.status === "complete" || status?.agents?.[AGENTS[i - 1].key]?.status === "revising";
          
          // Show if it has started, or if it's the next one in line
          const isVisible = isProcessingOrDone || previousIsComplete;

          if (!isVisible) return null;

          return (
            <div key={agent.key} className="flex flex-col items-center">
              <div className="w-full animate-in fade-in slide-in-from-top-4 duration-500">
                <AgentCard
                  name={agent.name}
                  description={agent.description}
                  icon={agent.icon}
                  status={agentStatus || null}
                  isActive={agentStatus?.status === "processing"}
                />
              </div>
              
              {/* Vertical Connector Line (not after last) */}
              {i < AGENTS.length - 1 && (isProcessingOrDone || (previousIsComplete && agentStatus?.status === "processing")) && (
                <div className="w-0.5 h-6 bg-draper-border my-2 animate-in fade-in duration-500" />
              )}
            </div>
          );
        })}
      </div>

      {/* Scorecard — appears below when critique agent completes */}
      {showScorecard && critiqueAgent?.scores && (
        <div className="animate-in fade-in slide-in-from-top-8 duration-700">
          <Scorecard
            scores={critiqueAgent.scores}
            passed={critiqueAgent.passed || false}
            revisionCount={critiqueAgent.revision_count || 0}
          />
        </div>
      )}
    </div>
  );
}