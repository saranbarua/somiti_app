import TableHeader from "@/components/TextForm/TableHeader";
import useAuthStore from "@/store/authStore";
import { Subscription, SubscriptionResponse } from "@/types/type";
import { router, useFocusEffect } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: "white",
  },
});

export default function Home() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { token, checkAuth, isAuthenticated } = useAuthStore();

  useFocusEffect(
    React.useCallback(() => {
      if (!isAuthenticated) {
        router.push(`/(auth)/sign-in`);
      }
    }, [isAuthenticated])
  );

  const fetchSubscriptions = useCallback(async () => {
    setIsLoading(true);
    try {
      // Ensure authentication is checked on component mount
      await checkAuth();
      if (!token) {
        router.push("/(auth)/sign-in");
        return;
      }

      const response = await fetch(
        "https://chattogram-somiti.makeupcoders.com/api/subscription/member-subscription",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result: SubscriptionResponse = await response.json();
      if (result.success) {
        setSubscriptions(result.data);
      } else {
        Alert.alert("Failed to fetch subscriptions");
      }
    } finally {
      setIsLoading(false);
      setRefreshing(false); // Stop the refresh spinner
    }
  }, [checkAuth, token]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const renderItem = ({ item }: { item: Subscription }) => (
    <View className="flex w-full flex-row justify-between px-4 py-2 border-b border-gray-300">
      <View className="w-[20%]">
        <Text className="text-gray-700">{item.depositeMonth}</Text>
      </View>
      <View className="w-[20%]">
        <Text className="text-gray-700">{item.depositeYear}</Text>
      </View>
      <View className="w-[20%]">
        <Text className="text-gray-700">{item.monthlyFee}</Text>
      </View>
      <View className="w-[15%]">
        <Text
          className={item.status === "paid" ? "text-green-500" : "text-red-500"}
        >
          {item?.status}
        </Text>
      </View>
      <View className="w-[25%]">
        <Text className="text-gray-700">12/12/24</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text className="text-center text-2xl text-sky-500 font-rubik-medium mb-8">
        Monthly Fee Details
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" className="text-primary-100" />
      ) : subscriptions.length === 0 ? (
        <View className="flex justify-center items-center mt-10">
          <Text className="text-gray-500 text-lg">No data added yet.</Text>
        </View>
      ) : (
        <FlatList
          data={subscriptions}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListHeaderComponent={() => (
            <View>
              <View className="flex flex-row justify-between px-4 py-2 border-b border-gray-300">
                <View className="w-[20%]">
                  <TableHeader text="Month" />
                </View>
                <View className="w-[20%]">
                  <TableHeader text="Year" />
                </View>
                <View className="w-[20%]">
                  <TableHeader text="Fee" />
                </View>
                <View className="w-[15%]">
                  <TableHeader text="Status" />
                </View>
                <View className="w-[25%]">
                  <TableHeader text="Deposit Date" />
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
