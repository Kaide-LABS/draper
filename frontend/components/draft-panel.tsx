"use client";

import { Scorecard } from "@/components/scorecard";
import type { CritiqueScore } from "@/lib/api";

interface DraftPanelProps {
  draft: string;
  scorecard: CritiqueScore;
  revisionLoops: number;
  founderName?: string;
}

export function DraftPanel({ draft, scorecard, revisionLoops, founderName }: DraftPanelProps) {
  return (
    <div className="space-y-4">
      {/* Draft Section */}
      <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-draper-gold">Long-Form Authority Draft</h3>
          {founderName && (
            <span className="text-xs text-draper-muted">by {founderName}</span>
          )}
        </div>
        <div className="prose prose-invert prose-sm max-w-none">
          {draft.split("\n").map((paragraph, i) => (
            <p key={i} className="text-sm text-gray-300 leading-relaxed mb-3">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Scorecard Section — reuse Phase 3 component */}
      <Scorecard
        scores={{
          ai_detection_risk: scorecard.ai_detection_risk,
          readability: scorecard.readability,
          contrarian_strength: scorecard.contrarian_strength,
          voice_authenticity: scorecard.voice_authenticity,
          hook_power: scorecard.hook_power,
          actionable_density: scorecard.actionable_density,
          overall: scorecard.overall,
        }}
        passed={scorecard.passed}
        revisionCount={revisionLoops}
      />

      {/* Revision Notes (if any) */}
      {scorecard.revision_notes && (
        <div className="bg-amber-900/10 border border-amber-800/30 rounded-lg p-4">
          <p className="text-xs font-semibold text-amber-400 mb-1">Revision Notes</p>
          <p className="text-xs text-amber-300/80">{scorecard.revision_notes}</p>
        </div>
      )}
    </div>
  );
}
