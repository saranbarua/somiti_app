import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="test" options={{ headerShown: true }} />
      <Stack.Screen
        name="membership"
        options={{ headerShown: true, title: "Membership Card" }}
      />
    </Stack>
  );
}
