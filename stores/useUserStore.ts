import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { Role } from "@/types/role";

type UserStore = {
  role: Role | null;
  setRole: (role: Role) => void;
  resetRole: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      role: null,
      setRole: role => set({ role }),
      resetRole: () => set({ role: null }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
