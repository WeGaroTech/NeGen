import os

from dotenv import load_dotenv

load_dotenv()

# Loading Gemini API key and model from environment variables
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL")

# Ollama model
OLLAMA_MODEL = "llama3.2:3b"
