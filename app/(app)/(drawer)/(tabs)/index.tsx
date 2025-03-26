import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useSession } from "@/context";
import { router, useRouter } from "expo-router";
import { getItemFor, storeData } from "@/lib/storageHelper";

const FIRST_LOGIN = "FIRST_LOGIN";

const TabsIndexScreen = () => {
  const { signOut, user } = useSession();

  useEffect(() => {
    const getData = async () => {
      const firstLogin = await getItemFor(FIRST_LOGIN);

      if (!firstLogin && !user?.metadata.lastSignInTime) {
        router.replace("/on-boarding");
      } else {
        await storeData({ key: FIRST_LOGIN, value: "false" });
      }
    };

    getData().catch((err) => console.error(err));
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Guest";

  return (
    <View className="flex-1 justify-center items-center p-4">
      <View className="items-center mb-8">
        <Text className="text-xl text-gray-800 mb-2">Welcome,</Text>
        <Text className="text-2xl font-bold text-blue-600">{displayName}</Text>
        <Text className="text-sm text-gray-500 mt-2">{user?.email}</Text>
      </View>

      <Pressable
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-lg active:bg-red-600"
      >
        <Text className="text-white font-semibold text-base">Logout</Text>
      </Pressable>
    </View>
  );
};

export default TabsIndexScreen;
