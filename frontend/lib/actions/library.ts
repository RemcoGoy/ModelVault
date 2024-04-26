'use server';

import { Library } from "@/types/library";
import { axiosClient } from "@/lib/api";

export const createLibrary = async (name: string, path: string, tags: string): Promise<{ library: Library | null, error: string | null }> => {
    const result = await axiosClient.post(`/api/libraries/`, {
        name,
        path,
        tags
    });

    if (result.status !== 200) {
        const error: { detail: string } = result.data;

        return {
            library: null,
            error: error.detail
        }
    } else {
        const resultData = result.data;

        return {
            library: resultData,
            error: null
        }
    }
}

export const getLibraries = async (skip: number, limit: number): Promise<{ libraries: Library[] | null, count: number, error: string | null }> => {
    const result = await axiosClient.get(`/api/libraries/?skip=${skip}&limit=${limit}`);

    if (result.status !== 200) {
        const error: { detail: string } = result.data;
        return {
            libraries: [],
            count: -1,
            error: error.detail
        }
    } else {
        const resultData: { data: Library[], count: number } = result.data;
        return {
            libraries: resultData.data.map((library: Library) => ({
                ...library,
                created_at: new Date(library.created_at)
            })),
            count: resultData.count,
            error: null
        }
    }
}