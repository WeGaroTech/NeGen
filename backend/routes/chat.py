import asyncio
from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel

from services.pipeline import general_chat, scheme_chat


class chatPayload(BaseModel):
    chat_type: str
    domain: Optional[str] = None
    question: str
    state: Optional[str] = None
    scheme_id: Optional[str] = None


router = APIRouter()


@router.post("/chat")
async def chat(req: chatPayload):
    if req.chat_type == "general_chat":
        return await general_chat(req)
    elif req.chat_type == "scheme_chat":
        return await scheme_chat(req)
    else:
        return {"answer": "Invalid chat type"}
