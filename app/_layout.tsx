import { SessionProvider } from "@/context";
import { Slot } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Root() {

  const [loaded, error] = useFonts({
    'Kanit': require('../assets/fonts/Kanit-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SessionProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </SessionProvider>
  );
}
