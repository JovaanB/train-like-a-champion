import { getProgramsByIds } from "@/lib/db-services";
import { Program } from "@/models/program";
import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, SafeAreaView } from "react-native";
import currentUser from "@/data/current-user.json";
import ProgramCard from "@/components/ProgramCard";
import { ScrollView } from "react-native-gesture-handler";

const MyPrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        const userPrograms = await getProgramsByIds(currentUser.programs);
        setPrograms(userPrograms);
      } catch (error) {
        console.error("Failed to fetch programs:", error);
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
    <SafeAreaView style={{ flex: 1 }}>
      <Text className="text-2xl font-bold text-gray-800 ml-6 mt-6">
        Your programs
      </Text>
      <ScrollView style={{ padding: 20 }}>
        {programs.length > 0 ? (
          programs.map((program) => {
            return <ProgramCard key={program.id} program={program} />;
          })
        ) : (
          <Text>You don't have any programs... Contact your coach.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPrograms;
