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

### Phase 2: Frontend Scaffold + Upload Page
**Goal:** Next.js app running with dark theme, Upload page functional, wired to backend.

**What gets built:**
- Next.js 14 app with App Router (`frontend/`)
- Tailwind CSS + shadcn/ui installed and configured
- Dark theme global layout (black `#0A0A0A`, charcoal `#1A1A1A`, white text, gold accent `#C9A84C`)
- Upload page (`/`) — textarea for raw text input, voice profile input field, "Generate Authority Content" button
- API client lib (`frontend/lib/api.ts`) that calls FastAPI backend
- Basic routing: submit on `/` → redirect to `/pipeline`
- CORS configured between Next.js (port 3000) and FastAPI (port 8000)

**What's NOT in Phase 2:**
- No pipeline visualization yet (just a loading/waiting state)
- No review dashboard yet
- No audio upload yet

**Key files:**
| File | Purpose |
|------|---------|
| `frontend/app/layout.tsx` | Root layout, dark theme, Inter font, global styles |
| `frontend/app/page.tsx` | Upload / landing page |
| `frontend/components/upload-panel.tsx` | Text input, voice profile, submit button |
| `frontend/lib/api.ts` | Fetch wrapper for FastAPI endpoints |
| `frontend/tailwind.config.ts` | Custom color palette, typography |
| `frontend/package.json` | Dependencies |

**Verification:** Open browser at `localhost:3000`, paste sample text, click Generate → request reaches FastAPI backend and returns results (console-logged or displayed raw).

---

### Phase 3: Pipeline Visualization
**Goal:** Real-time agent execution flow visible on `/pipeline` page. The "wow" moment where agents light up one by one.

**What gets built:**
- **Backend additions:**
  - `GET /api/pipeline/{id}/status` endpoint with per-agent status tracking
  - In-memory status store updated after each agent completes
  - Each agent status includes: `waiting` | `processing` | `complete` | `failed`, `duration_ms`, `output_preview`
- **Frontend — Pipeline page (`/pipeline`):**
  - Horizontal flow of 5 agent cards connected by arrows/lines
  - Each card shows: agent name, icon, status badge, elapsed time
  - `waiting` = dim/grey, `processing` = pulsing animation, `complete` = green glow, `failed` = red
  - Polling mechanism (every 1-2 seconds) to update agent statuses from backend
  - Critique Agent card expands to show live scorecard with 6 metric bars
  - If revision loop triggered: visual indicator (loop arrow, "Revision 1 of 2" badge)
  - Auto-redirect to `/review` when all agents complete

**What's NOT in Phase 3:**
- No WebSocket/SSE (polling is simpler and sufficient for demo)
- No review dashboard content yet

**Key files:**
| File | Purpose |
|------|---------|
| `frontend/app/pipeline/page.tsx` | Pipeline visualization page |
| `frontend/components/pipeline-flow.tsx` | Horizontal agent flow layout |
| `frontend/components/agent-card.tsx` | Individual agent status card with animations |
| `frontend/components/scorecard.tsx` | Critique scorecard with metric bars |
| `backend/main.py` | Updated with status tracking + status endpoint |

**Verification:** Start pipeline → watch agents light up sequentially in browser → critique scorecard populates with scores → auto-redirects to `/review`.

---

### Phase 4: Review Dashboard
**Goal:** All outputs displayed in polished, platform-accurate preview frames with approve/edit/regenerate actions.

**What gets built:**
- **Review page (`/review`) — two-panel layout:**
  - **Left panel:** Full long-form authority draft (scrollable) + critique scorecard summary
  - **Right panel:** 4 asset preview cards stacked vertically
- **Platform mock frames:**
  - **LinkedIn preview:** Profile avatar placeholder, name, headline, post body with proper line breaks, like/comment/repost bar
  - **X/Twitter preview:** Sequential tweet cards with thread connector line, character counts, like/reply/repost icons
  - **Newsletter preview:** Email-style frame with subject line, preview text, "Read more" CTA
  - **Quote card preview:** Dark branded card with serif font, gold accent line, the core quote rendered as a visual asset
- **Actions per asset:** Approve (green), Edit (opens inline text editor), Regenerate (re-calls cascade agent for that asset)
- **Top stats bar:** Total generation time, estimated API cost, overall quality score, revision count
- **Edit mode:** Click "Edit" on any asset → text becomes editable inline → "Save" to update

**What's NOT in Phase 4:**
- No actual social media publishing
- No export/download functionality
- Regenerate calls the full cascade agent (not individual asset regeneration)

**Key files:**
| File | Purpose |
|------|---------|
| `frontend/app/review/page.tsx` | Review dashboard page |
| `frontend/components/linkedin-preview.tsx` | LinkedIn post mock frame |
| `frontend/components/twitter-preview.tsx` | X/Twitter thread mock frame |
| `frontend/components/newsletter-preview.tsx` | Email/newsletter mock frame |
| `frontend/components/quote-card.tsx` | Branded visual quote card |

**Verification:** Pipeline completes → review page shows long-form draft with scorecard on left, all 4 platform previews on right. Edit button works. Approve button visually marks asset as approved.

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
