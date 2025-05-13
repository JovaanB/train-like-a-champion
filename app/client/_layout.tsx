import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "@/stores/useUserStore";

export default function ClientLayout() {
  const role = useUserStore(state => state.role);
  const isClient = role === "client";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Protected guard={isClient}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profil",
            tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
