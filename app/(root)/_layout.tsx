import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile-details"
        options={{ headerShown: true, title: "Profile Details" }}
      />
      <Stack.Screen
        name="membership"
        options={{ headerShown: true, title: "Membership Card" }}
      />
    </Stack>
  );
}
