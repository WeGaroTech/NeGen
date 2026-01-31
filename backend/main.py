from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# importing API routers
from routes.chat import router as chat_router
from routes.schemes import router as schemes_router

app = FastAPI(title="NEGen")

# enable CORS so frontend can all backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# register API routes
app.include_router(schemes_router, prefix="/api")
app.include_router(chat_router, prefix="/api")


# basic root endpoint
@app.get("/")
def root():
    return {"project": "NEGen", "status": "running", "docs": "/docs"}
