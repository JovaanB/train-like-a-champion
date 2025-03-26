import { Session } from "@/models/session";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const SessionCard = ({ session }: { session: Session }) => {
  const router = useRouter();

  const startWorkout = () => {
    router.push({
      pathname: "/(app)/start-workout/[id]",
      params: { id: session.id },
    });
  };

  return (
    <Pressable onPress={startWorkout}>
      <View style={styles.card}>
        <Text style={styles.title}>{session.name}</Text>
        <Text style={styles.description}>{session.description}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default SessionCard;
