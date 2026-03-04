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