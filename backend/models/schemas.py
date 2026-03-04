from pydantic import BaseModel
from typing import Optional
from enum import Enum


class InputType(str, Enum):
    TEXT = "text"
    AUDIO = "audio"


class PipelineRequest(BaseModel):
    input_type: InputType = InputType.TEXT
    content: str  # raw text or base64 audio (Phase 5)
    voice_profile: str = "direct, authoritative, contrarian"
    founder_name: str = "Founder"


class IngestionOutput(BaseModel):
    transcript: str
    word_count: int
    input_type: str


class ExtractionOutput(BaseModel):
    themes: list[str]               # 3-5 core themes
    contrarian_angles: list[str]    # 2-3 angles that challenge consensus
    key_quotes: list[str]           # 3-5 direct quotable lines from the founder
    emotional_hooks: list[str]      # 2-3 emotionally resonant framings
    expertise_signals: list[str]    # 2-3 credibility/authority markers


class CritiqueScore(BaseModel):
    ai_detection_risk: int          # 0-100 (lower is better, target < 15)
    readability: int                # 0-100 (target 65-80, maps to Flesch-Kincaid grade 10-13)
    contrarian_strength: int        # 0-10 (target > 7)
    voice_authenticity: int         # 0-10 (target > 7)
    hook_power: int                 # 0-10 (target > 7)
    actionable_density: int         # 0-10 (target > 6)
    overall: int                    # 0-100 weighted average
    passed: bool                    # True if overall >= 70
    revision_notes: str             # Empty if passed, specific instructions if failed


class CascadeOutput(BaseModel):
    linkedin_post: str
    x_thread: list[str]             # 4-6 tweets
    newsletter_blurb: str
    quote_card_text: str


class PipelineResponse(BaseModel):
    pipeline_id: str
    status: str                     # "started" | "complete" | "failed"


class PipelineResult(BaseModel):
    pipeline_id: str
    long_form_draft: str
    critique_scorecard: CritiqueScore
    assets: CascadeOutput
    metadata: dict                  # total_duration_ms, estimated_cost_usd, revision_loops, input_word_count, output_word_count