import { Model } from "@/types/model";
import { create } from "zustand";

interface ModelState {
    models: Model[]
    count: number
    setCount: (count: number) => void
    setModels(models: Model[]): void
}
export const useModelStore = create<ModelState>((set) => ({
    models: [],
    count: 0,
    setCount: (count) => set({count}),
    setModels: (models) => set({models})
}))