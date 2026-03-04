# Product Requirements Document: Draper AI Authority Engine — Demo

**Version:** 1.0
**Date:** 2026-03-04
**Author:** Claude (Architect) + [Your Name]
**Status:** Draft — Awaiting Approval

---

## 1. Executive Summary

### What We're Building
A polished, end-to-end demo of the **Draper AI Authority Engine** — a multi-agent pipeline that takes a founder's raw, unstructured thoughts (audio, text, notes) and autonomously transforms them into publication-ready, multi-platform content assets. The demo combines **Workflow I** (Cognitive Extraction & Synthesis) and **Workflow II** (Content Cascade & Distribution) from Draper's architectural blueprint into a single, visually compelling dashboard.

### Who It's For
**Sakib Ahmed** and **Mustafa Khan**, co-founders of Draper HQ. This demo must speak to both:
- **Sakib's lens:** Narrative warfare, contrarian framing, perception dominance. The AI must produce content that *weaponizes* a founder's thinking — not summarize it.
- **Mustafa's lens:** Deterministic reliability, audit trails, measurable quality gates. Every output must pass through visible quality checks with hard metrics — no black-box magic.

### Why It Matters
Draper currently sells highly customized human time. Every new client requires proportional headcount. This demo proves that a single strategist can manage **10x more clients** by replacing the blank-page problem with an executive-editor workflow: review and approve, never draft from scratch.

### The Demo Story (Pitch Flow)
> "Give us 30 minutes of your raw thinking. We'll show you what your Monday morning looks like with the Draper AI Engine."

1. Founder uploads a raw brain-dump (audio or text)
2. AI extracts key themes, beliefs, and contrarian angles
3. AI generates a long-form authority draft in the founder's voice
4. An adversarial critique agent scores and refines the draft
5. The approved piece cascades into LinkedIn post, X thread, newsletter blurb, and branded visual card
6. Everything lands on a dashboard ready for one-click approval

---

## 2. Problem Statement

### Current State (Pain)
| Phase | What Happens Today | Cost |
|-------|-------------------|------|
| Extraction | 1-2 hours of live interviews per client per week, manual transcription, thematic coding | High strategist time, $150-300/hr |
| Drafting | Copywriter stares at blank page, context-switches between 4-5 client voices | Inconsistent quality, revision cycles, burnout |
| Formatting | Manual reformatting for LinkedIn, X, newsletter — different lengths, hooks, formats | Junior headcount, 2-3 hours per piece |
| Distribution | Manual scheduling, copy-pasting into platform UIs | Error-prone, sub-optimal timing |
| Engagement | Account managers manually monitoring and replying to comments | Reactive, slow, expensive |

### Desired State (Demo Proves This)
| Phase | What the AI Engine Does | Result |
|-------|------------------------|--------|
| Extraction | Auto-transcribes, semantically chunks, identifies themes | Minutes, not hours |
| Drafting | Generates authority-first draft with contrarian framing | No blank page — strategist becomes editor |
| Quality Gate | Adversarial agent scores tone, readability, AI-detection risk | Mustafa-grade audit trail |
| Cascade | One piece → 4+ platform-ready assets instantly | Seconds, not days |
| Review | Dashboard with approve/reject/edit for each asset | One-click deployment ready |

---

## 3. Technical Architecture

### Stack
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | **Next.js 14 (App Router)** | Polished UI, server components, fast iteration |
| UI Components | **Tailwind CSS + shadcn/ui** | Professional look with minimal custom CSS |
| Backend API | **Python (FastAPI)** | Best ecosystem for AI orchestration, async support |
| LLM Providers | **OpenAI + Google (multi-provider)** | Best-in-class model per agent task (see Model Mapping below) |
| Audio Transcription | **OpenAI Whisper API** | Best-in-class transcription accuracy |
| State Management | **In-memory (demo)** | No database needed for demo — all state lives in session |
| Communication | **REST API** (Next.js → FastAPI) | Simple, debuggable, no over-engineering |

### Model Mapping (Confirmed)

| Agent | Model | Provider | Rationale |
|-------|-------|----------|-----------|
| Extraction | **Gemini 3 Pro** | Google | Deep reasoning for theme mining and contrarian angle identification |
| Synthesis | **GPT-5.2** | OpenAI | Superior creative writing for long-form authority drafts |
| Critique | **Gemini 3 Flash** | Google | Fast, cost-efficient scoring and evaluation |
| Cascade | **GPT-4o-mini** | OpenAI | Fast formatting and multi-platform fragmentation |
| Transcription (Phase 5) | **Whisper** | OpenAI | Best-in-class audio transcription |

**API Keys Required:**
- `OPENAI_API_KEY` — for GPT-5.2, GPT-4o-mini, and Whisper
- `GOOGLE_API_KEY` — for Gemini 3 Pro and Gemini 3 Flash

### System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     NEXT.JS DASHBOARD                           │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Upload   │  │  Agent    │  │  Draft    │  │   Content     │  │
│  │  Panel    │  │  Pipeline │  │  Review   │  │   Cascade     │  │
│  │          │  │  Viz      │  │  Editor   │  │   Gallery     │  │
│  └──────────┘  └──────────┘  └──────────┘  └───────────────┘  │
│                                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │ REST API
┌──────────────────────────▼──────────────────────────────────────┐
│                     FASTAPI BACKEND                             │
│                                                                 │
│  ┌─────────────────── AGENT PIPELINE ────────────────────────┐  │
│  │                                                           │  │
│  │  ┌───────────┐   ┌───────────┐   ┌───────────────────┐   │  │
│  │  │ Ingestion │──▶│ Extraction│──▶│ Narrative Synthesis│   │  │
│  │  │ Agent     │   │ Agent     │   │ Agent              │   │  │
│  │  └───────────┘   └───────────┘   └────────┬──────────┘   │  │
│  │                                            │              │  │
│  │                                   ┌────────▼──────────┐   │  │
│  │                                   │ Adversarial       │   │  │
│  │                                   │ Critique Agent    │   │  │
│  │                                   └────────┬──────────┘   │  │
│  │                                            │              │  │
│  │                              ┌─────────────▼───────────┐  │  │
│  │                              │ Content Cascade Agent   │  │  │
│  │                              │ (Fragment + Hook + Viz) │  │  │
│  │                              └─────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐             │
│  │ OpenAI API  │  │ Google AI    │  │ Whisper API │             │
│  │ GPT-5.2     │  │ Gemini 3 Pro │  │ (Phase 5)   │             │
│  │ GPT-4o-mini │  │ Gemini 3 Fl. │  │             │             │
│  └─────────────┘  └──────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Agent Definitions

### Agent 1: Ingestion Agent
| Attribute | Detail |
|-----------|--------|
| **Purpose** | Accept raw input (audio file OR pasted text) and produce clean, structured text |
| **Model** | Whisper API (audio) / passthrough (text) |
| **Input** | `.mp3`, `.wav`, `.m4a` audio file OR raw text blob |
| **Output** | Clean JSON: `{ "transcript": "...", "word_count": N, "input_type": "audio|text" }` |
| **Logic** | If audio → transcribe via Whisper, remove filler words ("um", "uh", "like", "you know"), normalize punctuation. If text → clean whitespace, normalize formatting. |

### Agent 2: Extraction Agent
| Attribute | Detail |
|-----------|--------|
| **Purpose** | Identify the founder's core themes, beliefs, contrarian angles, and quotable moments |
| **Model** | Gemini 3 Pro (Google) |
| **Input** | Clean transcript from Agent 1 |
| **Output** | Structured JSON: `{ "themes": [...], "contrarian_angles": [...], "key_quotes": [...], "emotional_hooks": [...], "expertise_signals": [...] }` |
| **System Prompt Essence** | "You are an elite thought-leadership strategist. Your job is not to summarize — it is to find the intellectual ammunition hidden in this founder's raw thinking. Identify beliefs that challenge industry consensus. Find predictions that position the founder as ahead of the market. Extract frameworks that no competitor is articulating." |

### Agent 3: Narrative Synthesis Agent
| Attribute | Detail |
|-----------|--------|
| **Purpose** | Generate a long-form authority draft (~500-800 words) from extracted themes |
| **Model** | GPT-5.2 (OpenAI) |
| **Input** | Extraction output from Agent 2 + optional "founder voice profile" (tone descriptors) |
| **Output** | Long-form thought leadership piece in the founder's voice |
| **System Prompt Essence** | "You are ghostwriting for an elite founder. Your output must read as if the founder wrote it themselves at their intellectual peak. Lead with a contrarian thesis. Attack a prevailing industry illusion. Use concrete data points and specific language — never vague platitudes. The reader should feel challenged, not comforted. Avoid all AI-identifiable patterns: no 'delve', 'moreover', 'tapestry', 'testament', 'it's worth noting', 'in today's landscape'." |

### Agent 4: Adversarial Critique Agent
| Attribute | Detail |
|-----------|--------|
| **Purpose** | Score the draft against quality metrics and reject/revise if below threshold |
| **Model** | Gemini 3 Flash (Google) — fast, cost-efficient for evaluation |
| **Input** | Draft from Agent 3 |
| **Output** | Structured score card + pass/fail + revision notes |
| **Scoring Matrix** | |

| Metric | Target | How It's Measured |
|--------|--------|-------------------|
| AI Detection Risk | < 15% | Check against banned word list (50+ words), sentence structure variety, paragraph length variance |
| Readability (Flesch-Kincaid) | Grade 10-13 | Calculated algorithmically — sophisticated but not academic |
| Contrarian Strength | > 7/10 | LLM self-evaluation: "Does this challenge a prevailing belief?" |
| Voice Authenticity | > 7/10 | LLM comparison against founder voice profile |
| Hook Power | > 7/10 | "Would a busy executive stop scrolling to read the first two sentences?" |
| Actionable Density | > 6/10 | Ratio of concrete claims/frameworks to filler |

**Behavior:** If overall score < 70% → auto-reject, send revision instructions back to Agent 3. Max 2 revision loops, then flag for human review.

### Agent 5: Content Cascade Agent
| Attribute | Detail |
|-----------|--------|
| **Purpose** | Transform the approved long-form piece into 4 platform-specific assets |
| **Model** | GPT-4o-mini (OpenAI) — fast, parallel generation |
| **Input** | Approved long-form draft |
| **Outputs** | |

| Asset | Spec |
|-------|------|
| **LinkedIn Post** | 150-250 words. Hook-first. Line breaks for readability. Ends with a question or CTA. No hashtags in body (optional at end). |
| **X/Twitter Thread** | 4-6 tweets. First tweet is a standalone hook. Each tweet is self-contained but builds on the thread. Character limit enforced. |
| **Newsletter Blurb** | 100-150 words. Teaser that drives clicks to the full piece. Conversational, slightly more intimate tone. |
| **Quote Card Text** | 1-2 sentences. The single most powerful, quotable line from the piece. Designed to overlay on a branded visual template. |

---

## 5. Frontend Pages & Components

### Page 1: Landing / Upload (`/`)
- Hero section with Draper branding placeholder
- Two input modes: **Upload Audio** (drag-and-drop) or **Paste Text** (textarea)
- Optional: "Founder Voice Profile" — dropdown or text input for tone descriptors (e.g., "direct, technical, provocative")
- **"Generate Authority Content"** button → triggers the pipeline

