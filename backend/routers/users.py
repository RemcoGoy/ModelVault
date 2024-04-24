from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client

from schemas.auth import AuthSchema
from schemas.users import UpdateUserRequest
from utils.supabase import SupabaseClientFactory
from utils.supabase_jwt import SupabaseJWTBearer

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/update")
async def update(
    req: UpdateUserRequest, auth_session: Annotated[AuthSchema, Depends(SupabaseJWTBearer())]
):
    sb_client: Client = SupabaseClientFactory.get_client(auth_session.access_token)

    try:
        sb_client.auth.admin.update_user_by_id(req.uid)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
