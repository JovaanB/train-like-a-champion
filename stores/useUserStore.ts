import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage, persist } from 'zustand/middleware'

type Role = 'coach' | 'client'

type UserStore = {
    role: Role | null
    setRole: (role: Role) => void
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            role: null,
            setRole: (role) => set({ role })
        }),
        {
            name: 'user-store',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)