### Page 2: Pipeline View (`/pipeline`)
- Real-time visualization of the agent pipeline executing
- Each agent represented as a **card/node** in a horizontal flow
- States: `waiting` → `processing` (animated) → `complete` (green) → `failed` (red)
- As each agent completes, its output preview appears below the card
- The Critique Agent card shows the **live scorecard** with pass/fail metrics
- If revision loop triggered, show visual feedback (arrow looping back)

### Page 3: Review Dashboard (`/review`)
- **Left panel:** The full long-form draft with the critique scorecard
- **Right panel:** The 4 cascade assets displayed as preview cards
  - LinkedIn post → rendered in a LinkedIn-style mock frame
  - X thread → rendered in a Twitter-style mock frame
  - Newsletter → rendered in an email-style mock frame
  - Quote card → rendered as a branded visual card (dark background, large text)
- Each asset has: **Approve** / **Edit** / **Regenerate** buttons
- Top bar shows aggregate stats: total generation time, cost estimate, quality score

### Design Language
| Element | Spec |
|---------|------|
| Color palette | Dark mode primary. Black (#0A0A0A), charcoal (#1A1A1A), white text, accent gold (#C9A84C) or electric blue (#3B82F6) |
| Typography | Inter or Geist for UI, serif (like Playfair Display) for quote cards |
| Aesthetic | Minimal, premium, "fintech dashboard" feel. Think Linear or Vercel's design language. |
| Animations | Subtle — loading spinners on agents, fade-in for results, no excessive motion |

---

## 6. API Contract (Next.js ↔ FastAPI)

### `POST /api/pipeline/start`
**Request:**
```json
{
  "input_type": "audio" | "text",
  "content": "<base64 audio>" | "<raw text>",
  "voice_profile": "direct, technical, contrarian",
  "founder_name": "Alex Chen"
}
```
**Response:**
```json
{
  "pipeline_id": "uuid",
  "status": "started"
}
```

### `GET /api/pipeline/{pipeline_id}/status`
**Response (streamed or polled):**
```json
{
  "pipeline_id": "uuid",
  "status": "processing" | "complete" | "failed",
  "agents": {
    "ingestion": { "status": "complete", "duration_ms": 3200, "output_preview": "..." },
    "extraction": { "status": "complete", "duration_ms": 4500, "output": { "themes": [...], "contrarian_angles": [...] } },
    "synthesis": { "status": "complete", "duration_ms": 6100, "output_preview": "First 200 chars..." },
    "critique": { "status": "complete", "duration_ms": 2300, "scores": { "overall": 82, "ai_risk": 12, ... }, "passed": true, "revision_count": 1 },
    "cascade": { "status": "processing", "duration_ms": null }
  }
}
```

### `GET /api/pipeline/{pipeline_id}/results`
**Response:**
```json
{
  "pipeline_id": "uuid",
  "long_form_draft": "...",
  "critique_scorecard": { ... },
  "assets": {
    "linkedin_post": "...",
    "x_thread": ["tweet1", "tweet2", "tweet3", "tweet4"],
    "newsletter_blurb": "...",
    "quote_card_text": "..."
  },
  "metadata": {
    "total_duration_ms": 18400,
    "estimated_cost_usd": 0.12,
    "revision_loops": 1,
    "input_word_count": 2340,
    "output_word_count": 1820
  }
}
```

---

## 7. Demo Script (Pitch Meeting Flow)

### Setup (Before Meeting)
- Pre-load one example using a real-ish founder brain-dump about a spicy B2B topic
- Have the dashboard running on localhost or deployed to Vercel + Railway/Render

### Live Demo (5-7 minutes)

**Minute 0-1: The Problem**
> "Right now, your strategists spend 3-4 hours per client per week just getting from a raw brain-dump to a first draft. Then another 2 hours formatting for platforms. That's 5-6 hours of human labor per client per week. At 5 clients per strategist, you're already at capacity."

**Minute 1-2: The Upload**
- Paste a raw, messy founder text dump (or play a short audio clip)
- Click "Generate" — pipeline starts

**Minute 2-4: The Pipeline**
- Watch agents light up one by one in real-time
- Pause on the Critique Agent — show the scorecard
- "This is the Khan Quality Gate. Every piece gets scored on 6 dimensions before a human ever sees it. If it fails, it auto-revises. Your strategists never see a bad draft."

**Minute 4-6: The Output**
- Show the long-form draft — "This took 18 seconds. Your writer would need 90 minutes."
- Show the cascade — "One click and you have LinkedIn, X, newsletter, and a branded quote card."
- "Your strategist's entire job is now: read, approve, publish. That's a 10-minute workflow, not a 6-hour one."

**Minute 6-7: The Math**
> "If a strategist goes from 5 clients to 40 clients, and each client pays $X/month retainer — you've just 8x'd revenue per head without hiring anyone."

---

## 8. Sample Test Data

### Example Raw Input (Founder Brain-Dump)
```
You know what kills me about the SaaS market right now? Everyone is
obsessed with ARR growth and nobody is talking about the elephant in
the room — net revenue retention is collapsing across the board. I've
been saying this for two years. The entire PLG motion is built on a
lie that users will self-serve their way to enterprise contracts. They
won't. I've seen it in three portfolio companies now. The conversion
rate from free to paid is cratering because the product-led crowd
confused usage with intent. Usage is vanity. Intent is revenue. And
until founders stop celebrating DAUs and start measuring commercial
intent signals, we're going to keep seeing these spectacular Series B
implosions. The smart money is already shifting — look at what
Sequoia's been doing with their latest fund. They're not backing PLG
anymore, they're backing what I call "sales-assisted product-led"
which is just... enterprise sales with a free trial. We've come full
circle and nobody wants to admit it.
```

### Expected Output Quality Bar
- The LinkedIn post should NOT start with "In today's rapidly evolving SaaS landscape..."
- It SHOULD start with something like: "Net revenue retention is collapsing across SaaS. And nobody wants to talk about it."
- The tone must be: direct, opinionated, slightly aggressive, data-informed, zero fluff

---

## 9. Success Criteria

| Criteria | Target |
|----------|--------|
| End-to-end pipeline execution | < 60 seconds for text input, < 90 seconds for audio |
| Content quality | Passes the "would a human post this?" test with Sakib and Mustafa |
| AI detection risk | < 15% on banned word list, natural sentence variety |
| Critique agent accuracy | Catches and rejects genuinely bad drafts, passes good ones |
| Dashboard polish | Looks like a real product, not a hackathon prototype |
| Demo reliability | Works flawlessly 3 out of 3 times in live demo conditions |
| Cost per run | < $0.50 in combined OpenAI + Google API costs per full pipeline execution |

---

## 10. Out of Scope (For Demo)

These are referenced in CONTEXT.MD but explicitly excluded from this demo build:

- **Vector database / RAG** — no persistent founder memory (demo uses single-session input)
- **Social media API integration** — no actual posting to LinkedIn/X
- **Autonomous engagement agent** — no comment monitoring/replying
- **Workflow III (Digital Twin)** — no news monitoring or proactive generation
- **User authentication** — no login, single-user demo
- **Multi-client management** — demo shows one founder at a time
- **Figma API integration** — quote card is CSS-rendered, not Figma-generated
- **Webhook/cron automation** — all actions are manually triggered

These are natural "Phase 2" upsells after the demo lands.

---

## 11. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| LLM API latency spikes (OpenAI or Google) | Demo feels slow, breaks the "seconds not hours" narrative | Pre-cache one example result as fallback; use flash/mini models where speed > quality |
| LLM produces generic content | Founders aren't impressed, demo fails its core thesis | Heavy system prompt engineering, banned word list, adversarial critique loop |
| Audio transcription errors | Garbage in → garbage out | Offer text input as primary, audio as secondary; pre-test with sample audio |
| Dashboard crashes mid-demo | Embarrassing | Thorough testing, error boundaries, graceful fallback states |
| "We could just use ChatGPT" objection | Undermines value prop | The scorecard, the cascade, the pipeline visualization — show the *system*, not just the output |

---

## 12. Project Structure (Proposed)

```
draper/
├── frontend/                  # Next.js 14 app
│   ├── app/
│   │   ├── page.tsx           # Upload / landing
│   │   ├── pipeline/
│   │   │   └── page.tsx       # Pipeline visualization
│   │   ├── review/
│   │   │   └── page.tsx       # Review dashboard
│   │   └── layout.tsx         # Root layout, dark theme
│   ├── components/
│   │   ├── upload-panel.tsx
│   │   ├── pipeline-flow.tsx
│   │   ├── agent-card.tsx
│   │   ├── scorecard.tsx
│   │   ├── linkedin-preview.tsx
│   │   ├── twitter-preview.tsx
│   │   ├── newsletter-preview.tsx
│   │   └── quote-card.tsx
│   ├── lib/
│   │   └── api.ts             # API client
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                   # Python FastAPI
│   ├── main.py                # FastAPI app, routes
│   ├── agents/
│   │   ├── ingestion.py       # Audio/text processing
│   │   ├── extraction.py      # Theme extraction
│   │   ├── synthesis.py       # Long-form drafting
│   │   ├── critique.py        # Adversarial scoring
│   │   └── cascade.py         # Multi-platform fragmentation
│   ├── models/
│   │   └── schemas.py         # Pydantic models
│   ├── prompts/
│   │   ├── extraction.txt
│   │   ├── synthesis.txt
│   │   ├── critique.txt
│   │   └── cascade.txt
│   ├── config.py              # Settings, API keys
│   ├── requirements.txt
│   └── .env.example
│
├── CONTEXT.MD                 # Original blueprint
├── PRD.md                     # This document
└── README.md                  # Setup instructions
```

---

## 13. Team Structure & Workflow

| Role | Who | Responsibilities |
|------|-----|-----------------|
| **Senior Engineer** | Claude | Architecture, detailed specs in PRD, code review at phase-end, quality gates |
| **Junior Engineer** | Gemini | Executes code based on specs in PRD/project docs |
| **Product Owner** | You | Approves plans, manages handoffs between Claude and Gemini |

### Phase Execution Loop
```
Claude writes detailed spec for Phase N into PRD
  → You hand PRD to Gemini
    → Gemini builds Phase N autonomously
      → You bring completed code back to Claude
        → Claude reviews, approves or sends corrections
          → If approved → Claude writes spec for Phase N+1
          → If rejected → Gemini fixes based on Claude's review notes
```

### Spec Detail Level
Since Gemini is executing, each phase spec includes:
- Exact file paths and names
- Function signatures with parameter types and return types
- Full system prompt text for each agent (copy-paste ready)
- Complete Pydantic model definitions
- API endpoint contracts with request/response JSON examples
- Step-by-step implementation logic (not just "do X", but "do X by calling Y with Z parameters")

---

## 14. Implementation Phases

### Execution Order
```
Phase 1 (Backend) ──▶ Phase 2 (Frontend Scaffold) ──▶ Phase 3 (Pipeline Viz) ──▶ Phase 4 (Review Dashboard) ──▶ Phase 5 (Polish)
```

Each phase is fully functional and testable before moving to the next. No phase depends on a future phase.

---

### Phase 1: Backend Agent Pipeline — DETAILED IMPLEMENTATION SPEC

**Goal:** All 5 agents working end-to-end via FastAPI. Text in → multi-platform assets out. Testable via curl/Postman.

**What's NOT in Phase 1:**
- No frontend
- No real-time status streaming (added in Phase 3)
- No audio/Whisper support (added in Phase 5)
- No error recovery beyond basic try/catch

---

#### Phase 1.1: Project Setup

**Create the following directory structure:**
```
backend/
├── main.py
├── config.py
├── agents/
│   ├── __init__.py
│   ├── ingestion.py
│   ├── extraction.py
│   ├── synthesis.py
│   ├── critique.py
│   └── cascade.py
├── models/
│   ├── __init__.py
│   └── schemas.py
├── prompts/
│   ├── extraction.txt
│   ├── synthesis.txt
│   ├── critique.txt
│   └── cascade.txt
├── requirements.txt
└── .env.example
```

**`requirements.txt`:**
```
fastapi==0.115.0
uvicorn==0.30.0
pydantic==2.9.0
openai==1.50.0
google-genai==1.0.0
python-dotenv==1.0.1
```

**`.env.example`:**
```
OPENAI_API_KEY=sk-your-openai-key-here
GOOGLE_API_KEY=your-google-ai-key-here
```

**`backend/config.py`:**
```python
import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Model assignments
EXTRACTION_MODEL = "gemini-3-pro"         # Google — deep reasoning
SYNTHESIS_MODEL = "gpt-5.2"               # OpenAI — creative writing
CRITIQUE_MODEL = "gemini-3-flash"         # Google — fast evaluation
CASCADE_MODEL = "gpt-4o-mini"             # OpenAI — fast formatting
```

> **Note to Gemini:** The exact model ID strings (e.g., `"gemini-3-pro"`) may differ from the actual API identifiers. Use the correct model IDs from the respective provider SDKs at time of implementation. Check OpenAI and Google AI docs for the latest model ID strings.

---

#### Phase 1.2: Pydantic Schemas

**`backend/models/schemas.py`:**
```python
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
```

---

#### Phase 1.3: Agent Implementations

##### Agent 1 — Ingestion (`backend/agents/ingestion.py`)

```python
import re
from models.schemas import IngestionOutput


FILLER_WORDS = [
    r'\bum\b', r'\buh\b', r'\byou know\b', r'\blike\b(?=\s*,)',
    r'\bbasically\b', r'\bliterally\b', r'\bactually\b',
    r'\bso\b(?=\s*,)', r'\bright\b(?=\s*,)'
]


def run_ingestion(raw_text: str) -> IngestionOutput:
    """
    Phase 1: Text-only. Cleans raw text input.
    Phase 5 will add Whisper audio transcription.

    Steps:
    1. Strip leading/trailing whitespace
    2. Remove filler words (regex-based)
    3. Normalize multiple spaces to single space
    4. Normalize multiple newlines to double newline
    5. Return clean transcript with word count
    """
    text = raw_text.strip()

    for pattern in FILLER_WORDS:
        text = re.sub(pattern, '', text, flags=re.IGNORECASE)

    text = re.sub(r' +', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)

    return IngestionOutput(
        transcript=text,
        word_count=len(text.split()),
        input_type="text"
    )
```

##### Agent 2 — Extraction (`backend/agents/extraction.py`)

```python
import json
from google import genai
from config import GOOGLE_API_KEY, EXTRACTION_MODEL
from models.schemas import ExtractionOutput


client = genai.Client(api_key=GOOGLE_API_KEY)


def run_extraction(transcript: str) -> ExtractionOutput:
    """
    Uses Gemini 3 Pro to extract themes, contrarian angles, quotes,
    emotional hooks, and expertise signals from the cleaned transcript.

    Steps:
    1. Load system prompt from backend/prompts/extraction.txt
    2. Send transcript to Gemini 3 Pro with system prompt
    3. Parse JSON response into ExtractionOutput
    4. Return structured extraction
    """
    with open("prompts/extraction.txt", "r") as f:
        system_prompt = f.read()

    response = client.models.generate_content(
        model=EXTRACTION_MODEL,
        contents=f"{system_prompt}\n\n---\n\nFOUNDER'S RAW TRANSCRIPT:\n\n{transcript}",
        config={
            "response_mime_type": "application/json",
            "temperature": 0.3,
        }
    )

    data = json.loads(response.text)
    return ExtractionOutput(**data)
```

##### Agent 3 — Synthesis (`backend/agents/synthesis.py`)

```python
import json
from openai import OpenAI
from config import OPENAI_API_KEY, SYNTHESIS_MODEL
from models.schemas import ExtractionOutput


client = OpenAI(api_key=OPENAI_API_KEY)


def run_synthesis(extraction: ExtractionOutput, voice_profile: str, founder_name: str) -> str:
    """
    Uses GPT-5.2 to generate a 500-800 word long-form authority draft.

    Steps:
    1. Load system prompt from backend/prompts/synthesis.txt
    2. Build user message with extraction data + voice profile
    3. Send to GPT-5.2
    4. Return the raw draft text (string, not JSON)
    """
    with open("prompts/synthesis.txt", "r") as f:
        system_prompt = f.read()

    user_message = f"""FOUNDER NAME: {founder_name}
VOICE PROFILE: {voice_profile}

EXTRACTED THEMES:
{json.dumps(extraction.model_dump(), indent=2)}

Write a 500-800 word thought leadership piece based on the above extraction.
Write in first person as {founder_name}."""

    response = client.chat.completions.create(
        model=SYNTHESIS_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        temperature=0.7,
        max_tokens=2000
    )

    return response.choices[0].message.content
```

##### Agent 4 — Critique (`backend/agents/critique.py`)

```python
import json
import re
from google import genai
from config import GOOGLE_API_KEY, CRITIQUE_MODEL
from models.schemas import CritiqueScore


client = genai.Client(api_key=GOOGLE_API_KEY)

# Words that flag AI-generated content — instant credibility killers
BANNED_WORDS = [
    "delve", "moreover", "furthermore", "tapestry", "testament", "landscape",
    "paradigm", "synergy", "leverage", "robust", "holistic", "ecosystem",
    "navigate", "foster", "spearhead", "groundbreaking", "game-changing",
    "cutting-edge", "best-in-class", "world-class", "bleeding-edge",
    "it's worth noting", "in today's", "at the end of the day",
    "when it comes to", "in this article", "without further ado",
    "dive in", "dive deep", "unpack", "let's explore", "realm",
    "multifaceted", "comprehensive", "crucial", "pivotal", "essential",
    "transformative", "innovative", "disruptive", "unprecedented",
    "revolutionize", "empower", "unlock", "harness", "elevate",
    "streamline", "optimize", "facilitate", "endeavor", "underscore"
]


def calculate_ai_detection_risk(text: str) -> int:
    """Count banned words. Return 0-100 score (percentage of sentences containing banned words)."""
    text_lower = text.lower()
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if s.strip()]
    if not sentences:
        return 0
    flagged = sum(1 for s in sentences if any(w in s.lower() for w in BANNED_WORDS))
    return int((flagged / len(sentences)) * 100)


def run_critique(draft: str, voice_profile: str) -> CritiqueScore:
    """
    Uses Gemini 3 Flash to score the draft on 6 metrics.

    Steps:
    1. Calculate AI detection risk locally (banned word scan)
    2. Send draft + voice profile to Gemini 3 Flash for the other 5 metrics
    3. Combine local + LLM scores
    4. Calculate overall weighted average:
       - AI Detection Risk: 20% weight (inverted — lower risk = higher score)
       - Readability: 15% weight
       - Contrarian Strength: 25% weight
       - Voice Authenticity: 15% weight
       - Hook Power: 15% weight
       - Actionable Density: 10% weight
    5. Pass if overall >= 70, fail otherwise
    6. If failed, include specific revision instructions
    """
    ai_risk = calculate_ai_detection_risk(draft)

    with open("prompts/critique.txt", "r") as f:
        system_prompt = f.read()

    response = client.models.generate_content(
        model=CRITIQUE_MODEL,
        contents=f"""{system_prompt}

VOICE PROFILE: {voice_profile}

---

DRAFT TO EVALUATE:

{draft}""",
        config={
            "response_mime_type": "application/json",
            "temperature": 0.2,
        }
    )

    scores = json.loads(response.text)

    # Weighted overall score
    ai_risk_score = max(0, 100 - ai_risk)  # Invert: 0% risk = 100 score
    overall = int(
        ai_risk_score * 0.20 +
        scores["readability"] * 0.15 +
        scores["contrarian_strength"] * 10 * 0.25 +  # Scale 0-10 to 0-100
        scores["voice_authenticity"] * 10 * 0.15 +
        scores["hook_power"] * 10 * 0.15 +
        scores["actionable_density"] * 10 * 0.10
    )

    passed = overall >= 70

    return CritiqueScore(
        ai_detection_risk=ai_risk,
        readability=scores["readability"],
        contrarian_strength=scores["contrarian_strength"],
        voice_authenticity=scores["voice_authenticity"],
        hook_power=scores["hook_power"],
        actionable_density=scores["actionable_density"],
        overall=overall,
        passed=passed,
        revision_notes="" if passed else scores.get("revision_notes", "Improve contrarian framing and reduce generic language.")
    )
```

##### Agent 5 — Cascade (`backend/agents/cascade.py`)

```python
import json
from openai import OpenAI
from config import OPENAI_API_KEY, CASCADE_MODEL
from models.schemas import CascadeOutput


client = OpenAI(api_key=OPENAI_API_KEY)


def run_cascade(long_form_draft: str) -> CascadeOutput:
    """
    Uses GPT-4o-mini to fragment the approved long-form draft into
    4 platform-specific assets.

    Steps:
    1. Load system prompt from backend/prompts/cascade.txt
    2. Send approved draft to GPT-4o-mini
    3. Parse JSON response into CascadeOutput
    4. Return all 4 assets
    """
    with open("prompts/cascade.txt", "r") as f:
        system_prompt = f.read()

    response = client.chat.completions.create(
        model=CASCADE_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"APPROVED LONG-FORM DRAFT:\n\n{long_form_draft}"}
        ],
        temperature=0.6,
        max_tokens=3000,
        response_format={"type": "json_object"}
    )

    data = json.loads(response.choices[0].message.content)
    return CascadeOutput(**data)
```

---

#### Phase 1.4: System Prompts

##### `backend/prompts/extraction.txt`
```
You are an elite thought-leadership strategist working for a premium founder-authority agency. Your job is NOT to summarize. Your job is to find the intellectual ammunition hidden in this founder's raw, unfiltered thinking.

You must identify:
1. THEMES (3-5): The core beliefs and worldviews the founder holds. These should be opinionated, not generic.
2. CONTRARIAN ANGLES (2-3): Specific points where the founder disagrees with mainstream industry consensus. These are GOLD — they position the founder as ahead of the market.
3. KEY QUOTES (3-5): Direct phrases from the transcript that are powerful, memorable, and quotable. Do not paraphrase — use their exact words or very close adaptations.
4. EMOTIONAL HOOKS (2-3): Framings that would trigger an emotional response (frustration, curiosity, urgency) in the target audience of executives and investors.
5. EXPERTISE SIGNALS (2-3): Specific data points, anecdotes, or experiences that establish the founder's credibility and firsthand authority.

Return your response as a JSON object with these exact keys:
{
  "themes": ["...", "..."],
  "contrarian_angles": ["...", "..."],
  "key_quotes": ["...", "..."],
  "emotional_hooks": ["...", "..."],
  "expertise_signals": ["...", "..."]
}

Rules:
- Be specific, not generic. "Growth is important" is useless. "PLG conversion rates are collapsing because usage ≠ intent" is gold.
- Preserve the founder's raw, unpolished energy. Do not sanitize their language.
- If the founder makes a prediction, flag it explicitly — predictions are the highest-value authority signal.
```

##### `backend/prompts/synthesis.txt`
```
You are a world-class ghostwriter for elite founders and investors. You write thought leadership that commands attention and establishes intellectual dominance.

Your output must read as if the founder wrote it themselves at their absolute intellectual peak — sharp, opinionated, and impossible to ignore.

WRITING RULES (NON-NEGOTIABLE):
1. Lead with a contrarian thesis in the first 1-2 sentences. The reader must feel challenged immediately.
2. Attack a prevailing industry illusion. Name it explicitly. Do not be diplomatic.
3. Use concrete data points, specific examples, and firsthand experience — never vague platitudes.
4. Write in first person. Use "I" statements. This is the founder's voice, not a journalist's.
5. Short paragraphs (2-4 sentences max). White space is your friend.
6. End with a forward-looking insight or prediction — something only this founder would say.
7. Target 500-800 words. Dense, not padded.

BANNED PATTERNS (INSTANT REJECTION):
- Never use: "delve", "moreover", "tapestry", "testament", "landscape", "paradigm", "synergy", "leverage", "robust", "holistic", "ecosystem", "navigate", "foster", "spearhead", "groundbreaking", "game-changing", "it's worth noting", "in today's", "let's explore", "dive deep", "unpack", "multifaceted", "comprehensive", "crucial", "pivotal", "transformative", "innovative", "disruptive", "unprecedented", "revolutionize", "empower", "unlock", "harness", "elevate", "streamline"
- Never start with "In today's rapidly evolving..." or any variant
- Never use more than one em dash per paragraph
- Never use rhetorical questions in the opening line
- Vary sentence length aggressively: mix 5-word punches with 25-word complex thoughts

TONE: Direct. Opinionated. Slightly aggressive. Data-informed. Zero fluff. The reader should feel like they're getting an unfair advantage by reading this.
```

##### `backend/prompts/critique.txt`
```
You are a ruthless editorial quality auditor for a premium founder-authority agency. Your job is to score a draft on strict quality metrics. You have zero tolerance for mediocrity, generic AI-sounding content, or weak argumentation.

Score the following draft on these 5 dimensions (the 6th, AI Detection Risk, is calculated separately):

1. READABILITY (0-100): Target 65-80 on a Flesch-Kincaid scale. The text should be sophisticated but accessible — executive-level, not academic. Below 50 = too complex. Above 85 = too simplistic.

2. CONTRARIAN_STRENGTH (0-10): Does this piece challenge a prevailing industry belief? Does it name and attack a specific illusion? 7+ means a reader would stop and think "I disagree... but they might be right." Below 5 means it reads like every other LinkedIn post.

3. VOICE_AUTHENTICITY (0-10): Based on the voice profile provided, does this sound like a specific human with strong opinions? Or does it sound like a committee wrote it? 7+ means you could identify the author from the text alone.

4. HOOK_POWER (0-10): Would a busy executive stop scrolling after the first two sentences? 7+ means the opening is a pattern-interrupt — it surprises, provokes, or challenges. Below 5 means it's ignorable.

5. ACTIONABLE_DENSITY (0-10): What's the ratio of concrete claims, frameworks, and specific insights vs. filler and generalities? 6+ means nearly every paragraph delivers a specific, defensible point.

Also provide REVISION_NOTES: If any score is below threshold, write specific, actionable instructions for improvement. Be exact — "Make the opening more contrarian" is useless. "Replace the opening with a specific statistic about NRR decline and a direct attack on the PLG consensus" is useful.

Return as JSON:
{
  "readability": 0-100,
  "contrarian_strength": 0-10,
  "voice_authenticity": 0-10,
  "hook_power": 0-10,
  "actionable_density": 0-10,
  "revision_notes": "..." or ""
}
```

##### `backend/prompts/cascade.txt`
```
You are a multi-platform content strategist. You take a single approved thought leadership piece and fragment it into platform-optimized assets. Each asset must stand alone — a reader should get value even if they never see the original piece.

Generate ALL FOUR of the following assets from the provided draft:

1. LINKEDIN_POST (150-250 words):
   - Open with a hook that stops the scroll (first line is everything on LinkedIn)
   - Use line breaks liberally — dense paragraphs die on LinkedIn
   - End with a question or clear call-to-action
   - No hashtags in the body. Optional: 3-5 hashtags at the very end, separated by a blank line
   - Tone: professional but opinionated. Not corporate. Not casual.

2. X_THREAD (array of 4-6 tweets, each ≤ 280 characters):
   - Tweet 1: Standalone hook. Must work even if nobody reads the rest. Pattern-interrupt.
   - Tweets 2-5: Each tweet delivers one distinct insight. Self-contained but building.
   - Final tweet: Takeaway or prediction. End strong.
   - Use "→" or numbered lists for structure within tweets if needed.
   - No hashtags. No emojis unless the founder's voice demands it.

3. NEWSLETTER_BLURB (100-150 words):
   - Teaser that makes someone click "Read more"
   - Slightly more intimate/conversational tone than LinkedIn
   - Open with intrigue, close with a promise of the full insight
   - One paragraph, no bullet points

4. QUOTE_CARD_TEXT (1-2 sentences, max 30 words):
   - The single most powerful, quotable line from the piece
   - Must work visually on a dark background with large serif font
   - Punchy. Memorable. The kind of line people screenshot and share.

Return as JSON:
{
  "linkedin_post": "...",
  "x_thread": ["tweet1", "tweet2", "tweet3", "tweet4"],
  "newsletter_blurb": "...",
  "quote_card_text": "..."
}
```

---

#### Phase 1.5: Pipeline Orchestrator & API Routes

**`backend/main.py`:**
```python
import uuid
import time
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import (
    PipelineRequest, PipelineResponse, PipelineResult,
    CritiqueScore, CascadeOutput
)
from agents.ingestion import run_ingestion
from agents.extraction import run_extraction
from agents.synthesis import run_synthesis
from agents.critique import run_critique
from agents.cascade import run_cascade
from config import *

app = FastAPI(title="Draper AI Authority Engine", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for pipeline results (demo only — no database)
pipeline_store: dict = {}


@app.post("/api/pipeline/start", response_model=PipelineResponse)
async def start_pipeline(request: PipelineRequest):
    """
    Runs the full 5-agent pipeline synchronously (Phase 1).
    Phase 3 will add async execution with status tracking.

    Pipeline flow:
    1. Ingestion: Clean raw text
    2. Extraction: Extract themes via Gemini 3 Pro
    3. Synthesis: Generate draft via GPT-5.2
    4. Critique: Score draft via Gemini 3 Flash (max 2 revision loops)
    5. Cascade: Fragment into platform assets via GPT-4o-mini
    """
    pipeline_id = str(uuid.uuid4())
    start_time = time.time()

    try:
        # Agent 1: Ingestion
        ingestion_result = run_ingestion(request.content)

        # Agent 2: Extraction
        extraction_result = run_extraction(ingestion_result.transcript)

        # Agent 3 + 4: Synthesis with Critique Loop (max 2 revisions)
        max_revisions = 2
        revision_count = 0
        draft = ""
        critique_result = None

        for attempt in range(max_revisions + 1):
            # Generate or revise draft
            if attempt == 0:
                draft = run_synthesis(
                    extraction_result,
                    request.voice_profile,
                    request.founder_name
                )
            else:
                # Re-run synthesis with critique feedback appended
                revision_prompt_addition = f"\n\nPREVIOUS DRAFT WAS REJECTED. REVISION INSTRUCTIONS:\n{critique_result.revision_notes}\n\nRewrite the piece addressing these specific issues."
                draft = run_synthesis(
                    extraction_result,
                    request.voice_profile + revision_prompt_addition,
                    request.founder_name
                )

            # Critique the draft
            critique_result = run_critique(draft, request.voice_profile)

            if critique_result.passed:
                break
            revision_count += 1

        # Agent 5: Cascade
        cascade_result = run_cascade(draft)

        total_duration_ms = int((time.time() - start_time) * 1000)

        # Store results
        pipeline_store[pipeline_id] = PipelineResult(
            pipeline_id=pipeline_id,
            long_form_draft=draft,
            critique_scorecard=critique_result,
            assets=cascade_result,
            metadata={
                "total_duration_ms": total_duration_ms,
                "estimated_cost_usd": 0.15,  # rough estimate for demo
                "revision_loops": revision_count,
                "input_word_count": ingestion_result.word_count,
                "output_word_count": len(draft.split())
            }
        )

        return PipelineResponse(pipeline_id=pipeline_id, status="complete")

    except Exception as e:
        pipeline_store[pipeline_id] = None
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/pipeline/{pipeline_id}/results", response_model=PipelineResult)
async def get_results(pipeline_id: str):
    """Return stored pipeline results by ID."""
    if pipeline_id not in pipeline_store:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    result = pipeline_store[pipeline_id]
    if result is None:
        raise HTTPException(status_code=500, detail="Pipeline failed")
    return result


@app.get("/health")
async def health():
    return {"status": "ok"}
```

---

#### Phase 1.6: Verification

**How to test Phase 1 is complete:**

1. **Start the server:**
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # then fill in real API keys
uvicorn main:app --reload --port 8000
```

2. **Health check:**
```bash
curl http://localhost:8000/health
# Expected: {"status":"ok"}
```

3. **Run the full pipeline:**
```bash
curl -X POST http://localhost:8000/api/pipeline/start \
  -H "Content-Type: application/json" \
  -d '{
    "input_type": "text",
    "content": "You know what kills me about the SaaS market right now? Everyone is obsessed with ARR growth and nobody is talking about the elephant in the room — net revenue retention is collapsing across the board. I'\''ve been saying this for two years. The entire PLG motion is built on a lie that users will self-serve their way to enterprise contracts. They won'\''t. I'\''ve seen it in three portfolio companies now. The conversion rate from free to paid is cratering because the product-led crowd confused usage with intent. Usage is vanity. Intent is revenue. And until founders stop celebrating DAUs and start measuring commercial intent signals, we'\''re going to keep seeing these spectacular Series B implosions. The smart money is already shifting — look at what Sequoia'\''s been doing with their latest fund. They'\''re not backing PLG anymore, they'\''re backing what I call sales-assisted product-led which is just... enterprise sales with a free trial. We'\''ve come full circle and nobody wants to admit it.",
    "voice_profile": "direct, technical, contrarian",
    "founder_name": "Alex Chen"
  }'
