from dotenv import load_dotenv
from fastapi import Depends, FastAPI

from routers import auth
from utils.supabase_jwt import SupabaseJWTBearer

load_dotenv()

app = FastAPI()

app.include_router(auth.router, prefix="/api")


@app.get("/", dependencies=[Depends(SupabaseJWTBearer())])
def main():
    return {"version": "0.0.1"}
