import { useSession } from "@/context";
import React from "react";
import { View, Text } from "react-native";

const ProfileScreen = () => {
  const { user } = useSession();

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Guest";
  ``;

  return (
    <View className="flex-1 mt-4 p-4">
      <View className="mb-8">
        <Text className="text-xl font-bold text-blue-900">
          Name: {displayName}
        </Text>
        <Text className="text-xl font-semibold  text-blue-900 mt-2">
          Email: {user?.email}
        </Text>
        <Text className="text-normL font-semibold  text-blue-900 mt-2">
          Last Seen: {user?.metadata?.lastSignInTime}
        </Text>
        <Text className="text-normal font-semibold  text-blue-900 mt-2">
          Created: {user?.metadata?.creationTime}
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
