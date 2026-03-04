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