# Expected: {"pipeline_id":"<uuid>","status":"complete"}
```

4. **Retrieve results:**
```bash
curl http://localhost:8000/api/pipeline/<uuid-from-step-3>/results
# Expected: Full JSON with long_form_draft, critique_scorecard, assets (linkedin_post, x_thread, newsletter_blurb, quote_card_text), and metadata
```

**Phase 1 is DONE when:**
- Health endpoint returns 200
- Pipeline endpoint accepts the sample text and returns `"status": "complete"`
- Results endpoint returns all 4 platform assets + critique scorecard
- The LinkedIn post does NOT start with "In today's rapidly evolving..."
- The critique scorecard shows `"passed": true` with an overall score >= 70

---

### Phase 2: Frontend Scaffold + Upload Page — DETAILED IMPLEMENTATION SPEC

**Goal:** Next.js app running with dark theme, Upload page functional, wired to backend. User pastes text, clicks Generate, request hits FastAPI and returns results.

**What's NOT in Phase 2:**
- No pipeline visualization yet (redirect to `/pipeline` shows a simple "Processing..." state)
- No review dashboard yet
- No audio upload yet (Phase 5)

---

#### Phase 2.1: Project Initialization

**Run these commands from the project root (`/draper`):**

```bash
# Create Next.js 14 app with App Router, TypeScript, Tailwind, ESLint
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --use-npm

