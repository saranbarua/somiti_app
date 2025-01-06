import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the types for the store's state and actions
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// Create the Zustand store with persistence
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,

      // Actions
      login: (token) => set({ token, isAuthenticated: true }),

      logout: () => {
        set({ token: null, isAuthenticated: false });
        AsyncStorage.removeItem("auth-storage"); // Clear persisted token
      },

      // Check if token exists in storage on app load
      checkAuth: async () => {
        try {
          const storedState = await AsyncStorage.getItem("auth-storage");
          if (storedState) {
            const parsedState = JSON.parse(storedState);
            if (parsedState?.state?.token) {
              set({ token: parsedState.state.token, isAuthenticated: true });
            }
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
