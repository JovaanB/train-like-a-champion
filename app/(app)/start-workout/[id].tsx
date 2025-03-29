import OneExercice from "@/components/OneExercice";
import PaginationElement from "@/components/PaginationElement";
import { getSessionById, getExerciceById } from "@/lib/db-services";
import { Exercice } from "@/models/exercice";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageURISource,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

interface AppProps {
  programId: string;
}

export default function App() {
  const { id: sessionId, startedTime } = useLocalSearchParams();
  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [elapsedTime, setElapsedTime] = useState("00");

  useEffect(() => {
    if (startedTime) {
      const timer = setInterval(() => {
        const totalSeconds = Math.floor((Date.now() - +startedTime) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const formattedTime = `${hours > 0 ? String(hours) : ""}${
          hours > 0 ? ":" : ""
        }${minutes > 0 ? String(minutes).padStart(2, "0") : ""}${
          minutes > 0 ? ":" : ""
        }${String(seconds).padStart(2, "0")}`;
        runOnJS(setElapsedTime)(formattedTime);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startedTime]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        const session = await getSessionById(sessionId);
        const exercices = await Promise.all(
          session?.exercices.map(async (ex) => {
            const exercice = await getExerciceById(ex.exerciceId);
            return {
              ...exercice[0],
              ...ex,
            };
          }) ?? []
        );
        setExercices(exercices);
      } catch (error) {
        console.error("Failed to fetch program:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, [sessionId]);

  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      text: string;
      image: ImageURISource;
    }>
  >();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    []
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: Exercice; index: number }) => {
      return (
        <OneExercice
          item={item}
          index={index}
          x={x}
          timer={elapsedTime}
          isLastExercice={flatListIndex.value === exercices.length - 1}
          scrollToNextExercice={() => {
            flatListRef?.current?.scrollToIndex({
              index: flatListIndex.value + 1,
            });
          }}
        />
      );
    },
    [x, elapsedTime]
  );

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.closeBtn}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
        <Animated.FlatList
          ref={flatListRef}
          onScroll={scrollHandle}
          horizontal
          scrollEventThrottle={16}
          pagingEnabled={true}
          data={exercices}
          keyExtractor={(_, index) => index.toString()}
          bounces={false}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
        />
        <PaginationElement length={exercices.length} x={x} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
  },
  closeBtn: {
    marginLeft: "auto",
    margin: 16,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});
