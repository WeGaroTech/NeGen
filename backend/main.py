from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.schemes import router as schemes_router

app = FastAPI(title="NEGen")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(schemes_router, prefix="/api")


@app.get("/")
def root():
    return {"project": "NEGen", "status": "running", "docs": "/docs"}
