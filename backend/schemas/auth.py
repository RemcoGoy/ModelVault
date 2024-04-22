from pydantic import BaseModel


class AuthRequest(BaseModel):
    email: str
    password: str


class LoginRequest(AuthRequest):
    pass


class RegisterRequest(AuthRequest):
    pass


class AuthResponse(BaseModel):
    access_token: str
    token_type: str
