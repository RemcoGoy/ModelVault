from fastapi import APIRouter, Depends, HTTPException

from schemas.auth import AuthResponse, LoginRequest, RefreshRequest, RegisterRequest
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
        return {
            "access_token": res.session.access_token,
            "refresh_token": res.session.refresh_token,
            "token_type": res.session.token_type,
            "email": req.email,
            "username": res.user.user_metadata.get("username", ""),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/register")
async def register(req: RegisterRequest) -> AuthResponse:
    sb_client = SupabaseClient()

    try:
        res = sb_client.auth.sign_up(
            credentials={
                "email": req.email,
                "password": req.password,
                "options": {"data": {"username": req.username}},
            }
        )

        return {
            "access_token": res.session.access_token,
            "refresh_token": res.session.refresh_token,
            "token_type": res.session.token_type,
            "email": req.email,
            "username": req.username,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/refresh", dependencies=[Depends(SupabaseJWTBearer())])
async def refresh(req: RefreshRequest) -> AuthResponse:
    sb_client = SupabaseClient()

    try:
        res = sb_client.auth.refresh_session(req.refresh_token)

        return {
            "access_token": res.session.access_token,
            "refresh_token": res.session.refresh_token,
            "token_type": res.session.token_type,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/logout")
async def logout() -> None:
    SupabaseClient().auth.sign_out()
