from pydantic import BaseModel


class CreateModelRequest(BaseModel):
    name: str
    filename: str
    library_id: int
