import { LogoutButton } from "@/components/LogoutButton";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native";

const ClientProfile = () => {
  return (
    <SafeAreaView>
      <Box className="p-4">
        <Text size="xl" bold>
          Profil du client
        </Text>
        <LogoutButton />
      </Box>
    </SafeAreaView>
  );
};

export default ClientProfile;
