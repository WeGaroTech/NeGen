# NEGen – Regional Language AI Assistant for Northeast India

## What is NEGen?

NEGen is an AI-powered assistant designed to help users discover and understand **government, education, and health schemes** in Northeast India.  
The platform also provides a **general AI chat** experience in a regional language, making information more accessible to local users.

The system separates **general conversation** and **scheme-based chat** to ensure accurate, reliable, and context-aware responses.

---

## Features

- Scheme-based chat for:
  - Government welfare schemes
  - Education and scholarship schemes
  - Health and medical assistance schemes
- General AI chat in regional language
- JSON-based scheme filtering to reduce hallucinations
- AI-powered reasoning and language understanding
- FastAPI-based backend with clear API structure
- Simple frontend built using HTML, CSS, and JavaScript

---

## Tech Stack

### Backend
- Python
- FastAPI
- Uvicorn (ASGI server)

> Note: FastAPI internally uses Pydantic for request validation.

### Frontend
- HTML
- CSS
- JavaScript

### AI / LLM
- **Gemini API** – General chat and LLM-based translation
- **Ollama (LLaMA 3.2)** – Scheme-based reasoning and responses

---

## API Endpoints

### GET /api/schemes
Fetches available schemes based on selected state and domain.

**Query Parameters:**
- `mode` – Scheme category (`government`, `education`, `health`)
- `state` – State name (e.g., `meghalaya`)

---

### POST /api/chat
Handles both general chat and scheme-based chat.

- Used for:
  - General conversational queries (Ask NEGen)
  - Scheme-specific questions after selecting a scheme

---

## Installation
See detailed setup here:
[Full Setup Guide](docs/documentation.md#setup--installation)