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
    updateSession: (sessionId: string, updated: Omit<Session, 'createdAt, id'>) => void
    deleteSession: (sessionId: string) => void
    duplicateSession: (sessionId: string) => void
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
            updateSession: (sessionId, updated) =>
                set((state) => {
                    const updatedSessions = state.sessions.map((session) =>
                        session.id === sessionId
                            ? { ...session, ...updated }
                            : session
                    );
                    return { sessions: updatedSessions };
                }),
            deleteSession: (sessionId) =>
                set((state) => {
                    const updated = [...state.sessions].filter(session => session.id !== sessionId);
                    return { sessions: updated }
                }),
            duplicateSession: (sessionId: string) =>
                set((state) => {
                    const original = state.sessions.find(session => session.id === sessionId);
                    if (!original) return state;

                    const duplicated = {
                        ...original,
                        id: uuidv4(),
                        name: `${original.name} (copy)`,
                        createdAt: new Date(),
                    };

                    return { sessions: [...state.sessions, duplicated] };
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
