interface SetsDetails {
    reps: number;
    load: number;
}

export interface Exercice {
    id: string;
    name: string;
    description: string;
    instructions: string[];
    setsDetails: SetsDetails[];
    restBetweenSets: number;
    restAfterExercise: number;
}