'use server';

import { axiosClient } from "@/lib/api";
import { Model } from "@/types/model";

export const createModel = async (name: string, files: FileList, library_id: number): Promise<{ model: Model | null, error: string | null }> => {
    const result = await axiosClient.post(`/api/models/`, {
        name,
        // file_name,
        library_id
    });

    if (result.status !== 200) {
        const error: { detail: string } = result.data;

        return {
            model: null,
            error: error.detail
        }
    } else {
        const resultData = result.data;

        return {
            model: resultData,
            error: null
        }
    }
}

export const getModels = async (skip: number, limit: number): Promise<{ models: Model[] | null, count: number, error: string | null }> => {
    const result = await axiosClient.get(`/api/models/?skip=${skip}&limit=${limit}`);

    if (result.status !== 200) {
        const error: { detail: string } = result.data;
        return {
            models: [],
            count: -1,
            error: error.detail
        }
    } else {
        const resultData: { data: Model[], count: number } = result.data;
        return {
            models: resultData.data.map((model: Model) => ({
                ...model,
                created_at: new Date(model.created_at)
            })),
            count: resultData.count,
            error: null
        }
    }
}

export const deleteModel = async (id: number): Promise<{ result: boolean | null, error: string | null }> => {
    const result = await axiosClient.delete(`/api/models/${id}`);

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