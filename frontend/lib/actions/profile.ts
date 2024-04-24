import api from "@/lib/api";
import { AxiosResponse } from "axios";

export const logOut = async (): Promise<AxiosResponse> => {
    const result = await api.post("/api/auth/logout")

    return result;
}