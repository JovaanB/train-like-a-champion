import { Program } from "@/models/program";
import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";

const ProgramCard = ({ program }: { program: Program }) => {
  const router = useRouter();

  const startWorkout = () => {
    router.push({
      pathname: "/sessions",
      params: { programSessions: program.sessions.map((session) => session.id) },
    });
  };

  return (
    <Pressable onPress={startWorkout}>
      <View style={styles.card}>
        <ThemedText style={styles.title}>{program.name}</ThemedText>
        <ThemedText style={styles.description}>{program.description}</ThemedText>
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

export default ProgramCard;
