"use client";

import { useState } from "react";

interface LinkedInPreviewProps {
  content: string;
  founderName: string;
  onContentChange?: (newContent: string) => void;
}

export function LinkedInPreview({ content, founderName, onContentChange }: LinkedInPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [isApproved, setIsApproved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    onContentChange?.(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(content);
    setIsEditing(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-draper-charcoal border rounded-lg overflow-hidden ${isApproved ? "border-green-500/50" : "border-draper-border"}`}>
      {/* Header — LinkedIn branding */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#0A66C2]">in</span>
          <span className="text-xs text-draper-muted">LinkedIn Post</span>
        </div>
        {isApproved && <span className="text-xs text-green-400">Approved</span>}
      </div>

      {/* Profile section */}
      <div className="px-4 pb-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-draper-dark flex items-center justify-center text-sm font-bold text-draper-gold">
          {founderName.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold">{founderName}</p>
          <p className="text-xs text-draper-muted">Founder & CEO</p>
          <p className="text-xs text-draper-muted">Just now · 🌐</p>
        </div>
      </div>

      {/* Post body */}
      <div className="px-4 pb-3">
        {isEditing ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full bg-draper-dark border border-draper-border rounded p-3 text-sm text-draper-text/80 resize-y min-h-[150px] focus:outline-none focus:border-draper-gold"
            rows={8}
          />
        ) : (
          <div className="text-sm text-draper-text/80 leading-relaxed whitespace-pre-line">
            {editValue}
          </div>
        )}
      </div>

      {/* Engagement bar */}
      <div className="px-4 py-2 border-t border-draper-border flex items-center justify-between text-xs text-draper-muted">
        <div className="flex items-center gap-4">
          <span>👍 Like</span>
          <span>💬 Comment</span>
          <span>🔄 Repost</span>
          <span>📤 Send</span>
        </div>
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
              className="px-3 py-1 text-xs bg-draper-dark text-draper-muted rounded hover:text-draper-text"
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
                  : "bg-draper-dark text-draper-muted hover:text-draper-text"
              }`}
            >
              {isApproved ? "✓ Approved" : "Approve"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-xs bg-draper-dark text-draper-muted rounded hover:text-draper-text"
            >
              Edit
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-xs bg-draper-dark text-draper-muted rounded hover:text-draper-text"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
