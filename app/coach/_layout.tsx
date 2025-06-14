import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "@/stores/useUserStore";

export default function CoachLayout() {
  const role = useUserStore(state => state.role);
  const isCoach = role === "coach";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Protected guard={isCoach}>
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="new-session"
          options={{
            title: "Séance",
            tabBarIcon: ({ color, size }) => <Ionicons name="create" size={size} color={color} />,
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
