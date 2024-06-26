'use server';

import { Library } from "@/types/library";
import { axiosClient } from "@/lib/api";

export const createLibrary = async (name: string, folder_name: string, tags: string): Promise<{ library: Library | null, error: string | null }> => {
    const result = await axiosClient.post(`/api/libraries/`, {
        name,
        folder_name,
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

export const getLibraries = async (skip: number, limit: number, order_by: string = 'id', order_desc: boolean = false): Promise<{ libraries: Library[] | null, count: number, error: string | null }> => {
    const result = await axiosClient.get(`/api/libraries/?skip=${skip}&limit=${limit}&order_by=${order_by}&order_desc=${order_desc}`);

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

export const getLibrary = async (library_id: number): Promise<{ library: Library | null, error: string | null }> => {
    const result = await axiosClient.get(`/api/libraries/${library_id}`);

    if (result.status !== 200) {
        const error: { detail: string } = result.data;
        return {
            library: null,
            error: error.detail
        }
    } else {
        const resultData = result.data;
        return {
            library: {
                ...resultData,
                created_at: new Date(resultData.created_at)
            },
            error: null
        }
    }
}

export const deleteLibrary = async (id: number): Promise<{ result: boolean | null, error: string | null }> => {
    const result = await axiosClient.delete(`/api/libraries/${id}`);

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