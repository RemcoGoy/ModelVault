from pydantic import BaseModel


class CreateLibraryRequest(BaseModel):
    name: str
    path: str
    tags: str
