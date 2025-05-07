import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function CoachLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#000',
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="new-session"
                options={{
                    title: 'Séance',
                    tabBarIcon: ({ color, size }) => <Ionicons name="create" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                }}
            />
        </Tabs>
    )
}