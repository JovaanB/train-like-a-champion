import "react-native-get-random-values"
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'

export type Exercise = {
    id: string
    name: string
    reps: string
    weight: string
}

export type Session = {
    id: string
    name: string
    createdAt: Date
    exercises: Exercise[]
    tags?: string[]
}

type SessionStore = {
    sessions: Session[]
    addSession: (session: Omit<Session, 'createdAt, id'>) => void
    updateSession: (index: number, updated: Omit<Session, 'createdAt, id'>) => void
    deleteSession: (index: number) => void
    duplicateSession: (index: number) => void
    clearSessions: () => void
}

export const useSessionStore = create<SessionStore>()(
    persist(
        (set, get) => ({
            sessions: [],
            addSession: (session) =>
                set((state) => ({
                    sessions: [...state.sessions, {
                        ...session,
                        id: uuidv4(),
                        createdAt: new Date()
                    }],
                })),
            updateSession: (index, updated) =>
                set((state) => {
                    const sessions = [...state.sessions]
                    sessions[index] = { ...updated, createdAt: state.sessions[index].createdAt }
                    return { sessions }
                }),
            deleteSession: (index) =>
                set((state) => {
                    const updated = [...state.sessions]
                    updated.splice(index, 1)
                    return { sessions: updated }
                }),
            duplicateSession: (index: number) =>
                set((state) => {
                    const original = state.sessions[index]
                    if (!original) return {}

                    const duplicated = {
                        id: uuidv4(),
                        name: original.name + " (copie)",
                        createdAt: new Date(),
                        exercises: original.exercises,
                        tags: original.tags
                    }

                    return { sessions: [...state.sessions, duplicated] }
                }),
            clearSessions: () => set({ sessions: [] }),
        }),
        {
            name: 'trainlikeachampion-sessions',
            storage: createJSONStorage(() => AsyncStorage),
            version: 1,
            migrate: async (persistedState: any, version) => {
                if (version === 0) {
                    // future migration
                }
                return {
                    ...persistedState,
                    sessions: persistedState.sessions?.map((s: any) => ({
                        ...s,
                        createdAt: new Date(s.createdAt),
                    })) || []
                }
            }
        }
    )
)
