from pydantic import BaseModel


class AuthRequest(BaseModel):
    email: str
    password: str


class LoginRequest(AuthRequest):
    pass


class RegisterRequest(AuthRequest):
    pass
