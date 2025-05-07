import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { useSessionStore } from "@/stores/useSessionStore"
import { ScrollView } from "react-native"

export default function SessionsPage() {
    const sessions = useSessionStore((state) => state.sessions)

    return (
        <ScrollView>
            <Box className="p-4">
                <Text size="2xl" bold>📋 Séances</Text>

                <VStack space="lg" className="mt-4">
                    {sessions.length === 0 ? (
                        <Text>Aucune séance enregistrée.</Text>
                    ) : (
                        sessions.map((session, idx) => (
                            <Box key={idx} className="p-4">
                                <Text bold>{session.name}</Text>
                                <Text size="sm">
                                    {new Date(session.createdAt).toLocaleString()}
                                </Text>

                                <VStack space="sm" className="mt-2">
                                    {session.exercises.map((ex, i) => (
                                        <Text key={i} size="sm">
                                            • {ex.name} — {ex.reps} reps — {ex.weight} kg
                                        </Text>
                                    ))}
                                </VStack>
                            </Box>
                        ))
                    )}
                </VStack>
            </Box>
        </ScrollView>
    )
}