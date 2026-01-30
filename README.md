# NEGen – Scheme-based AI Assistant for Northeast India

## What is NEGen?

NEGen is an AI-powered assistant designed to help users discover and understand **government, education, and health schemes** in Northeast India.  
The platform also provides a **general AI chat** experience in a regional language (Garo – A·chik), making information more accessible to local users.

The system separates **general conversation** and **scheme-based chat** to ensure accurate, reliable, and context-aware responses.

---

## Features

- Scheme-based chat for:
  - Government welfare schemes
  - Education and scholarship schemes
  - Health and medical assistance schemes
- General AI chat in regional language (Garo – A·chik)
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

## How to Run the Project (Backend)

Follow the steps below to run the backend locally.

---

### Step 1: Clone the repository

```bash
git clone https://github.com/WeGaroTech/NeGen
cd NEGen
```

---

### Step 2: Navigate to backend directory

```bash
cd backend
```

---

### Step 3: Create .env file

Inside the backend folder, create a file named .env and add the following:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=your_gemini_model_name_here
```

---

### Step 4: Create a Python virtual environment

```bash
python -m venv .venv
```

---

### Step 5: Activate the virtual environment

Linux / macOS
```bash
source .venv/bin/activate
```

Windows
```bash
.venv\Scripts\activate
```

---

### Step 6: Install dependencies

```bash
pip install -r requirements.txt
```

---

### Step 7: Run the backend server

```bash
uvicorn main:app --reload
```

---

---

## Ollama Setup (For Scheme-Based Chat)

NEGen uses **Ollama** for local LLM-based reasoning in scheme-specific chats.

### Install Ollama
Download and install Ollama from:
https://ollama.com

### Pull the required model
```bash
ollama pull llama3.2:3b
```

The Ollama model can be changed in:

```text
backend/config/settings.py
```

Example:

```python
OLLAMA_MODEL = "llama3.2:3b"
```