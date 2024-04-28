from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from schemas.auth import AuthSchema
from schemas.models import AddFileRequest, CreateModelRequest, ModelsAPIResponse
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
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{model_id}/file")
async def add_file(
    model_id: int,
    req: AddFileRequest,
    auth_session: Annotated[AuthSchema, Depends(SupabaseJWTBearer())],
):
    sb_client = SupabaseClientFactory.get_client(auth_session.access_token)

    # Check if model exists
    model = sb_client.table("model").select("*").eq("id", model_id).execute().data
    if len(model) == 0:
        raise HTTPException(status_code=404, detail="Model not found")

    try:
        file_dict = req.model_dump()
        file_dict["model_id"] = model_id
        return sb_client.table("file").insert(file_dict).execute().data[0]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/")
async def get_models(
    skip: int = 0,
    limit: int = 10,
    auth_session: Annotated[AuthSchema, Depends(SupabaseJWTBearer())] = None,
):
    sb_client = SupabaseClientFactory.get_client(auth_session.access_token)

    try:
        models = (
            sb_client.table("model")
            .select("*", count="exact")
            .order("id", desc=False)
            .range(skip, skip + limit - 1)
            .execute()
            .data
        )

        count = sb_client.table("library").select("*", count="exact").execute().count

        return ModelsAPIResponse(data=models, count=count)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
