import asyncio
import json

from fastapi import APIRouter, HTTPException, Query

router = APIRouter()


# fucntion to load data from schemes.json
def load_data():
    with open("data/schemes.json", "r") as f:
        return json.load(f)


# loading data once when server starts
data = load_data()


# API to get schemes based on mode and state
@router.get("/schemes")
async def get_schemes(
    mode: str = Query(..., description="Mode: government/health/education"),
    state: str = Query(..., description="State name"),
):
    # normalize input
    mode = mode.strip().lower()
    state = state.strip().lower()

    valid_modes = {"government", "health", "education"}

    # validating state and mode
    if state not in data:
        raise HTTPException(status_code=404, detail="State not found")

    if mode not in valid_modes:
        raise HTTPException(
            status_code=400, detail=f"Invalid mode, select from {valid_modes}"
        )
    return data[state][mode]
