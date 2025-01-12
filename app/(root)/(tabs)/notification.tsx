import { usePushNotifications } from "@/components/hooks/usePushNotification";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import useAuthStore from "@/store/authStore";
import { router, useFocusEffect } from "expo-router";

export default function Notification() {
  const { expoPushToken } = usePushNotifications();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState<null | string>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { token, checkAuth, isAuthenticated } = useAuthStore();
  useFocusEffect(
    React.useCallback(() => {
      if (!isAuthenticated) {
        router.push(`/(auth)/sign-in`);
      }
    }, [isAuthenticated])
  );

  // Function to fetch notifications
  const fetchNotifications = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        "https://chattogram-somiti.makeupcoders.com/api/notification",
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

      const data = await response.json();
      setNotifications(data.data);
    } catch (error) {
      setError("Failed to fetch notifications");
    } finally {
      setRefreshing(false);
    }
  }, [token]);

  // Authenticate and post token logic
  useEffect(() => {
    const initialize = async () => {
      if (!token) {
        router.push(`/(auth)/sign-in`);
        return;
      }

      await checkAuth();

      if (expoPushToken?.data) {
        try {
          const response = await fetch(
            "https://chattogram-somiti.makeupcoders.com/api/notification/save-token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ expoToken: expoPushToken.data }),
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
        } catch (error) {
          console.error("Error posting token to API:", error);
          setError("Failed to post token to API.");
        }
      }

      fetchNotifications(); // Fetch notifications after posting the token
    };

    initialize();
  }, [expoPushToken?.data, token, fetchNotifications, checkAuth]);

  // Render a notification item
  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}>{item.details}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text className="text-2xl font-bold text-primary-100">Notifications</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View className="h-[85%]">
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchNotifications}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
  notificationCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
});
