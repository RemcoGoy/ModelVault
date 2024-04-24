'use server'

import { cookies } from "next/headers";

export const logOut = async (): Promise<{ result: boolean | null, error: string | null }> => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (result.status !== 200) {
        const error: { detail: string } = await result.json();
        return {
            result: false,
            error: error.detail
        }
    } else {
        cookies().delete("access_token")

        return {
            result: true,
            error: null
        }
    }
}