import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import useAuthStore from "@/store/authStore";
import { router, useFocusEffect } from "expo-router";
import { usePushNotifications } from "@/components/hooks/usePushNotification";

interface NotificationItem {
  _id: string;
  title: string;
  details: string;
  createdAt: string;
}

export default function Notification() {
  const { token, checkAuth, isAuthenticated } = useAuthStore();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const { expoPushToken, notification } = usePushNotifications();

  // Navigate to sign-in page if not authenticated
  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated) {
        router.push(`/(auth)/sign-in`);
      }
    }, [isAuthenticated])
  );

  // Fetch notifications from the API
  const fetchNotifications = useCallback(async () => {
    setRefreshing(true);
    setError(null);
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
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();
      setNotifications(data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch notifications"
      );
    } finally {
      setRefreshing(false);
    }
  }, [token]);

  // Initialize authentication and fetch notifications
  useEffect(() => {
    const initialize = async () => {
      if (!token) {
        router.push(`/(auth)/sign-in`);
        return;
      }

      await checkAuth(); // Ensure user authentication
      await fetchNotifications(); // Fetch notifications after authentication
    };

    initialize();
  }, [token, fetchNotifications, checkAuth]);

  // Render a notification item
  const renderNotification = ({ item }: { item: NotificationItem }) => (
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
      <Text style={styles.header}>Notifications</Text>
      {error && <Text style={styles.error}>{error}</Text>}
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
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !refreshing && (
            <Text style={styles.emptyText}>No notifications available.</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
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
  list: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#555",
    fontSize: 16,
    marginTop: 32,
  },
});
