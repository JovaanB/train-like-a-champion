import { useSessionStore } from "@/stores/useSessionStore"
import { useRouter } from "expo-router"
import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { VStack } from "@/components/ui/vstack"
import { SafeAreaView, ScrollView } from "react-native"
import { useState } from "react"
import { Input, InputField } from "@/components/ui/input"

export default function TemplatesPage() {
    const sessions = useSessionStore((state) => state.sessions)
    const router = useRouter()

    const [filter, setFilter] = useState("")

    const filteredSessions = sessions.filter((s) =>
        !filter ? true : s.tags?.includes(filter.toLowerCase())
    )

    return (
        <SafeAreaView>
            <Box className="p-4">
                <Text className="mb-2" size="xl" bold>Sélectionner un modèle</Text>
                <Input>
                    <InputField
                        placeholder="Filtrer par tag"
                        value={filter}
                        onChangeText={(text) => setFilter(text.toLowerCase())}
                    />
                </Input>
                <ScrollView>
                    <VStack space="md" className="mt-4">
                        {filteredSessions.map((s, idx) => (
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
