import { Pressable } from "react-native";
import { HStack } from "./ui/hstack";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "./ui/text";
import { useRouter } from "expo-router";

interface BackButtonWithTitleProps {
  title: string;
}

const BackButtonWithTitle = ({ title }: BackButtonWithTitleProps) => {
  const router = useRouter();

  return (
    <HStack space="lg" className="items-center mb-4">
      <Pressable onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios-new" size={24} />
      </Pressable>
      <Text size="2xl" bold>
        {title}
      </Text>
    </HStack>
  );
};

export default BackButtonWithTitle;
