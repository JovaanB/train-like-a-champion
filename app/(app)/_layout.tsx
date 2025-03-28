import { Redirect, Slot } from "expo-router";
import { useSession } from "@/context";
import { ThemedText } from "@/components/ThemedText";

export default function AppLayout() {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
