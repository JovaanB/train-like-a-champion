import { Session } from "@/models/session";
import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";

const SessionCard = ({ session }: { session: Session }) => {
  const router = useRouter();
  const { name, description, status } = session;
  const pending = status === "pending";

  const startWorkout = () => {
    if (pending) {
      router.push({
        pathname: "/(app)/start-workout/[id]",
        params: { id: session.id },
      });
    }
  };

  return (
    <Pressable onPress={startWorkout} disabled={!pending}>
      <View style={[styles.card, !pending && styles.inactiveCard]}>
        <ThemedText style={[styles.title, !pending && styles.inactiveTitle]}>
          {name}
        </ThemedText>
        <ThemedText
          style={[styles.description, !pending && styles.inactiveDescription]}
        >
          {description}
        </ThemedText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
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
