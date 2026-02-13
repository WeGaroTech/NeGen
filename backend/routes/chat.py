import asyncio
from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel

# importing chat pipelines
from services.pipeline import general_chat, scheme_chat


# request body structure for chat API
class chatPayload(BaseModel):
    chat_type: str
    domain: Optional[str] = None
    question: str
    state: Optional[str] = None
    scheme_id: Optional[str] = None
    language:str


router = APIRouter()


# main chat endpoint
@router.post("/chat")
async def chat(req: chatPayload):
    # general chat flow
    if req.chat_type == "general_chat":
        return await general_chat(req)

    # scheme based chat flow
    elif req.chat_type == "scheme_chat":
        return await scheme_chat(req)
    else:
        return {"answer": "Invalid chat type"}
