import os

from supabase import Client, create_client


class SupabaseClient:
    _instance: Client = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

        return cls._instance
