import { Stack } from "expo-router";
import "./global.css";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  // const [fontsLoaded] = useFonts({
  //   "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
  //   "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
  //   "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
  //   "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
  //   "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
  //   "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  // });

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  //authntication check
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure splash screen remains visible while loading fonts and auth state
    SplashScreen.preventAutoHideAsync();

    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        setIsAuthenticated(!!token); // Convert token existence to boolean
      } catch (error) {
        console.error("Error checking authentication status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (fontsLoaded) {
      checkAuthStatus();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

  if (!fontsLoaded || isLoading) {
    // Return null or a custom splash/loading screen while loading
    return null;
  }

  return (
    // <Stack>
    //   <Stack.Screen name="index" options={{ headerShown: false }} />
    //   <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    //   <Stack.Screen name="(root)" options={{ headerShown: false }} />
    //   <Stack.Screen name="+not-found" />
    // </Stack>
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
        initialParams={{
          redirectTo: isAuthenticated ? "(root)/home" : "(auth)/welcome",
        }}
      />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
