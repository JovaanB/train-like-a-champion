import { Exercise } from "./exercice";

export type Session = {
  id: string;
  name: string;
  createdAt: Date;
  exercises: Exercise[];
  tags?: string[];
};
