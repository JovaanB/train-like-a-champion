import { Session } from "@/models/session";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const SessionCard = ({ session }: { session: Session }) => {
  const router = useRouter();
  const { name, description, active } = session;

  const startWorkout = () => {
    if (active) {
      router.push({
        pathname: "/(app)/start-workout/[id]",
        params: { id: session.id },
      });
    }
  };

  return (
    <Pressable onPress={startWorkout} disabled={!active}>
      <View style={[styles.card, !active && styles.inactiveCard]}>
        <Text style={[styles.title, !active && styles.inactiveTitle]}>
          {name}
        </Text>
        <Text
          style={[styles.description, !active && styles.inactiveDescription]}
        >
          {description}
        </Text>
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
