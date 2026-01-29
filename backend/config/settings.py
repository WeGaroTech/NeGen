import os

from dotenv import load_dotenv

load_dotenv()

# Loading Gemini API key and model from environment variables
GEMINI_KEY: str = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL: str = os.getenv("GEMINI_MODEL")
OLLAMA_MODEL: str = "llama3.2:3b"
