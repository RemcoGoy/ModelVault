import os

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, files, libraries, models, users

load_dotenv()

app = FastAPI(prefix="/api")

origins = []

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
app.include_router(libraries.router, prefix="/api")
app.include_router(models.router, prefix="/api")
app.include_router(files.router, prefix="/api")


@app.get("/")
def main():
    return {"version": "0.0.1"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
