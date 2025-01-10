import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useAuthStore from "@/store/authStore";

export default function RootLayout() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      await checkAuth(); // Check authentication status
      setIsAuthChecked(true);
    };
    checkAuthentication();
  }, [checkAuth]);

  useEffect(() => {
    // If the user is not authenticated, navigate to the login page
    if (isAuthChecked && !isAuthenticated) {
      router.push("/(auth)/sign-in"); // Adjust the path as needed
    }
  }, [isAuthenticated, isAuthChecked, router]);

  if (!isAuthChecked) {
    return null; // You can show a loading spinner here
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile-details"
        options={{ headerShown: true, title: "Profile Details" }}
      />
      <Stack.Screen
        name="change-password"
        options={{ headerShown: true, title: "Change Password" }}
      />
      <Stack.Screen
        name="membership"
        options={{ headerShown: true, title: "Membership Card" }}
      />
    </Stack>
  );
}
