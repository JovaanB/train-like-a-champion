import { router, Link } from "expo-router";
import { TextInput, View, Pressable } from "react-native";
import { useState } from "react";
import { useSession } from "@/context";
import { ThemedText } from "@/components/ThemedText";

/**
 * SignUp component handles new user registration
 * @returns {JSX.Element} Sign-up form component
 */
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signUp } = useSession();

  /**
   * Handles the registration process
   * @returns {Promise<Models.User<Models.Preferences> | null>}
   */
  const handleRegister = async () => {
    try {
      return await signUp(email, password, name);
    } catch (err) {
      console.log("[handleRegister] ==>", err);
      return null;
    }
  };

  /**
   * Handles the sign-up button press
   */
  const handleSignUpPress = async () => {
    const resp = await handleRegister();
    if (resp) {
      router.replace("/(app)/(drawer)/(tabs)");
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <View className="items-center mb-8">
        <ThemedText className="text-2xl font-bold text-gray-800 mb-2">
          Create Account
        </ThemedText>
        <ThemedText className="text-sm text-gray-500">
          Sign up to get started
        </ThemedText>
      </View>

      <View className="w-full max-w-[300px] space-y-4 mb-8">
        <View>
          <ThemedText className="text-sm font-medium text-gray-700 mb-1 ml-1">
            Name
          </ThemedText>
          <TextInput
            placeholder="Your full name"
            value={name}
            onChangeText={setName}
            textContentType="name"
            autoCapitalize="words"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>

        <View>
          <ThemedText className="text-sm font-medium text-gray-700 mb-1 ml-1">
            Email
          </ThemedText>
          <TextInput
            placeholder="name@mail.com"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>

        <View>
          <ThemedText className="text-sm font-medium text-gray-700 mb-1 ml-1">
            Password
          </ThemedText>
          <TextInput
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="newPassword"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
      </View>

      <Pressable
        onPress={handleSignUpPress}
        className="bg-blue-600 w-full max-w-[300px] py-3 rounded-lg active:bg-blue-700"
      >
        <ThemedText className="text-white font-semibold text-base text-center">
          Sign Up
        </ThemedText>
      </Pressable>

      <View className="flex-row items-center mt-6">
        <ThemedText className="text-gray-600">Already have an account?</ThemedText>
        <Link href="/sign-in" asChild>
          <Pressable className="ml-2">
            <ThemedText className="text-blue-600 font-semibold">Sign In</ThemedText>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
