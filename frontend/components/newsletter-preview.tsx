"use client";

import { useState } from "react";

interface NewsletterPreviewProps {
  content: string;
  founderName: string;
  onContentChange?: (newContent: string) => void;
}

export function NewsletterPreview({ content, founderName, onContentChange }: NewsletterPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [isApproved, setIsApproved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Extract a subject line from the first sentence
  const subjectLine = editValue.split(/[.!?]/)[0]?.trim() || "This week's insight";

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
      {/* Header — Email branding */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs">📧</span>
          <span className="text-xs text-draper-muted">Newsletter Blurb</span>
        </div>
        {isApproved && <span className="text-xs text-green-400">Approved</span>}
      </div>

      {/* Email header mock */}
      <div className="px-4 pb-2 border-b border-draper-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-draper-muted w-12">From:</span>
            <span className="text-draper-text/80">{founderName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-draper-muted w-12">Subject:</span>
            <span className="text-draper-text font-semibold">{subjectLine}</span>
          </div>
        </div>
      </div>

      {/* Email body */}
      <div className="px-4 py-4">
        {isEditing ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full bg-draper-dark border border-draper-border rounded p-3 text-sm text-draper-text/80 resize-y min-h-[120px] focus:outline-none focus:border-draper-gold"
            rows={6}
          />
        ) : (
          <div className="text-sm text-draper-text/80 leading-relaxed whitespace-pre-line">
            {editValue}
          </div>
        )}
      </div>

      {/* CTA button mock */}
      {!isEditing && (
        <div className="px-4 pb-4">
          <div className="inline-block px-4 py-2 bg-draper-gold/20 text-draper-gold text-xs font-semibold rounded cursor-default">
            Read Full Article →
          </div>
        </div>
      )}

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
