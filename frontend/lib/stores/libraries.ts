import { Library } from "@/types/library";
import { create } from "zustand";

interface LibraryState {
    libraries: Library[]
    setLibraries(libraries: Library[]): void
}
export const useLibraryStore = create<LibraryState>((set) => ({
    libraries: [],
    setLibraries: (libraries) => set({libraries})
}))