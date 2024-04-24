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
    sb_client: Client = SupabaseClientFactory.get_client()

    try:
        res = sb_client.auth.admin.update_user_by_id(
            req.uid, attributes={"user_metadata": {"username": req.username}}
        )

        return {
            "email": res.user.email,
            "username": res.user.user_metadata["username"],
            "uid": res.user.id,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
