from fastapi import APIRouter, HTTPException

from schemas.auth import LoginRequest, RegisterRequest
from utils.supabase import SupabaseClient

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(req: LoginRequest) -> str:
    sb_client = SupabaseClient()

    try:
        res = sb_client.auth.sign_in_with_password(
            credentials={"email": req.email, "password": req.password}
        )
        return {"access_token": res.get("access_token")}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/register")
async def register(req: RegisterRequest) -> str:
    sb_client = SupabaseClient()

    try:
        res = sb_client.auth.sign_up(credentials={"email": req.email, "password": req.password})
        return {"access_token": res.get("access_token")}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/logout")
async def logout() -> None:
    SupabaseClient().auth.sign_out()
