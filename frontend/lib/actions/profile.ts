'use server'

import { cookies } from "next/headers";
import { axiosClient } from "@/lib/api";

export const logOut = async (): Promise<{ result: boolean | null, error: string | null }> => {
    const result = await axiosClient.post("/api/auth/logout")

    if (result.status !== 200) {
        const error: { detail: string } = result.data;
        return {
            result: false,
            error: error.detail
        }
    } else {
        cookies().delete("access_token")
        cookies().delete("refresh_token")

        return {
            result: true,
            error: null
        }
    }
}