'use server'

import {axiosClient} from "@/lib/api"

export const updateUser = async (uid: string, username: string): Promise<{updatedUser: any | null, error: string | null}> => {
    const result = await axiosClient.post("/api/users/update", {
        uid, username
    })

    if (result.status !== 200) {
        const error: { detail: string } = result.data;
        return {
            updatedUser: null,
            error: error.detail
        }
    } else {
        const data = result.data;

        return {
            updatedUser: {
                username: data.username
            },
            error: null
        }
    }
}