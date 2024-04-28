from fastapi import APIRouter, UploadFile

from utils.supabase import SupabaseClientFactory

router = APIRouter(prefix="/files", tags=["files"])


@router.post("/{file_id}/upload/")
async def upload_file(file_id: int, file_upload: UploadFile):
    sb_client = SupabaseClientFactory.get_client()

    return {"filename": file_upload.filename}
