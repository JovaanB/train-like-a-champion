import { useLocalSearchParams, useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/stores/useSessionStore";
import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Timer } from "@/components/Timer";

export default function ClientSession() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const session = useSessionStore(state => state.sessions.find(s => s.id === id));

  const [results, setResults] = useState<{ [exId: string]: { reps: string; weight: string } }>({});
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [restingType, setRestingType] = useState<"betweenSets" | "afterExercise" | null>(null);

  const [resting, setResting] = useState(false);

  const currentExercise = session?.exercises[exerciseIndex];

  const setsCount = currentExercise?.sets.length || 0;

  const restSeconds =
    restingType === "betweenSets"
      ? Number(currentExercise.restBetweenSets || 10)
      : Number(currentExercise.restAfterExercise || 20);

  const handleChange = (field: "reps" | "weight", value: string) => {
    if (!currentExercise) return;
    const exId = currentExercise.id;
    setResults(prev => ({
      ...prev,
      [exId]: {
        ...prev[exId],
        [setIndex]: {
          ...prev[exId]?.[setIndex],
          [field]: value,
        },
      },
    }));
  };

  const handleNext = () => {
    if (setIndex + 1 < setsCount) {
      setRestingType("betweenSets");
      setResting(true);
    } else if (exerciseIndex + 1 < session!.exercises.length) {
      setRestingType("afterExercise");
      setResting(true);
    } else {
      // Fin de séance
      router.push("/client/history");
    }
  };

  const goNext = () => {
    if (setIndex + 1 < setsCount) {
      setSetIndex(set => set + 1);
    } else {
      setSetIndex(0);
      setExerciseIndex(idx => idx + 1);
    }
    setResting(false);
  };

  return (
    <SafeAreaView>
      {!session || !currentExercise ? (
        <Text size="2xl" className="text-center">
          Séance introuvable
        </Text>
      ) : resting ? (
        <Timer duration={restSeconds} onComplete={goNext} />
      ) : (
        <ScrollView>
          <Box className="p-4">
            <VStack space="lg">
              <Text size="2xl" bold>
                {session.name}
              </Text>
              <Text size="lg" bold>
                {currentExercise.name} – Série {setIndex + 1}/{setsCount}
              </Text>

              <Input>
                <InputField
                  placeholder={`Répétitions (Objectif : ${currentExercise.sets[setIndex].reps})`}
                  value={results[currentExercise.id]?.[setIndex]?.reps || ""}
                  onChangeText={val => handleChange("reps", val)}
                  keyboardType="numeric"
                />
              </Input>
              <Input>
                <InputField
                  placeholder={`Charge (Objectif : ${currentExercise.sets[setIndex].weight} kg)`}
                  value={results[currentExercise.id]?.[setIndex]?.weight || ""}
                  onChangeText={val => handleChange("weight", val)}
                  keyboardType="numeric"
                />
              </Input>

              <Button action="secondary" onPress={handleNext}>
                <Text>
                  {exerciseIndex + 1 === session.exercises.length && setIndex + 1 === setsCount
                    ? "Terminer la séance"
                    : "Suivant"}
                </Text>
              </Button>
            </VStack>
          </Box>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
