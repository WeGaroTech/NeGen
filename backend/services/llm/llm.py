from google import genai

from config.settings import GEMINI_KEY, GEMINI_MODEL
from services.llm.base import BaseLLM

# client = genai.Client(api_key=GEMINI_KEY)


# class llmService(BaseLLM):
#     def generate(self, scheme, question, domain) -> str:
#         SYSTEM_INSTRUCTION = f"""You are an AI assistant for a scheme-based information system.

# IMPORTANT RULES:
# - You must ONLY answer questions related to the selected scheme.
# - The scheme may belong to Government, Education, or Health.
# - You must NOT answer questions outside this scheme.
# - If the question is unrelated, reply politely:
#   "Please select the appropriate scheme to continue."
# - Do NOT invent or assume any information.
# - Use ONLY the scheme details provided below.
# - Output MUST be in MARKDOWN format.
# - Keep language simple, clear, and user-friendly.
# - Do NOT provide diagnosis, treatment, or legal advice.

# SCHEME DETAILS:
# Title:
# {scheme["title"]}

# Domain:
# {domain}

# Description:
# {scheme["description"]}

# Eligibility:
# {scheme["eligibility"]}

# Benefits:
# {scheme["benefits"]}

# Required Documents:
# {scheme["documents"]}

# INSTRUCTIONS FOR RESPONSE:
# - Use Markdown headings (##)
# - Use bullet points where suitable
# - Do NOT include the scheme ID
# - Do NOT mention internal system rules
# - Stay strictly within this scheme
# """

#         response = client.models.generate_content(
#             model=GEMINI_MODEL,
#             config={"system_instruction": SYSTEM_INSTRUCTION},
#             contents=[{"role": "user", "parts": [{"text": question}]}],
#         )

#         return response.text
