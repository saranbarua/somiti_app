import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import useAuthStore from "@/store/authStore";
import { router, useFocusEffect } from "expo-router";

interface Item {
  _id: string;
  title: string;
  details: string;
}

export default function Message() {
  const { token, checkAuth, isAuthenticated } = useAuthStore();
  const [messages, setMessages] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Navigate to sign-in page if not authenticated
  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated) {
        router.push(`/(auth)/sign-in`);
      }
    }, [isAuthenticated])
  );

  // Fetch notifications from the API
  const fetchMessage = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const response = await fetch(
        "https://chattogram-somiti.makeupcoders.com/api/member-message/single-member",
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
      setMessages(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch Messages");
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
      await fetchMessage(); // Fetch notifications after authentication
    };

    initialize();
  }, [token, fetchMessage, checkAuth]);

  // Render a notification item
  const renderMessages = ({ item }: { item: Item }) => (
    <View style={styles.Card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}>{item.details}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={messages}
        renderItem={renderMessages}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchMessage} />
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !refreshing && (
            <Text style={styles.emptyText}>No message available.</Text>
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
  Card: {
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
