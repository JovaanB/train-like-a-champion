import { useLocalSearchParams, useRouter } from "expo-router"
import BackButtonWithTitle from "@/components/BackButtonWithTitle";
import SessionForm from "@/components/SessionForm";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useSessionStore } from "@/stores/useSessionStore";
import { Link } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";
import { Button } from "@/components/ui/button";

const NewSession = () => {
    const { template } = useLocalSearchParams()
    const sessions = useSessionStore(state => state.sessions);
    const addSession = useSessionStore((state) => state.addSession)

    const router = useRouter();

    const model = typeof template === "string" ? sessions[parseInt(template)] : null

    return (
        <SafeAreaView>
            <Box className='p-4'>
                <VStack space="md">
                    <BackButtonWithTitle title="Créer une nouvelle séance" />
                    <ScrollView className="mb-4">
                        <SessionForm initialData={model ? { name: model.name + " (copie)", tags: model.tags, exercises: model.exercises } : undefined} onSubmit={addSession} />
                        <Button className="mt-2" action="primary" variant="outline" onPress={() => router.push("/sessions/templates")}>
                            <Text>📋 Créer depuis un modèle</Text>
                        </Button>
                        <Link href={{
                            pathname: "/sessions"
                        }}>
                            <Text>Voir toutes les séances ({sessions.length})</Text>
                        </Link>
                    </ScrollView>
                </VStack>
            </Box>
        </SafeAreaView>
    )
};

export default NewSession;
