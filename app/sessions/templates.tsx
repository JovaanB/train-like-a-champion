import { useSessionStore } from "@/stores/useSessionStore"
import { useRouter } from "expo-router"
import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { VStack } from "@/components/ui/vstack"
import { SafeAreaView, ScrollView } from "react-native"

export default function TemplatesPage() {
    const sessions = useSessionStore((state) => state.sessions)
    const router = useRouter()

    return (
        <SafeAreaView>
            <Box className="p-4">
                <Text size="xl" bold>Sélectionner un modèle</Text>
                <ScrollView>
                    <VStack space="md" className="mt-4">
                        {sessions.map((s, idx) => (
                            <Button
                                key={idx}
                                variant="outline"
                                onPress={() => router.push(`/coach/new-session?template=${idx}`)}
                            >
                                <Text>{s.name}</Text>
                            </Button>
                        ))}
                    </VStack>
                </ScrollView>
            </Box>
        </SafeAreaView>
    )
}
