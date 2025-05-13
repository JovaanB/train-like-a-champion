import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { useSessionStore } from "@/stores/useSessionStore";
import { SafeAreaView } from "react-native";

export default function ClientHome() {
  const router = useRouter();
  const sessions = useSessionStore(state => state.sessions);

  return (
    <SafeAreaView>
      <Box className="p-4">
        <VStack space="lg">
          <Text size="2xl" bold>
            Mes séances
          </Text>

          {sessions.length === 0 ? (
            <Text>Aucune séance pour le moment</Text>
          ) : (
            sessions.map(session => (
              <Box key={session.id}>
                <Text size="lg" bold>
                  {session.name}
                </Text>
                <Button action="secondary" onPress={() => router.push(`/client/sessions/${session.id}`)}>
                  <Text>Démarrer</Text>
                </Button>
              </Box>
            ))
          )}

          <Button variant="outline" onPress={() => router.push("/client/history")}>
            <Text>Voir l'historique</Text>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
