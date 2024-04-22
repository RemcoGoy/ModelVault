from dotenv import load_dotenv
from fastapi import FastAPI

from routers import auth

load_dotenv()

app = FastAPI()

app.include_router(auth.router, prefix="/api")


@app.get("/")
def main():
    return {"version": "0.0.1"}
