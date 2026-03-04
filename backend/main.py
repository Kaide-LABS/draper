import uuid
import time
import json
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

        ingestion_result = run_ingestion(request.content, input_type=request.input_type.value)

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


@app.get("/api/cached-result")
async def get_cached_result():
    """
    Returns a pre-cached pipeline result for demo fallback.
    Used when APIs are slow or down during a live demo.
    """
    cache_path = BACKEND_DIR / "sample_data" / "cached_result.json"
    if not cache_path.exists():
        raise HTTPException(status_code=404, detail="No cached result available")
    with open(cache_path, "r") as f:
        return json.load(f)