cd frontend

# Install shadcn/ui
npx shadcn@latest init -d

# Add required shadcn components
npx shadcn@latest add button textarea input label card badge
```

**After init, the `frontend/` directory should look like:**
```
frontend/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── pipeline/
│       └── page.tsx
├── components/
│   ├── ui/               # shadcn components (auto-generated)
│   │   ├── button.tsx
│   │   ├── textarea.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   └── upload-panel.tsx   # custom component
├── lib/
│   ├── utils.ts           # shadcn utility (auto-generated)
│   └── api.ts             # API client for FastAPI
├── components.json        # shadcn config
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

---

#### Phase 2.2: Tailwind Configuration

**`frontend/tailwind.config.ts`** — extend the default shadcn config with the Draper design tokens:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Draper brand palette
        draper: {
          black: "#0A0A0A",
          charcoal: "#1A1A1A",
          dark: "#111111",
          border: "#2A2A2A",
          muted: "#888888",
          gold: "#C9A84C",
          "gold-hover": "#D4B85C",
        },
        // Override shadcn defaults for dark theme
        background: "#0A0A0A",
        foreground: "#FFFFFF",
        card: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#2A2A2A",
          foreground: "#888888",
        },
        accent: {
          DEFAULT: "#C9A84C",
          foreground: "#0A0A0A",
        },
        border: "#2A2A2A",
        input: "#2A2A2A",
        ring: "#C9A84C",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

