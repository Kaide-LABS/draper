# Draper AI Authority Engine

A multi-agent AI pipeline that transforms a founder's raw thinking into publication-ready, multi-platform content — LinkedIn posts, X threads, newsletter blurbs, and branded quote cards.

Built as a demo for [Draper HQ](https://draperhq.com).

## Architecture

```
Founder Input → Ingestion → Extraction → Synthesis → Critique → Cascade → 4 Platform Assets
                 (clean)    (Gemini 3    (GPT-5.2)   (Gemini 3   (GPT-4o
                              Pro)                     Flash)      mini)
```

**Frontend:** Next.js 16 + Tailwind v4 + shadcn/ui
**Backend:** Python FastAPI
**LLM Providers:** OpenAI (GPT-5.2, GPT-4o-mini, Whisper) + Google (Gemini 3 Pro, Gemini 3 Flash)

## Setup

### Prerequisites

- Node.js 18+
- Python 3.10+
- OpenAI API key
- Google AI API key

### 1. Clone

```bash
git clone https://github.com/Kaide-LABS/draper.git
cd draper
```

### 2. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your API keys:
# OPENAI_API_KEY=sk-...
# GOOGLE_API_KEY=...

# Run
uvicorn main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Open

Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Enter a founder name and paste raw thoughts (or upload audio)
2. Click "Generate Authority Content" (or "Try a sample brain-dump")
3. Watch the 5-agent pipeline process in real-time
4. Review, edit, and approve the generated content on the dashboard

## Demo Fallback

If APIs are slow or unavailable, click "Use cached demo results" on the error screen to load pre-generated content.
