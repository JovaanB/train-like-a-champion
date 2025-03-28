import { getSessionsByProgram } from "@/lib/db-services";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, SafeAreaView, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Session } from "@/models/session";
import SessionCard from "@/components/SessionCard";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

const MyPrograms = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { programSessions } = useLocalSearchParams();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        const result = await getSessionsByProgram(programSessions);
        setSessions(result);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, margin: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            router.navigate("/my-programs");
          }}
        >
          <MaterialIcons name="arrow-circle-left" size={24} color="black" />
        </Pressable>
        <ThemedText className="text-2xl font-bold text-gray-800 ml-6">
          Sessions
        </ThemedText>
      </View>
      <ScrollView style={{ padding: 10 }}>
        {sessions.length > 0 ? (
          sessions.map((session) => {
            return <SessionCard key={session.id} session={session} />;
          })
        ) : (
          <ThemedText>
            There is no session in this program... Contact your coach.
          </ThemedText>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPrograms;