#### Phase 2.3: Global Styles

**`frontend/app/globals.css`** — replace the default contents entirely:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-draper-black text-white font-sans antialiased;
  }
}
```

---

#### Phase 2.4: Root Layout

**`frontend/app/layout.tsx`:**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Draper AI Authority Engine",
  description: "Transform founder thinking into multi-platform authority content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen bg-draper-black">
          {/* Header */}
          <header className="border-b border-draper-border px-6 py-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-draper-gold rounded-md flex items-center justify-center">
                  <span className="text-draper-black font-bold text-sm">D</span>
                </div>
                <span className="text-lg font-semibold tracking-tight">
                  Draper AI Engine
                </span>
              </div>
              <span className="text-xs text-draper-muted">v0.1 Demo</span>
            </div>
          </header>

          {/* Main content */}
          <main className="max-w-5xl mx-auto px-6 py-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

---

#### Phase 2.5: API Client

**`frontend/lib/api.ts`:**

```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface PipelineRequest {
  input_type: "text" | "audio";
  content: string;
  voice_profile: string;
  founder_name: string;
}

export interface PipelineStartResponse {
  pipeline_id: string;
  status: string;
}

export interface CritiqueScore {
  ai_detection_risk: number;
  readability: number;
  contrarian_strength: number;
  voice_authenticity: number;
  hook_power: number;
  actionable_density: number;
  overall: number;
  passed: boolean;
  revision_notes: string;
}

export interface CascadeOutput {
  linkedin_post: string;
  x_thread: string[];
  newsletter_blurb: string;
  quote_card_text: string;
}

export interface PipelineResult {
  pipeline_id: string;
  long_form_draft: string;
  critique_scorecard: CritiqueScore;
  assets: CascadeOutput;
  metadata: {
    total_duration_ms: number;
    estimated_cost_usd: number;
    revision_loops: number;
    input_word_count: number;
    output_word_count: number;
  };
}

