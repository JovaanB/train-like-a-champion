import { getProgramsByIds } from "@/lib/db-services";
import { Program } from "@/models/program";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const MyPrograms = async () => {
  const [programs, setPrograms] = useState<Program[]>([]);

  return (
    <View style={{ flex: 1 }}>
      <Text>My Programs</Text>
    </View>
  );
};

export default MyPrograms;
