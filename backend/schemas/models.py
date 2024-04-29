from typing import List, Optional

from pydantic import BaseModel


class UpdateModelRequest(BaseModel):
    name: str


class CreateModelRequest(UpdateModelRequest):
    library_id: int


class ModelsAPIResponse(BaseModel):
    data: List[dict]
    count: int


class AddFileRequest(BaseModel):
    file_name: str
