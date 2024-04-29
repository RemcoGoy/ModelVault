import os
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, UploadFile

from schemas.auth import AuthSchema
from utils.supabase import SupabaseClientFactory
from utils.supabase_jwt import SupabaseJWTBearer

router = APIRouter(prefix="/files", tags=["files"])


@router.post("/{file_id}/upload/")
async def upload_file(file_id: int, file_upload: UploadFile):
    sb_client = SupabaseClientFactory.get_client()

    try:
        file = sb_client.table("file").select("*").eq("id", file_id).execute().data[0]
        model = sb_client.table("model").select("*").eq("id", file["model_id"]).execute().data[0]
        library = (
            sb_client.table("library").select("*").eq("id", model["library_id"]).execute().data[0]
        )

        STORE_FILES = os.getenv("STORE_FILES", "local")

        file_path = None
        if STORE_FILES == "local":
            file_path = os.path.join(library["path"], file_upload.filename)
            with open(file_path, "wb") as buffer:
                buffer.write(file_upload.file.read())
        elif STORE_FILES == "supabase":
            raise NotImplementedError()
        else:
            raise Exception("Invalid STORE_FILES configuration")

        return sb_client.table("file").update({"path": file_path}).eq("id", file_id).execute()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{file_id}")
async def delete_file(
    file_id: int, auth_session: Annotated[AuthSchema, Depends(SupabaseJWTBearer())]
):
    sb_client = SupabaseClientFactory.get_client(auth_session.access_token)

    try:
        file = sb_client.table("file").select("*").eq("id", file_id).execute().data[0]
        model = sb_client.table("model").select("*").eq("id", file["model_id"]).execute().data[0]
        library = (
            sb_client.table("library").select("*").eq("id", model["library_id"]).execute().data[0]
        )

        STORE_FILES = os.getenv("STORE_FILES", "local")

        if STORE_FILES == "local":
            os.remove(file["path"])
        elif STORE_FILES == "supabase":
            raise NotImplementedError()
        else:
            raise Exception("Invalid STORE_FILES configuration")

        return sb_client.table("file").delete().eq("id", file_id).execute()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
