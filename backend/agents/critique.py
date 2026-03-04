import json
import re
from google import genai
from config import GOOGLE_API_KEY, CRITIQUE_MODEL, PROMPTS_DIR
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

    with open(PROMPTS_DIR / "critique.txt", "r") as f:
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