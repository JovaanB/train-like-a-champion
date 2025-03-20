import { Tabs } from "expo-router";
import React from "react";
import { useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // or your icon library
import { Pressable } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16 }}
          >
            <MaterialIcons name="menu" size={24} color="black" />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="programs"
        options={{
          headerLeft: () => null,
          title: "My programs",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "body" : "body-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
