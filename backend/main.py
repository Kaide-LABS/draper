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