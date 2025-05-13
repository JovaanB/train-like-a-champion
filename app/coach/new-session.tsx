import { useLocalSearchParams, useRouter } from "expo-router";
import BackButtonWithTitle from "@/components/BackButtonWithTitle";
import SessionForm from "@/components/SessionForm";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useSessionStore } from "@/stores/useSessionStore";
import { Link } from "expo-router";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/AppLayout";

const NewSession = () => {
  const { template } = useLocalSearchParams();
  const sessions = useSessionStore(state => state.sessions);
  const addSession = useSessionStore(state => state.addSession);
  const router = useRouter();

  const model =
    typeof template === "string" ? sessions.find(session => session.id === template) : null;

  return (
    <AppLayout>
      <VStack space="md">
        <BackButtonWithTitle title="Créer une nouvelle séance" />
        <SessionForm
          initialData={
            model
              ? {
                  name: model.name + " (copie)",
                  tags: model.tags,
                  exercises: model.exercises,
                }
              : undefined
          }
          onSubmit={addSession}
        />
        <Button
          className="mt-1"
          action="primary"
          variant="outline"
          onPress={() => router.push("/sessions/templates")}
        >
          <Text>📋 Créer depuis un modèle</Text>
        </Button>
        <Link href="/sessions">
          <Text className="text-center mt-2">Voir toutes les séances ({sessions.length})</Text>
        </Link>
      </VStack>
    </AppLayout>
  );
};

export default NewSession;
