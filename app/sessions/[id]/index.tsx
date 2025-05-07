import { useLocalSearchParams, useRouter } from "expo-router"
import { useSessionStore } from "@/stores/useSessionStore"
import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Button } from "@/components/ui/button"
import { Alert, SafeAreaView } from "react-native"
import BackButtonWithTitle from "@/components/BackButtonWithTitle"

export default function SessionDetailPage() {
    const { id } = useLocalSearchParams()
    const router = useRouter()

    const sessionIndex = Number(id)
    const session = useSessionStore((state) => state.sessions[sessionIndex])
    const duplicateSession = useSessionStore((state) => state.duplicateSession)
    const deleteSession = useSessionStore((state) => state.deleteSession)


    if (!session) {
        return (
            <SafeAreaView>
                <Box className="p-4">
                    <Text>Session introuvable.</Text>
                </Box>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView>
            <Box className="p-4">
                <VStack space="lg">
                    <BackButtonWithTitle title={session.name} />
                    <Text size="sm">{new Date(session.createdAt).toLocaleString()}</Text>

                    <VStack space="sm" className="mt-2">
                        {session.exercises.map((ex, i) => (
                            <Box key={i} className="p-2">
                                <Text bold>{ex.name}</Text>
                                <Text>Répétitions : {ex.reps}</Text>
                                <Text>Charge : {ex.weight} kg</Text>
                            </Box>
                        ))}
                    </VStack>

                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={() => {
                            duplicateSession(sessionIndex)
                            const newIndex = useSessionStore.getState().sessions.length - 1
                            router.replace(`/sessions/${newIndex}`)
                        }}
                    >
                        <Text>📄 Dupliquer cette séance</Text>
                    </Button>
                    <Button action="secondary" variant="solid" onPress={() => router.push(`/sessions/${sessionIndex}/edit`)}>
                        <Text>✏️ Modifier la séance</Text>
                    </Button>
                    <Button
                        action="negative"
                        variant="solid"
                        onPress={() => {
                            Alert.alert(
                                "Supprimer cette séance ?",
                                "Cette action est irréversible.",
                                [
                                    { text: "Annuler", style: "cancel" },
                                    {
                                        text: "Supprimer",
                                        style: "destructive",
                                        onPress: () => {
                                            deleteSession(sessionIndex)
                                            router.back()
                                        }
                                    }
                                ]
                            )
                        }}
                    >
                        <Text className="text-white">🗑️ Supprimer la séance</Text>
                    </Button>
                </VStack>
            </Box>
        </SafeAreaView>
    )
}
