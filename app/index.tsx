import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import useAuthStore from "@/store/authStore";

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <Redirect href={"/(root)/(tabs)/home"} />
  ) : (
    <Redirect href={"/(auth)/welcome"} />
  );
}
