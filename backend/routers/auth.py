from fastapi import APIRouter, Depends, HTTPException

from schemas.auth import AuthResponse, LoginRequest, RegisterRequest
from utils.supabase import SupabaseClient
from utils.supabase_jwt import SupabaseJWTBearer

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(req: LoginRequest) -> AuthResponse:
    sb_client = SupabaseClient()

    try:
        res = sb_client.auth.sign_in_with_password(
            credentials={"email": req.email, "password": req.password}
        )
        return {"access_token": res.session.access_token, "token_type": res.session.token_type}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/register")
async def register(req: RegisterRequest) -> AuthResponse:
    sb_client = SupabaseClient()

    try:
        res = sb_client.auth.sign_up(credentials={"email": req.email, "password": req.password})
        return {"access_token": res.session.access_token, "token_type": res.session.token_type}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/logout", dependencies=[Depends(SupabaseJWTBearer())])
async def logout() -> None:
    SupabaseClient().auth.sign_out()
