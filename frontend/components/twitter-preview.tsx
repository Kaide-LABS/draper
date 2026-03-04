"use client";

import { useState } from "react";

interface TwitterPreviewProps {
  thread: string[];
  founderName: string;
  onThreadChange?: (newThread: string[]) => void;
}

export function TwitterPreview({ thread, founderName, onThreadChange }: TwitterPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(thread);
  const [isApproved, setIsApproved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    onThreadChange?.(editValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues(thread);
    setIsEditing(false);
  };

  const handleTweetChange = (index: number, value: string) => {
    const updated = [...editValues];
    updated[index] = value;
    setEditValues(updated);
  };

  const handleCopy = async () => {
    const fullThread = editValues.map((t, i) => `${i + 1}/${editValues.length} ${t}`).join("\n\n");
    await navigator.clipboard.writeText(fullThread);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate a consistent handle from the founder name
  const handle = `@${founderName.toLowerCase().replace(/\s+/g, "")}`;

  return (
    <div className={`bg-draper-charcoal border rounded-lg overflow-hidden ${isApproved ? "border-green-500/50" : "border-draper-border"}`}>
      {/* Header — X branding */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold">𝕏</span>
          <span className="text-xs text-draper-muted">Thread · {editValues.length} posts</span>
        </div>
        {isApproved && <span className="text-xs text-green-400">Approved</span>}
      </div>

      {/* Thread tweets */}
      <div className="px-4 pb-3">
        {editValues.map((tweet, i) => (
          <div key={i} className="flex gap-3">
            {/* Thread line + avatar */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-draper-dark flex items-center justify-center text-xs font-bold text-draper-gold flex-shrink-0">
                {founderName.charAt(0)}
              </div>
              {i < editValues.length - 1 && (
                <div className="w-0.5 flex-1 bg-draper-border mt-1" />
              )}
            </div>

            {/* Tweet content */}
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">{founderName}</span>
                <span className="text-xs text-draper-muted">{handle}</span>
                <span className="text-xs text-draper-muted">· {i + 1}/{editValues.length}</span>
              </div>
              {isEditing ? (
                <div>
                  <textarea
                    value={tweet}
                    onChange={(e) => handleTweetChange(i, e.target.value)}
                    className="w-full bg-draper-dark border border-draper-border rounded p-2 text-sm text-gray-300 resize-y min-h-[60px] focus:outline-none focus:border-draper-gold"
                    rows={3}
                  />
                  <p className={`text-xs mt-1 ${tweet.length > 280 ? "text-red-400" : "text-draper-muted"}`}>
                    {tweet.length}/280
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-300 leading-relaxed">{tweet}</p>
              )}

              {/* Engagement icons (non-editing only) */}
              {!isEditing && (
                <div className="flex items-center gap-6 mt-2 text-xs text-draper-muted">
                  <span>💬</span>
                  <span>🔄</span>
                  <span>❤️</span>
                  <span>📤</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="px-4 py-3 border-t border-draper-border flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-xs bg-draper-gold text-black font-semibold rounded hover:bg-draper-gold-hover"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-xs bg-draper-dark text-draper-muted rounded hover:text-white"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsApproved(!isApproved)}
              className={`px-3 py-1 text-xs rounded font-semibold ${
                isApproved
                  ? "bg-green-500/20 text-green-400"
                  : "bg-draper-dark text-draper-muted hover:text-white"
              }`}
            >
              {isApproved ? "✓ Approved" : "Approve"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-xs bg-draper-dark text-draper-muted rounded hover:text-white"
            >
              Edit
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-xs bg-draper-dark text-draper-muted rounded hover:text-white"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
