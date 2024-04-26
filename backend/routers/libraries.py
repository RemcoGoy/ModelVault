from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from schemas.auth import AuthSchema
from schemas.libraries import CreateLibraryRequest, LibraryAPIResponse
from utils.supabase import SupabaseClientFactory
from utils.supabase_jwt import SupabaseJWTBearer

router = APIRouter(prefix="/libraries", tags=["libraries"])


@router.post("/")
async def create_library(
    req: CreateLibraryRequest, auth_session: Annotated[AuthSchema, Depends(SupabaseJWTBearer())]
):
    sb_client = SupabaseClientFactory.get_client(auth_session.access_token)

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
) -> LibraryAPIResponse:
    sb_client = SupabaseClientFactory.get_client(auth_session.access_token)

    try:
        libraries = (
            sb_client.table("library")
            .select("*", count="exact")
            .order("id", desc=False)
            .range(skip, skip + limit - 1)
            .execute()
            .data
        )

        count = sb_client.table("library").select("*", count="exact").execute().count

        return LibraryAPIResponse(data=libraries, count=count)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{library_id}")
async def delete_library(
    library_id: int, auth_session: Annotated[AuthSchema, Depends(SupabaseJWTBearer())]
) -> bool:
    sb_client = SupabaseClientFactory.get_client(auth_session.access_token)

    try:
        res = sb_client.table("library").delete(count="exact").eq("id", library_id).execute()

        if res.count == 0:
            raise HTTPException(status_code=404, detail="Library not found")
        else:
            return True
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
