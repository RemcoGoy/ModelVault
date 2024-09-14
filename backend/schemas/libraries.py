import datetime
from typing import List
from uuid import UUID

from pydantic import BaseModel


class CreateLibraryRequest(BaseModel):
    name: str
    tags: str


class GetLibrariesRequest(BaseModel):
    skip: int = 0
    limit: int = 10


class LibraryAPIResponse(BaseModel):
    data: List[dict]
    count: int
