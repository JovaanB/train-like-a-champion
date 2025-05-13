import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "expo-router";

export function LogoutButton() {
  const resetRole = useUserStore(s => s.resetRole);
  const router = useRouter();

  const logout = () => {
    resetRole();
    router.replace("/");
  };

  return (
    <Button className="mt-4" onPress={() => logout()} variant="outline" action="negative">
      <Text>Se déconnecter</Text>
    </Button>
  );
}
