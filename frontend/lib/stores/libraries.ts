import { Library } from "@/types/library";
import { create } from "zustand";

interface LibraryState {
    libraries: Library[]
    count: number
    setCount: (count: number) => void
    setLibraries(libraries: Library[]): void
}
export const useLibraryStore = create<LibraryState>((set) => ({
    libraries: [],
    count: 0,
    setCount: (count) => set({count}),
    setLibraries: (libraries) => set({libraries})
}))