export interface SessionExercice {
    exerciceId: string;
    reps: number;
    sets: number;
    load?: number;
    restBetweenSets: number;
    restAfterExercise: number;
}

export interface Session {
    id: string;
    name: string;
    description: string;
    status: string;
    exercices: SessionExercice[];
}