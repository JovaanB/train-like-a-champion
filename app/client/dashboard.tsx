import { Box } from "@/components/ui/box";
import { useUserStore } from "../../stores/useUserStore";
import { VStack } from "@/components/ui/vstack";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native";

export default function ClientDashboard() {
  const userRole = useUserStore(state => state.role);
  const router = useRouter();

  useEffect(() => {
    if (!userRole) router.replace("/");
  }, [userRole]);

  return (
    <SafeAreaView>
      <Box className="p-4">
        <VStack space="md">
          <Text>Espace Client</Text>
          <Text>Bonjour,</Text>
          <Text>Suivez vos entraînements, enregistrez vos progrès et restez connecté avec votre coach. </Text>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
