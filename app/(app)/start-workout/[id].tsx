import OneExercice from "@/components/OneExercice";
import PaginationElement from "@/components/PaginationElement";
import { ThemedText } from "@/components/ThemedText";
import { getSessionById, getExerciceById } from "@/lib/db-services";
import { Exercice } from "@/models/session";
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
  View,
  ViewToken,
} from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

interface AppProps {
  programId: string;
}

export default function App() {
  const { id: sessionId } = useLocalSearchParams();
  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [result, setResult] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
  const [textInputFocused, setTextInputFocused] = useState(false);

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
      return <OneExercice item={item} index={index} x={x} />;
    },
    [x]
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder="Result"
            keyboardType="numeric"
            style={[
              styles.textInput,
              textInputFocused && styles.textInputFocused,
            ]}
            onFocus={() => setTextInputFocused(true)}
            onBlur={() => setTextInputFocused(false)}
          />
          <Pressable
            style={styles.validateButton}
            onPress={() => {
              if (flatListIndex.value === exercices.length - 1) {
                return router.back();
              } else {
                flatListRef?.current?.scrollToIndex({
                  index: flatListIndex.value + 1,
                });
              }
            }}
          >
            <ThemedText style={styles.validateButtonText}>Valider</ThemedText>
          </Pressable>
        </View>
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

  textInput: {
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    width: 200,
    padding: 8,
  },
  textInputFocused: {
    borderColor: "#304FFE",
    borderWidth: 2,
  },
  validateButton: {
    backgroundColor: "#304FFE",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  validateButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});
