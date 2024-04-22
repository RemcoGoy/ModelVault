from fastapi import APIRouter

from schemas.auth import LoginRequest, LoginResponse
from utils.supabase import SupabaseClient

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(req: LoginRequest) -> LoginResponse:
    sb_client = SupabaseClient()

    return LoginResponse(access_token="", token_type="")


@router.post("/register")
async def register():
    pass
