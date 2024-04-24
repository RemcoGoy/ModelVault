from pydantic import BaseModel


class UpdateUserRequest(BaseModel):
    uid: str
    username: str
