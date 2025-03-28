export interface SessionExercice {
    exerciceId: string;
    reps: number;
    sets: number;
    restBetweenSets: number;
    restAfterExercise: number;
}

export interface Session {
    id: string;
    name: string;
    description: string;
    active: boolean;
    exercices: SessionExercice[];
}