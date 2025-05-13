import { useEffect, useState } from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Pressable } from "react-native";

export function Timer({ duration, onComplete }: { duration: number; onComplete: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="flex items-center justify-center h-full">
      <Text bold className="text-[50vw]">
        {secondsLeft}
      </Text>
      <Pressable
        onPress={() => {
          setSecondsLeft(0);
          onComplete();
        }}
      >
        <Text className="text-center" size="2xl" bold underline>
          Appuyez pour ignorer
        </Text>
      </Pressable>
    </Box>
  );
}
