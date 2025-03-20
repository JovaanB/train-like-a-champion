import { Program } from "@/models/program";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgramCard = ({ program }: { program: Program }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{program.name}</Text>
      <Text style={styles.description}>{program.description}</Text>
    </View>
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
