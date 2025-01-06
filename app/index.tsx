import { Redirect } from "expo-router";
import useAuthStore from "@/store/authStore";

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <Redirect href={"/(root)/(tabs)/home"} />
  ) : (
    <Redirect href={"/(auth)/welcome"} />
  );
}
