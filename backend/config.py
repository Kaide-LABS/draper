import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Model assignments
EXTRACTION_MODEL = "gemini-3-pro"         # Google — deep reasoning
SYNTHESIS_MODEL = "gpt-5.2"               # OpenAI — creative writing
CRITIQUE_MODEL = "gemini-3-flash"         # Google — fast evaluation
CASCADE_MODEL = "gpt-4o-mini"             # OpenAI — fast formatting
WHISPER_MODEL = "whisper-1"               # OpenAI — audio transcription

# Base paths
BACKEND_DIR = Path(__file__).parent
PROMPTS_DIR = BACKEND_DIR / "prompts"
