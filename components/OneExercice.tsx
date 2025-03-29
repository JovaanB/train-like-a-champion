import {
  View,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { Exercice } from "@/models/exercice";
import { useRouter } from "expo-router";

type Props = {
  item: Exercice;
  index: number;
  x: SharedValue<number>;
  timer: string;
  isLastExercice: boolean;
  scrollToNextExercice: () => void;
};

const OneExercice = ({
  item,
  index,
  x,
  isLastExercice,
  scrollToNextExercice,
  timer,
}: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [textInputFocused, setTextInputFocused] = useState(false);
  const router = useRouter();

  const rnTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  }, [index, x]);
  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <Animated.Text style={[styles.name, rnTextStyle]}>
        {item.name}
      </Animated.Text>
      <Animated.Text style={[styles.description, rnTextStyle]}>
        {item.description}
      </Animated.Text>
      <View style={styles.bottomContainer}>
        <Animated.Text style={[styles.timer, rnTextStyle]}>
          Temps total : {timer}
        </Animated.Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          margin: 20,
          marginBottom: 5,
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
            if (isLastExercice) {
              return router.back();
            } else {
              scrollToNextExercice();
            }
          }}
        >
          <Text style={styles.validateButtonText}>Valider</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default React.memo(OneExercice);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  name: {
    fontWeight: "600",
    lineHeight: 41,
    fontSize: 34,
  },
  description: {
    fontWeight: "400",
    fontSize: 16,
  },
  timer: {
    fontWeight: "700",
    fontSize: 18,
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "auto",
  },
});
