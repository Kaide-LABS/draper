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