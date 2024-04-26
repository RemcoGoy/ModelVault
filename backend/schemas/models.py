from typing import List

from pydantic import BaseModel


class CreateModelRequest(BaseModel):
    name: str
    filename: str
    library_id: int


class ModelsAPIResponse(BaseModel):
    data: List[dict]
    count: int
