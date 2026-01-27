from fastapi import APIRouter, HTTPException, Query

router = APIRouter()


@router.post("/chat")
def chat(payload: dict):
    print(payload)
