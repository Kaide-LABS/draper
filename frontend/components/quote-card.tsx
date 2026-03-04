"use client";

import { useState } from "react";

interface QuoteCardProps {
  quote: string;
  founderName: string;
  onQuoteChange?: (newQuote: string) => void;
}

export function QuoteCard({ quote, founderName, onQuoteChange }: QuoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(quote);
  const [isApproved, setIsApproved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    onQuoteChange?.(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(quote);
    setIsEditing(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-draper-charcoal border rounded-lg overflow-hidden ${isApproved ? "border-green-500/50" : "border-draper-border"}`}>
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs">🎨</span>
          <span className="text-xs text-draper-muted">Quote Card</span>
        </div>
        {isApproved && <span className="text-xs text-green-400">Approved</span>}
      </div>

      {/* Quote visual — the actual branded card */}
      <div className="px-4 pb-3">
        {isEditing ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full bg-draper-dark border border-draper-border rounded p-3 text-sm text-draper-text/80 resize-y min-h-[100px] focus:outline-none focus:border-draper-gold"
            rows={4}
          />
        ) : (
          <div className="bg-draper-black rounded-lg p-8 relative">
            {/* Gold accent bar on the left */}
            <div className="absolute left-0 top-4 bottom-4 w-1 bg-draper-gold rounded-r" />

            {/* Opening quotation mark */}
            <span className="text-4xl text-draper-gold/40 font-serif leading-none block mb-2">"</span>

            {/* Quote text — serif font */}
            <p className="text-lg font-serif text-draper-text leading-relaxed pl-4">
              {editValue}
            </p>

            {/* Attribution */}
            <div className="mt-6 pl-4 flex items-center gap-3">
              <div className="w-0.5 h-4 bg-draper-gold/40" />
              <span className="text-sm text-draper-gold font-semibold">{founderName}</span>
            </div>
          </div>
        )}
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
