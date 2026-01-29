from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.pipeline import scheme_chat


class chatPayload(BaseModel):
    chat_type: str
    domain: str
    question: str
    state: Optional[str] = None
    scheme_id: Optional[str] = None


router = APIRouter()


@router.post("/chat")
def chat(req: chatPayload):
    if req.chat_type == "general_chat":
        pass  # Implement general chat logic here
    elif req.chat_type == "scheme_chat":
        return scheme_chat(req)
    else:
        return {"answer": "Invalid chat type"}
