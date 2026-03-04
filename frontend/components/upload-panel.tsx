"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface UploadPanelProps {
  onSubmit: (data: {
    content: string;
    voiceProfile: string;
    founderName: string;
  }) => void;
  isLoading: boolean;
}

export function UploadPanel({ onSubmit, isLoading }: UploadPanelProps) {
  const [content, setContent] = useState("");
  const [voiceProfile, setVoiceProfile] = useState(
    "direct, technical, contrarian"
  );
  const [founderName, setFounderName] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit({
      content: content.trim(),
      voiceProfile,
      founderName: founderName.trim() || "Founder",
    });
  };

  return (
    <Card className="bg-draper-charcoal border-draper-border p-6 space-y-6">
      {/* Founder Name */}
      <div className="space-y-2">
        <Label htmlFor="founder-name" className="text-sm text-draper-muted">
          Founder Name
        </Label>
        <Input
          id="founder-name"
          placeholder="e.g., Alex Chen"
          value={founderName}
          onChange={(e) => setFounderName(e.target.value)}
          className="bg-draper-dark border-draper-border text-white placeholder:text-draper-muted/50"
        />
      </div>

      {/* Raw Content */}
      <div className="space-y-2">
        <Label htmlFor="content" className="text-sm text-draper-muted">
          Raw Founder Brain-Dump
        </Label>
        <Textarea
          id="content"
          placeholder="Paste the founder's raw, unfiltered thoughts here... The messier the better. We'll extract the gold."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="bg-draper-dark border-draper-border text-white placeholder:text-draper-muted/50 resize-y min-h-[200px]"
        />
        <p className="text-xs text-draper-muted">
          {content.split(/\s+/).filter(Boolean).length} words
        </p>
      </div>

      {/* Voice Profile */}
      <div className="space-y-2">
        <Label htmlFor="voice-profile" className="text-sm text-draper-muted">
          Voice Profile
        </Label>
        <Input
          id="voice-profile"
          placeholder="e.g., direct, technical, contrarian"
          value={voiceProfile}
          onChange={(e) => setVoiceProfile(e.target.value)}
          className="bg-draper-dark border-draper-border text-white placeholder:text-draper-muted/50"
        />
        <p className="text-xs text-draper-muted">
          Describe the founder&apos;s tone in 3-5 words
        </p>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!content.trim() || isLoading}
        className="w-full bg-draper-gold text-draper-black font-semibold hover:bg-draper-gold-hover disabled:opacity-40 disabled:cursor-not-allowed h-12 text-base"
      >
        {isLoading ? "Generating..." : "Generate Authority Content"}
      </Button>
    </Card>
  );
}
