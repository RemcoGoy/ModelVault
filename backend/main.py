import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, users

load_dotenv()

app = FastAPI()

origins = []

DEBUG = os.getenv("DEBUG", False)

origins.append(os.getenv("FRONTEND_URL", None))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")


# @app.get("/", dependencies=[Depends(SupabaseJWTBearer())])
@app.get("/")
def main():
    return {"version": "0.0.1"}
