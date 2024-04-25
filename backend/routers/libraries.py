from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from schemas.auth import AuthSchema
from schemas.libraries import CreateLibraryRequest
from utils.supabase import SupabaseClientFactory
from utils.supabase_jwt import SupabaseJWTBearer

router = APIRouter(prefix="/libraries", tags=["libraries"])


@router.post("/create")
async def create_library(
    req: CreateLibraryRequest, auth_session: Annotated[AuthSchema, Depends(SupabaseJWTBearer())]
):
    sb_client = SupabaseClientFactory.get_client()

    try:
        library_dict = req.model_dump()
        library_dict["tags"] = library_dict["tags"].split(",")
        return sb_client.table("library").insert(library_dict).execute()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
