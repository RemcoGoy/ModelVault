from pydantic import BaseModel


class AuthRequest(BaseModel):
    email: str
    password: str


class LoginRequest(AuthRequest):
    pass


class RegisterRequest(AuthRequest):
    pass


class RefreshRequest(BaseModel):
    refresh_token: str


class AuthResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