export async function startPipeline(
  request: PipelineRequest
): Promise<PipelineStartResponse> {
  const res = await fetch(`${API_BASE}/api/pipeline/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `Pipeline failed: ${res.status}`);
  }

  return res.json();
}

export async function getPipelineResults(
  pipelineId: string
): Promise<PipelineResult> {
  const res = await fetch(`${API_BASE}/api/pipeline/${pipelineId}/results`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `Failed to get results: ${res.status}`);
  }

  return res.json();
}
```

---

#### Phase 2.6: Upload Panel Component

**`frontend/components/upload-panel.tsx`:**

```tsx
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
```

---

#### Phase 2.7: Upload Page (Home)

**`frontend/app/page.tsx`:**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadPanel } from "@/components/upload-panel";
import { startPipeline, getPipelineResults, PipelineResult } from "@/lib/api";

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    content: string;
    voiceProfile: string;
    founderName: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Start the pipeline
      const { pipeline_id } = await startPipeline({
        input_type: "text",
        content: data.content,
        voice_profile: data.voiceProfile,
        founder_name: data.founderName,
      });

      // For Phase 2: pipeline runs synchronously, so results are ready immediately
      // Phase 3 will switch to async with polling
      const results = await getPipelineResults(pipeline_id);

      // Store results in sessionStorage for the pipeline/review pages to read
      sessionStorage.setItem("pipeline_results", JSON.stringify(results));
      sessionStorage.setItem("pipeline_id", pipeline_id);

      // Navigate to pipeline page
      router.push("/pipeline");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Authority Engine
        </h1>
        <p className="text-draper-muted max-w-xl mx-auto">
          Paste a founder&apos;s raw thinking. Get publication-ready content for
          LinkedIn, X, newsletter, and more — in seconds, not hours.
        </p>
      </div>

      {/* Upload Panel */}
      <UploadPanel onSubmit={handleSubmit} isLoading={isLoading} />

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
```

---

#### Phase 2.8: Pipeline Page (Placeholder)

**`frontend/app/pipeline/page.tsx`:**

This is a minimal placeholder for Phase 2. Phase 3 will replace it with the full visualization.

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PipelineResult } from "@/lib/api";

export default function PipelinePage() {
  const router = useRouter();
  const [results, setResults] = useState<PipelineResult | null>(null);

  useEffect(() => {
    // Read results from sessionStorage (set by home page after pipeline completes)
    const stored = sessionStorage.getItem("pipeline_results");
    if (!stored) {
      // No results — redirect back to home
      router.push("/");
      return;
    }
    setResults(JSON.parse(stored));
  }, [router]);

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-draper-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-draper-muted">Loading results...</p>
        </div>
      </div>
    );
  }

  // Phase 2: Simple raw output display (Phase 3 replaces with real visualization)
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Pipeline Complete</h1>
        <p className="text-draper-muted text-sm">
          Generated in {(results.metadata.total_duration_ms / 1000).toFixed(1)}s
          {" | "}
          {results.metadata.revision_loops} revision
          {results.metadata.revision_loops !== 1 ? "s" : ""}
          {" | "}
          Quality: {results.critique_scorecard.overall}/100
        </p>
      </div>

      {/* Long-form draft */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-draper-gold">
          Long-Form Draft
        </h2>
        <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 whitespace-pre-wrap text-sm leading-relaxed">
          {results.long_form_draft}
        </div>
      </div>

      {/* Critique Scorecard */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-draper-gold">
          Quality Scorecard
        </h2>
        <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            AI Detection Risk:{" "}
            <span className="font-mono">{results.critique_scorecard.ai_detection_risk}%</span>
          </div>
          <div>
            Readability:{" "}
            <span className="font-mono">{results.critique_scorecard.readability}/100</span>
          </div>
          <div>
            Contrarian Strength:{" "}
            <span className="font-mono">{results.critique_scorecard.contrarian_strength}/10</span>
          </div>
          <div>
            Voice Authenticity:{" "}
            <span className="font-mono">{results.critique_scorecard.voice_authenticity}/10</span>
          </div>
          <div>
            Hook Power:{" "}
            <span className="font-mono">{results.critique_scorecard.hook_power}/10</span>
          </div>
          <div>
            Actionable Density:{" "}
            <span className="font-mono">{results.critique_scorecard.actionable_density}/10</span>
          </div>
        </div>
      </div>

      {/* Cascade Assets */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-draper-gold">
          Platform Assets
        </h2>
        <div className="grid gap-4">
          {/* LinkedIn */}
          <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 space-y-2">
            <h3 className="text-sm font-semibold text-draper-muted uppercase tracking-wider">
              LinkedIn Post
            </h3>
            <p className="whitespace-pre-wrap text-sm">
              {results.assets.linkedin_post}
            </p>
          </div>

          {/* X Thread */}
          <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 space-y-2">
            <h3 className="text-sm font-semibold text-draper-muted uppercase tracking-wider">
              X Thread ({results.assets.x_thread.length} tweets)
            </h3>
            <div className="space-y-3">
              {results.assets.x_thread.map((tweet, i) => (
                <div key={i} className="text-sm pl-4 border-l-2 border-draper-border">
                  <span className="text-draper-muted text-xs">
                    {i + 1}/{results.assets.x_thread.length}
                  </span>
                  <p>{tweet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 space-y-2">
            <h3 className="text-sm font-semibold text-draper-muted uppercase tracking-wider">
              Newsletter Blurb
            </h3>
            <p className="whitespace-pre-wrap text-sm">
              {results.assets.newsletter_blurb}
            </p>
          </div>

          {/* Quote Card */}
          <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 space-y-2">
            <h3 className="text-sm font-semibold text-draper-muted uppercase tracking-wider">
              Quote Card
            </h3>
            <blockquote className="text-xl font-serif italic text-draper-gold border-l-4 border-draper-gold pl-4">
              {results.assets.quote_card_text}
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

#### Phase 2.9: Environment Variable

**`frontend/.env.local`** (create this file — NOT committed to git):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Add to `frontend/.gitignore` (should already be there from create-next-app, but verify):
```
.env.local
```

---

#### Phase 2.10: Verification

**How to test Phase 2 is complete:**

1. **Start the backend (from project root):**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

2. **Start the frontend (separate terminal):**
```bash
cd frontend
npm install
npm run dev
```

3. **Open browser:** Navigate to `http://localhost:3000`

4. **Verify the UI:**
   - Page has dark background (#0A0A0A)
   - Header shows "Draper AI Engine" with gold "D" logo box
   - Three input fields: Founder Name, Raw Brain-Dump textarea, Voice Profile
   - Word count updates as you type in the textarea
   - "Generate Authority Content" button is gold (#C9A84C)
   - Button is disabled when textarea is empty

5. **Test the flow:**
   - Enter "Alex Chen" as founder name
   - Paste the sample brain-dump from Section 8 of this PRD
   - Leave voice profile as "direct, technical, contrarian"
   - Click "Generate Authority Content"
   - Button should show "Generating..." with disabled state
   - After pipeline completes (30-60 seconds), should redirect to `/pipeline`
   - Pipeline page should display: long-form draft, critique scorecard, and all 4 platform assets

6. **Test error handling:**
   - Stop the backend server
   - Try submitting — should show red error banner, NOT a blank screen or crash

**Phase 2 is DONE when:**
- Dark-mode dashboard renders with Draper branding
- Upload form submits to FastAPI backend successfully
- Results display on `/pipeline` page after redirect
- Error state shows gracefully when backend is down
- No console errors in browser dev tools

---

### Phase 3: Pipeline Visualization — DETAILED IMPLEMENTATION SPEC

**Goal:** Real-time agent execution flow visible on `/pipeline` page. The "wow" moment where agents light up one by one. This is what makes the demo feel like a *product* instead of a ChatGPT wrapper.

**What's NOT in Phase 3:**
- No WebSocket/SSE (polling is simpler and sufficient for demo)
- No review dashboard yet (Phase 4)

---

#### Phase 3.1: Backend — Async Pipeline with Status Tracking

The Phase 1 pipeline runs synchronously — the `POST /api/pipeline/start` endpoint blocks until all agents complete. Phase 3 changes this to **async execution with per-agent status tracking**, so the frontend can poll for progress.

**Changes to `backend/main.py`:**

Replace the existing `start_pipeline` function and add the status endpoint. The pipeline now runs in a **background thread** and updates an in-memory status store as each agent completes.

```python
import uuid
import time
import threading
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import (
    PipelineRequest, PipelineResponse, PipelineResult,
    CritiqueScore, CascadeOutput
)
from agents.ingestion import run_ingestion
from agents.extraction import run_extraction
from agents.synthesis import run_synthesis
from agents.critique import run_critique
from agents.cascade import run_cascade
from config import *

app = FastAPI(title="Draper AI Authority Engine", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory stores (demo only)
pipeline_store: dict = {}     # pipeline_id -> PipelineResult
pipeline_status: dict = {}    # pipeline_id -> status dict with per-agent tracking


def run_pipeline_async(pipeline_id: str, request: PipelineRequest):
    """
    Runs the full 5-agent pipeline in a background thread.
    Updates pipeline_status after each agent completes so the
    frontend can poll for real-time progress.
    """
    start_time = time.time()

    # Initialize all agent statuses to "waiting"
    agent_names = ["ingestion", "extraction", "synthesis", "critique", "cascade"]
    for name in agent_names:
        pipeline_status[pipeline_id]["agents"][name] = {
            "status": "waiting",
            "duration_ms": None,
            "output_preview": None,
        }

    try:
        # ---- Agent 1: Ingestion ----
        pipeline_status[pipeline_id]["agents"]["ingestion"]["status"] = "processing"
        agent_start = time.time()

        ingestion_result = run_ingestion(request.content)

        pipeline_status[pipeline_id]["agents"]["ingestion"] = {
            "status": "complete",
            "duration_ms": int((time.time() - agent_start) * 1000),
            "output_preview": ingestion_result.transcript[:200] + "..." if len(ingestion_result.transcript) > 200 else ingestion_result.transcript,
        }

        # ---- Agent 2: Extraction ----
        pipeline_status[pipeline_id]["agents"]["extraction"]["status"] = "processing"
        agent_start = time.time()

        extraction_result = run_extraction(ingestion_result.transcript)

        pipeline_status[pipeline_id]["agents"]["extraction"] = {
            "status": "complete",
            "duration_ms": int((time.time() - agent_start) * 1000),
            "output_preview": f"{len(extraction_result.themes)} themes, {len(extraction_result.contrarian_angles)} angles extracted",
        }

        # ---- Agent 3 + 4: Synthesis with Critique Loop ----
        max_revisions = 2
        revision_count = 0
        draft = ""
        critique_result = None

        for attempt in range(max_revisions + 1):
            # Synthesis
            pipeline_status[pipeline_id]["agents"]["synthesis"]["status"] = "processing"
            agent_start = time.time()

            if attempt == 0:
                draft = run_synthesis(
                    extraction_result,
                    request.voice_profile,
                    request.founder_name
                )
            else:
                revision_prompt_addition = f"\n\nPREVIOUS DRAFT WAS REJECTED. REVISION INSTRUCTIONS:\n{critique_result.revision_notes}\n\nRewrite the piece addressing these specific issues."
                draft = run_synthesis(
                    extraction_result,
                    request.voice_profile + revision_prompt_addition,
                    request.founder_name
                )

            pipeline_status[pipeline_id]["agents"]["synthesis"] = {
                "status": "complete",
                "duration_ms": int((time.time() - agent_start) * 1000),
                "output_preview": draft[:200] + "..." if len(draft) > 200 else draft,
            }

            # Critique
            pipeline_status[pipeline_id]["agents"]["critique"]["status"] = "processing"
            agent_start = time.time()

            critique_result = run_critique(draft, request.voice_profile)

            critique_status = {
                "status": "complete",
                "duration_ms": int((time.time() - agent_start) * 1000),
                "output_preview": f"Score: {critique_result.overall}/100",
                "scores": {
                    "ai_detection_risk": critique_result.ai_detection_risk,
                    "readability": critique_result.readability,
                    "contrarian_strength": critique_result.contrarian_strength,
                    "voice_authenticity": critique_result.voice_authenticity,
                    "hook_power": critique_result.hook_power,
                    "actionable_density": critique_result.actionable_density,
                    "overall": critique_result.overall,
                },
                "passed": critique_result.passed,
                "revision_count": revision_count,
            }
            pipeline_status[pipeline_id]["agents"]["critique"] = critique_status

            if critique_result.passed:
                break

            revision_count += 1
            # Update revision count in status so frontend can show "Revision 1 of 2"
            pipeline_status[pipeline_id]["agents"]["critique"]["revision_count"] = revision_count
            # Reset synthesis to "waiting" for the revision loop
            pipeline_status[pipeline_id]["agents"]["synthesis"]["status"] = "revising"

        # ---- Agent 5: Cascade ----
        pipeline_status[pipeline_id]["agents"]["cascade"]["status"] = "processing"
        agent_start = time.time()

        cascade_result = run_cascade(draft)

        pipeline_status[pipeline_id]["agents"]["cascade"] = {
            "status": "complete",
            "duration_ms": int((time.time() - agent_start) * 1000),
            "output_preview": f"4 assets generated",
        }

        total_duration_ms = int((time.time() - start_time) * 1000)

        # Store final results
        pipeline_store[pipeline_id] = PipelineResult(
            pipeline_id=pipeline_id,
            long_form_draft=draft,
            critique_scorecard=critique_result,
            assets=cascade_result,
            metadata={
                "total_duration_ms": total_duration_ms,
                "estimated_cost_usd": 0.15,
                "revision_loops": revision_count,
                "input_word_count": ingestion_result.word_count,
                "output_word_count": len(draft.split()),
            }
        )

        pipeline_status[pipeline_id]["status"] = "complete"

    except Exception as e:
        pipeline_status[pipeline_id]["status"] = "failed"
        pipeline_status[pipeline_id]["error"] = str(e)
        pipeline_store[pipeline_id] = None


@app.post("/api/pipeline/start", response_model=PipelineResponse)
async def start_pipeline(request: PipelineRequest):
    """
    Starts the pipeline asynchronously in a background thread.
    Returns immediately with a pipeline_id for status polling.
    """
    pipeline_id = str(uuid.uuid4())

    # Initialize status
    pipeline_status[pipeline_id] = {
        "pipeline_id": pipeline_id,
        "status": "processing",
        "agents": {},
        "error": None,
    }

    # Run pipeline in background thread
    thread = threading.Thread(
        target=run_pipeline_async,
        args=(pipeline_id, request),
        daemon=True
    )
    thread.start()

    return PipelineResponse(pipeline_id=pipeline_id, status="started")


@app.get("/api/pipeline/{pipeline_id}/status")
async def get_status(pipeline_id: str):
    """
    Returns current status of the pipeline including per-agent progress.
    Frontend polls this every 1-2 seconds.
    """
    if pipeline_id not in pipeline_status:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return pipeline_status[pipeline_id]


@app.get("/api/pipeline/{pipeline_id}/results", response_model=PipelineResult)
async def get_results(pipeline_id: str):
    """Return stored pipeline results by ID. Only available after pipeline completes."""
    if pipeline_id not in pipeline_store:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    result = pipeline_store[pipeline_id]
    if result is None:
        raise HTTPException(status_code=500, detail="Pipeline failed")
    return result


@app.get("/health")
async def health():
    return {"status": "ok"}
```

**Key changes from Phase 1:**
- `start_pipeline` now returns immediately with `"status": "started"` (not `"complete"`)
- Pipeline runs in a `threading.Thread` (simple, sufficient for demo)
- New `pipeline_status` store tracks per-agent progress
- New `GET /api/pipeline/{id}/status` endpoint for polling
- Critique agent status includes `scores` object and `revision_count`

---

#### Phase 3.2: Frontend — Update API Client

**Add to `frontend/lib/api.ts`:**

```typescript
// Add this interface
export interface AgentStatus {
  status: "waiting" | "processing" | "complete" | "failed" | "revising";
  duration_ms: number | null;
  output_preview: string | null;
  // Only present on critique agent:
  scores?: {
    ai_detection_risk: number;
    readability: number;
    contrarian_strength: number;
    voice_authenticity: number;
    hook_power: number;
    actionable_density: number;
    overall: number;
  };
  passed?: boolean;
  revision_count?: number;
}

export interface PipelineStatus {
  pipeline_id: string;
  status: "processing" | "complete" | "failed";
  agents: Record<string, AgentStatus>;
  error: string | null;
}

// Add this function
export async function getPipelineStatus(
  pipelineId: string
): Promise<PipelineStatus> {
  const res = await fetch(`${API_BASE}/api/pipeline/${pipelineId}/status`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `Failed to get status: ${res.status}`);
  }

  return res.json();
}
```

**Also update `startPipeline`** — the response now returns `"started"` instead of `"complete"`, so the home page flow changes:

**Update `frontend/app/page.tsx` `handleSubmit`:**

```typescript
const handleSubmit = async (data: {
  content: string;
  voiceProfile: string;
  founderName: string;
}) => {
  setIsLoading(true);
  setError(null);

  try {
    const { pipeline_id } = await startPipeline({
      input_type: "text",
      content: data.content,
      voice_profile: data.voiceProfile,
      founder_name: data.founderName,
    });

    // Store pipeline_id — the pipeline page will poll for status
    sessionStorage.setItem("pipeline_id", pipeline_id);

    // Navigate to pipeline page immediately (don't wait for completion)
    router.push("/pipeline");
  } catch (err) {
    setError(err instanceof Error ? err.message : "Something went wrong");
    setIsLoading(false);
  }
};
```

**Key change:** No longer calls `getPipelineResults` here. The pipeline page handles polling.

---

#### Phase 3.3: Frontend — Agent Card Component

**`frontend/components/agent-card.tsx`:**

```tsx
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AgentStatus } from "@/lib/api";

interface AgentCardProps {
  name: string;
  description: string;
  icon: string;  // emoji
  status: AgentStatus | null;
  isActive: boolean;
}

export function AgentCard({ name, description, icon, status, isActive }: AgentCardProps) {
  const agentStatus = status?.status || "waiting";

  const statusStyles: Record<string, string> = {
    waiting: "border-draper-border opacity-40",
    processing: "border-draper-gold shadow-[0_0_20px_rgba(201,168,76,0.15)] animate-pulse",
    complete: "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]",
    failed: "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    revising: "border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
  };

  const badgeStyles: Record<string, string> = {
    waiting: "bg-draper-border text-draper-muted",
    processing: "bg-draper-gold/20 text-draper-gold",
    complete: "bg-green-500/20 text-green-400",
    failed: "bg-red-500/20 text-red-400",
    revising: "bg-amber-500/20 text-amber-400",
  };

  const badgeText: Record<string, string> = {
    waiting: "Waiting",
    processing: "Processing",
    complete: "Complete",
    failed: "Failed",
    revising: "Revising",
  };

  return (
    <Card
      className={`bg-draper-charcoal p-4 space-y-3 transition-all duration-500 border ${statusStyles[agentStatus]} min-w-[180px]`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xl">{icon}</span>
        <Badge className={`text-xs ${badgeStyles[agentStatus]}`}>
          {badgeText[agentStatus]}
        </Badge>
      </div>

      {/* Name & Description */}
      <div>
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-xs text-draper-muted">{description}</p>
      </div>

      {/* Duration (only when complete) */}
      {status?.duration_ms != null && (
        <p className="text-xs font-mono text-draper-muted">
          {(status.duration_ms / 1000).toFixed(1)}s
        </p>
      )}

      {/* Output Preview (only when complete) */}
      {status?.output_preview && agentStatus === "complete" && (
        <p className="text-xs text-draper-muted/70 truncate">
          {status.output_preview}
        </p>
      )}
    </Card>
  );
}
```

---

#### Phase 3.4: Frontend — Critique Scorecard Component

**`frontend/components/scorecard.tsx`:**

```tsx
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
```

---

#### Phase 3.5: Frontend — Pipeline Flow Component

**`frontend/components/pipeline-flow.tsx`:**

```tsx
"use client";

import { AgentCard } from "@/components/agent-card";
import { Scorecard } from "@/components/scorecard";
import type { PipelineStatus } from "@/lib/api";

interface PipelineFlowProps {
  status: PipelineStatus | null;
}

const AGENTS = [
  { key: "ingestion", name: "Ingestion", description: "Cleaning raw input", icon: "📥" },
  { key: "extraction", name: "Extraction", description: "Mining themes & angles", icon: "🔍" },
  { key: "synthesis", name: "Synthesis", description: "Drafting authority piece", icon: "✍️" },
  { key: "critique", name: "Critique", description: "Quality scoring", icon: "⚖️" },
  { key: "cascade", name: "Cascade", description: "Multi-platform assets", icon: "📤" },
];

export function PipelineFlow({ status }: PipelineFlowProps) {
  const critiqueAgent = status?.agents?.critique;
  const showScorecard = critiqueAgent && (critiqueAgent.status === "complete" || critiqueAgent.passed !== undefined);

  return (
    <div className="space-y-6">
      {/* Agent Cards — horizontal scroll on mobile, flex on desktop */}
      <div className="flex items-start gap-3 overflow-x-auto pb-4">
        {AGENTS.map((agent, i) => (
          <div key={agent.key} className="flex items-center gap-3">
            <AgentCard
              name={agent.name}
              description={agent.description}
              icon={agent.icon}
              status={status?.agents?.[agent.key] || null}
              isActive={status?.agents?.[agent.key]?.status === "processing"}
            />
            {/* Arrow between cards (not after last) */}
            {i < AGENTS.length - 1 && (
              <div className="text-draper-muted text-lg flex-shrink-0">→</div>
            )}
          </div>
        ))}
      </div>

      {/* Scorecard — appears below when critique agent completes */}
      {showScorecard && critiqueAgent?.scores && (
        <Scorecard
          scores={critiqueAgent.scores}
          passed={critiqueAgent.passed || false}
          revisionCount={critiqueAgent.revision_count || 0}
        />
      )}
    </div>
  );
}
```

---

#### Phase 3.6: Frontend — Pipeline Page (Full Replacement)

**Replace `frontend/app/pipeline/page.tsx` entirely:**

```tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PipelineFlow } from "@/components/pipeline-flow";
import { getPipelineStatus, getPipelineResults, PipelineStatus, PipelineResult } from "@/lib/api";

export default function PipelinePage() {
  const router = useRouter();
  const [status, setStatus] = useState<PipelineStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pipelineId = typeof window !== "undefined"
    ? sessionStorage.getItem("pipeline_id")
    : null;

  const pollStatus = useCallback(async () => {
    if (!pipelineId) return;

    try {
      const currentStatus = await getPipelineStatus(pipelineId);
      setStatus(currentStatus);

      if (currentStatus.status === "complete") {
        // Fetch full results and store for review page
        const results = await getPipelineResults(pipelineId);
        sessionStorage.setItem("pipeline_results", JSON.stringify(results));

        // Brief pause so user sees the final "complete" state, then redirect
        setTimeout(() => {
          router.push("/review");
        }, 2000);
      } else if (currentStatus.status === "failed") {
        setError(currentStatus.error || "Pipeline failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get status");
    }
  }, [pipelineId, router]);

  useEffect(() => {
    if (!pipelineId) {
      router.push("/");
      return;
    }

    // Poll every 1.5 seconds
    pollStatus(); // immediate first call
    const interval = setInterval(pollStatus, 1500);

    return () => clearInterval(interval);
  }, [pipelineId, pollStatus, router]);

  if (!pipelineId) {
    return null; // redirecting to home
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          {status?.status === "complete"
            ? "Pipeline Complete"
            : status?.status === "failed"
            ? "Pipeline Failed"
            : "Generating Authority Content"}
        </h1>
        <p className="text-draper-muted text-sm">
          {status?.status === "complete"
            ? "Redirecting to review..."
            : status?.status === "failed"
            ? "An error occurred during generation"
            : "Watch each agent process your content in real-time"}
        </p>
      </div>

      {/* Pipeline Flow Visualization */}
      <PipelineFlow status={status} />

      {/* Error */}
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
```

---

#### Phase 3.7: Frontend — Review Page Placeholder

**Create `frontend/app/review/page.tsx`:**

This is a simple placeholder that reads results from sessionStorage. Phase 4 will replace it with the full review dashboard.

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PipelineResult } from "@/lib/api";

export default function ReviewPage() {
  const router = useRouter();
  const [results, setResults] = useState<PipelineResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("pipeline_results");
    if (!stored) {
      router.push("/");
      return;
    }
    setResults(JSON.parse(stored));
  }, [router]);

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-draper-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-draper-muted">Loading review...</p>
        </div>
      </div>
    );
  }

  // Phase 3 placeholder — Phase 4 replaces with full review dashboard
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Review Dashboard</h1>
        <p className="text-draper-muted text-sm">
          Generated in {(results.metadata.total_duration_ms / 1000).toFixed(1)}s | Quality: {results.critique_scorecard.overall}/100
        </p>
      </div>

      <div className="bg-draper-charcoal border border-draper-border rounded-lg p-6 text-sm text-draper-muted">
        Full review dashboard coming in Phase 4. Results are loaded and ready.
        <pre className="mt-4 text-xs overflow-auto max-h-[400px]">
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

