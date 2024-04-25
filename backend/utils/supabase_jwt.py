from fastapi import HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from gotrue.types import UserResponse
from supabase import Client

from schemas.auth import AuthSchema
from utils.supabase import SupabaseClientFactory


class SupabaseJWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(SupabaseJWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(SupabaseJWTBearer, self).__call__(
            request
        )
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            user_jwt = self.verify_jwt(credentials.credentials)
            if not user_jwt:
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return AuthSchema(user=user_jwt.user, access_token=credentials.credentials)
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> UserResponse:
        client: Client = SupabaseClientFactory.get_client()
        try:
            payload = client.auth.get_user(jwtoken)
        except:
            payload = None

        return payload
