'use server'

import { AuthResponse } from "@/types/auth";
import { cookies } from "next/headers";

export const logIn = async (data: { email: string, password: string }): Promise<{ user: any | null, error: string | null }> => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (result.status !== 200) {
        const error: { detail: string } = await result.json();
        return {
            user: null,
            error: error.detail
        }
    } else {
        const resultData: AuthResponse = await result.json();

        cookies().set("access_token", resultData.access_token, { path: "/" })

        return {
            user: {
                access_token: resultData.access_token,
                refresh_token: resultData.refresh_token,
                username: resultData.username,
                uid: resultData.uid
            }, error: null
        }
    }
}