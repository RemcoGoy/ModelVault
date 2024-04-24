import os
from typing import Optional

from supabase import Client, create_client
from supabase.lib.client_options import ClientOptions


class SupabaseClientFactory:
    @staticmethod
    def get_client(access_token: Optional[str] = None) -> Client:
        _instance = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_KEY"),
            ClientOptions(persist_session=False),
        )

        if access_token:
            _instance.auth.set_session(access_token, "")

        return _instance
