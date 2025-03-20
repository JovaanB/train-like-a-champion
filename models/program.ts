export interface Exercice {
    id: string;
    name: string;
    reps: number;
    sets: number;
    restBetweenSets: number;
    restAfterExercise: number;
}

export interface Program {
    id: string;
    name: string;
    description: string;
    exercices: Exercice[];
}