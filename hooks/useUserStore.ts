import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserStore {
  username: string;
  setUsername: (username: string) => void;
  resetUsername: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (username) => set({ username }),
      resetUsername: () => set({ username: "" }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
