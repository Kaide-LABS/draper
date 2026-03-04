"use client";

interface ScoreBarProps {
  label: string;
  value: number;
  max: number;
  target: number;
  unit?: string;
  invertColor?: boolean; // true for AI risk where lower is better
}

function ScoreBar({ label, value, max, target, unit = "", invertColor = false }: ScoreBarProps) {
  const percentage = (value / max) * 100;
  const isGood = invertColor ? value <= target : value >= target;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-draper-muted">{label}</span>
        <span className={`font-mono ${isGood ? "text-green-400" : "text-amber-400"}`}>
          {value}{unit}
        </span>
      </div>
      <div className="h-1.5 bg-draper-dark rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            isGood ? "bg-green-500" : "bg-amber-500"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

interface ScorecardProps {
  scores: {
    ai_detection_risk: number;
    readability: number;
    contrarian_strength: number;
    voice_authenticity: number;
    hook_power: number;
    actionable_density: number;
    overall: number;
  };
  passed: boolean;
  revisionCount: number;
}

export function Scorecard({ scores, passed, revisionCount }: ScorecardProps) {
  return (
    <div className="bg-draper-dark border border-draper-border rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Quality Gate</h4>
        <div className="flex items-center gap-2">
          {revisionCount > 0 && (
            <span className="text-xs text-amber-400">
              Rev {revisionCount}/2
            </span>
          )}
          <span
            className={`text-xs font-mono px-2 py-0.5 rounded ${
              passed
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {scores.overall}/100 {passed ? "PASS" : "FAIL"}
          </span>
        </div>
      </div>

      {/* Score Bars */}
      <div className="space-y-2">
        <ScoreBar
          label="AI Detection Risk"
          value={scores.ai_detection_risk}
          max={100}
          target={15}
          unit="%"
          invertColor={true}
        />
        <ScoreBar
          label="Readability"
          value={scores.readability}
          max={100}
          target={65}
        />
        <ScoreBar
          label="Contrarian Strength"
          value={scores.contrarian_strength}
          max={10}
          target={7}
          unit="/10"
        />
        <ScoreBar
          label="Voice Authenticity"
          value={scores.voice_authenticity}
          max={10}
          target={7}
          unit="/10"
        />
        <ScoreBar
          label="Hook Power"
          value={scores.hook_power}
          max={10}
          target={7}
          unit="/10"
        />
        <ScoreBar
          label="Actionable Density"
          value={scores.actionable_density}
          max={10}
          target={6}
          unit="/10"
        />
      </div>
    </div>
  );
}