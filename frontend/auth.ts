import { devtools, persist } from 'zustand/middleware'
import { create } from "zustand";
import { HydrationState } from '@/types/store';
import { User } from '@/types/user';

interface SessionState extends HydrationState {
    user: User | null
    setUser: (user: User) => void
}

export const useSessionStore = create<SessionState>()(
    devtools(
        persist(
            (set, get) => ({
                user: null as User | null,
                _hasHydrated: false,
                setUser: (user: User) => set({ user }),
                setHasHydrated: (state: boolean) => {
                    set({
                        _hasHydrated: state
                    });
                }
            }),
            {
                name: "session-storage",
                onRehydrateStorage: () => (state: SessionState | undefined) => {
                    if (state) {
                        state.setHasHydrated(true)
                    }
                }
            }
        )
    )
)
