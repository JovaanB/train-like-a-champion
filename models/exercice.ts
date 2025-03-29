export interface Exercice {
    id: string;
    name: string;
    description: string;
    instructions: string[];
    sets: number;
    reps: number;
    restBetweenSets: number;
    restAfterExercise: number;
}