from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from schemas.auth import AuthSchema
from schemas.libraries import CreateLibraryRequest, GetLibrariesRequest
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
        return sb_client.table("library").insert(library_dict).execute().data[0]
    except Exception as e:
        if e.details:
            raise HTTPException(status_code=400, detail=str(e.details))
        else:
            raise HTTPException(status_code=400, detail=str(e))


@router.get("/")
async def get_libraries(
    skip: int = 0,
    limit: int = 10,
    auth_session: Annotated[AuthSchema, Depends(SupabaseJWTBearer())] = None,
):
    sb_client = SupabaseClientFactory.get_client()

    try:
        return (
            sb_client.table("library")
            .select("*", count="exact")
            .range(skip, skip + limit)
            .execute()
        )
    except Exception as e:
        if e.details:
            raise HTTPException(status_code=400, detail=str(e.details))
        else:
            raise HTTPException(status_code=400, detail=str(e))
