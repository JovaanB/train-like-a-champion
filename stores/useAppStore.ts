import { create } from 'zustand'

type AppState = {
    userRole: 'coach' | 'client' | null
    setUserRole: (role: 'coach' | 'client') => void
}

export const useAppStore = create<AppState>((set) => ({
    userRole: null,
    setUserRole: (role) => set({ userRole: role }),
}))
