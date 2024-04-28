from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile

from schemas.auth import AuthSchema
from utils.supabase_jwt import SupabaseJWTBearer

router = APIRouter(prefix="/files", tags=["files"])


@router.post("/{file_id}/upload/")
async def upload_file(file_id: int, file_upload: UploadFile):
    return {"filename": file_upload.filename}