---

#### Phase 3.8: Verification

**How to test Phase 3 is complete:**

1. **Start both servers:**
```bash
# Terminal 1:
cd backend && uvicorn main:app --reload --port 8000

# Terminal 2:
cd frontend && npm run dev
```

2. **Open browser:** `http://localhost:3000`

3. **Submit the sample brain-dump** from Section 8 of this PRD

4. **Verify the pipeline page:**
   - Should redirect to `/pipeline` immediately (NOT wait for completion)
   - 5 agent cards displayed horizontally with arrows between them
   - Cards light up one by one: grey (waiting) → gold pulse (processing) → green (complete)
   - Each completed card shows duration in seconds
   - Critique card shows the scorecard with 6 metric bars below the flow
   - Score bars animate in with color coding (green = pass target, amber = below target)
   - If critique rejects the draft, synthesis card briefly shows "Revising" state
   - After all agents complete, page shows "Pipeline Complete" and auto-redirects to `/review` after 2 seconds

5. **Verify the review page:**
   - Should display "Review Dashboard" header with generation time and quality score
   - Raw JSON results visible (placeholder — Phase 4 replaces with full dashboard)

6. **Test error handling:**
   - Stop the backend mid-pipeline → pipeline page should show error state
   - Navigate to `/pipeline` without running a pipeline → should redirect to `/`

**Phase 3 is DONE when:**
- Pipeline page shows real-time agent progress via polling
- Cards animate through waiting → processing → complete states
- Critique scorecard appears with animated score bars
- Auto-redirect to `/review` after pipeline completes
- No polling continues after redirect (interval is cleared)

---

### Phase 4: Review Dashboard — Full Implementation Spec

**Goal:** All outputs displayed in polished, platform-accurate preview frames with approve/edit actions.

**What gets built:**
- **Review page (`/review`) — two-panel layout:**
  - **Left panel:** Full long-form authority draft (scrollable) + critique scorecard summary
  - **Right panel:** 4 asset preview cards stacked vertically
- **Platform mock frames:**
  - **LinkedIn preview:** Profile avatar placeholder, name, headline, post body with proper line breaks, like/comment/repost bar
  - **X/Twitter preview:** Sequential tweet cards with thread connector line, character counts, like/reply/repost icons
  - **Newsletter preview:** Email-style frame with subject line, preview text, "Read more" CTA
  - **Quote card preview:** Dark branded card with serif font, gold accent line, the core quote rendered as a visual asset
- **Actions per asset:** Approve (green check toggle), Edit (opens inline textarea), Copy (copy to clipboard)
- **Top stats bar:** Total generation time, estimated API cost, overall quality score, revision count
- **Edit mode:** Click "Edit" on any asset → text becomes editable textarea → "Save" or "Cancel"

**What's NOT in Phase 4:**
- No actual social media publishing
- No export/download functionality
- No regenerate (removed — edit is sufficient for demo, regenerate adds API call complexity)

**Key files:**
| File | Purpose |
|------|---------|
| `frontend/app/review/page.tsx` | Review dashboard page (replaces Phase 3 placeholder) |
| `frontend/components/linkedin-preview.tsx` | LinkedIn post mock frame |
| `frontend/components/twitter-preview.tsx` | X/Twitter thread mock frame |
| `frontend/components/newsletter-preview.tsx` | Email/newsletter mock frame |
| `frontend/components/quote-card.tsx` | Branded visual quote card |
| `frontend/components/draft-panel.tsx` | Long-form draft display + scorecard |
| `frontend/components/stats-bar.tsx` | Top stats bar (time, cost, score, revisions) |

**Verification:** Pipeline completes → review page shows long-form draft with scorecard on left, all 4 platform previews on right. Edit button works on each asset. Approve button visually marks asset as approved. Stats bar shows generation metadata.

---

#### Phase 4: Data Flow

The review page loads `PipelineResult` from `sessionStorage` (stored by pipeline page on completion). The data shape (already defined in `frontend/lib/api.ts`):

```typescript
// Already exists — no changes needed to api.ts
interface PipelineResult {
  pipeline_id: string;
  long_form_draft: string;           // Full text for left panel
  critique_scorecard: CritiqueScore;  // Scorecard data for left panel
  assets: CascadeOutput;             // 4 platform assets for right panel
  metadata: {
    total_duration_ms: number;
    estimated_cost_usd: number;
    revision_loops: number;
    input_word_count: number;
    output_word_count: number;
  };
}

interface CascadeOutput {
  linkedin_post: string;
  x_thread: string[];        // Array of 4-6 tweets
  newsletter_blurb: string;
  quote_card_text: string;
}
```

