import { useRouter } from "expo-router";
import { useUserStore } from "../../stores/useUserStore";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";

export default function Home() {
  const router = useRouter();
  const setUserRole = useUserStore(state => state.setRole);

  const handleSelectRole = (role: "coach" | "client") => {
    setUserRole(role);
    console.log("Selected role:", role);
    router.push(`/${role}`);
  };

  return (
    <Box className="mt-24 p-4">
      <Center>
        <VStack space="lg">
          <Text size="4xl" bold>
            Train like a Champion
          </Text>

          <Text className="m-auto">Choisissez votre rôle pour commencer :</Text>

          <Button size="lg" variant="outline" action="primary" onPress={() => handleSelectRole("coach")}>
            <Text>Je suis Coach</Text>
          </Button>

          <Button size="lg" variant="outline" action="primary" onPress={() => handleSelectRole("client")}>
            <Text>Je suis Client</Text>
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
