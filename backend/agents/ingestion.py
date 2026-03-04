import re
import base64
import tempfile
from openai import OpenAI
from config import OPENAI_API_KEY, WHISPER_MODEL
from models.schemas import IngestionOutput


client = OpenAI(api_key=OPENAI_API_KEY)

FILLER_WORDS = [
    r'\bum\b', r'\buh\b', r'\byou know\b', r'\blike\b(?=\s*,)',
    r'\bbasically\b', r'\bliterally\b', r'\bactually\b',
    r'\bso\b(?=\s*,)', r'\bright\b(?=\s*,)'
]


def transcribe_audio(audio_base64: str) -> str:
    """
    Decodes base64 audio, writes to a temp file, sends to Whisper API.
    Returns raw transcript text.
    """
    audio_bytes = base64.b64decode(audio_base64)

    # Write to temp file — Whisper needs a file with a proper extension
    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name

    with open(tmp_path, "rb") as audio_file:
        transcript = client.audio.transcriptions.create(
            model=WHISPER_MODEL,
            file=audio_file,
            response_format="text"
        )

    return transcript


def clean_text(text: str) -> str:
    """Remove filler words and normalize whitespace."""
    for pattern in FILLER_WORDS:
        text = re.sub(pattern, '', text, flags=re.IGNORECASE)

    text = re.sub(r' +', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def run_ingestion(raw_text: str, input_type: str = "text") -> IngestionOutput:
    """
    Phase 5: Supports both text and audio input.

    For text: cleans raw text (filler words, whitespace normalization).
    For audio: decodes base64, transcribes via Whisper, then cleans.

    Steps:
    1. If audio: decode base64, transcribe with Whisper API
    2. If text: use raw_text directly
    3. Clean transcript (filler words, whitespace)
    4. Return clean transcript with word count
    """
    if input_type == "audio":
        raw_transcript = transcribe_audio(raw_text)
    else:
        raw_transcript = raw_text

    clean = clean_text(raw_transcript)

    return IngestionOutput(
        transcript=clean,
        word_count=len(clean.split()),
        input_type=input_type
    )
