import SessionForm from "@/components/SessionForm";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";

const NewSession = () => {
    return (
        <SafeAreaView>
            <Box className='p-4'>
                <ScrollView className="mb-4">
                    <VStack space="md">
                        <SessionForm onSubmit={() => { }} />
                        <Link href={{
                            pathname: "/sessions"
                        }}>
                            <Text>Voir toutes les séances</Text>
                        </Link>
                    </VStack>
                </ScrollView>
            </Box>
        </SafeAreaView>
    )
};

export default NewSession;
