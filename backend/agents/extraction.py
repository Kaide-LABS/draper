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