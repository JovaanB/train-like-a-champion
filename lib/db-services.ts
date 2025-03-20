import programsJson from "@/data/programs.json";

export const getProgramsByIds = async (ids: string[]): Promise<any[]> => {
  try {
    return programsJson.filter(program => ids.includes(program.id));
  } catch (error) {
    console.error("[error fetching programs] ==>", error);
    return [];
  };
}