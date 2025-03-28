import programsJson from "@/data/programs.json";
import sessionsJson from "@/data/sessions.json";
import exercicesJson from "@/data/exercices.json";

export const getProgramsByIds = async (ids: string[]) => {
  try {
    return programsJson.filter(program => ids.includes(program.id));
  } catch (error) {
    console.error("[error fetching programs] ==>", error);
    return [];
  };
};

export const getSessionById = (id: string | string[]) => {
  try {
    return sessionsJson.find(session => id === session.id);
  } catch (error) {
    console.error("[error fetching program] ==>", error);
    return;
  };
};

export const getSessionsByProgram = (ids: string | string[]) => {
  try {
    return sessionsJson.filter(session => ids.includes(session.id));
  } catch (error) {
    console.error("[error fetching sessions] ==>", error);
    return [];
  }
};

export const getExerciceById = (id: string | string[]) => {
  try {
    return exercicesJson.filter(exercice => exercice.id === id);
  } catch (error) {
    console.error("[error fetching exercice] ==>", error);
    return [];
  }
};