"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AgentStatus } from "@/lib/api";

interface AgentCardProps {
  name: string;
  description: string;
  icon: string;  // emoji
  status: AgentStatus | null;
  isActive: boolean;
}

export function AgentCard({ name, description, icon, status, isActive }: AgentCardProps) {
  const agentStatus = status?.status || "waiting";

  const statusStyles: Record<string, string> = {
    waiting: "border-draper-border opacity-40",
    processing: "border-draper-gold shadow-[0_0_20px_rgba(201,168,76,0.15)] animate-pulse",
    complete: "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]",
    failed: "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    revising: "border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
  };

  const badgeStyles: Record<string, string> = {
    waiting: "bg-draper-border text-draper-muted",
    processing: "bg-draper-gold/20 text-draper-gold",
    complete: "bg-green-500/20 text-green-400",
    failed: "bg-red-500/20 text-red-400",
    revising: "bg-amber-500/20 text-amber-400",
  };

  const badgeText: Record<string, string> = {
    waiting: "Waiting",
    processing: "Processing",
    complete: "Complete",
    failed: "Failed",
    revising: "Revising",
  };

  return (
    <Card
      className={`bg-draper-charcoal p-4 space-y-3 transition-all duration-500 border ${statusStyles[agentStatus]} min-w-[180px]`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xl">{icon}</span>
        <Badge className={`text-xs ${badgeStyles[agentStatus]}`}>
          {badgeText[agentStatus]}
        </Badge>
      </div>

      {/* Name & Description */}
      <div>
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-xs text-draper-muted">{description}</p>
      </div>

      {/* Duration (only when complete) */}
      {status?.duration_ms != null && (
        <p className="text-xs font-mono text-draper-muted">
          {(status.duration_ms / 1000).toFixed(1)}s
        </p>
      )}

      {/* Output Preview (only when complete) */}
      {status?.output_preview && agentStatus === "complete" && (
        <p className="text-xs text-draper-muted/70 truncate">
          {status.output_preview}
        </p>
      )}
    </Card>
  );
}