No backend changes needed for Phase 4. All data is already available from the Phase 1 pipeline.

---

#### Phase 4: Complete File Specifications

---

##### File: `frontend/components/stats-bar.tsx`

**Purpose:** Horizontal bar at the top of the review page showing key pipeline metrics.

```tsx
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
```

---

##### File: `frontend/components/draft-panel.tsx`

**Purpose:** Left panel showing the full long-form authority draft and the critique scorecard below it. Uses the existing `Scorecard` component from Phase 3.

```tsx
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
```

---

##### File: `frontend/components/linkedin-preview.tsx`

**Purpose:** LinkedIn-style post mock frame. Shows a realistic LinkedIn post card with profile info, post body, and engagement bar.

```tsx
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
            className="w-full bg-draper-dark border border-draper-border rounded p-3 text-sm text-gray-300 resize-y min-h-[150px] focus:outline-none focus:border-draper-gold"
            rows={8}
          />
        ) : (
          <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
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
```

---

##### File: `frontend/components/twitter-preview.tsx`

**Purpose:** X/Twitter thread mock frame. Shows sequential tweets with a thread connector line and character counts.

```tsx
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
```

---

##### File: `frontend/components/newsletter-preview.tsx`

**Purpose:** Email/newsletter mock frame with subject line, body preview, and a "Read More" CTA.

```tsx
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
            <span className="text-gray-300">{founderName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-draper-muted w-12">Subject:</span>
            <span className="text-white font-semibold">{subjectLine}</span>
          </div>
        </div>
      </div>

      {/* Email body */}
      <div className="px-4 py-4">
        {isEditing ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full bg-draper-dark border border-draper-border rounded p-3 text-sm text-gray-300 resize-y min-h-[120px] focus:outline-none focus:border-draper-gold"
            rows={6}
          />
        ) : (
          <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
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
```

---

##### File: `frontend/components/quote-card.tsx`

**Purpose:** Branded visual quote card with serif font, gold accent bar, and the core quote. This is meant to look like an Instagram/social visual asset.

```tsx
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
            className="w-full bg-draper-dark border border-draper-border rounded p-3 text-sm text-gray-300 resize-y min-h-[100px] focus:outline-none focus:border-draper-gold"
            rows={4}
          />
        ) : (
          <div className="bg-draper-black rounded-lg p-8 relative">
            {/* Gold accent bar on the left */}
            <div className="absolute left-0 top-4 bottom-4 w-1 bg-draper-gold rounded-r" />

            {/* Opening quotation mark */}
            <span className="text-4xl text-draper-gold/40 font-serif leading-none block mb-2">"</span>

            {/* Quote text — serif font */}
            <p className="text-lg font-serif text-white leading-relaxed pl-4">
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
```

---

##### File: `frontend/app/review/page.tsx` (REPLACE existing Phase 3 placeholder)

**Purpose:** The main review dashboard page. Two-panel layout: left panel (draft + scorecard), right panel (4 asset previews). Stats bar at top.

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PipelineResult } from "@/lib/api";
import { StatsBar } from "@/components/stats-bar";
import { DraftPanel } from "@/components/draft-panel";
import { LinkedInPreview } from "@/components/linkedin-preview";
import { TwitterPreview } from "@/components/twitter-preview";
import { NewsletterPreview } from "@/components/newsletter-preview";
import { QuoteCard } from "@/components/quote-card";

export default function ReviewPage() {
  const router = useRouter();
  const [results, setResults] = useState<PipelineResult | null>(null);
  const [founderName, setFounderName] = useState("Founder");

  useEffect(() => {
    const stored = sessionStorage.getItem("pipeline_results");
    if (!stored) {
      router.push("/");
      return;
    }
    setResults(JSON.parse(stored));

    // Try to get founder name from pipeline request (stored by home page)
    const storedName = sessionStorage.getItem("founder_name");
    if (storedName) {
      setFounderName(storedName);
    }
  }, [router]);

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-draper-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-draper-muted">Loading review...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Review Dashboard</h1>
        <p className="text-draper-muted text-sm">
          Review, edit, and approve your authority content
        </p>
      </div>

      {/* Stats Bar */}
      <StatsBar
        totalDurationMs={results.metadata.total_duration_ms}
        estimatedCostUsd={results.metadata.estimated_cost_usd}
        overallScore={results.critique_scorecard.overall}
        passed={results.critique_scorecard.passed}
        revisionLoops={results.metadata.revision_loops}
        inputWordCount={results.metadata.input_word_count}
        outputWordCount={results.metadata.output_word_count}
      />

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel — Draft + Scorecard */}
        <DraftPanel
          draft={results.long_form_draft}
          scorecard={results.critique_scorecard}
          revisionLoops={results.metadata.revision_loops}
          founderName={founderName}
        />

        {/* Right Panel — Platform Asset Previews */}
        <div className="space-y-4">
          <LinkedInPreview
            content={results.assets.linkedin_post}
            founderName={founderName}
          />

          <TwitterPreview
            thread={results.assets.x_thread}
            founderName={founderName}
          />

          <NewsletterPreview
            content={results.assets.newsletter_blurb}
            founderName={founderName}
          />

          <QuoteCard
            quote={results.assets.quote_card_text}
            founderName={founderName}
          />
        </div>
      </div>

      {/* Back to Home */}
      <div className="text-center pb-8">
        <button
          onClick={() => {
            sessionStorage.clear();
            router.push("/");
          }}
          className="px-6 py-2 text-sm bg-draper-dark text-draper-muted rounded-lg hover:text-white border border-draper-border"
        >
          ← Start New Generation
        </button>
      </div>
    </div>
  );
}
```

---

##### File: `frontend/app/page.tsx` (MINOR UPDATE — store founder_name in sessionStorage)

**One small addition needed:** After storing `pipeline_id`, also store `founder_name` so the review page can display it in platform previews. Add this line inside `handleSubmit`, right after the `sessionStorage.setItem("pipeline_id", pipeline_id)` line:

```tsx
// EXISTING LINE (keep):
sessionStorage.setItem("pipeline_id", pipeline_id);

// ADD THIS LINE after it:
sessionStorage.setItem("founder_name", data.founderName);

// EXISTING LINE (keep):
router.push("/pipeline");
```

This is the only change to `page.tsx`. Everything else stays the same from Phase 2/3.

---

#### Phase 4: Design Decisions & Notes for Implementation

1. **No backend changes.** Phase 4 is entirely frontend. All data comes from `PipelineResult` already stored in `sessionStorage`.

2. **Edit is local-only.** Editing an asset updates local React state. There's no API call to persist edits — this is a demo. The `onContentChange` callback props are available for future use but not wired to anything in Phase 4.

3. **Approve is visual-only.** Toggling "Approve" adds a green border and checkmark. No API call — it's a UI state toggle for demo purposes.

4. **Copy to clipboard** uses `navigator.clipboard.writeText()`. For the X thread, it formats as numbered tweets.

5. **Subject line for newsletter** is auto-extracted from the first sentence of the blurb. No separate field needed.

6. **Quote card** uses `font-serif` (Playfair Display) — already loaded in `globals.css` via Google Fonts import.

7. **Responsive layout:** `grid-cols-1 lg:grid-cols-2` — stacks vertically on mobile/tablet, side-by-side on laptop (1024px+). This is ideal for the demo laptop/projection scenario.

8. **Scorecard reuse:** The `DraftPanel` imports and renders the existing `Scorecard` component from Phase 3. No duplication.

9. **"Start New Generation" button** clears sessionStorage and returns to home page. Clean state reset for demo re-runs.

---

#### Phase 4: Verification Checklist

- [ ] Review page loads correctly after pipeline completes (redirect from `/pipeline`)
- [ ] Stats bar shows all 6 metrics (time, cost, score, revisions, input words, output words)
- [ ] Left panel shows full draft text with proper paragraph breaks
- [ ] Left panel shows scorecard with all 6 metric bars (reusing Phase 3 Scorecard component)
- [ ] LinkedIn preview shows avatar initial, name, "Founder & CEO", post body, engagement bar
- [ ] X thread shows sequential tweets with thread connector line and character counts
- [ ] Newsletter shows From/Subject header, body text, "Read Full Article" CTA button
- [ ] Quote card shows gold accent bar, serif font quote, attribution
- [ ] Edit button on each asset opens inline textarea
- [ ] Save/Cancel in edit mode work correctly
- [ ] Approve button toggles green border + "✓ Approved" badge
- [ ] Copy button copies content to clipboard with "Copied!" feedback
- [ ] "Start New Generation" button clears session and returns to home
- [ ] Two-panel layout works at 1440px (side-by-side) and stacks on narrow screens
- [ ] All components use Draper brand tokens (draper-charcoal, draper-border, draper-gold, etc.)

---

### Phase 5: Polish + Demo Prep
**Goal:** Bulletproof for a live pitch meeting. Zero rough edges. Runs flawlessly every time.

**What gets built:**
- **Audio support:** Whisper API integration — drag-and-drop `.mp3`/`.wav`/`.m4a` on upload page
- **Pre-loaded sample data:** "Try an example" button on upload page that fills in the sample founder brain-dump
- **Loading states everywhere:** Skeleton screens, progress indicators, "Generating..." states
- **Error boundaries:** Graceful fallback UI if any agent fails (not a blank screen or crash)
- **Fallback cache:** One pre-cached complete result set — if OpenAI API is slow/down, demo can still run
- **Responsive polish:** Ensure dashboard looks good on 1440px laptop screen and when projected
- **Prompt tuning:** Final pass on all 4 agent system prompts to ensure outputs are genuinely impressive
- **README.md:** Setup instructions (clone, install, add API key, run both servers)
- **End-to-end stress test:** Run full flow 3+ times with different inputs, fix any flakiness

**What's NOT in Phase 5:**
- No deployment (demo runs on localhost — deploy only if explicitly requested)
- No CI/CD pipeline (demo project, not production)

**Key files:**
| File | Purpose |
|------|---------|
| `frontend/components/upload-panel.tsx` | Updated with audio drag-drop + "Try example" button |
| `backend/agents/ingestion.py` | Updated with Whisper API transcription |
| `backend/prompts/*.txt` | Final tuned versions of all system prompts |
| `README.md` | Setup and run instructions |

**Verification:** Demo runs flawlessly 3 out of 3 times end-to-end. Both text and audio input work. A non-technical person can follow the flow and be impressed. No loading state lasts longer than the narrative allows.

---

### Phase Summary

| Phase | What | Core Deliverable | Builds On |
|-------|------|-----------------|-----------|
| **1** | Backend Agent Pipeline | `curl` → 4 assets + scorecard | Nothing (greenfield) |
| **2** | Frontend Scaffold + Upload | Dark-mode Next.js app, upload wired to backend | Phase 1 API |
| **3** | Pipeline Visualization | Real-time agent cards lighting up sequentially | Phase 1 status tracking + Phase 2 app |
| **4** | Review Dashboard | Platform mock frames with approve/edit/regenerate | Phase 1 results + Phase 2 app |
| **5** | Polish + Demo Prep | Audio support, cached fallbacks, zero rough edges | All previous phases |

---

*This PRD is a living document. Updates will be made as implementation decisions crystallize.*
