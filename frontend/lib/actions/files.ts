'use server'

import { axiosClient } from "../api";

export const deleteFile = async (id: number): Promise<{ result: boolean | null, error: string | null }> => {
    const result = await axiosClient.delete(`/api/files/${id}`);

    if (result.status !== 200) {
        const error: { detail: string } = result.data;
        return {
            result: null,
            error: error.detail
        }
    } else {
        return {
            result: true,
            error: null
        }
    }
}