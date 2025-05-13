import BackButtonWithTitle from "@/components/BackButtonWithTitle";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useSessionStore } from "@/stores/useSessionStore";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Alert, SafeAreaView, ScrollView } from "react-native";

export default function SessionsPage() {
  const sessions = useSessionStore(state => state.sessions);
  const deleteSession = useSessionStore(state => state.deleteSession);

  return (
    <SafeAreaView>
      <Box className="p-4">
        <BackButtonWithTitle title="📋 Séances" />

        <ScrollView>
          <VStack space="lg">
            {sessions.length === 0 ? (
              <Text>Aucune séance enregistrée.</Text>
            ) : (
              sessions.map((session, idx) => (
                <Link key={idx} href={`/sessions/${session.id}`}>
                  <Box className="p-4 w-full border rounded border-neutral-200 shadow-lg">
                    <HStack>
                      <Text bold>{session.name}</Text>
                      <Button
                        size="xs"
                        className="ml-auto"
                        variant="link"
                        onPress={() => {
                          Alert.alert(
                            "Confirmer la suppression",
                            "Voulez-vous vraiment supprimer cette séance ?",
                            [
                              { text: "Annuler", style: "cancel" },
                              {
                                text: "Supprimer",
                                style: "destructive",
                                onPress: () => deleteSession(session.id),
                              },
                            ]
                          );
                        }}
                      >
                        <MaterialIcons name="delete" size={24} />
                      </Button>
                    </HStack>
                    <Text size="sm">{new Date(session.createdAt).toLocaleString()}</Text>

                    <VStack space="sm" className="mt-2">
                      {session.exercises.map((ex, i) => (
                        <Text key={i} size="sm">
                          • {ex.name} — {ex.sets.length} séries
                          {ex.restAfterExercise && (
                            <Text size="xs" className="text-neutral-500">
                              {" "}
                              (repos : {ex.restAfterExercise}s)
                            </Text>
                          )}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                </Link>
              ))
            )}
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
