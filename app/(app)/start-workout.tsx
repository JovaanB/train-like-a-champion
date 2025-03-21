import Button from "@/components/Button";
import ListItem from "@/components/ListItem";
import PaginationElement from "@/components/PaginationElement";
import { Exercice } from "@/models/program";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  ImageURISource,
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

export default function App({
  exercices
}: {
  exercices: Exercice[]
}) {
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
    ({
      item,
      index,
    }: {
      item: { text: string; image: ImageURISource };
      index: number;
    }) => {
      return <ListItem item={item} index={index} x={x} />;
    },
    [x]
  );
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.closeBtn}>
        <AntDesign name="close" size={24} color="black" />
      </Pressable>
      <TextInput
        placeholder="Result"
        autoFocus
        style={[styles.textInput, textInputFocused && styles.textInputFocused]}
        onFocus={() => setTextInputFocused(true)}
        onBlur={() => setTextInputFocused(false)}
      />
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
      <View style={styles.bottomContainer}>
        <Button
          currentIndex={flatListIndex}
          length={exercices.length}
          flatListRef={flatListRef}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  closeBtn: {
    marginLeft: "auto",
    margin: 16,
  },

  textInput: {
    justifyContent: "center",
    marginHorizontal: "auto",
    marginBottom: 10,
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
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});
