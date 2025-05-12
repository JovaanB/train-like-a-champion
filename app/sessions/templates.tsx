import { useSessionStore } from "@/stores/useSessionStore"
import { useRouter } from "expo-router"
import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { VStack } from "@/components/ui/vstack"
import { SafeAreaView, ScrollView } from "react-native"
import { groupByTags } from "@/utils/groupByTags"
import BackButtonWithTitle from "@/components/BackButtonWithTitle"

export default function TemplatesPage() {
    const sessions = useSessionStore((state) => state.sessions)
    const router = useRouter()

    const grouped = groupByTags(sessions)

    return (
        <SafeAreaView>
            <Box className="p-4">
                <BackButtonWithTitle title="Sélectionner un modèle" />
                <ScrollView>
                    <VStack space="md" className="mt-4">
                        {Object.entries(grouped).map(([tag, list]) => (
                            <Box key={tag} className="mt-6">
                                <Text size="xl" bold className="mb-2">{tag}</Text>
                                <Box className="flex-row flex-wrap gap-2">
                                    {list.map((s) => (
                                        <Button
                                            key={s.id}
                                            size="sm"
                                            variant="outline"
                                            action="positive"
                                            onPress={() => router.push(`/coach/new-session?template=${s.id}`)}
                                            style={{ margin: 4, width: "48%" }}
                                        >
                                            <Text numberOfLines={1}>{s.name}</Text>
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </VStack>
                </ScrollView>
            </Box>
        </SafeAreaView>
    )
}
