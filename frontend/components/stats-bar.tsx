"use client";

interface StatsBarProps {
  totalDurationMs: number;
  estimatedCostUsd: number;
  overallScore: number;
  passed: boolean;
  revisionLoops: number;
  inputWordCount: number;
  outputWordCount: number;
}

export function StatsBar({
  totalDurationMs,
  estimatedCostUsd,
  overallScore,
  passed,
  revisionLoops,
  inputWordCount,
  outputWordCount,
}: StatsBarProps) {
  const durationSec = (totalDurationMs / 1000).toFixed(1);

  return (
    <div className="bg-draper-charcoal border border-draper-border rounded-lg p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <StatItem label="Generation Time" value={`${durationSec}s`} />
        <StatItem label="Est. API Cost" value={`$${estimatedCostUsd.toFixed(3)}`} />
        <StatItem
          label="Quality Score"
          value={`${overallScore}/100`}
          valueColor={passed ? "text-green-400" : "text-red-400"}
        />
        <StatItem
          label="Revisions"
          value={`${revisionLoops}/2`}
          valueColor={revisionLoops > 0 ? "text-amber-400" : "text-draper-muted"}
        />
        <StatItem label="Input Words" value={inputWordCount.toLocaleString()} />
        <StatItem label="Output Words" value={outputWordCount.toLocaleString()} />
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  valueColor = "text-white",
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-draper-muted">{label}</p>
      <p className={`text-sm font-mono font-semibold ${valueColor}`}>{value}</p>
    </div>
  );
}
