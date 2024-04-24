from pydantic import BaseModel


class AuthRequest(BaseModel):
    email: str
    password: str


class LoginRequest(AuthRequest):
    pass


class RegisterRequest(AuthRequest):
    username: str


class RefreshRequest(BaseModel):
    refresh_token: str


class UserResponse(BaseModel):
    email: str
    username: str


class AuthResponse(UserResponse):
    access_token: str
    refresh_token: str
    token_type: str
