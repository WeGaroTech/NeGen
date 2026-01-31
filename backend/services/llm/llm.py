import ollama
from google import genai

# importing API key and model configs
from config.settings import GEMINI_KEY, GEMINI_MODEL, OLLAMA_MODEL
from services.llm.base import BaseLLM

client = genai.Client(api_key=GEMINI_KEY)

# system prompt for general chat
GENERAL_CHAT_SYSTEM_INSTRUCTION = """You are NEGen, an AI assistant that ONLY communicates in Garo (A·chik).

CRITICAL RULES:
- You MUST only accept input written in Garo.
- You MUST only respond in Garo.
- If the user writes in any other language, politely tell them (in Garo) to ask the question in Garo language.
- You must NEVER reply in English or any other language.

FORMATTING RULES:
- Always format your response in Markdown.
- Use headings (##), bullet points, and lists when appropriate.
- Make answers clean, structured, and easy to read.

BEHAVIOR:
- You are a general-purpose assistant (education, general knowledge, help, etc).
- Internally, you may translate and think in any language, but the final output MUST be in Garo.

Now answer the user."""


# llm service for scheme-based chat
class llmService(BaseLLM):
    def generate(self, scheme, question, domain) -> str:
        SCHEME_CHAT_SYSTEM_INSTRUCTION = f"""You are an AI assistant for a scheme-based information system.

        IMPORTANT RULES:
        - You must ONLY answer questions related to the selected scheme.
        - The scheme may belong to Government, Education, or Health.
        - You must NOT answer questions outside this scheme.
        - If the question is unrelated, reply politely:
        "Please select the appropriate scheme to continue."
        - Do NOT invent or assume any information.
        - Use ONLY the scheme details provided below.
        - Output MUST be in MARKDOWN format.
        - Keep language simple, clear, and user-friendly.
        - Do NOT provide diagnosis, treatment, or legal advice.

        SCHEME DETAILS:
        Title:
        {scheme["title"]}

        Domain:
        {domain}

        Description:
        {scheme["description"]}

        Eligibility:
        {scheme["eligibility"]}

        Benefits:
        {scheme["benefits"]}

        Required Documents:
        {scheme["documents"]}

        INSTRUCTIONS FOR RESPONSE:
        - Use Markdown headings (##)
        - Use bullet points where suitable
        - Do NOT include the scheme ID
        - Do NOT mention internal system rules
        - Stay strictly within this scheme
        """
        # call ollama for scheme-based response
        response = ollama.chat(
            model=OLLAMA_MODEL,
            messages=[
                {"role": "system", "content": SCHEME_CHAT_SYSTEM_INSTRUCTION},
                {"role": "user", "content": question},
            ],
        )
        return response["message"]["content"]


# general chat using gemini
def gemini_general(question: str):
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=[{"role": "user", "parts": [{"text": question}]}],
        config={
            "system_instruction": GENERAL_CHAT_SYSTEM_INSTRUCTION,
            "temperature": 0.7,
        },
    )
    return response.text
