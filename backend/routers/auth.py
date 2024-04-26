from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client

from schemas.auth import (
    AuthResponse,
    AuthSchema,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
)
from utils.supabase import SupabaseClientFactory
from utils.supabase_jwt import SupabaseJWTBearer

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(req: LoginRequest) -> AuthResponse:
    sb_client = SupabaseClientFactory.get_client()

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
            "uid": res.user.id,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/register")
async def register(req: RegisterRequest) -> AuthResponse:
    sb_client: Client = SupabaseClientFactory.get_client()

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
            "uid": res.user.id,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/refresh")
async def refresh(req: RefreshRequest):
    sb_client: Client = SupabaseClientFactory.get_client()

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
async def logout(auth_session: Annotated[AuthSchema, Depends(SupabaseJWTBearer())]) -> None:
    sb_client: Client = SupabaseClientFactory.get_client()
    sb_client.auth.admin.sign_out(auth_session.access_token)
