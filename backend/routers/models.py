from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from schemas.auth import AuthSchema
from schemas.models import CreateModelRequest
from utils.supabase import SupabaseClientFactory
from utils.supabase_jwt import SupabaseJWTBearer

router = APIRouter(prefix="/models", tags=["models"])


@router.post("/")
async def create_model(
    req: CreateModelRequest, auth_session: Annotated[AuthSchema, Depends(SupabaseJWTBearer())]
):
    sb_client = SupabaseClientFactory.get_client(auth_session.access_token)

    try:
        model_dict = req.model_dump()
        return sb_client.table("model").insert(model_dict).execute().data[0]
    except Exception as e:
        if e.details:
            raise HTTPException(status_code=400, detail=str(e.details))
        else:
            raise HTTPException(status_code=400, detail=str(e))
