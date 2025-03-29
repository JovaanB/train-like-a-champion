import { Session } from "@/models/session";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

const SessionCard = ({ session }: { session: Session }) => {
  const router = useRouter();
  const { name, description, status } = session;
  const [startedTime, setStartedTime] = useState<number | null>(null);
  const isActive = status === "pending";

  const startWorkout = () => {
    if (isActive) {
      const now = Date.now();
      setStartedTime(now);
      router.push({
        pathname: "/(app)/start-workout/[id]",
        params: { id: session.id, startedTime: now },
      });
    }
  };

  return (
    <Pressable onPress={startWorkout} disabled={!isActive}>
      <View style={[styles.card, !isActive && styles.inactiveCard]}>
        <View>
          <Text style={[styles.title, !isActive && styles.inactiveTitle]}>
            {name}
          </Text>
          <Text
            style={[
              styles.description,
              !isActive && styles.inactiveDescription,
            ]}
          >
            {description}
          </Text>
        </View>
        <View>
          <MaterialIcons name="play-circle-outline" size={32} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inactiveCard: {
    backgroundColor: "#f0f0f0",
    opacity: 0.6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inactiveTitle: {
    color: "#999",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  inactiveDescription: {
    color: "#aaa",
  },
});

export default SessionCard;
