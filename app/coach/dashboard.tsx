import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native";

const Dashboard = () => {
  return (
    <SafeAreaView>
      <Box className="p-4">
        <Center>
          <Text size="xl" bold>
            Coach - Dashboard
          </Text>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default Dashboard;
