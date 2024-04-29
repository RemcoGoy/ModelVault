'use server';

import { axiosClient } from "@/lib/api";
import { Model } from "@/types/model";

export const createModel = async (name: string, library_id: number): Promise<{ model: Model | null, error: string | null }> => {
    const result = await axiosClient.post(`/api/models/`, {
        name,
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

export const createFile = async (file_name: string, model_id: number): Promise<{ file: any | null, error: string | null }> => {

    // Create file object
    const createResult = await axiosClient.post(`/api/models/${model_id}/files`, {
        "file_name": file_name
    });

    if (createResult.status !== 200) {
        const error: { detail: string } = createResult.data;
        return {
            file: null,
            error: error.detail
        }
    } else {
        const file = createResult.data

        return {
            file,
            error: null
        }
    }
}

export const getModels = async (skip: number, limit: number, order_by: string = 'id', order_desc: boolean = false): Promise<{ models: Model[] | null, count: number, error: string | null }> => {
    const result = await axiosClient.get(`/api/models/?skip=${skip}&limit=${limit}&order_by=${order_by}&order_desc=${order_desc}`);

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

export const getModel = async (model_id: number): Promise<{ model: Model | null, error: string | null }> => {
    const result = await axiosClient.get(`/api/models/${model_id}`);

    if (result.status !== 200) {
        const error: { detail: string } = result.data;
        return {
            model: null,
            error: error.detail
        }
    } else {
        const resultData = result.data;

        return {
            model: {
                ...resultData,
                created_at: new Date(resultData.created_at)
            },
            error: null
        }
    }
}

export const updateModel = async (id: number, updates: { name: string }): Promise<{ model: Model | null, error: string | null }> => {
    const result = await axiosClient.patch(`/api/models/${id}`, {
        name: updates.name
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
            model: {
                ...resultData,
                created_at: new Date(resultData.created_at)
            },
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