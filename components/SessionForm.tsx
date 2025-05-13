import "react-native-get-random-values";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button } from "./ui/button";
import { VStack } from "./ui/vstack";
import { Alert } from "react-native";
import { Exercise, Series } from "@/types/exercice";
import { Session } from "@/types/session";
import { Card } from "./ui/card";

type SessionFormProps = {
  onSubmit: (
    data: Omit<Session, "createdAt, id"> | { name: string; exercises: Exercise[]; tags: string[] }
  ) => void;
  initialData?: { name: string; exercises: Exercise[]; tags: string[] };
};

export default function SessionForm({ onSubmit, initialData }: SessionFormProps) {
  const [sessionName, setSessionName] = useState(initialData?.name || "");
  const [exercises, setExercises] = useState<Exercise[]>(initialData?.exercises || []);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        id: uuidv4(),
        name: "",
        sets: [{ reps: "", weight: "" }],
        restBetweenSets: "",
        restAfterExercise: "",
      },
    ]);
  };

  const removeExercise = (index: number) => {
    const updated = [...exercises];
    updated.splice(index, 1);
    setExercises(updated);
  };

  const handleExerciseChange = (
    index: number,
    field: keyof Omit<Exercise, "id" | "sets">,
    value: string
  ) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const handleSetChange = (
    exIndex: number,
    setIndex: number,
    field: keyof Series,
    value: string
  ) => {
    const updated = [...exercises];
    updated[exIndex].sets[setIndex][field] = value;
    setExercises(updated);
  };

  const addSet = (exIndex: number) => {
    const updated = [...exercises];
    updated[exIndex].sets.push({ reps: "", weight: "" });
    setExercises(updated);
  };

  const removeSet = (exIndex: number, setIndex: number) => {
    const updated = [...exercises];
    updated[exIndex].sets.splice(setIndex, 1);
    setExercises(updated);
  };

  const moveExerciseUp = (index: number) => {
    if (index === 0) return;
    const updated = [...exercises];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setExercises(updated);
  };

  const moveExerciseDown = (index: number) => {
    if (index === exercises.length - 1) return;
    const updated = [...exercises];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setExercises(updated);
  };

  const handleSubmit = () => {
    if (!sessionName.trim()) {
      Alert.alert("Erreur", "Le nom de la séance est requis");
      return;
    }

    for (let i = 0; i < exercises.length; i++) {
      const { name, sets, restBetweenSets, restAfterExercise } = exercises[i];
      if (!name.trim()) {
        Alert.alert("Erreur", `L’exercice ${i + 1} doit avoir un nom`);
        return;
      }

      for (let i = 0; i < exercises.length; i++) {
        const ex = exercises[i];
        if (!ex.name.trim()) {
          Alert.alert("Erreur", `L'exercice ${i + 1} doit avoir un nom`);
          return;
        }

        if (ex.sets.length === 0) {
          Alert.alert("Erreur", `L'exercice ${i + 1} doit avoir au moins une série`);
          return;
        }

        for (let j = 0; j < ex.sets.length; j++) {
          const { reps, weight } = ex.sets[j];
          if (isNaN(Number(reps)) || Number(reps) <= 0) {
            Alert.alert("Erreur", `Série ${j + 1} de l'exercice ${i + 1} : répétitions invalides`);
            return;
          }
          if (isNaN(Number(weight)) || Number(weight) < 0) {
            Alert.alert("Erreur", `Série ${j + 1} de l'exercice ${i + 1} : charge invalide`);
            return;
          }
        }

        if (
          ex.restBetweenSets &&
          (isNaN(Number(ex.restBetweenSets)) || Number(ex.restBetweenSets) < 0)
        ) {
          Alert.alert("Erreur", `Repos entre séries de l'exercice ${i + 1} invalide`);
          return;
        }

        if (
          ex.restAfterExercise &&
          (isNaN(Number(ex.restAfterExercise)) || Number(ex.restAfterExercise) < 0)
        ) {
          Alert.alert("Erreur", `Repos après exercice ${i + 1} invalide`);
          return;
        }
      }

      const preview = exercises
        .map((ex, i) => `• ${ex.name} – ${ex.sets.length} séries`)
        .join("\n");

      Alert.alert("Confirmer la séance", `Nom : ${sessionName}\n\nExercices :\n${preview}`, [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Confirmer",
          onPress: () => {
            onSubmit({ name: sessionName, exercises, tags });
            setExercises([]);
            setSessionName("");
            setTags([]);
            Alert.alert("Succès", "Séance enregistrée ✅");
          },
        },
      ]);
    }
  };

  return (
    <Box>
      <VStack space="xl">
        <Input variant="outline" size="md">
          <InputField
            placeholder="Nom de la séance"
            value={sessionName}
            onChangeText={setSessionName}
          />
        </Input>

        {exercises.map((ex, exIndex) => (
          <Card key={ex.id} size="lg" variant="filled" className="m-3">
            <VStack space="md">
              <Input>
                <InputField
                  placeholder="Nom de l'exercice"
                  value={ex.name}
                  onChangeText={val => handleExerciseChange(exIndex, "name", val)}
                />
              </Input>

              {ex.sets.map((set, setIndex) => (
                <Card key={setIndex} size="sm" variant="outline" className="m-1">
                  <VStack space="sm">
                    <Text bold>Série {setIndex + 1}</Text>
                    <Input>
                      <InputField
                        placeholder="Répétitions"
                        value={set.reps}
                        onChangeText={val => handleSetChange(exIndex, setIndex, "reps", val)}
                        keyboardType="numeric"
                      />
                    </Input>
                    <Input>
                      <InputField
                        placeholder="Charge (kg)"
                        value={set.weight}
                        onChangeText={val => handleSetChange(exIndex, setIndex, "weight", val)}
                        keyboardType="numeric"
                      />
                    </Input>
                    {ex.sets.length > 1 && (
                      <Button
                        onPress={() => removeSet(exIndex, setIndex)}
                        variant="outline"
                        action="negative"
                      >
                        <Text>Supprimer la série</Text>
                      </Button>
                    )}
                  </VStack>
                </Card>
              ))}

              <Button onPress={() => addSet(exIndex)} variant="outline" action="secondary">
                <Text>+ Ajouter une série</Text>
              </Button>

              <Input>
                <InputField
                  placeholder="Repos entre séries (sec)"
                  value={ex.restBetweenSets}
                  onChangeText={val => handleExerciseChange(exIndex, "restBetweenSets", val)}
                  keyboardType="numeric"
                />
              </Input>
              <Input>
                <InputField
                  placeholder="Repos après exercice (sec)"
                  value={ex.restAfterExercise}
                  onChangeText={val => handleExerciseChange(exIndex, "restAfterExercise", val)}
                  keyboardType="numeric"
                />
              </Input>

              <Box className="flex-row justify-between mt-2">
                {exIndex > 0 && (
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={() => moveExerciseUp(exIndex)}
                  >
                    <Text>🔼 Monter</Text>
                  </Button>
                )}
                {exIndex < exercises.length - 1 && (
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={() => moveExerciseDown(exIndex)}
                  >
                    <Text>🔽 Descendre</Text>
                  </Button>
                )}
              </Box>

              <Button onPress={() => removeExercise(exIndex)} variant="outline" action="negative">
                <Text>🗑 Supprimer l'exercice</Text>
              </Button>
            </VStack>
          </Card>
        ))}

        <Button onPress={handleAddExercise} variant="outline" action="secondary">
          <Text>+ Ajouter un exercice</Text>
        </Button>

        <Button onPress={handleSubmit} variant="outline" action="positive">
          <Text>Valider la séance</Text>
        </Button>
      </VStack>
    </Box>
  );
}
