import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardAvoiding?: boolean;
};

export default function AppLayout({
  children,
  scroll = true,
  style,
  contentContainerStyle,
  keyboardAvoiding = true,
}: AppLayoutProps) {
  const Wrapper = scroll ? ScrollView : View;

  const inner = (
    <Wrapper
      {...(scroll
        ? {
            contentContainerStyle: [{ padding: 16, paddingBottom: 24 }, contentContainerStyle],
          }
        : {
            style: [{ flex: 1 }, contentContainerStyle],
          })}
    >
      {children}
    </Wrapper>
  );

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "white" }, style]}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          {inner}
        </KeyboardAvoidingView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}
