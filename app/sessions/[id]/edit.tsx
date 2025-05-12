import { useLocalSearchParams, useRouter } from "expo-router"
import { Session, useSessionStore } from "@/stores/useSessionStore"
import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"
import SessionForm from "@/components/SessionForm"
import { SafeAreaView } from "react-native"
import BackButtonWithTitle from "@/components/BackButtonWithTitle"

export default function EditSessionPage() {
    const { id }: { id: string } = useLocalSearchParams()
    const session = useSessionStore((s) => s.sessions.find((s) => s.id === id))
    const updateSession = useSessionStore((s) => s.updateSession)
    const router = useRouter()

    if (!session) {
        return (
            <Box className="p-4">
                <Text>Session introuvable.</Text>
            </Box>
        )
    }

    const handleUpdate = (data: Omit<Session, "createdAt, id">) => {
        updateSession(id, data)
        router.back()
    }

    return (
        <SafeAreaView>
            <Box className="p-4">
                <BackButtonWithTitle title="Modification" />
                <SessionForm
                    initialData={{
                        name: session.name,
                        tags: session.tags,
                        exercises: session.exercises
                    }}
                    onSubmit={handleUpdate}
                />
            </Box>
        </SafeAreaView>
    )
}
