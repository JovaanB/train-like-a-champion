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
  runOnJS,
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
  const [currentSet, setCurrentSet] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [textInputFocused, setTextInputFocused] = useState(false);
  const { name, description, setsDetails, restBetweenSets, restAfterExercise } =
    item;
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
      <Animated.Text style={[styles.name, rnTextStyle]}>{name}</Animated.Text>
      <Animated.Text style={[styles.description, rnTextStyle]}>
        {description}
      </Animated.Text>
      <View style={styles.bottomContainer}>
        <Animated.Text style={[styles.timer, rnTextStyle]}>
          {timer}
        </Animated.Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 10,
          margin: 20,
          marginBottom: 5,
        }}
      >
        {setsDetails.length > 0 && currentSet < setsDetails.length && (
          <View>
            <Text style={{ marginTop: 5 }}>
              Set {currentSet + 1} / {setsDetails.length}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <TextInput
                placeholder={`reps / ${setsDetails[currentSet].reps}`}
                keyboardType="numeric"
                maxLength={3}
                style={[
                  styles.textInput,
                  textInputFocused && styles.textInputFocused,
                  { flex: 1, marginRight: 5 },
                ]}
                onFocus={() => setTextInputFocused(true)}
                onBlur={() => setTextInputFocused(false)}
              />
              <TextInput
                placeholder={`load / ${setsDetails[currentSet].load}`}
                keyboardType="numeric"
                maxLength={3}
                style={[
                  styles.textInput,
                  textInputFocused && styles.textInputFocused,
                  { flex: 1 },
                ]}
                onFocus={() => setTextInputFocused(true)}
                onBlur={() => setTextInputFocused(false)}
              />
            </View>
          </View>
        )}
        <Pressable
          style={[
            styles.validateButton,
            restTime > 0 && styles.validateButtonDisabled,
          ]}
          disabled={restTime > 0}
          onPress={() => {
            setRestTime(0);
            if (currentSet < setsDetails.length - 1) {
              if (restBetweenSets > 0) {
                const restTimer = setInterval(() => {
                  setRestTime((prevTime) => {
                    if (prevTime <= 0) {
                      clearInterval(restTimer);
                      return 0;
                    }
                    return prevTime - 1;
                  });
                }, 1000);
                setRestTime(restBetweenSets);
              }
              const newCurrentSet = currentSet + 1;
              runOnJS(setCurrentSet)(newCurrentSet);
              return setCurrentSet((prevCurrentSet) => prevCurrentSet + 1);
            }
            if (isLastExercice) {
              return router.back();
            } else {
              if (restAfterExercise > 0) {
                const restTimer = setInterval(() => {
                  console.log("ICI????");
                  setRestTime((prevTime) => {
                    if (prevTime <= 0) {
                      clearInterval(restTimer);
                      return 0;
                    }
                    return prevTime - 1;
                  });
                }, 1000);
                setRestTime(restAfterExercise);
                scrollToNextExercice();
                return clearInterval(restTimer);
              }
            }
          }}
        >
          <Text style={styles.validateButtonText} disabled={restTime > 0}>
            {restTime > 0 ? restTime : "Valider"}
          </Text>
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
    fontSize: 32,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  textInputFocused: {
    borderColor: "#304FFE",
    borderWidth: 2,
  },
  validateButton: {
    backgroundColor: "#304FFE",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  validateButtonDisabled: {
    backgroundColor: "#B0BEC5",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    alignItems: "center",
    width: "100%",
    marginTop: "auto",
  },
});
