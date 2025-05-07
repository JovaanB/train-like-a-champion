import { create } from 'zustand'

export type Exercise = {
    name: string
    reps: string
    weight: string
}

type Session = {
    name: string
    exercises: Exercise[]
    createdAt: Date
}

type SessionStore = {
    sessions: Session[]
    addSession: (session: Omit<Session, 'createdAt'>) => void,
    clearSessions: () => void
}

export const useSessionStore = create<SessionStore>((set) => ({
    sessions: [],
    addSession: (session) =>
        set((state) => ({
            sessions: [
                ...state.sessions,
                { ...session, createdAt: new Date() }
            ]
        })),
    clearSessions: () => set({ sessions: [] }),
}))