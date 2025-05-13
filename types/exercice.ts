export type Exercise = {
  id: string;
  name: string;
  sets?: Series[];
  restBetweenSets?: string;
  restAfterExercise?: string;
};

export type Series = {
  reps: string;
  weight: string;
};
