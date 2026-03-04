"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { fileToBase64 } from "@/lib/api";

interface UploadPanelProps {
  onSubmit: (data: {
    content: string;
    voiceProfile: string;
    founderName: string;
    inputType: "text" | "audio";
  }) => void;
  isLoading: boolean;
}

const SAMPLE_DATA = {
  founderName: "Alex Chen",
  voiceProfile: "direct, technical, contrarian",
  content: `I've been building developer tools for 12 years now and here's what nobody talks about — the best tools aren't the ones with the most features. They're the ones that disappear.

Every time I see a startup pitch with "AI-powered" slapped on their developer tool, I cringe. Not because AI is bad — we use it heavily — but because they're solving the wrong problem. Developers don't want more intelligence in their tools. They want less friction.

We spent 6 months building an AI code review feature. Usage was terrible. Then we spent 2 weeks making our git integration 200ms faster. Usage went through the roof. The lesson? Developers will tolerate a dumb tool that's fast over a smart tool that makes them wait.

The real insight from running a 200-person engineering org is this: developer productivity isn't about the tools at all. It's about the feedback loops. Shorten the loop between "I changed something" and "I know if it worked" and everything else takes care of itself.

Most DevTool startups die because they optimize for the demo, not the daily driver. A tool that looks impressive in a 5-minute pitch but adds 30 seconds of friction per use will get uninstalled within a week. I've seen it happen dozens of times.

My contrarian take: the next big developer tool won't use AI at all. It'll be something brutally simple that removes a step everyone forgot they were doing. Like how containers didn't add intelligence — they removed an entire class of "works on my machine" problems.

Stop building smart tools. Build fast ones.`,
};

const ACCEPTED_AUDIO_TYPES = [
  "audio/mpeg",      // .mp3
  "audio/wav",       // .wav
  "audio/x-m4a",     // .m4a
  "audio/mp4",       // .m4a alternate
  "audio/webm",      // .webm
];
const MAX_FILE_SIZE_MB = 25;

export function UploadPanel({ onSubmit, isLoading }: UploadPanelProps) {
  const [content, setContent] = useState("");
  const [voiceProfile, setVoiceProfile] = useState("direct, technical, contrarian");
  const [founderName, setFounderName] = useState("");
  const [inputMode, setInputMode] = useState<"text" | "audio">("text");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    setAudioError(null);

    if (!ACCEPTED_AUDIO_TYPES.includes(file.type)) {
      setAudioError("Unsupported format. Use .mp3, .wav, or .m4a");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setAudioError(`File too large. Max ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setAudioFile(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleTryExample = () => {
    setInputMode("text");
    setFounderName(SAMPLE_DATA.founderName);
    setVoiceProfile(SAMPLE_DATA.voiceProfile);
    setContent(SAMPLE_DATA.content);
    setAudioFile(null);
  };

  const handleSubmit = async () => {
    if (inputMode === "text" && !content.trim()) return;
    if (inputMode === "audio" && !audioFile) return;

    let submitContent = content.trim();

    if (inputMode === "audio" && audioFile) {
      submitContent = await fileToBase64(audioFile);
    }

    onSubmit({
      content: submitContent,
      voiceProfile,
      founderName: founderName.trim() || "Founder",
      inputType: inputMode,
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
          className="bg-draper-dark border-draper-border text-draper-text placeholder:text-draper-muted/50"
        />
      </div>

      {/* Input Mode Toggle */}
      <div className="space-y-2">
        <Label className="text-sm text-draper-muted">Input Method</Label>
        <div className="flex gap-2">
          <button
            onClick={() => setInputMode("text")}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
              inputMode === "text"
                ? "bg-draper-gold/20 border-draper-gold text-draper-gold"
                : "bg-draper-dark border-draper-border text-draper-muted hover:text-draper-text"
            }`}
          >
            Text
          </button>
          <button
            onClick={() => setInputMode("audio")}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
              inputMode === "audio"
                ? "bg-draper-gold/20 border-draper-gold text-draper-gold"
                : "bg-draper-dark border-draper-border text-draper-muted hover:text-draper-text"
            }`}
          >
            Audio
          </button>
        </div>
      </div>

      {/* Text Input */}
      {inputMode === "text" && (
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
            className="bg-draper-dark border-draper-border text-draper-text placeholder:text-draper-muted/50 resize-y min-h-[200px]"
          />
          <p className="text-xs text-draper-muted">
            {content.split(/\s+/).filter(Boolean).length} words
          </p>
        </div>
      )}

      {/* Audio Input — Drag & Drop Zone */}
      {inputMode === "audio" && (
        <div className="space-y-2">
          <Label className="text-sm text-draper-muted">Audio Recording</Label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-draper-gold bg-draper-gold/5"
                : audioFile
                ? "border-green-500/50 bg-green-900/10"
                : "border-draper-border hover:border-draper-muted"
            }`}
          >
            {audioFile ? (
              <div className="space-y-2">
                <p className="text-sm text-green-400">
                  {audioFile.name}
                </p>
                <p className="text-xs text-draper-muted">
                  {(audioFile.size / (1024 * 1024)).toFixed(1)} MB
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAudioFile(null);
                  }}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-2xl">🎙️</p>
                <p className="text-sm text-draper-muted">
                  Drag & drop an audio file, or click to browse
                </p>
                <p className="text-xs text-draper-muted/60">
                  .mp3, .wav, .m4a — max {MAX_FILE_SIZE_MB}MB
                </p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,.wav,.m4a"
            onChange={handleFileSelect}
            className="hidden"
          />
          {audioError && (
            <p className="text-xs text-red-400">{audioError}</p>
          )}
        </div>
      )}

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
          className="bg-draper-dark border-draper-border text-draper-text placeholder:text-draper-muted/50"
        />
        <p className="text-xs text-draper-muted">
          Describe the founder&apos;s tone in 3-5 words
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleSubmit}
          disabled={
            (inputMode === "text" && !content.trim()) ||
            (inputMode === "audio" && !audioFile) ||
            isLoading
          }
          className="w-full bg-draper-gold text-draper-black font-semibold hover:bg-draper-gold-hover disabled:opacity-40 disabled:cursor-not-allowed h-12 text-sm uppercase tracking-widest"
        >
          {isLoading ? "Generating..." : "GET STARTED >>"}
        </Button>

        <button
          onClick={handleTryExample}
          disabled={isLoading}
          className="w-full text-sm text-draper-muted hover:text-draper-gold transition-colors disabled:opacity-40"
        >
          or try a sample brain-dump →
        </button>
      </div>
    </Card>
  );
}